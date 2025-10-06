'use client'

import { UserButton, useUser } from '@clerk/nextjs'
import Link from 'next/link'
import Image from 'next/image'
import { Car, Database, Settings, BookOpen, FileText, Zap, Menu, X, Info, MessageSquare, Home, Heart, ChevronDown, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { createPortal } from 'react-dom'
import { useEffect } from 'react'
import PropTypes from 'prop-types'

export function Navbar() {
  const { isSignedIn, user } = useUser()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [vehicleTypesExpanded, setVehicleTypesExpanded] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 relative" aria-label="Main">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Left: Hamburger Menu */}
          <div className="flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
              aria-label="Open navigation menu"
              aria-expanded={mounted ? isMobileMenuOpen : false}
              aria-controls="mobile-navigation-menu"
            >
              {mounted && isMobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>

          {/* Center: Logo */}
          <div className="flex-1 flex justify-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/the-pickard-logo.png"
                alt="The Pickard"
                width={800}
                height={180}
                className="h-16 w-auto max-w-md opacity-90 contrast-125"
                priority
              />
            </Link>
          </div>

          {/* Right: User Section */}
          <div className="flex items-center">
            {isSignedIn ? (
              <div className="flex items-center space-x-3">
                <span className="hidden sm:block text-sm text-muted-foreground">
                  Welcome, {user?.firstName || user?.username || 'User'}!
                </span>
                <UserButton afterSignOutUrl="/" />
              </div>
            ) : (
              <div className="space-x-2">
                <Button variant="ghost" asChild className="hidden sm:inline-flex">
                  <Link href="/sign-in">Sign In</Link>
                </Button>
                <Button asChild>
                  <Link href="/sign-up">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Slide-out Menu Portal */}
      {mounted && createPortal(
        <>
          <div
            id="mobile-navigation-menu"
            className={`fixed top-0 left-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-[9999] flex flex-col ${
              isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
            role="dialog"
            aria-label="Navigation menu"
          >
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
              aria-label="Close navigation menu"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <nav className="px-6 py-4 space-y-4 flex-1 overflow-y-auto" aria-label="Main navigation">
          <MobileNavLink href="/" icon={<Home className="h-6 w-6" />} onClick={() => setIsMobileMenuOpen(false)}>
            Home
          </MobileNavLink>

          {/* Vehicle Types Expandable Section */}
          <div className="space-y-2">
            <button
              onClick={() => setVehicleTypesExpanded(!vehicleTypesExpanded)}
              className="w-full flex items-center justify-between rounded-lg px-4 py-3 text-base font-medium text-gray-900 transition-colors hover:bg-gray-100"
              aria-expanded={vehicleTypesExpanded}
              aria-controls="vehicle-types-submenu"
              aria-label="Vehicle types menu"
            >
              <div className="flex items-center space-x-4">
                <div className="text-blue-600">
                  <Car className="h-6 w-6" aria-hidden="true" />
                </div>
                <span>Vehicle Types</span>
              </div>
              {vehicleTypesExpanded ? (
                <ChevronDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
              ) : (
                <ChevronRight className="h-5 w-5 text-gray-400" aria-hidden="true" />
              )}
            </button>

            {vehicleTypesExpanded && (
              <div id="vehicle-types-submenu" className="ml-4 space-y-1 pl-6 border-l-2 border-gray-200" role="group" aria-label="Vehicle categories">
                <MobileNavLink href="/search-by-category?category=car" onClick={() => setIsMobileMenuOpen(false)} icon={null}>
                  🚗 Cars
                </MobileNavLink>
                <MobileNavLink href="/search-by-category?category=truck" onClick={() => setIsMobileMenuOpen(false)} icon={null}>
                  🚚 Trucks
                </MobileNavLink>
                <MobileNavLink href="/search-by-category?category=18-wheeler" onClick={() => setIsMobileMenuOpen(false)} icon={null}>
                  🚛 18-Wheelers
                </MobileNavLink>
                <MobileNavLink href="/search-by-category?category=motorcycle" onClick={() => setIsMobileMenuOpen(false)} icon={null}>
                  🏍️ Motorcycles
                </MobileNavLink>
                <MobileNavLink href="/search-by-category?category=atv" onClick={() => setIsMobileMenuOpen(false)} icon={null}>
                  🏁 ATVs
                </MobileNavLink>
                <MobileNavLink href="/search-by-category?category=utv" onClick={() => setIsMobileMenuOpen(false)} icon={null}>
                  🚜 UTVs
                </MobileNavLink>
                <MobileNavLink href="/search-by-category?category=snowmobile" onClick={() => setIsMobileMenuOpen(false)} icon={null}>
                  🏔️ Snowmobiles
                </MobileNavLink>
                <MobileNavLink href="/search-by-category?category=watercraft" onClick={() => setIsMobileMenuOpen(false)} icon={null}>
                  🚤 Watercraft
                </MobileNavLink>
                <MobileNavLink href="/search-by-category?category=rv" onClick={() => setIsMobileMenuOpen(false)} icon={null}>
                  🏕️ RVs
                </MobileNavLink>
              </div>
            )}
          </div>

          <MobileNavLink href="/search" icon={<Car className="h-6 w-6" />} onClick={() => setIsMobileMenuOpen(false)}>
            Problem Finder
          </MobileNavLink>
          <MobileNavLink href="/parts" icon={<Database className="h-6 w-6" />} onClick={() => setIsMobileMenuOpen(false)}>
            Parts Database
          </MobileNavLink>
          <MobileNavLink href="/problems" icon={<Settings className="h-6 w-6" />} onClick={() => setIsMobileMenuOpen(false)}>
            Problems & Solutions
          </MobileNavLink>
          <MobileNavLink href="/tips" icon={<BookOpen className="h-6 w-6" />} onClick={() => setIsMobileMenuOpen(false)}>
            Expert Tips
          </MobileNavLink>
          <MobileNavLink href="/guides" icon={<FileText className="h-6 w-6" />} onClick={() => setIsMobileMenuOpen(false)}>
            How-to Guides
          </MobileNavLink>
          <MobileNavLink href="/diagrams" icon={<Zap className="h-6 w-6" />} onClick={() => setIsMobileMenuOpen(false)}>
            Wiring Diagrams
          </MobileNavLink>
          <MobileNavLink href="/pinterest" icon={<Heart className="h-6 w-6 text-red-500 fill-current" />} onClick={() => setIsMobileMenuOpen(false)}>
            Pinterest Library
          </MobileNavLink>
          <MobileNavLink href="/about" icon={<Info className="h-6 w-6" />} onClick={() => setIsMobileMenuOpen(false)}>
            About Us
          </MobileNavLink>
          <MobileNavLink href="/contact" icon={<Image src="/images/icons8-share.svg" alt="Contact" width={24} height={24} />} onClick={() => setIsMobileMenuOpen(false)}>
            Contact Us
          </MobileNavLink>
        </nav>
          </div>

          {/* Overlay */}
          {isMobileMenuOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-[9998]"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-hidden="true"
            />
          )}
        </>,
        document.body
      )}
    </nav>
  )
}

interface NavLinkProps {
  href: string
  children: React.ReactNode
  icon?: React.ReactNode
}

function NavLink({ href, children, icon }: NavLinkProps) {
  return (
    <Link
      href={href}
      className="flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
    >
      {icon}
      <span>{children}</span>
    </Link>
  )
}

interface MobileNavLinkProps {
  href: string
  children: React.ReactNode
  icon?: React.ReactNode
  onClick?: () => void
}

function MobileNavLink({ href, children, icon, onClick }: MobileNavLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center space-x-4 rounded-lg px-4 py-3 text-base font-medium text-gray-900 transition-colors hover:bg-gray-100 hover:text-blue-600"
    >
      <div className="text-blue-600">
        {icon}
      </div>
      <span>{children}</span>
    </Link>
  )
}

NavLink.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  icon: PropTypes.node,
}

MobileNavLink.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  icon: PropTypes.node,
  onClick: PropTypes.func,
}