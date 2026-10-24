'use client'

import Link from 'next/link'
import { Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="w-full bg-gradient-to-r from-gray-800 to-gray-900 text-white py-2">
      <div className="max-w-6xl mx-auto px-2">
        <div className="flex items-center justify-between text-[10px] h-5">

          {/* Left: Copyright & Attribution */}
          <div className="flex items-center gap-1.5 text-gray-300">
            <span className="text-gray-400">© {new Date().getFullYear()} The Mechanic</span>
            <span>•</span>
            <span>Uicons by <a href="https://www.flaticon.com/uicons" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 active:text-blue-200 underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400">Flaticon</a></span>
          </div>

          {/* Center: Connect + Icons */}
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-gray-200 mr-1.5">Connect:</span>
            <a href="mailto:contact@themechanic.com" aria-label="Email" className="flex items-center opacity-80 hover:opacity-100 active:opacity-60 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white rounded-sm">
              <Mail className="h-3 w-3 text-green-400" />
            </a>
            <a href="tel:+1234567890" aria-label="Phone" className="flex items-center opacity-80 hover:opacity-100 active:opacity-60 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white rounded-sm">
              <Phone className="h-3 w-3 text-sky-400" />
            </a>
            <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" aria-label="Location" className="flex items-center opacity-80 hover:opacity-100 active:opacity-60 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white rounded-sm">
              <MapPin className="h-3 w-3 text-purple-400" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="flex items-center opacity-80 hover:opacity-100 active:opacity-60 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white rounded-sm">
              <i className="fi fi-brands-youtube text-red-500 text-xs" aria-hidden="true" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="flex items-center opacity-80 hover:opacity-100 active:opacity-60 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white rounded-sm">
              <i className="fi fi-brands-facebook text-blue-400 text-xs" aria-hidden="true" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter / X" className="flex items-center opacity-80 hover:opacity-100 active:opacity-60 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white rounded-sm">
              <i className="fi fi-brands-twitter text-sky-400 text-xs" aria-hidden="true" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="flex items-center opacity-80 hover:opacity-100 active:opacity-60 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white rounded-sm">
              <i className="fi fi-brands-instagram text-pink-400 text-xs" aria-hidden="true" />
            </a>
          </div>

          {/* Right: Links */}
          <div className="flex items-center gap-2 text-gray-300">
            <Link href="/contact" className="flex items-center hover:text-white active:text-gray-200 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white rounded-sm">Contact</Link>
            <Link href="/about" className="flex items-center hover:text-white active:text-gray-200 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white rounded-sm">About</Link>
            <Link href="/privacy" className="flex items-center hover:text-white active:text-gray-200 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white rounded-sm">Privacy</Link>
            <Link href="/terms" className="flex items-center hover:text-white active:text-gray-200 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white rounded-sm">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
