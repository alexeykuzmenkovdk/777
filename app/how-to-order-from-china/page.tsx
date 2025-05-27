import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CheckCircle, ShoppingCart, CreditCard, Truck, Search, Shield, Globe } from "lucide-react"
import { FloatingElements } from "@/components/ui/floating-elements"
import { SiteHeader } from "@/components/site-header"
import { Logo } from "@/components/logo-component"

export const metadata: Metadata = {
  title: "Как заказывать товары из Китая | Полное руководство | Alipayfast",
  description:
    "Подробное руководство о том, как заказывать товары из Китая: выбор площадки, регистрация, оплата через Alipay, доставка. Советы от экспертов и помощь на каждом этапе.",
  keywords:
    "как заказывать из китая, заказ с taobao, покупки на алиэкспресс, оплата alipay, доставка из китая, посредник таобао, выкуп товаров из китая",
}

export default function HowToOrderFromChinaPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Header */}
      <SiteHeader />

      <main className="flex-1">
        {/* Кнопка возврата на главную */}
        <div className="container mt-6">
          <Button variant="ghost" asChild className="flex items-center gap-2 text-gray-600 hover:text-orange-500">
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              <span>Вернуться на главную</span>
            </Link>
          </Button>
        </div>

        {/* Hero Section */}
        <section className="relative w-full overflow-hidden bg-gradient-to-br from-white via-orange-50 to-red-50 py-16 md:py-24 lg:py-32">
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
                      Как заказывать товары из Китая
                    </span>
                  </h1>

                  <p className="mb-8 max-w-[600px] text-lg text-gray-600 md:text-xl">
                    Полное руководство по заказу товаров с китайских маркетплейсов: от выбора площадки до получения
                    посылки
                  </p>

                  <div className="flex flex-col gap-4 sm:flex-row">
                    <Button
                      size="lg"
                      className="group relative overflow-hidden bg-gradient-to-r from-orange-500 to-red-600 px-8 py-6 text-lg shadow-lg transition-all duration-300 hover:shadow-xl"
                      asChild
                    >
                      <Link href="#platforms">Начать изучение</Link>
                    </Button>

                    <Button
                      size="lg"
                      variant="outline"
                      className="border-2 border-orange-500 px-8 py-6 text-lg text-orange-500 shadow-md transition-all duration-300 hover:bg-orange-50 hover:shadow-lg"
                      asChild
                    >
                      <Link href="/buyer-services">Услуги баера</Link>
                    </Button>
                  </div>

                  <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="flex items-center gap-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </div>
                      <span className="text-sm font-medium text-gray-700">Подробные инструкции</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </div>
                      <span className="text-sm font-medium text-gray-700">Советы от экспертов</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </div>
                      <span className="text-sm font-medium text-gray-700">Обзор популярных площадок</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </div>
                      <span className="text-sm font-medium text-gray-700">Помощь на каждом этапе</span>
                    </div>
                  </div>
                </ScrollReveal>
              </div>

              {/* Правая колонка с изображением */}
              <div className="flex items-center justify-center">
                <ScrollReveal direction="left">
                  <div className="relative w-full max-w-md">
                    <div className="relative h-[500px] w-full overflow-hidden rounded-2xl shadow-2xl">
                      <Image src="/placeholder-8ywx5.png" alt="Заказ товаров из Китая" fill className="object-cover" />
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
                          <p className="text-white text-sm">Популярные китайские маркетплейсы</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>

        {/* Platforms Section */}
        <section id="platforms" className="w-full py-16 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <ScrollReveal>
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
                    Популярные китайские маркетплейсы
                  </h2>
                  <p className="max-w-[900px] text-gray-600 md:text-xl">
                    Обзор основных площадок для заказа товаров из Китая
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <ScrollReveal delay={0.1}>
                <div className="group relative overflow-hidden rounded-xl border border-orange-100 bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl h-full">
                  <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gradient-to-br from-orange-100 to-red-100 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-70"></div>

                  <div className="relative z-10">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-[#FF4400] text-white font-bold text-xl">
                      TB
                    </div>

                    <h3 className="mb-2 text-xl font-bold text-gray-900">Taobao</h3>
                    <p className="text-gray-600 mb-4">
                      Крупнейшая торговая площадка Китая с миллионами товаров по низким ценам. Идеально подходит для
                      поиска уникальных товаров и выгодных предложений.
                    </p>

                    <div className="mt-auto">
                      <h4 className="font-medium text-gray-800 mb-2">Особенности:</h4>
                      <ul className="space-y-1 text-gray-600">
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1 shrink-0" />
                          <span>Огромный выбор товаров</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1 shrink-0" />
                          <span>Низкие цены напрямую от производителей</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1 shrink-0" />
                          <span>Система отзывов и рейтингов продавцов</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <div className="group relative overflow-hidden rounded-xl border border-orange-100 bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl h-full">
                  <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gradient-to-br from-orange-100 to-red-100 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-70"></div>

                  <div className="relative z-10">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-[#E43226] text-white font-bold text-xl">
                      TM
                    </div>

                    <h3 className="mb-2 text-xl font-bold text-gray-900">Tmall</h3>
                    <p className="text-gray-600 mb-4">
                      Премиальная версия Taobao с проверенными продавцами и брендовыми товарами. Здесь представлены
                      официальные магазины известных брендов с гарантией качества.
                    </p>

                    <div className="mt-auto">
                      <h4 className="font-medium text-gray-800 mb-2">Особенности:</h4>
                      <ul className="space-y-1 text-gray-600">
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1 shrink-0" />
                          <span>Только проверенные продавцы</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1 shrink-0" />
                          <span>Оригинальные брендовые товары</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1 shrink-0" />
                          <span>Высокое качество и гарантия</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.3}>
                <div className="group relative overflow-hidden rounded-xl border border-orange-100 bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl h-full">
                  <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gradient-to-br from-orange-100 to-red-100 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-70"></div>

                  <div className="relative z-10">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-[#D71C1E] text-white font-bold text-xl">
                      JD
                    </div>

                    <h3 className="mb-2 text-xl font-bold text-gray-900">JD.com</h3>
                    <p className="text-gray-600 mb-4">
                      Один из крупнейших онлайн-ритейлеров Китая с акцентом на электронику и бытовую технику. Известен
                      своей надежной логистикой и быстрой доставкой.
                    </p>

                    <div className="mt-auto">
                      <h4 className="font-medium text-gray-800 mb-2">Особенности:</h4>
                      <ul className="space-y-1 text-gray-600">
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1 shrink-0" />
                          <span>Широкий выбор электроники</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1 shrink-0" />
                          <span>Собственная логистическая сеть</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1 shrink-0" />
                          <span>Быстрая и надежная доставка</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.4}>
                <div className="group relative overflow-hidden rounded-xl border border-orange-100 bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl h-full">
                  <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gradient-to-br from-orange-100 to-red-100 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-70"></div>

                  <div className="relative z-10">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-[#000000] text-white font-bold text-xl">
                      PZ
                    </div>

                    <h3 className="mb-2 text-xl font-bold text-gray-900">Poizon (Dewu)</h3>
                    <p className="text-gray-600 mb-4">
                      Популярная платформа для покупки кроссовок, одежды и аксессуаров премиальных брендов.
                      Специализируе��ся ��а лимитированных коллекциях и редких моделях.
                    </p>

                    <div className="mt-auto">
                      <h4 className="font-medium text-gray-800 mb-2">Особенности:</h4>
                      <ul className="space-y-1 text-gray-600">
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1 shrink-0" />
                          <span>Лимитированные коллекции</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1 shrink-0" />
                          <span>Проверка подлинности товаров</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1 shrink-0" />
                          <span>Премиальные бренды</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.5}>
                <div className="group relative overflow-hidden rounded-xl border border-orange-100 bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl h-full">
                  <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gradient-to-br from-orange-100 to-red-100 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-70"></div>

                  <div className="relative z-10">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-[#FF6600] text-white font-bold text-xl">
                      1688
                    </div>

                    <h3 className="mb-2 text-xl font-bold text-gray-900">1688</h3>
                    <p className="text-gray-600 mb-4">
                      Оптовая платформа для бизнеса с минимальными ценами от производителей. Идеально подходит для
                      оптовых закупок и поиска поставщиков для бизнеса.
                    </p>

                    <div className="mt-auto">
                      <h4 className="font-medium text-gray-800 mb-2">Особенности:</h4>
                      <ul className="space-y-1 text-gray-600">
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1 shrink-0" />
                          <span>Оптовые цены напрямую от фабрик</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1 shrink-0" />
                          <span>Минимальный объем заказа</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1 shrink-0" />
                          <span>Широкий выбор производителей</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.6}>
                <div className="group relative overflow-hidden rounded-xl border border-orange-100 bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl h-full">
                  <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gradient-to-br from-orange-100 to-red-100 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-70"></div>

                  <div className="relative z-10">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-[#00A0DC] text-white font-bold text-xl">
                      XHS
                    </div>

                    <h3 className="mb-2 text-xl font-bold text-gray-900">Xiaohongshu</h3>
                    <p className="text-gray-600 mb-4">
                      Социальная сеть и маркетплейс с уникальными товарами и модными новинками. Популярна среди молодежи
                      и ориентирована на модные тренды.
                    </p>

                    <div className="mt-auto">
                      <h4 className="font-medium text-gray-800 mb-2">Особенности:</h4>
                      <ul className="space-y-1 text-gray-600">
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1 shrink-0" />
                          <span>Модные новинки и тренды</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1 shrink-0" />
                          <span>Отзывы и обзоры от пользователей</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1 shrink-0" />
                          <span>Уникальные товары</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Step by Step Guide */}
        <section className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-br from-orange-50 to-red-50">
          <div className="container px-4 md:px-6">
            <ScrollReveal>
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
                    Пошаговое руководство по заказу из Китая
                  </h2>
                  <p className="max-w-[900px] text-gray-600 md:text-xl">
                    Следуйте этой инструкции, чтобы успешно заказать товары с китайских маркетплейсов
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <div className="mt-16 space-y-20">
              <ScrollReveal delay={0.1}>
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="w-full md:w-1/2">
                    <div className="relative aspect-video w-full max-w-[500px] mx-auto overflow-hidden rounded-3xl shadow-xl">
                      <Image src="/placeholder-ek642.png" alt="Выбор площадки и товара" fill className="object-cover" />
                    </div>
                  </div>
                  <div className="w-full md:w-1/2">
                    <div className="rounded-xl border-orange-100 bg-white p-6 shadow-lg">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-orange-500 text-white">
                        <Search className="h-6 w-6" />
                      </div>
                      <div className="mb-2 flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-white font-bold">
                          1
                        </div>
                        <h3 className="text-xl font-bold">Выбор площадки и товара</h3>
                      </div>
                      <p className="text-gray-600 mb-4">
                        Определитесь с площадкой в зависимости от типа товара, который вы хотите приобрести. Для
                        электроники подойдет JD.com, для брендовых товаров — Tmall, для уникальных товаров по низким
                        ценам — Taobao.
                      </p>

                      <h4 className="font-medium text-gray-800 mb-2">Советы:</h4>
                      <ul className="space-y-2 text-gray-600">
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                          <span>
                            Используйте переводчик для навигации по китайским сайтам (Google Translate,
                            Yandex.Translate)
                          </span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                          <span>Обращайте внимание на рейтинг продавца и отзывы о товаре</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                          <span>Сравнивайте цены на разных площадках, чтобы найти лучшее предложение</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <div className="flex flex-col md:flex-row-reverse gap-8 items-center">
                  <div className="w-full md:w-1/2">
                    <div className="relative aspect-video w-full max-w-[500px] mx-auto overflow-hidden rounded-3xl shadow-xl">
                      <Image src="/placeholder-6hauc.png" alt="Регистрация аккаунта" fill className="object-cover" />
                    </div>
                  </div>
                  <div className="w-full md:w-1/2">
                    <div className="rounded-xl border-orange-100 bg-white p-6 shadow-lg">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-orange-500 text-white">
                        <Globe className="h-6 w-6" />
                      </div>
                      <div className="mb-2 flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-white font-bold">
                          2
                        </div>
                        <h3 className="text-xl font-bold">Регистрация аккаунта</h3>
                      </div>
                      <p className="text-gray-600 mb-4">
                        Для заказа товаров вам потребуется зарегистрировать аккаунт на выбранной площадке. Процесс
                        регистрации может отличаться, но обычно требуется указать номер телефона, email и создать
                        пароль.
                      </p>

                      <h4 className="font-medium text-gray-800 mb-2">Советы:</h4>
                      <ul className="space-y-2 text-gray-600">
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                          <span>Используйте надежный пароль и сохраните его в безопасном месте</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                          <span>
                            Для некоторых площадок может потребоваться китайский номер телефона — в этом случае лучше
                            воспользоваться услугами посредника
                          </span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                          <span>Если возникают сложности с регистрацией, обратитесь к нам за помощью</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.3}>
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="w-full md:w-1/2">
                    <div className="relative aspect-video w-full max-w-[500px] mx-auto overflow-hidden rounded-3xl shadow-xl">
                      <Image
                        src="/placeholder-apure.png"
                        alt="Настройка способа оплаты"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="w-full md:w-1/2">
                    <div className="rounded-xl border-orange-100 bg-white p-6 shadow-lg">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-orange-500 text-white">
                        <CreditCard className="h-6 w-6" />
                      </div>
                      <div className="mb-2 flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-white font-bold">
                          3
                        </div>
                        <h3 className="text-xl font-bold">Настройка способа оплаты</h3>
                      </div>
                      <p className="text-gray-600 mb-4">
                        Для оплаты товаров на китайских маркетплейсах чаще всего используется Alipay. Вам потребуется
                        установить приложение Alipay и пополнить баланс в юанях.
                      </p>

                      <h4 className="font-medium text-gray-800 mb-2">Советы:</h4>
                      <ul className="space-y-2 text-gray-600">
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                          <span>Воспользуйтесь нашим сервисом для быстрого и выгодного пополнения Alipay в юанях</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                          <span>
                            Следуйте нашей{" "}
                            <Link href="/alipay-how-to-use" className="text-orange-500 hover:underline">
                              инструкции по настройке Alipay
                            </Link>
                          </span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                          <span>Пройдите верификацию в Alipay для снятия ограничений на платежи</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.4}>
                <div className="flex flex-col md:flex-row-reverse gap-8 items-center">
                  <div className="w-full md:w-1/2">
                    <div className="relative aspect-video w-full max-w-[500px] mx-auto overflow-hidden rounded-3xl shadow-xl">
                      <Image src="/placeholder-36myv.png" alt="Оформление заказа" fill className="object-cover" />
                    </div>
                  </div>
                  <div className="w-full md:w-1/2">
                    <div className="rounded-xl border-orange-100 bg-white p-6 shadow-lg">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-orange-500 text-white">
                        <ShoppingCart className="h-6 w-6" />
                      </div>
                      <div className="mb-2 flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-white font-bold">
                          4
                        </div>
                        <h3 className="text-xl font-bold">Оформление заказа</h3>
                      </div>
                      <p className="text-gray-600 mb-4">
                        После выбора товара добавьте его в корзину, выберите нужные параметры (размер, цвет, количество)
                        и перейдите к оформлению заказа. Укажите адрес доставки и выберите способ оплаты.
                      </p>

                      <h4 className="font-medium text-gray-800 mb-2">Советы:</h4>
                      <ul className="space-y-2 text-gray-600">
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                          <span>Внимательно проверьте все параметры товара перед оформлением заказа</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                          <span>Если вы заказываете через посредника, укажите адрес склада посредника в Китае</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                          <span>Сохраните номер заказа и другие данные для отслеживания</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.5}>
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="w-full md:w-1/2">
                    <div className="relative aspect-video w-full max-w-[500px] mx-auto overflow-hidden rounded-3xl shadow-xl">
                      <Image
                        src="/placeholder.svg?height=400&width=600&query=package delivery tracking app"
                        alt="Отслеживание и получение заказа"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="w-full md:w-1/2">
                    <div className="rounded-xl border-orange-100 bg-white p-6 shadow-lg">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-orange-500 text-white">
                        <Truck className="h-6 w-6" />
                      </div>
                      <div className="mb-2 flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-white font-bold">
                          5
                        </div>
                        <h3 className="text-xl font-bold">Отслеживание и получение заказа</h3>
                      </div>
                      <p className="text-gray-600 mb-4">
                        После оформления заказа вы получите трек-номер для отслеживания посылки. Отслеживайте статус
                        доставки и будьте готовы получить посылку, когда она прибудет в Россию.
                      </p>

                      <h4 className="font-medium text-gray-800 mb-2">Советы:</h4>
                      <ul className="space-y-2 text-gray-600">
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                          <span>
                            Используйте специальные сервисы для отслеживания посылок из Китая (17Track, PackageRadar)
                          </span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                          <span>
                            Будьте готовы оплатить таможенные пошлины, если стоимость заказа превышает беспошлинный
                            лимит (200 евро)
                          </span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                          <span>При получении проверьте целостность упаковки и соответствие товара заказанному</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Challenges and Solutions */}
        <section className="w-full py-16 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <ScrollReveal>
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
                    Сложности и их решения
                  </h2>
                  <p className="max-w-[900px] text-gray-600 md:text-xl">
                    Основные проблемы при заказе из Китая и способы их преодоления
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <ScrollReveal delay={0.1}>
                <div className="rounded-xl border border-orange-100 bg-white p-6 shadow-lg h-full">
                  <h3 className="text-xl font-bold mb-4">Языковой барьер</h3>
                  <div className="space-y-4">
                    <div className="bg-red-50 p-4 rounded-lg">
                      <p className="text-red-700 font-medium">Проблема:</p>
                      <p className="text-gray-700 mt-1">
                        Большинство китайских маркетплейсов имеют интерфейс только на китайском языке, что затрудняет
                        навигацию и понимание информации о товарах.
                      </p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-green-700 font-medium">Решение:</p>
                      <ul className="space-y-2 text-gray-700 mt-1">
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                          <span>
                            Используйте браузерные расширения для автоматического перевода страниц (Google Translate,
                            Yandex.Translate)
                          </span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                          <span>Установите мобильные приложения с функцией перевода текста с камеры</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                          <span>Воспользуйтесь услугами нашего баера, который свободно владеет китайским языком</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <div className="rounded-xl border border-orange-100 bg-white p-6 shadow-lg h-full">
                  <h3 className="text-xl font-bold mb-4">Оплата и финансовые вопросы</h3>
                  <div className="space-y-4">
                    <div className="bg-red-50 p-4 rounded-lg">
                      <p className="text-red-700 font-medium">Проблема:</p>
                      <p className="text-gray-700 mt-1">
                        Китайские маркетплейсы обычно не принимают российские банковские карты, а для оплаты требуется
                        Alipay с балансом в юанях.
                      </p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-green-700 font-medium">Решение:</p>
                      <ul className="space-y-2 text-gray-700 mt-1">
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                          <span>Воспользуйтесь нашим сервисом для быстрого и выгодного пополнения Alipay в юанях</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                          <span>
                            Следуйте нашей{" "}
                            <Link href="/alipay-how-to-use" className="text-orange-500 hover:underline">
                              инструкции по настройке Alipay
                            </Link>
                          </span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                          <span>Используйте услуги нашего баера для оплаты товаров напрямую продавцу</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.3}>
                <div className="rounded-xl border border-orange-100 bg-white p-6 shadow-lg h-full">
                  <h3 className="text-xl font-bold mb-4">Доставка и таможня</h3>
                  <div className="space-y-4">
                    <div className="bg-red-50 p-4 rounded-lg">
                      <p className="text-red-700 font-medium">Проблема:</p>
                      <p className="text-gray-700 mt-1">
                        Доставка из Китая может занимать длительное время, а при превышении беспошлинного лимита (200
                        евро) необходимо оплачивать таможенные пошлины.
                      </p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-green-700 font-medium">Решение:</p>
                      <ul className="space-y-2 text-gray-700 mt-1">
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                          <span>Выбирайте надежные способы доставки с трекингом (EMS, DHL, СДЭК)</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                          <span>
                            Разделите крупный заказ на несколько мелких, чтобы не превышать беспошлинный лимит
                          </span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                          <span>
                            Воспользуйтесь услугами нашего баера для консолидации посылок и оптимизации доставки
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.4}>
                <div className="rounded-xl border border-orange-100 bg-white p-6 shadow-lg h-full">
                  <h3 className="text-xl font-bold mb-4">Качество товаров</h3>
                  <div className="space-y-4">
                    <div className="bg-red-50 p-4 rounded-lg">
                      <p className="text-red-700 font-medium">Проблема:</p>
                      <p className="text-gray-700 mt-1">
                        Качество товаров может не соответствовать ожиданиям, а возврат или обмен товаров из Китая
                        затруднен из-за расстояния и языкового барьера.
                      </p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-green-700 font-medium">Решение:</p>
                      <ul className="space-y-2 text-gray-700 mt-1">
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                          <span>Выбирайте продавцов с высоким рейтингом и положительными отзывами</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                          <span>Внимательно изучайте описание товара и фотографии</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                          <span>
                            Воспользуйтесь услугами нашего баера для проверки качества товара перед отправкой в Россию
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.5}>
                <div className="rounded-xl border border-orange-100 bg-white p-6 shadow-lg h-full">
                  <h3 className="text-xl font-bold mb-4">Регистрация на площадках</h3>
                  <div className="space-y-4">
                    <div className="bg-red-50 p-4 rounded-lg">
                      <p className="text-red-700 font-medium">Проблема:</p>
                      <p className="text-gray-700 mt-1">
                        Некоторые китайские маркетплейсы требуют китайский номер телефона для регистрации или имеют
                        сложный процесс верификации аккаунта.
                      </p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-green-700 font-medium">Решение:</p>
                      <ul className="space-y-2 text-gray-700 mt-1">
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                          <span>Используйте сервисы виртуальных номеров для получения SMS-подтверждений</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                          <span>Обратитесь к нам за помощью в регистрации и верификации аккаунтов</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                          <span>
                            Воспользуйтесь услугами нашего баера, который уже имеет верифицированные аккаунты на всех
                            площадках
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.6}>
                <div className="rounded-xl border border-orange-100 bg-white p-6 shadow-lg h-full">
                  <h3 className="text-xl font-bold mb-4">Размеры и спецификации</h3>
                  <div className="space-y-4">
                    <div className="bg-red-50 p-4 rounded-lg">
                      <p className="text-red-700 font-medium">Проблема:</p>
                      <p className="text-gray-700 mt-1">
                        Китайские размеры одежды и обуви могут отличаться от российских, а технические характеристики
                        товаров могут быть указаны неточно или на китайском языке.
                      </p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-green-700 font-medium">Решение:</p>
                      <ul className="space-y-2 text-gray-700 mt-1">
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                          <span>Используйте таблицы соответствия размеров (китайские/европейские/российские)</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                          <span>Запрашивайте у продавца точные измерения товара</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                          <span>
                            Воспользуйтесь услугами нашего баера для уточнения характеристик товара у продавца
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Buyer Services CTA */}
        <section className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-br from-orange-50 to-red-50 relative overflow-hidden">
          <FloatingElements count={20} className="opacity-40" />
          <div className="container px-4 md:px-6 relative z-10">
            <ScrollReveal>
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
                    Не хотите разбираться самостоятельно?
                  </h2>
                  <p className="max-w-[900px] text-gray-600 md:text-xl">
                    Воспользуйтесь услугами нашего баера и получите профессиональную помощь на каждом этапе заказа
                    товаров из Китая
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <div className="mx-auto max-w-3xl mt-12">
              <ScrollReveal delay={0.2}>
                <div className="rounded-xl border-2 border-orange-500 bg-white p-8 shadow-xl">
                  <h3 className="text-2xl font-bold mb-6 text-center">Наши услуги баера включают:</h3>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                        <Search className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">Поиск товаров</p>
                        <p className="text-sm text-gray-600">
                          Найдем любой товар на китайских площадках по вашему запросу
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                        <ShoppingCart className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">Выкуп товаров</p>
                        <p className="text-sm text-gray-600">Выкупим товары с любой китайской площадки</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                        <Shield className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">Проверка качества</p>
                        <p className="text-sm text-gray-600">Проверим товар перед отправкой и сделаем фотографии</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                        <Truck className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">Доставка</p>
                        <p className="text-sm text-gray-600">Организуем быструю и надежную доставку в Россию</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-center">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 px-8 py-6 text-lg"
                      asChild
                    >
                      <Link href="/buyer-services">Узнать больше об услугах баера</Link>
                    </Button>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="w-full py-16 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <ScrollReveal>
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
                    Часто задаваемые вопросы
                  </h2>
                  <p className="max-w-[900px] text-gray-600 md:text-xl">
                    Ответы на популярные вопросы о заказе товаров из Китая
                  </p>
                </div>
              </div>
            </ScrollReveal>
            <div className="mx-auto max-w-3xl mt-12">
              <ScrollReveal delay={0.2}>
                <div className="rounded-xl border border-orange-100 bg-white p-6 shadow-lg">
                  <div className="space-y-4">
                    <div className="border-b border-gray-200 pb-4">
                      <h3 className="text-lg font-medium text-gray-900">
                        Сколько времени занимает доставка товаров из Китая?
                      </h3>
                      <p className="mt-2 text-gray-600">
                        Сроки доставки зависят от выбранного способа доставки и региона России. В среднем доставка
                        занимает от 15 до 30 дней. Экспресс-доставка может занять от 7 до 14 дней, но стоит дороже.
                      </p>
                    </div>

                    <div className="border-b border-gray-200 pb-4">
                      <h3 className="text-lg font-medium text-gray-900">
                        Какие таможенные пошлины нужно платить при заказе из Китая?
                      </h3>
                      <p className="mt-2 text-gray-600">
                        Беспошлинный лимит составляет 200 евро и 31 кг на одну посылку. При превышении этого лимита
                        взимается пошлина в размере 15% от суммы превышения, но не менее 2 евро за 1 кг веса в части
                        превышения.
                      </p>
                    </div>

                    <div className="border-b border-gray-200 pb-4">
                      <h3 className="text-lg font-medium text-gray-900">
                        Как оплачивать товары на китайских маркетплейсах?
                      </h3>
                      <p className="mt-2 text-gray-600">
                        Основной способ оплаты — через Alipay. Вы можете пополнить баланс Alipay в юанях через наш
                        сервис и использовать его для оплаты товаров. Также можно воспользоваться услугами нашего баера
                        для оплаты товаров.
                      </p>
                    </div>

                    <div className="border-b border-gray-200 pb-4">
                      <h3 className="text-lg font-medium text-gray-900">
                        Что делать, если товар пришел с браком или не соответствует описанию?
                      </h3>
                      <p className="mt-2 text-gray-600">
                        При получении товара внимательно проверьте его качество. Если обнаружен брак, сделайте
                        фотографии и свяжитесь с продавцом через платформу. Если вы заказывали через нашего баера, мы
                        поможем решить проблему с продавцом и организовать возврат или обмен.
                      </p>
                    </div>

                    <div className="border-b border-gray-200 pb-4">
                      <h3 className="text-lg font-medium text-gray-900">
                        Как выбрать правильный размер одежды или обуви?
                      </h3>
                      <p className="mt-2 text-gray-600">
                        Китайские размеры обычно меньше российских. Рекомендуем измерить свои параметры и сверить их с
                        таблицей размеров продавца. Если сомневаетесь, выбирайте размер больше или обратитесь к нашему
                        баеру для уточнения размеров у продавца.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Безопасно ли заказывать товары из Китая?</h3>
                      <p className="mt-2 text-gray-600">
                        При соблюдении основных правил заказ товаров из Китая безопасен. Выбирайте продавцов с высоким
                        рейтингом, читайте отзывы, используйте защищенные способы оплаты. Для дополнительной
                        безопасности рекомендуем воспользоваться услугами нашего баера, который проверит товар перед
                        отправкой.
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t bg-white py-8 md:py-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col items-center md:items-start">
              <Logo size="small" />
              <p className="mt-2 text-sm text-gray-600">ОБМЕН РУБЛЕЙ НА ЮАНИ</p>
            </div>
            <div className="flex flex-col items-center md:items-end">
              <p className="text-sm text-gray-600">© {new Date().getFullYear()} Alipayfast. Все права защищены.</p>
              <div className="mt-2 flex items-center gap-4">
                <Link href="/terms" className="text-sm text-gray-600 hover:text-orange-500 transition-colors">
                  Условия использования
                </Link>
                <Link href="/privacy" className="text-sm text-gray-600 hover:text-orange-500 transition-colors">
                  Политика конфиденциальности
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
