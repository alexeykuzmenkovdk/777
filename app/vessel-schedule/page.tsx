"use client"

import Link from "next/link"
import { Fragment, useEffect, useMemo, useState } from "react"

type Port = { code: string; name: string }
type Vessel = { id: string; name: string }
type RoutePort = { portCode: string; dwellDays: number }
type ScheduleStop = {
  index: number
  portCode: string
  eta: Date
  etd: Date
  transitDays: number
  dwellDays: number
}

type FormattedScheduleRow = Array<ScheduleStop | null>

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

const vessels: Vessel[] = [
  { id: "dv-1-90", name: "т/х «Анатолий Иванов» (ДВ-1/90)" },
  { id: "dv-1-89", name: "т/х «Ерофей Хабаров» (ДВ-1/89)" },
  { id: "dv-1-88", name: "т/х «Русский Восток» (ДВ-1/88)" },
  { id: "dv-25-12", name: "т/х «Механик Красковский» (ДВ-25/12)" },
]

const defaultRouteByVessel: Record<string, RoutePort[]> = {
  "dv-1-90": [
    { portCode: "VVO", dwellDays: 1 },
    { portCode: "KRB", dwellDays: 1 },
    { portCode: "KSK", dwellDays: 2 },
    { portCode: "YUZ", dwellDays: 1 },
    { portCode: "PDY", dwellDays: 1 },
    { portCode: "SVK", dwellDays: 1 },
    { portCode: "KUR", dwellDays: 1 },
  ],
  "dv-1-89": [
    { portCode: "VVO", dwellDays: 1 },
    { portCode: "KRB", dwellDays: 1 },
    { portCode: "MLK", dwellDays: 1 },
    { portCode: "YUZ", dwellDays: 1 },
    { portCode: "PDY", dwellDays: 1 },
    { portCode: "KSK", dwellDays: 2 },
    { portCode: "KUR", dwellDays: 1 },
  ],
  "dv-1-88": [
    { portCode: "VVO", dwellDays: 1 },
    { portCode: "KUR", dwellDays: 1 },
    { portCode: "YUZ", dwellDays: 1 },
    { portCode: "KRB", dwellDays: 1 },
    { portCode: "KSK", dwellDays: 2 },
    { portCode: "SLV", dwellDays: 1 },
    { portCode: "MLK", dwellDays: 1 },
  ],
  "dv-25-12": [
    { portCode: "VVO", dwellDays: 1 },
    { portCode: "KSK", dwellDays: 2 },
    { portCode: "KUR", dwellDays: 1 },
    { portCode: "PDY", dwellDays: 1 },
    { portCode: "KRB", dwellDays: 1 },
    { portCode: "YUZ", dwellDays: 1 },
    { portCode: "MLK", dwellDays: 1 },
  ],
}

const defaultMatrix: Matrix = Object.fromEntries(
  ports.map((from) => [from.code, Object.fromEntries(ports.map((to) => [to.code, from.code === to.code ? 0 : 2]))]),
)

defaultMatrix.VVO.KRB = 1.2
defaultMatrix.KRB.VVO = 1.2
defaultMatrix.VVO.KSK = 1
defaultMatrix.KSK.VVO = 1
defaultMatrix.KUR.YUZ = 0.5
defaultMatrix.YUZ.KUR = 0.5

const portMap = Object.fromEntries(ports.map((p) => [p.code, p]))

const pad = (n: number) => `${n}`.padStart(2, "0")
const toInput = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
const toDate = (d: Date) => `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()}`
const parseDate = (value: string) => {
  const parsed = new Date(value)
  return Number.isNaN(parsed.getTime()) ? new Date() : parsed
}

