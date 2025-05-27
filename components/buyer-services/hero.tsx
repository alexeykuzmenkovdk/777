"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { ScrollReveal } from "@/components/ui/scroll-reveal"

interface BuyerServicesHeroProps {
  onOpenContactForm: () => void
}

export function BuyerServicesHero({ onOpenContactForm }: BuyerServicesHeroProps) {
  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-br from-white via-orange-50 to-red-50 py-16 md:py-24 lg:py-32">
      {/* Декоративные круги */}
      <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-br from-orange-200 to-red-200 opacity-20 blur-3xl"></div>
      <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-gradient-to-br from-orange-200 to-red-200 opacity-20 blur-3xl"></div>

      {/* Основной контент */}
      <div className="container relative z-10 px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Левая колонка с текстом */}
          <div className="flex flex-col justify-center">
            <ScrollReveal>
              <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                <span className="block bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
                  Услуги баера в Китае
                </span>
              </h1>

              <p className="mb-8 max-w-[600px] text-lg text-gray-600 md:text-xl">
                Поможем найти, проверить и доставить товары с Taobao, Tmall, JD, Poizon и других китайских площадок по
                выгодным ценам.
              </p>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Button
                  size="lg"
                  className="group relative overflow-hidden bg-gradient-to-r from-orange-500 to-red-600 px-8 py-6 text-lg shadow-lg transition-all duration-300 hover:shadow-xl"
                  onClick={onOpenContactForm}
                >
                  Заказать услуги баера <ArrowRight className="ml-2 h-5 w-5" />
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="border-2 border-orange-500 px-8 py-6 text-lg text-orange-500 shadow-md transition-all duration-300 hover:bg-orange-50 hover:shadow-lg"
                >
                  <Link href="#process">Как это работает</Link>
                </Button>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">Работаем со всеми площадками</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">Проверка качества товаров</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">Выгодные тарифы</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">Быстрая доставка</span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Правая колонка с изображением */}
          <div className="flex items-center justify-center">
            <ScrollReveal direction="left">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full max-w-md"
              >
                <div className="relative h-[400px] w-full overflow-hidden rounded-2xl shadow-2xl">
                  <Image
                    src="/placeholder.svg?height=800&width=600"
                    alt="Услуги баера в Китае"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="mb-2 flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
                          TB
                        </div>
                        <div className="h-8 w-8 rounded-full bg-red-600 flex items-center justify-center text-white font-bold">
                          TM
                        </div>
                        <div className="h-8 w-8 rounded-full bg-red-700 flex items-center justify-center text-white font-bold">
                          JD
                        </div>
                        <div className="h-8 w-8 rounded-full bg-black flex items-center justify-center text-white font-bold">
                          PZ
                        </div>
                      </div>
                      <p className="text-white text-sm">Работаем со всеми популярными площадками Китая</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  )
}
