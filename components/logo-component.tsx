import Image from "next/image"
import Link from "next/link"

interface LogoProps {
  size?: "small" | "medium" | "large"
}

export function Logo({ size = "medium" }: LogoProps) {
  // Определяем размеры в зависимости от параметра size
  const dimensions = {
    small: { height: 8, width: 120 },
    medium: { height: 10, width: 150 },
    large: { height: 12, width: 180 },
  }

  const { height, width } = dimensions[size]

  return (
    <Link href="/" className="flex items-center">
      <Image
        src="/logo.png"
        alt="Alipayfast Logo"
        width={width}
        height={Math.floor(width / 3.5)} // Поддерживаем пропорции
        className={`h-${height} w-auto object-contain drop-shadow-md hover:drop-shadow-lg transition-all duration-300`}
        priority={size === "large"}
      />
    </Link>
  )
}
