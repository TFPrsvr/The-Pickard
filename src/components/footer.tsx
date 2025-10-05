'use client'

import Link from 'next/link'
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-4">
      <div className="container mx-auto px-4">
        {/* Single Row Layout */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          {/* Left - Icons8 Attribution & Copyright */}
          <div className="flex flex-col md:flex-row items-center gap-2 text-xs text-gray-300">
            <span>
              Icons by{' '}
              <a
                href="https://icons8.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 underline"
              >
                Icons8
              </a>
            </span>
            <span className="hidden md:inline">•</span>
            <span className="text-gray-400">
              © {new Date().getFullYear()} The Pickard
            </span>
          </div>

          {/* Center - Connect With Us */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-gray-200">Connect:</span>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
              aria-label="Facebook"
            >
              <Facebook className="h-5 w-5 text-blue-500 hover:text-blue-400" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5 text-sky-400 hover:text-sky-300" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5 text-pink-500 hover:text-pink-400" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
              aria-label="YouTube"
            >
              <Youtube className="h-5 w-5 text-red-500 hover:text-red-400" />
            </a>
            <a
              href="mailto:contact@thepickard.com"
              className="hover:scale-110 transition-transform"
              aria-label="Email"
            >
              <Mail className="h-5 w-5 text-green-400 hover:text-green-300" />
            </a>
            <a
              href="tel:+1234567890"
              className="hover:scale-110 transition-transform"
              aria-label="Phone"
            >
              <Phone className="h-5 w-5 text-orange-400 hover:text-orange-300" />
            </a>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
              aria-label="Location"
            >
              <MapPin className="h-5 w-5 text-purple-400 hover:text-purple-300" />
            </a>
          </div>

          {/* Right - Links */}
          <div className="flex items-center gap-4 text-xs">
            <Link
              href="/contact"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Contact
            </Link>
            <Link
              href="/about"
              className="text-gray-300 hover:text-white transition-colors"
            >
              About
            </Link>
            <Link
              href="/privacy"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
