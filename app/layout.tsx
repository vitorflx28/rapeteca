import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Rapeteca Day | 18 de Abril de 2026",
  description: "Contagem regressiva para o Rapeteca Day",
  openGraph: {
    title: "Rapeteca Day | 18 de Abril de 2026",
    description: "Contagem regressiva para o Rapeteca Day",
    type: "website",
    locale: "pt_BR",
    images: [
      {
        url: "/opengraph-image.jpg",
        width: 1200,
        height: 1200,
        alt: "Rapeteca Day",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rapeteca Day | 18 de Abril de 2026",
    description: "Contagem regressiva para o Rapeteca Day",
    images: ["/opengraph-image.jpg"],
  },
  icons: {
    icon: "/opengraph-image.jpg",
    apple: "/opengraph-image.jpg",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={playfair.variable}>
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
