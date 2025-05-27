"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface NavigationItem {
  label: string
  href: string
  isExternal?: boolean
}

const navigationItems: NavigationItem[] = [
  { label: "Главная", href: "/#hero" },
  { label: "Калькулятор пополнения", href: "/#calculator" },
  { label: "Услуги баера", href: "/buyer-services", isExternal: true },
  { label: "Как пользоваться Alipay", href: "/alipay-how-to-use", isExternal: true },
  { label: "Как заказывать с Пойзон (Poizon)", href: "/how-to-order-poizon", isExternal: true },
  { label: "Наш офис", href: "/#office" },
  { label: "Отзывы", href: "/#testimonials" },
  { label: "FAQ", href: "/#faq" },
]

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  // Закрываем мобильное меню при изменении маршрута
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  const handleNavigation = (href: string, isExternal?: boolean) => {
    try {
      setIsMobileMenuOpen(false)

      if (isExternal) {
        // Для внешних страниц просто переходим
        router.push(href)
      } else if (href.startsWith("/#")) {
        // Для якорных ссылок
        const sectionId = href.substring(2) // убираем /#

        if (pathname === "/") {
          // Если мы на главной странице, просто скроллим
          const element = document.getElementById(sectionId)
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" })
          }
        } else {
          // Если мы на другой странице, переходим на главную с якорем
          router.push(href)
        }
      } else {
        router.push(href)
      }
    } catch (error) {
      console.error("Navigation error:", error)
    }
  }

  // Специальная обработка для "Как это работает"
  const handleHowItWorksClick = () => {
    try {
      setIsMobileMenuOpen(false)

      if (pathname === "/buyer-services") {
        // Если на странице услуг баера, скроллим к секции процесса
        const processSection = document.getElementById("process")
        if (processSection) {
          processSection.scrollIntoView({ behavior: "smooth", block: "start" })
        }
      } else if (pathname === "/") {
        // Если на главной странице, скроллим к секции "как это работает"
        const howItWorksSection = document.getElementById("how-it-works")
        if (howItWorksSection) {
          howItWorksSection.scrollIntoView({ behavior: "smooth", block: "start" })
        }
      } else {
        // Если на другой странице, переходим на главную к секции "как это работает"
        router.push("/#how-it-works")
      }
    } catch (error) {
      console.error("How it works navigation error:", error)
    }
  }

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-8">
        {navigationItems.map((item) => {
          if (item.label === "Как это работает") {
            return (
              <button
                key={item.href}
                onClick={handleHowItWorksClick}
                className="text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors cursor-pointer"
              >
                {item.label}
              </button>
            )
          }

          return (
            <button
              key={item.href}
              onClick={() => handleNavigation(item.href, item.isExternal)}
              className="text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors cursor-pointer"
            >
              {item.label}
            </button>
          )
        })}
      </nav>

      {/* Mobile Menu Button */}
      <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
        {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 bg-white border-b shadow-lg md:hidden z-50"
          >
            <nav className="container py-4">
              <div className="flex flex-col gap-4">
                {navigationItems.map((item) => {
                  if (item.label === "Как это работает") {
                    return (
                      <button
                        key={item.href}
                        onClick={handleHowItWorksClick}
                        className="text-left text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors py-2 cursor-pointer"
                      >
                        {item.label}
                      </button>
                    )
                  }

                  return (
                    <button
                      key={item.href}
                      onClick={() => handleNavigation(item.href, item.isExternal)}
                      className="text-left text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors py-2 cursor-pointer"
                    >
                      {item.label}
                    </button>
                  )
                })}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
