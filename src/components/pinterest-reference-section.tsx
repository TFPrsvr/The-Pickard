'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ExternalLink, Heart, Bookmark, Eye } from 'lucide-react'
import Link from 'next/link'

export function PinterestReferenceSection() {
  return (
    <section className="py-12 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
              <Heart className="h-6 w-6 text-white fill-current" />
            </div>
            <h2 className="text-4xl font-bold text-gray-800">Pinterest Reference Library</h2>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Access curated automotive resources and repair guides from our Pinterest collection. 
            Real-world solutions from automotive professionals and experts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <Card className="shadow-lg border-0 hover:shadow-xl transition-shadow">
            <CardHeader className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bookmark className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle className="text-xl text-blue-600">Diagnostic Guides</CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0 text-center">
              <p className="text-gray-600 mb-4">
                Step-by-step diagnostic flowcharts, troubleshooting guides, and repair procedures pinned from trusted sources.
              </p>
              <p className="text-sm text-purple-600 font-medium">50+ Diagnostic Pins</p>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 hover:shadow-xl transition-shadow">
            <CardHeader className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-xl text-green-600">Visual References</CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0 text-center">
              <p className="text-gray-600 mb-4">
                Component diagrams, wiring schematics, and visual guides for complex automotive systems and repairs.
              </p>
              <p className="text-sm text-purple-600 font-medium">75+ Visual Guides</p>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 hover:shadow-xl transition-shadow">
            <CardHeader className="text-center p-6">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-orange-600 fill-current" />
              </div>
              <CardTitle className="text-xl text-orange-600">Curated Tips</CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0 text-center">
              <p className="text-gray-600 mb-4">
                Professional tips, tricks, and best practices from experienced mechanics and automotive experts.
              </p>
              <p className="text-sm text-purple-600 font-medium">100+ Expert Tips</p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/pinterest">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3">
                <Bookmark className="h-5 w-5 mr-2" />
                Browse Pinterest Library
              </Button>
            </Link>
            <Button 
              variant="outline" 
              className="border-purple-600 text-purple-600 hover:bg-purple-50 px-8 py-3"
              onClick={() => window.open('https://pinterest.com', '_blank')}
            >
              <ExternalLink className="h-5 w-5 mr-2" />
              Visit Pinterest
            </Button>
          </div>
          
          <p className="text-sm text-gray-500 italic">
            Pinterest integration provides additional reference material to complement our database
          </p>
        </div>
      </div>
    </section>
  )
}

export default PinterestReferenceSection