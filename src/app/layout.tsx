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
  title: 'The Pickard - Professional Automotive Mechanics Database',
  description: 'Professional automotive diagnostics and repair database for mechanics and technicians. Search vehicle problems, find interchangeable parts, access expert tips, and collaborate with fellow mechanics. Comprehensive coverage for cars, trucks, 18-wheelers, motorcycles, ATVs, UTVs, snowmobiles, watercraft, and RVs.',
  keywords: ['automotive', 'mechanics', 'diagnostics', 'repair', 'parts database', 'vehicle troubleshooting', 'auto repair', 'mechanic tools'],
  authors: [{ name: 'The Pickard Team' }],
  openGraph: {
    title: 'The Pickard - Automotive Mechanics Database',
    description: 'Professional automotive diagnostics and repair database for mechanics',
    type: 'website',
    locale: 'en_US',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" className="h-full">
        <body className={`${inter.className} antialiased h-full flex flex-col`} suppressHydrationWarning>
          <div className="relative z-10 flex-1 flex flex-col">
            <Navbar />
            <main id="main-content" className="flex-1 bg-background pb-4 md:pb-2">
              <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
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