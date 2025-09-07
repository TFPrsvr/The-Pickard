'use client'

import { UserButton, useUser } from '@clerk/nextjs'
import Link from 'next/link'
import Image from 'next/image'
import { Search, Database, Wrench, Lightbulb, FileText, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import PropTypes from 'prop-types'

export function Navbar() {
  const { isSignedIn, user } = useUser()

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/images/the-pickard-logo.png"
                alt="The Pickard"
                width={400}
                height={120}
                className="h-16 w-auto opacity-90 contrast-125"
                priority
              />
            </Link>
          </div>

          {isSignedIn && (
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <NavLink href="/search" icon={<Search className="h-4 w-4" />}>
                  Diagnostic Center
                </NavLink>
                <NavLink href="/parts" icon={<Database className="h-4 w-4" />}>
                  Parts Database
                </NavLink>
                <NavLink href="/problems" icon={<Wrench className="h-4 w-4" />}>
                  Problems
                </NavLink>
                <NavLink href="/tips" icon={<Lightbulb className="h-4 w-4" />}>
                  Tips
                </NavLink>
                <NavLink href="/guides" icon={<FileText className="h-4 w-4" />}>
                  How-to Guides
                </NavLink>
                <NavLink href="/diagrams" icon={<Zap className="h-4 w-4" />}>
                  Diagrams
                </NavLink>
              </div>
            </div>
          )}

          <div className="flex items-center space-x-4">
            {isSignedIn ? (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-muted-foreground">
                  Welcome, {user?.firstName}!
                </span>
                <UserButton afterSignOutUrl="/" />
              </div>
            ) : (
              <div className="space-x-2">
                <Button variant="ghost" asChild>
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

NavLink.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  icon: PropTypes.node,
}