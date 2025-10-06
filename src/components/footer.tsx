'use client'

import Link from 'next/link'
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react'

export function Footer() {
  return (
    <footer className="w-full bg-gradient-to-r from-gray-800 to-gray-900 text-white py-3">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between text-xs" style={{ height: '24px' }}>

          {/* Left: Copyright & Icons8 */}
          <div className="flex items-center gap-3 text-gray-300" style={{ height: '24px' }}>
            <span className="text-gray-400">© {new Date().getFullYear()} The Pickard</span>
            <span>•</span>
            <span>Icons by <a href="https://icons8.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline">Icons8</a></span>
          </div>

          {/* Center: Connect + Icons */}
          <div className="flex items-center gap-2" style={{ height: '24px' }}>
            <span className="font-semibold text-gray-200">Connect:</span>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="flex items-center">
              <Facebook className="h-4 w-4 text-blue-500 hover:text-blue-400" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="flex items-center">
              <Twitter className="h-4 w-4 text-sky-400 hover:text-sky-300" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="flex items-center">
              <Instagram className="h-4 w-4 text-pink-500 hover:text-pink-400" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="flex items-center">
              <Youtube className="h-4 w-4 text-red-500 hover:text-red-400" />
            </a>
            <a href="mailto:contact@thepickard.com" aria-label="Email" className="flex items-center">
              <Mail className="h-4 w-4 text-green-400 hover:text-green-300" />
            </a>
            <a href="tel:+1234567890" aria-label="Phone" className="flex items-center">
              <Phone className="h-4 w-4 text-orange-400 hover:text-orange-300" />
            </a>
            <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" aria-label="Location" className="flex items-center">
              <MapPin className="h-4 w-4 text-purple-400 hover:text-purple-300" />
            </a>
          </div>

          {/* Right: Links */}
          <div className="flex items-center gap-4 text-gray-300" style={{ height: '24px' }}>
            <Link href="/contact" className="hover:text-white flex items-center">Contact</Link>
            <Link href="/about" className="hover:text-white flex items-center">About</Link>
            <Link href="/privacy" className="hover:text-white flex items-center">Privacy</Link>
            <Link href="/terms" className="hover:text-white flex items-center">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
