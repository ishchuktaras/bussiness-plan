import { Poppins, Montserrat, Inter, JetBrains_Mono } from "next/font/google"

export const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const fontHeading = Poppins({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-heading",
})

export const fontBody = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
})

