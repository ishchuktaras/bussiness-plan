import { Fira_Mono } from "next/font/google"
import { Inter } from "next/font/google"
import { Poppins } from "next/font/google"

export const fontSans = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
})

export const fontMono = Fira_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-mono",
})

export const fontHeading = Poppins({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-heading",
})

export const fontBody = Poppins({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-body",
})
export const fontCode = Inter({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-code",
})