export default function VesselSchedulePage() {
  const startDefault = new Date()
  startDefault.setHours(8, 0, 0, 0)

  const [selectedVesselId, setSelectedVesselId] = useState(vessels[0].id)
  const [startDate, setStartDate] = useState(toInput(startDefault))
  const [months, setMonths] = useState(6)
  const [route, setRoute] = useState<RoutePort[]>(defaultRouteByVessel[vessels[0].id])
  const [addPortCode, setAddPortCode] = useState("VVO")
  const [etaOverrides, setEtaOverrides] = useState<Record<number, string>>({})
  const [matrix, setMatrix] = useState<Matrix>(defaultMatrix)

  useEffect(() => {
    const stored = localStorage.getItem("vessel-transition-days")
    if (stored) {
      try {
        setMatrix(JSON.parse(stored))
      } catch {
        setMatrix(defaultMatrix)
      }
    }
  }, [])

  useEffect(() => {
    setRoute(defaultRouteByVessel[selectedVesselId] ?? [])
    setEtaOverrides({})
  }, [selectedVesselId])

  const schedule = useMemo(() => {
    if (route.length === 0) return [] as ScheduleStop[]
    const start = parseDate(startDate)
    const horizon = new Date(start)
    horizon.setMonth(horizon.getMonth() + months)

    const list: ScheduleStop[] = []
    let index = 0
    let prevPort = route[0].portCode
    let prevEtd = new Date(start)

    while (true) {
      const rp = route[index % route.length]
      const transitDays = index === 0 ? 0 : matrix[prevPort]?.[rp.portCode] ?? 2
      let eta = new Date(prevEtd.getTime() + transitDays * 24 * 60 * 60 * 1000)
      if (index === 0) eta = new Date(start)

      const override = etaOverrides[index]
      if (override) eta = parseDate(override)

      const etd = new Date(eta.getTime() + rp.dwellDays * 24 * 60 * 60 * 1000)
      if (eta > horizon) break

      list.push({
        index,
        portCode: rp.portCode,
        eta,
        etd,
        transitDays,
        dwellDays: rp.dwellDays,
      })

      prevPort = rp.portCode
      prevEtd = etd
      index += 1
      if (index > 2000) break
    }

    return list
  }, [etaOverrides, matrix, months, route, startDate])

  const formattedScheduleRows = useMemo(() => {
    if (route.length === 0) return [] as FormattedScheduleRow[]

    const rows: FormattedScheduleRow[] = []
    for (const stop of schedule) {
      const rowIndex = Math.floor(stop.index / route.length)
      const routeIndex = stop.index % route.length

      if (!rows[rowIndex]) {
        rows[rowIndex] = Array.from({ length: route.length }, () => null)
      }

      rows[rowIndex][routeIndex] = stop
    }

    return rows
  }, [route.length, schedule])

  const addPortToRoute = () => setRoute((prev) => [...prev, { portCode: addPortCode, dwellDays: 1 }])
  const removePortFromRoute = (i: number) => setRoute((prev) => prev.filter((_, idx) => idx !== i))
  const updateRoutePort = (i: number, patch: Partial<RoutePort>) =>
    setRoute((prev) => prev.map((rp, idx) => (idx === i ? { ...rp, ...patch } : rp)))

  const exportCsv = () => {
    const routePorts = route.map((rp) => portMap[rp.portCode]?.name ?? rp.portCode)
    const headerPorts = routePorts.flatMap((name) => [name, ""])
    const headerArrivals = routePorts.flatMap(() => ["Приход", "Отход"])
    const vesselName = vessels.find((v) => v.id === selectedVesselId)?.name ?? selectedVesselId
    const rows = formattedScheduleRows.map((row) =>
      row.flatMap((stop) => {
        if (!stop) return ["", ""]
        return [toDate(stop.eta), toDate(stop.etd)]
      }),
    )

    const content = [
      [`Расписание движения судна ${vesselName}`],
      [],
      headerPorts,
      headerArrivals,
      ...rows,
    ]
      .map((r) => r.map((cell) => `"${cell.replaceAll('"', '""')}"`).join(";"))
      .join("\n")

    const blob = new Blob([content], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `half-year-schedule-${selectedVesselId}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <main className="mx-auto flex w-full max-w-[1500px] flex-col gap-6 px-4 py-8">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h1 className="text-2xl font-semibold">Расписание на полугодие</h1>
          <p className="text-sm text-muted-foreground">
            Выберите судно, порты маршрута и стоянки. Изменение ETA в одном заходе автоматически сдвигает последующие даты.
          </p>
        </div>
        <Link className="rounded-md border px-3 py-2 text-sm" href="/vessel-schedule/settings">
          Техническая страница переходов (дни)
        </Link>
      </div>

      <section className="grid gap-4 rounded-lg border p-4 md:grid-cols-2 xl:grid-cols-4">
        <label className="flex flex-col gap-1 text-sm">
          Судно
          <select className="rounded-md border px-2 py-2" value={selectedVesselId} onChange={(e) => setSelectedVesselId(e.target.value)}>
            {vessels.map((v) => (
              <option key={v.id} value={v.id}>
                {v.name}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1 text-sm">
          Дата старта
          <input type="datetime-local" className="rounded-md border px-2 py-2" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </label>

        <label className="flex flex-col gap-1 text-sm">
          Горизонт, месяцев
          <input
            type="number"
            min={1}
            max={12}
            className="rounded-md border px-2 py-2"
            value={months}
            onChange={(e) => setMonths(Math.max(1, Math.min(12, Number(e.target.value) || 6)))}
          />
        </label>

        <button className="mt-auto rounded-md bg-black px-3 py-2 text-sm text-white" onClick={exportCsv}>
          Экспорт CSV
        </button>
      </section>

      <section className="rounded-lg border p-4">
        <h2 className="mb-2 text-lg font-semibold">Конструктор маршрута и стоянок</h2>
        <p className="mb-3 text-sm text-muted-foreground">Стоянка задаётся вручную по каждому порту (в днях) и участвует в автоматическом расчёте.</p>

        <div className="mb-3 flex flex-wrap items-end gap-2">
          <label className="flex flex-col gap-1 text-sm">
            Добавить порт
            <select className="rounded-md border px-2 py-2" value={addPortCode} onChange={(e) => setAddPortCode(e.target.value)}>
              {ports.map((p) => (
                <option key={p.code} value={p.code}>
                  {p.name}
                </option>
              ))}
            </select>
          </label>
          <button className="rounded-md border px-3 py-2 text-sm" onClick={addPortToRoute}>
            Добавить в маршрут
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] border-collapse text-sm">
            <thead>
              <tr className="border-b bg-muted/20 text-left">
                <th className="px-2 py-2">Порядок</th>
                <th className="px-2 py-2">Порт</th>
                <th className="px-2 py-2">Стоянка (дней)</th>
                <th className="px-2 py-2">Действия</th>
              </tr>
            </thead>
            <tbody>
              {route.map((rp, i) => (
                <tr key={`${rp.portCode}-${i}`} className="border-b">
                  <td className="px-2 py-2">{i + 1}</td>
                  <td className="px-2 py-2">
                    <select
                      className="w-[360px] rounded-md border px-2 py-1"
                      value={rp.portCode}
                      onChange={(e) => updateRoutePort(i, { portCode: e.target.value })}
                    >
                      {ports.map((p) => (
                        <option key={p.code} value={p.code}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-2 py-2">
                    <input
                      type="number"
                      min={0}
                      step={0.5}
                      className="w-24 rounded-md border px-2 py-1"
                      value={rp.dwellDays}
                      onChange={(e) => updateRoutePort(i, { dwellDays: Math.max(0, Number(e.target.value) || 0) })}
                    />
                  </td>
                  <td className="px-2 py-2">
                    <button className="rounded-md border px-2 py-1 text-xs" onClick={() => removePortFromRoute(i)}>
                      Удалить
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-lg border p-4">
        <h2 className="mb-1 text-lg font-semibold">Готовая таблица (формат для Word)</h2>
        <p className="mb-3 text-sm text-muted-foreground">
          Структура соответствует шаблону: в шапке порты маршрута, ниже для каждого порта отдельные колонки «Приход / Отход».
        </p>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px] border-collapse text-center text-sm">
            <thead>
              <tr>
                <th className="border px-2 py-2 text-lg font-semibold" colSpan={Math.max(route.length * 2, 1)}>
                  Расписание движения судна {vessels.find((v) => v.id === selectedVesselId)?.name ?? selectedVesselId}
                </th>
              </tr>
              <tr>
                <th className="border px-2 py-2" colSpan={Math.max(route.length * 2, 1)}>
                  {route.length > 0
                    ? `${toDate(schedule[0]?.eta ?? parseDate(startDate))} — ${toDate(schedule[schedule.length - 1]?.etd ?? parseDate(startDate))}`
                    : "Маршрут не задан"}
                </th>
              </tr>
              <tr className="bg-muted/20">
                {route.map((rp, i) => (
                  <th key={`${rp.portCode}-${i}`} className="border px-2 py-2" colSpan={2}>
                    {portMap[rp.portCode]?.name ?? rp.portCode}
                  </th>
                ))}
              </tr>
              <tr className="bg-muted/20">
                {route.map((rp, i) => (
                  <Fragment key={`${rp.portCode}-headers-${i}`}>
                    <th key={`${rp.portCode}-eta-${i}`} className="border px-2 py-2">
                      Приход
                    </th>
                    <th key={`${rp.portCode}-etd-${i}`} className="border px-2 py-2">
                      Отход
                    </th>
                  </Fragment>
                ))}
              </tr>
            </thead>
            <tbody>
              {formattedScheduleRows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((stop, i) => (
                    <Fragment key={`row-${rowIndex}-port-${i}`}>
                      <td key={`eta-${rowIndex}-${i}`} className="border px-2 py-2 whitespace-nowrap">
                        {stop ? toDate(stop.eta) : ""}
                      </td>
                      <td key={`etd-${rowIndex}-${i}`} className="border px-2 py-2 whitespace-nowrap">
                        {stop ? toDate(stop.etd) : ""}
                      </td>
                    </Fragment>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-lg border p-4">
        <h2 className="mb-3 text-lg font-semibold">Точечная ручная правка ETA</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] border-collapse text-sm">
            <thead>
              <tr className="border-b bg-muted/20 text-left">
                <th className="px-2 py-2">#</th>
                <th className="px-2 py-2">Порт</th>
                <th className="px-2 py-2">Текущий приход</th>
                <th className="px-2 py-2">ETA ручная правка</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((item) => (
                <tr key={item.index} className="border-b">
                  <td className="px-2 py-2">{item.index + 1}</td>
                  <td className="px-2 py-2">{portMap[item.portCode]?.name ?? item.portCode}</td>
                  <td className="px-2 py-2 whitespace-nowrap">{item.eta.toLocaleString("ru-RU")}</td>
                  <td className="px-2 py-2">
                    <input
                      type="datetime-local"
                      className="rounded-md border px-2 py-1"
                      value={etaOverrides[item.index] ?? ""}
                      onChange={(e) => setEtaOverrides((prev) => ({ ...prev, [item.index]: e.target.value }))}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  )
}
