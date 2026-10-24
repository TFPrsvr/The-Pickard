'use client'

import { UserButton, useUser } from '@clerk/nextjs'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
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
      <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-6">
        <div className="flex h-12 items-center justify-between gap-4">

          {/* Left: Hamburger + Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex items-center justify-center p-1 text-gray-600 hover:text-gray-900 active:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-colors rounded"
              aria-label="Open navigation menu"
              aria-expanded={mounted ? isMobileMenuOpen : false}
              aria-controls="mobile-navigation-menu"
            >
              {mounted && isMobileMenuOpen
                ? <X className="h-4 w-4" aria-hidden="true" />
                : <Menu className="h-4 w-4" aria-hidden="true" />
              }
            </button>
            <Link href="/" className="inline-flex items-center text-xl font-semibold text-gray-700 hover:text-blue-600 transition-colors tracking-wide leading-none" aria-label="The Mechanic - Home">
              The Mechanic
            </Link>
          </div>

          {/* Right: User Section */}
          <div className="flex items-center">
            {isSignedIn ? (
              <div className="flex items-center gap-3">
                <span className="hidden sm:block text-[10px] text-muted-foreground">
                  Welcome, {user?.firstName || user?.username || 'User'}!
                </span>
                <UserButton afterSignOutUrl="/" />
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link href="/sign-in" className="hidden sm:block text-[11px] font-medium text-muted-foreground hover:text-foreground active:text-blue-600 transition-colors">
                  Sign In
                </Link>
                <Link href="/sign-up" className="text-[11px] font-semibold text-blue-600 hover:text-blue-800 active:text-blue-900 transition-colors">
                  Sign Up
                </Link>
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
            className={`fixed top-0 left-0 h-full w-36 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-[9999] flex flex-col ${
              isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
            role="dialog"
            aria-label="Navigation menu"
          >
        <div className="p-1.5">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-semibold text-gray-900 ml-8">Menu</h2>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-1.5 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 flex items-center justify-center"
              aria-label="Close navigation menu"
            >
              <X className="h-3 w-3" aria-hidden="true" />
            </button>
          </div>
        </div>

        <nav className="px-3 py-1 space-y-1 flex-1 overflow-y-auto" aria-label="Main navigation">
          <MobileNavLink href="/" icon={<i className="fi fi-rr-home text-xs leading-none" aria-hidden="true" />} onClick={() => setIsMobileMenuOpen(false)}>
            Home
          </MobileNavLink>

          {/* Vehicle Types Expandable Section */}
          <div className="space-y-1">
            <div className="flex items-stretch rounded-md hover:bg-gray-100 transition-colors">
              <Link
                href="/search-by-category"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex-1 flex items-center space-x-2 px-2 py-2 text-[10px] font-medium text-gray-900 hover:text-blue-600"
                aria-label="Search by vehicle category"
              >
                <div className="text-blue-600">
                  <i className="fi fi-rr-car-alt text-xs leading-none" aria-hidden="true" />
                </div>
                <span>Vehicle Types</span>
              </Link>
              <button
                onClick={() => setVehicleTypesExpanded(!vehicleTypesExpanded)}
                className="px-2 py-2 text-gray-400 hover:text-gray-600 flex items-center"
                aria-expanded={vehicleTypesExpanded}
                aria-controls="vehicle-types-submenu"
                aria-label="Toggle vehicle categories"
              >
                {vehicleTypesExpanded ? (
                  <i className="fi fi-tr-angle-down text-xs leading-none" aria-hidden="true" />
                ) : (
                  <i className="fi fi-tr-angle-right text-xs leading-none" aria-hidden="true" />
                )}
              </button>
            </div>

            {vehicleTypesExpanded && (
              <div id="vehicle-types-submenu" className="ml-2 space-y-0.5 pl-3 border-l border-gray-200" role="group" aria-label="Vehicle categories">
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

          <MobileNavLink href="/search" icon={<i className="fi fi-rr-search text-xs leading-none" aria-hidden="true" />} onClick={() => setIsMobileMenuOpen(false)}>
            Problem Finder
          </MobileNavLink>
          <MobileNavLink href="/parts" icon={<i className="fi fi-rr-database text-xs leading-none" aria-hidden="true" />} onClick={() => setIsMobileMenuOpen(false)}>
            Parts Database
          </MobileNavLink>
          <MobileNavLink href="/problems" icon={<i className="fi fi-rr-wrench text-xs leading-none" aria-hidden="true" />} onClick={() => setIsMobileMenuOpen(false)}>
            Problems & Solutions
          </MobileNavLink>
          <MobileNavLink href="/tips" icon={<i className="fi fi-rr-bulb text-xs leading-none" aria-hidden="true" />} onClick={() => setIsMobileMenuOpen(false)}>
            Expert Tips
          </MobileNavLink>
          <MobileNavLink href="/guides" icon={<i className="fi fi-rr-book-alt text-xs leading-none" aria-hidden="true" />} onClick={() => setIsMobileMenuOpen(false)}>
            How-to Guides
          </MobileNavLink>
          <MobileNavLink href="/diagrams" icon={<i className="fi fi-rr-bolt text-xs leading-none" aria-hidden="true" />} onClick={() => setIsMobileMenuOpen(false)}>
            Wiring Diagrams
          </MobileNavLink>
          <MobileNavLink href="/pinterest" icon={<i className="fi fi-rr-heart text-xs leading-none text-red-500" aria-hidden="true" />} onClick={() => setIsMobileMenuOpen(false)}>
            Pinterest Library
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
      className="flex items-center space-x-2 rounded-md px-2 py-2 text-[10px] font-medium text-gray-900 transition-colors hover:bg-gray-100 hover:text-blue-600"
    >
      {icon && (
        <div className="text-blue-600">
          {icon}
        </div>
      )}
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