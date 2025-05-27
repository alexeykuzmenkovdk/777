// Конфигурация курса обмена
// ВАЖНО: Этот файл должен содержать только статические значения!

export const EXCHANGE_CONFIG = {
  // Базовая надбавка к курсу ЦБ РФ (в рублях)
  DEFAULT_MARKUP: 0.65,

  // Режим по умолчанию (false = автоматический, true = ручной)
  DEFAULT_USE_MANUAL_RATE: false,

  // Ручной курс по умолчанию (null = не установлен)
  DEFAULT_MANUAL_RATE: null as number | null,

  // Запасной курс при ошибках API ЦБ РФ
  FALLBACK_RATE: 12.5,

  // Время кэширования настроек (в миллисекундах)
  CACHE_DURATION: 30 * 60 * 1000, // 30 минут
} as const

// Функция для получения настроек по умолчанию
export function getDefaultSettings() {
  return {
    markup: EXCHANGE_CONFIG.DEFAULT_MARKUP,
    useManualRate: EXCHANGE_CONFIG.DEFAULT_USE_MANUAL_RATE,
    manualRate: EXCHANGE_CONFIG.DEFAULT_MANUAL_RATE,
    version: 1,
    lastUpdated: new Date().toISOString(),
  }
}

// Функция для валидации настроек
export function validateSettings(settings: any) {
  const errors: string[] = []

  if (typeof settings.markup !== "number" || settings.markup < 0) {
    errors.push("Надбавка должна быть положительным числом")
  }

  if (settings.useManualRate && (!settings.manualRate || settings.manualRate <= 0)) {
    errors.push("Ручной курс должен быть положительным числом")
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

// ИНСТРУКЦИЯ ПО ИЗМЕНЕНИЮ НАДБАВКИ:
//
// 1. Измените значение DEFAULT_MARKUP выше (например: 0.13)
// 2. Сохраните файл
// 3. Подождите 10-15 секунд для перезапуска сервера
// 4. Обновите страницу в браузере
// 5. Нажмите "Обновить курс" в калькуляторе
//
// ПРИМЕРЫ ЗНАЧЕНИЙ:
// DEFAULT_MARKUP: 0.13  // 13 копеек
// DEFAULT_MARKUP: 0.50  // 50 копеек
// DEFAULT_MARKUP: 1.00  // 1 рубль
// DEFAULT_MARKUP: 0.80  // 80 копеек
//
// ВАЖНО: Используйте только числовые значения без функций!
