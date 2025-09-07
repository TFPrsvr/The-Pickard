'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Home, 
  Search, 
  Database, 
  Wrench, 
  Lightbulb, 
  FileText, 
  Zap,
  User,
  Settings
} from 'lucide-react'
import { cn } from '@/lib/utils'
import PropTypes from 'prop-types'

const navigationItems = [
  {
    name: 'Home',
    href: '/',
    icon: Home,
    activeColor: 'text-primary'
  },
  {
    name: 'Diagnostic',
    href: '/search',
    icon: Search,
    activeColor: 'text-primary'
  },
  {
    name: 'Problems',
    href: '/problems',
    icon: Wrench,
    activeColor: 'text-primary'
  },
  {
    name: 'Parts',
    href: '/parts',
    icon: Database,
    activeColor: 'text-primary'
  },
  {
    name: 'Profile',
    href: '/profile',
    icon: User,
    activeColor: 'text-primary'
  }
]

export function BottomNavigation() {
  const pathname = usePathname()

  return (
    <>
      {/* Spacer to prevent content from being hidden behind fixed nav */}
      <div className="h-20 md:hidden"></div>
      
      {/* Bottom Navigation - Mobile Only */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-border md:hidden">
        <div className="grid grid-cols-5 h-16">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center py-2 transition-colors",
                  "active:scale-95 active:bg-muted/50",
                  isActive ? item.activeColor : "text-muted-foreground"
                )}
              >
                <Icon className={cn("h-5 w-5 mb-1", isActive && "scale-110")} />
                <span className={cn(
                  "text-xs font-medium",
                  isActive && "font-semibold"
                )}>
                  {item.name}
                </span>
                {isActive && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-primary rounded-b-full"></div>
                )}
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Floating Action Button */}
      <FloatingActionButton />
    </>
  )
}

function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false)

  const quickActions = [
    { name: 'Scan Code', icon: Search, action: () => window.location.href = '/search' },
    { name: 'Find Parts', icon: Database, action: () => window.location.href = '/parts' },
    { name: 'Get Help', icon: Lightbulb, action: () => window.location.href = '/guides' },
  ]

  return (
    <div className="fixed bottom-20 right-4 z-50 md:hidden">
      {/* Quick Actions */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 space-y-3">
          {quickActions.map((action, index) => (
            <button
              key={action.name}
              onClick={action.action}
              className="flex items-center gap-3 bg-secondary text-white px-4 py-3 rounded-l-full rounded-r-full shadow-lg transform transition-all duration-300 hover:scale-105"
              style={{
                animationDelay: `${index * 50}ms`,
                animation: 'slideInRight 0.3s ease-out forwards'
              }}
            >
              <action.icon className="h-5 w-5" />
              <span className="text-sm font-medium whitespace-nowrap">{action.name}</span>
            </button>
          ))}
        </div>
      )}

      {/* Main FAB */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-14 h-14 bg-primary text-white rounded-full shadow-lg",
          "flex items-center justify-center transition-all duration-300",
          "hover:scale-110 active:scale-95",
          isOpen && "rotate-45 bg-red-500"
        )}
        aria-label={isOpen ? "Close quick actions" : "Open quick actions"}
      >
        <Zap className={cn("h-6 w-6 transition-transform", isOpen && "rotate-45")} />
      </button>
    </div>
  )
}

// Top Tab Navigation for larger screens
export function TopTabNavigation() {
  const pathname = usePathname()

  const tabItems = [
    { name: 'Diagnostic', href: '/search', icon: Search },
    { name: 'Problems', href: '/problems', icon: Wrench },
    { name: 'Parts Database', href: '/parts', icon: Database },
    { name: 'Tips', href: '/tips', icon: Lightbulb },
    { name: 'Guides', href: '/guides', icon: FileText },
    { name: 'Diagrams', href: '/diagrams', icon: Zap },
  ]

  return (
    <nav className="hidden md:block border-b border-border bg-background/95 backdrop-blur sticky top-16 z-40">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center space-x-8 overflow-x-auto">
          {tabItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 px-4 py-4 border-b-2 transition-colors whitespace-nowrap",
                  "hover:text-primary hover:border-primary/50",
                  isActive 
                    ? "text-primary border-primary font-medium" 
                    : "text-muted-foreground border-transparent"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.name}
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}

BottomNavigation.propTypes = {}
TopTabNavigation.propTypes = {}

// Add the slide-in animation to global CSS
if (typeof document !== 'undefined') {
  const style = document.createElement('style')
  style.textContent = `
    @keyframes slideInRight {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
  `
  document.head.appendChild(style)
}