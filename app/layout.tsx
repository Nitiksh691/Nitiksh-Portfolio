import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
})

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["italic", "normal"],
})

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Nitiksh | Developer Portfolio & Blog",
  description: "Full-stack developer sharing insights on React, TypeScript, Next.js, and modern web development.",
  generator: 'v0.app'
}

import { ThemeProvider } from "@/components/ThemeProvider"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} ${jetbrainsMono.variable} antialiased selection:bg-zinc-200 selection:text-zinc-900 font-sans`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
