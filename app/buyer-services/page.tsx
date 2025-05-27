"use client"

import { useState } from "react"
import Link from "next/link"
import { Logo } from "@/components/logo-component"
import { BuyerServicesHero } from "@/components/buyer-services/hero"
import { BuyerServicesProcess } from "@/components/buyer-services/process"
import { BuyerServicesPricing } from "@/components/buyer-services/pricing"
import { BuyerServicesFaq } from "@/components/buyer-services/faq"
import { BuyerServicesContactForm } from "@/components/buyer-services/contact-form"
import { BuyerServicesPlatforms } from "@/components/buyer-services/platforms"
import { BuyerServicesAdvantages } from "@/components/buyer-services/advantages"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { FloatingElements } from "@/components/ui/floating-elements"
import { useToast } from "@/components/ui/use-toast"
import { SiteHeader } from "@/components/site-header"

export default function BuyerServicesPage() {
  const { toast } = useToast()
  const [isContactFormOpen, setIsContactFormOpen] = useState(false)

  const scrollToContactForm = () => {
    setIsContactFormOpen(true)
    // Прокручиваем к форме контактов
    const contactSection = document.getElementById("contact")
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" })
    }

    // Показываем уведомление
    toast({
      title: "Форма заявки открыта",
      description: "Пожалуйста, заполните форму ниже",
    })
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Header */}
      <SiteHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <BuyerServicesHero onOpenContactForm={scrollToContactForm} />

        {/* Advantages Section */}
        <BuyerServicesAdvantages />

        {/* Process Section */}
        <section id="process">
          <BuyerServicesProcess />
        </section>

        {/* Platforms Section */}
        <BuyerServicesPlatforms />

        {/* Pricing Section */}
        <BuyerServicesPricing />

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
                    Ответы на самые распространенные вопросы о наших услугах баера.
                  </p>
                </div>
              </div>
            </ScrollReveal>
            <div className="mx-auto max-w-3xl mt-12">
              <ScrollReveal delay={0.2}>
                <div className="rounded-xl border border-orange-100 bg-white p-6 shadow-lg">
                  <BuyerServicesFaq />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section
          id="contact"
          className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-br from-orange-50 to-red-50 relative overflow-hidden"
        >
          <FloatingElements count={20} className="opacity-40" />
          <div className="container px-4 md:px-6 relative z-10">
            <ScrollReveal>
              <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
                    Заказать услуги баера
                  </h2>
                  <p className="max-w-[900px] text-gray-600 md:text-xl">
                    Заполните форму, и мы свяжемся с вами для обсуждения деталей заказа.
                  </p>
                </div>
              </div>
            </ScrollReveal>
            <div className="mx-auto max-w-3xl">
              <BuyerServicesContactForm isOpen={isContactFormOpen} />
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
              <p className="mt-2 text-sm text-gray-600">
                перевод юаней в рубли, пополняем Alipay из России без зарубежной карты
              </p>
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
