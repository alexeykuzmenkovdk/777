import { NextResponse } from "next/server"
import { settingsStore } from "@/lib/settings-store"
import { validateSettings } from "@/lib/exchange-config"

// Функция для проверки аутентификации через токен
function isAuthenticated(request: Request) {
  try {
    // Получаем токен из заголовков или URL параметров
    const url = new URL(request.url)
    const tokenFromUrl = url.searchParams.get("token")
    const authHeader = request.headers.get("authorization")
    const tokenFromHeader = authHeader?.replace("Bearer ", "")

    const token = tokenFromUrl || tokenFromHeader

    if (!token) {
      console.log("[SERVER] Токен не найден в запросе")
      return false
    }

    // Проверяем формат токена (admin_timestamp_randomstring)
    const tokenParts = token.split("_")
    if (tokenParts.length !== 3 || tokenParts[0] !== "admin") {
      console.log("[SERVER] Неверный формат токена:", token)
      return false
    }

    // Проверяем возраст токена (не старше 24 часов)
    const timestamp = Number.parseInt(tokenParts[1])
    const now = Date.now()
    const tokenAge = now - timestamp
    const maxAge = 24 * 60 * 60 * 1000 // 24 часа

    if (tokenAge > maxAge) {
      console.log("[SERVER] Токен истек:", { tokenAge, maxAge })
      return false
    }

    console.log("[SERVER] Токен действителен:", token)
    return true
  } catch (error) {
    console.error("[SERVER] Ошибка проверки токена:", error)
    return false
  }
}

// Функция для отправки уведомления в Telegram
async function sendTelegramNotification(message: string) {
  try {
    const botToken = process.env.TELEGRAM_BOT_TOKEN
    const chatId = process.env.TELEGRAM_CHAT_ID

    if (!botToken || !chatId) {
      console.error("[SERVER] Отсутствуют переменные окружения для Telegram")
      return
    }

    const url = `https://api.telegram.org/bot${botToken}/sendMessage`
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "HTML",
      }),
    })

    const data = await response.json()
    if (!response.ok) {
      console.error("[SERVER] Ошибка отправки уведомления в Telegram:", data)
    } else {
      console.log("[SERVER] Уведомление в Telegram отправлено успешно")
    }
  } catch (error) {
    console.error("[SERVER] Ошибка при отправке уведомления в Telegram:", error)
  }
}

// Обработчик GET-запроса для получения настроек
export async function GET(request: Request) {
  try {
    // Проверяем аутентификацию
    if (!isAuthenticated(request)) {
      console.log("[SERVER] Попытка получения настроек без аутентификации")
      return NextResponse.json(
        {
          success: false,
          message: "Требуется аутентификация",
        },
        { status: 401 },
      )
    }

    console.log("[SERVER] Запрос настроек курса")

    // Получаем настройки из централизованного хранилища
    const settings = settingsStore.getSettings()

    console.log("[SERVER] Настройки курса получены из хранилища:", settings)

    return NextResponse.json({
      success: true,
      ...settings,
    })
  } catch (error) {
    console.error("[SERVER] Ошибка при получении настроек курса:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Ошибка при получении настроек",
      },
      { status: 500 },
    )
  }
}

// Обработчик POST-запроса для сохранения настроек
export async function POST(request: Request) {
  try {
    // Проверяем аутентификацию
    if (!isAuthenticated(request)) {
      console.log("[SERVER] Попытка сохранения настроек без аутентификации")
      return NextResponse.json(
        {
          success: false,
          message: "Требуется аутентификация",
        },
        { status: 401 },
      )
    }

    // Получаем данные из запроса
    const { markup, useManualRate, manualRate } = await request.json()

    console.log("[SERVER] Запрос на сохранение настроек:", { markup, useManualRate, manualRate })

    // Валидируем настройки
    const validation = validateSettings({ markup, useManualRate, manualRate })
    if (!validation.isValid) {
      return NextResponse.json(
        {
          success: false,
          message: validation.errors.join(", "),
        },
        { status: 400 },
      )
    }

    // Получаем предыдущие настройки для сравнения
    const previousSettings = settingsStore.getSettings()

    // Сохраняем новые настройки
    const newSettings = settingsStore.setSettings({
      markup,
      useManualRate,
      manualRate,
    })

    console.log("[SERVER] Новые настройки курса сохранены:", newSettings)

    // Отправляем уведомление в Telegram об изменении настроек
    let notificationMessage = "<b>🔄 Изменение настроек курса</b>\n\n"

    if (useManualRate !== previousSettings.useManualRate) {
      notificationMessage += `<b>Режим:</b> ${
        useManualRate ? "Ручной курс ✏️" : "Автоматический (ЦБ РФ + надбавка) 🤖"
      }\n`
    }

    if (useManualRate) {
      if (manualRate !== previousSettings.manualRate) {
        notificationMessage += `<b>Установлен ручной курс:</b> ${manualRate} ₽\n`
        if (previousSettings.manualRate) {
          const diff = manualRate - previousSettings.manualRate
          const diffPercent = ((diff / previousSettings.manualRate) * 100).toFixed(2)
          const diffSymbol = diff > 0 ? "📈" : "📉"
          notificationMessage += `<b>Изменение:</b> ${diff > 0 ? "+" : ""}${diff.toFixed(2)} ₽ (${
            diff > 0 ? "+" : ""
          }${diffPercent}%) ${diffSymbol}\n`
        }
      }
    } else {
      if (markup !== previousSettings.markup) {
        notificationMessage += `<b>Надбавка к курсу ЦБ:</b> ${markup} ₽\n`
        const diff = markup - previousSettings.markup
        notificationMessage += `<b>Изменение надбавки:</b> ${diff > 0 ? "+" : ""}${diff.toFixed(2)} ₽\n`
      }
    }

    notificationMessage += `\n<b>Версия настроек:</b> ${newSettings.version}`
    notificationMessage += `\n<b>Дата изменения:</b> ${new Date().toLocaleString("ru-RU")}`
    notificationMessage += `\n\n<i>💾 Настройки сохранены в хранилище</i>`

    // Отправляем уведомление только если были изменения
    if (
      useManualRate !== previousSettings.useManualRate ||
      (useManualRate && manualRate !== previousSettings.manualRate) ||
      (!useManualRate && markup !== previousSettings.markup)
    ) {
      // Отправляем уведомление асинхронно, не блокируя ответ
      sendTelegramNotification(notificationMessage).catch((error) => {
        console.error("[SERVER] Ошибка при отправке уведомления:", error)
      })
    }

    console.log("[SERVER] Настройки успешно сохранены в хранилище")

    return NextResponse.json({
      success: true,
      message: "Настройки успешно сохранены и применены",
      version: newSettings.version,
      shouldRefreshRate: true, // Флаг для клиента, что нужно обновить курс
    })
  } catch (error) {
    console.error("[SERVER] Ошибка при сохранении настроек курса:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Ошибка при сохранении настроек",
      },
      { status: 500 },
    )
  }
}
