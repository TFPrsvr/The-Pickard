import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { Navbar } from '@/components/navbar'
import { BottomNavigation, TopTabNavigation } from '@/components/bottom-navigation'
import { Footer } from '@/components/footer'
import Image from 'next/image'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'The Pickard - Mechanics Database',
  description: 'Comprehensive automotive database for mechanics, covering cars, trucks, and 18-wheelers',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} antialiased`} suppressHydrationWarning>
          <div className="relative z-10">
            <Navbar />
            <main id="main-content" className="min-h-screen bg-background/80 backdrop-blur-sm px-4 sm:px-6 lg:px-8 pb-20 md:pb-8">
              <div className="mx-auto max-w-7xl">
                {children}
              </div>
            </main>
            <Footer />
            <BottomNavigation />
          </div>
        </body>
      </html>
    </ClerkProvider>
  )
}