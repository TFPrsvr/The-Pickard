'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ExternalLink, Heart, Bookmark, Eye } from 'lucide-react'
import Link from 'next/link'

export function PinterestReferenceSection() {
  return (
    <section className="py-2 mb-1 bg-gradient-to-r from-purple-50 to-pink-50 rounded-md">
      <div className="mx-auto px-3">
        <div className="text-center mb-2">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
              <Heart className="h-3 w-3 text-white fill-current" />
            </div>
            <h2 className="text-sm font-bold text-gray-800">Pinterest Reference Library</h2>
          </div>
          <p className="text-xs text-gray-600 max-w-xl mx-auto leading-relaxed">
            Access curated automotive resources and repair guides from our Pinterest collection.
            Real-world solutions from automotive professionals and experts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3 max-w-3xl mx-auto">
          <Card className="shadow-md border-0 hover:shadow-lg transition-shadow bg-gradient-to-br from-blue-600 to-blue-700">
            <CardHeader className="text-center p-2">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-1.5">
                <Bookmark className="h-4 w-4 text-white" />
              </div>
              <CardTitle className="text-xs text-white">Diagnostic Guides</CardTitle>
            </CardHeader>
            <CardContent className="p-2 pt-0 text-center">
              <p className="text-[10px] text-white/90 mb-2 leading-relaxed">
                Step-by-step diagnostic flowcharts, troubleshooting guides, and repair procedures pinned from trusted sources.
              </p>
              <p className="text-[10px] text-white font-medium">50+ Diagnostic Pins</p>
            </CardContent>
          </Card>

          <Card className="shadow-md border-0 hover:shadow-lg transition-shadow bg-gradient-to-br from-green-600 to-emerald-700">
            <CardHeader className="text-center p-2">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-1.5">
                <Eye className="h-4 w-4 text-white" />
              </div>
              <CardTitle className="text-xs text-white">Visual References</CardTitle>
            </CardHeader>
            <CardContent className="p-2 pt-0 text-center">
              <p className="text-[10px] text-white/90 mb-2 leading-relaxed">
                Component diagrams, wiring schematics, and visual guides for complex automotive systems and repairs.
              </p>
              <p className="text-[10px] text-white font-medium">75+ Visual Guides</p>
            </CardContent>
          </Card>

          <Card className="shadow-md border-0 hover:shadow-lg transition-shadow bg-gradient-to-br from-orange-500 to-amber-600">
            <CardHeader className="text-center p-2">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-1.5">
                <Heart className="h-4 w-4 text-white fill-current" />
              </div>
              <CardTitle className="text-xs text-white">Curated Tips</CardTitle>
            </CardHeader>
            <CardContent className="p-2 pt-0 text-center">
              <p className="text-[10px] text-white/90 mb-2 leading-relaxed">
                Professional tips, tricks, and best practices from experienced mechanics and automotive experts.
              </p>
              <p className="text-[10px] text-white font-medium">100+ Expert Tips</p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center space-y-1">
          <div className="flex flex-col sm:flex-row gap-1 justify-center">
            <Link href="/pinterest">
              <Button className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 text-[10px]" aria-label="Browse Pinterest automotive reference library">
                <Heart className="h-2.5 w-2.5 mr-0.5 fill-current" aria-hidden="true" />
                Reference Library
              </Button>
            </Link>
            <Button
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-2 py-1 text-[10px] border-0"
              onClick={() => window.open('https://pinterest.com', '_blank')}
              aria-label="Visit Pinterest website"
            >
              <ExternalLink className="h-2.5 w-2.5 mr-0.5" aria-hidden="true" />
              Visit Pinterest
            </Button>
          </div>

          <p className="text-[9px] text-gray-500 italic">
            Pinterest integration provides additional reference material to complement our database
          </p>
        </div>
      </div>
    </section>
  )
}

export default PinterestReferenceSection