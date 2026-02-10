"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"

type Port = { code: string; name: string }
type Matrix = Record<string, Record<string, number>>

const ports: Port[] = [
  { code: "VVO", name: "Владивосток" },
  { code: "KRB", name: "Крабозаводск (о. Шикотан)" },
  { code: "YUZ", name: "Южно-Курильск (о. Кунашир)" },
  { code: "KSK", name: "Корсаков (о. Сахалин)" },
  { code: "KUR", name: "Курильск (о. Итуруп)" },
  { code: "PDY", name: "Подъяпольск" },
  { code: "MLK", name: "Малокурильское (о. Шикотан)" },
  { code: "SLV", name: "Славянка" },
  { code: "SVK", name: "Северо-Курильск (о. Парамушир)" },
]

const defaultMatrix: Matrix = Object.fromEntries(
  ports.map((from) => [from.code, Object.fromEntries(ports.map((to) => [to.code, from.code === to.code ? 0 : 2]))]),
)

const portMap = Object.fromEntries(ports.map((p) => [p.code, p]))

export default function VesselScheduleSettingsPage() {
  const [matrix, setMatrix] = useState<Matrix>(defaultMatrix)

  useEffect(() => {
    const stored = localStorage.getItem("vessel-transition-days")
    if (!stored) return
    try {
      setMatrix(JSON.parse(stored))
    } catch {
      setMatrix(defaultMatrix)
    }
  }, [])

  const cellsCount = useMemo(() => ports.length * ports.length, [])

  const updateCell = (from: string, to: string, value: number) => {
    setMatrix((prev) => ({
      ...prev,
      [from]: {
        ...prev[from],
        [to]: value,
      },
    }))
  }

  const save = () => localStorage.setItem("vessel-transition-days", JSON.stringify(matrix))
  const reset = () => setMatrix(defaultMatrix)

  return (
    <main className="mx-auto flex w-full max-w-[1700px] flex-col gap-6 px-4 py-8">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h1 className="text-2xl font-semibold">Техническая страница: дни перехода между портами</h1>
          <p className="text-sm text-muted-foreground">
            Задайте количество дней перехода для каждой пары портов. Эти значения используются на главной странице
            при автоматическом построении полугодового расписания.
          </p>
        </div>
        <Link className="rounded-md border px-3 py-2 text-sm" href="/vessel-schedule">
          Вернуться к расписанию
        </Link>
      </div>

      <div className="flex flex-wrap gap-2">
        <button className="rounded-md bg-black px-3 py-2 text-sm text-white" onClick={save}>
          Сохранить матрицу
        </button>
        <button className="rounded-md border px-3 py-2 text-sm" onClick={reset}>
          Сбросить к дефолту
        </button>
        <span className="text-sm text-muted-foreground">Ячеек матрицы: {cellsCount}</span>
      </div>

      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full min-w-[1500px] border-collapse text-xs">
          <thead>
            <tr className="border-b bg-muted/20">
              <th className="sticky left-0 z-10 border-r bg-muted/20 px-2 py-2 text-left">Из / В</th>
              {ports.map((to) => (
                <th key={to.code} className="border-r px-2 py-2 text-left">
                  {to.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ports.map((from) => (
              <tr key={from.code} className="border-b">
                <td className="sticky left-0 z-10 border-r bg-white px-2 py-2 font-medium">{from.name}</td>
                {ports.map((to) => (
                  <td key={`${from.code}-${to.code}`} className="border-r px-1 py-1">
                    <input
                      type="number"
                      min={0}
                      step={0.1}
                      className="w-20 rounded-md border px-2 py-1"
                      value={matrix[from.code]?.[to.code] ?? 0}
                      onChange={(e) => updateCell(from.code, to.code, Math.max(0, Number(e.target.value) || 0))}
                      disabled={from.code === to.code}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <section className="rounded-lg border p-4 text-sm text-muted-foreground">
        <p>
          Порты в системе: {ports.map((p) => portMap[p.code].name).join(", ")}. Все 9 портов доступны на главной странице.
        </p>
      </section>
    </main>
  )
}
