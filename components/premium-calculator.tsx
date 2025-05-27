"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowRight, RefreshCw, AlertCircle } from "lucide-react"
import { format, parseISO } from "date-fns"
import { ru } from "date-fns/locale"
import { OrderFormModal } from "@/components/order-form-modal"

interface ExchangeRateResponse {
  success: boolean
  rate: string
  cbrDate: string
  timestamp: string
  nextUpdate: string
  error?: string
}

export function PremiumCalculator() {
  const [yuanAmount, setYuanAmount] = useState<string>("100")
  const [rubleAmount, setRubleAmount] = useState<string>("0")
  const [exchangeRate, setExchangeRate] = useState<number>(12.5)
  const [cbrDate, setCbrDate] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [nextUpdate, setNextUpdate] = useState<Date | null>(null)
  const [updateError, setUpdateError] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isHovered, setIsHovered] = useState(false)
  const [activeInput, setActiveInput] = useState<"yuan" | "ruble">("yuan")

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  // Используем useRef для отслеживания монтирования компонента
  const isMounted = useRef(false)
  const updateTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Функция для получения курса валют
  const fetchExchangeRate = useCallback(async () => {
    // Предотвращаем повторные запросы, если уже идет загрузка
    if (isLoading) return

    setIsLoading(true)
    setUpdateError(null)

    try {
      const response = await fetch("/api/exchange-rate")

      // Проверяем статус ответа
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      // Проверяем Content-Type
      const contentType = response.headers.get("content-type")
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text()
        console.error("Получен не JSON ответ:", text.substring(0, 200))
        throw new Error("Сервер вернул некорректный ответ")
      }

      const data: ExchangeRateResponse = await response.json()

      if (data.success) {
        // Убедимся, что мы получаем число с наценкой
        const rate = Number.parseFloat(data.rate)
        console.log("Received rate with markup:", rate)

        setExchangeRate(rate)
        setCbrDate(data.cbrDate)
        setNextUpdate(new Date(data.nextUpdate))

        if (data.error) {
          setUpdateError(data.error)
        }
      } else {
        throw new Error(data.error || "Не удалось получить курс валют")
      }
    } catch (error) {
      console.error("Failed to fetch exchange rate:", error)
      setUpdateError("Не удалось обновить курс. Используется последний известный курс.")
    } finally {
      setIsLoading(false)
    }
  }, [isLoading])

  // Получение курса при первой загрузке
  useEffect(() => {
    // Предотвращаем повторные запросы при повторном рендеринге
    if (!isMounted.current) {
      isMounted.current = true
      fetchExchangeRate()
    }

    return () => {
      // Очищаем таймаут при размонтировании
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current)
      }
    }
  }, [fetchExchangeRate])

  // Настраиваем следующее обновление
  useEffect(() => {
    if (nextUpdate) {
      // Очищаем предыдущий таймаут, если он существует
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current)
      }

      const timeUntilNextUpdate = nextUpdate.getTime() - Date.now()

      // Устанавливаем таймаут только если время положительное
      if (timeUntilNextUpdate > 0) {
        updateTimeoutRef.current = setTimeout(() => {
          fetchExchangeRate()
        }, timeUntilNextUpdate)
      } else {
        // Если время уже прошло, обновляем сразу
        fetchExchangeRate()
      }
    }

    return () => {
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current)
      }
    }
  }, [nextUpdate, fetchExchangeRate])

  // Автоматический расчет при загрузке курса (только если пользователь не редактирует рубли)
  useEffect(() => {
    if (exchangeRate && yuanAmount && activeInput !== "ruble") {
      const yuanNum = Number.parseFloat(yuanAmount)
      if (!isNaN(yuanNum) && yuanNum > 0) {
        const calculatedRubles = yuanNum * exchangeRate
        // Убираем лишние нули после точки
        setRubleAmount(calculatedRubles % 1 === 0 ? calculatedRubles.toString() : calculatedRubles.toFixed(2))
      }
    }
  }, [exchangeRate, yuanAmount, activeInput])

  const handleInputChange = (value: string, inputType: "yuan" | "ruble") => {
    // Разрешаем только числа и десятичную точку
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setActiveInput(inputType)

      if (inputType === "yuan") {
        setYuanAmount(value)
        if (value && !isNaN(Number(value))) {
          const calculatedRubles = Number(value) * exchangeRate
          // Убираем лишние нули после точки
          setRubleAmount(calculatedRubles % 1 === 0 ? calculatedRubles.toString() : calculatedRubles.toFixed(2))
        } else {
          setRubleAmount("0")
        }
      } else {
        setRubleAmount(value)
        if (value && !isNaN(Number(value))) {
          const calculatedYuan = Number(value) / exchangeRate
          // Убираем лишние нули после точки
          setYuanAmount(calculatedYuan % 1 === 0 ? calculatedYuan.toString() : calculatedYuan.toFixed(2))
        } else {
          setYuanAmount("0")
        }
      }
    }
  }

  // Форматирование даты курса
  const getFormattedDate = () => {
    if (!cbrDate) return ""

    try {
      // Парсим дату из формата ЦБ РФ
      const date = parseISO(cbrDate)
      return format(date, "dd.MM.yyyy", { locale: ru })
    } catch (error) {
      console.error("Error formatting date:", error)
      return ""
    }
  }

  // Обработчик нажатия на кнопку "Пополнить Alipay"
  const handleOrderClick = () => {
    setIsModalOpen(true)
  }

  return (
    <>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-2xl border-2 border-orange-100 bg-white shadow-xl"
      >
        {/* Декоративные элементы */}
        <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br from-orange-100 to-red-100 opacity-30 blur-3xl"></div>
        <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-gradient-to-br from-orange-100 to-red-100 opacity-30 blur-3xl"></div>

        <div className="relative z-10">
          <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 md:p-8">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Калькулятор обмена</h3>
                <div className="mt-2 flex flex-col sm:flex-row sm:items-center gap-2">
                  <div className="flex items-center">
                    <span className="font-medium text-gray-700">
                      Текущий курс: 1 CNY = {exchangeRate} RUB
                      {isLoading && " (Обновление...)"}
                    </span>

                    {cbrDate && <span className="ml-2 text-xs text-gray-500">от {getFormattedDate()}</span>}
                  </div>
                </div>
                {updateError && (
                  <div className="mt-2 flex items-center text-sm text-amber-600">
                    <AlertCircle className="mr-1 h-4 w-4" />
                    {updateError}
                  </div>
                )}
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={fetchExchangeRate}
                disabled={isLoading}
                className="hover:text-orange-500 shrink-0"
              >
                <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
                Обновить курс
              </Button>
            </div>
          </div>

          <div className="p-6 md:p-8">
            <div className="grid gap-8">
              <div className="grid gap-4">
                <Label htmlFor="yuan" className="text-base font-medium text-gray-700">
                  Сумма в юанях (CNY)
                </Label>
                <Input
                  id="yuan"
                  type="text"
                  placeholder="Введите сумму в юанях"
                  value={yuanAmount}
                  onChange={(e) => handleInputChange(e.target.value, "yuan")}
                  className="h-14 rounded-xl border-2 border-gray-200 bg-white text-lg shadow-sm transition-all focus:border-orange-500 focus:ring-orange-500"
                />
              </div>

              <div className="flex items-center justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-red-500 shadow-md">
                  <ArrowRight className="h-6 w-6 text-white" />
                </div>
              </div>

              <div className="grid gap-4">
                <Label htmlFor="ruble" className="text-base font-medium text-gray-700">
                  Сумма в рублях (RUB)
                </Label>
                <Input
                  id="ruble"
                  type="text"
                  placeholder="Введите сумму в рублях"
                  value={rubleAmount}
                  onChange={(e) => handleInputChange(e.target.value, "ruble")}
                  className="h-14 rounded-xl border-2 border-gray-200 bg-white text-lg shadow-sm transition-all focus:border-orange-500 focus:ring-orange-500"
                />
              </div>
            </div>

            <div className="mt-8">
              <Button
                className="group relative h-14 w-full overflow-hidden rounded-xl bg-gradient-to-r from-orange-500 to-red-600 text-lg font-medium shadow-md transition-all hover:shadow-lg"
                onClick={handleOrderClick}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <span className="relative z-10">Пополнить Alipay на {yuanAmount || "0"} CNY</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-700"
                  initial={{ x: "-100%" }}
                  animate={{ x: isHovered ? 0 : "-100%" }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                />
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      <OrderFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        yuanAmount={yuanAmount}
        rubleAmount={rubleAmount}
        exchangeRate={exchangeRate}
      />
    </>
  )
}
