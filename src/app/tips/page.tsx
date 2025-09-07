'use client'

import { useState, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tip, User } from '@/types'
import { 
  Lightbulb, 
  Search, 
  Filter, 
  Plus, 
  Heart, 
  MessageCircle, 
  Share2, 
  Play,
  FileImage,
  Mic,
  Calendar,
  ThumbsUp,
  Tag
} from 'lucide-react'
import Link from 'next/link'
import { generateUserInitials } from '@/lib/utils'

export default function TipsPage() {
  const { user: clerkUser } = useUser()
  const [tips, setTips] = useState<Tip[]>([])
  const [filteredTips, setFilteredTips] = useState<Tip[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [vehicleTypeFilter, setVehicleTypeFilter] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [likedTips, setLikedTips] = useState<Set<string>>(new Set())

  // Mock data for tips
  const mockTips: Tip[] = [
    {
      id: '1',
      title: 'Quick Oil Change Tool Organization',
      description: 'Save 15 minutes on every oil change by organizing your tools beforehand. Having everything laid out in order makes the job smooth and prevents losing small parts like drain plugs.',
      category: 'tools',
      vehicleTypes: ['car', 'truck'],
      media: [
        { id: '1', type: 'image', url: '/images/oil-change-setup.jpg', caption: 'Organized tool layout for oil change' }
      ],
      author: 'Mike Rodriguez',
      createdAt: new Date('2024-01-15'),
      likes: 47,
      tags: ['oil-change', 'organization', 'efficiency']
    },
    {
      id: '2',
      title: 'Brake Bleeding Technique for Solo Mechanics',
      description: 'Use a one-way valve bleeder or vacuum pump when working alone. This technique ensures proper brake fluid flow without needing a second person to pump the pedal.',
      category: 'technique',
      vehicleTypes: ['car', 'truck'],
      media: [
        { id: '2', type: 'video', url: '/videos/brake-bleeding.mp4', caption: 'Solo brake bleeding demonstration' }
      ],
      author: 'Sarah Chen',
      createdAt: new Date('2024-01-10'),
      likes: 89,
      tags: ['brakes', 'solo-work', 'bleeding']
    },
    {
      id: '3',
      title: 'What I Wish I Knew Before My First Transmission Job',
      description: 'Transmission work is complex - always mark bolt positions with a phone camera before removal. Label every connector and keep a detailed diagram. What seems obvious during disassembly becomes confusing during reassembly.',
      category: 'lesson-learned',
      vehicleTypes: ['truck', '18-wheeler'],
      media: [
        { id: '3', type: 'image', url: '/images/transmission-labels.jpg', caption: 'Proper labeling technique' }
      ],
      author: 'Tom Wilson',
      createdAt: new Date('2024-01-08'),
      likes: 134,
      tags: ['transmission', 'documentation', 'beginner-tips']
    },
    {
      id: '4',
      title: 'Safety Tip: Always Support Your Work',
      description: 'Never trust a single jack or lift point. Always use jack stands, wheel chocks, and secondary support. I learned this the hard way when a hydraulic jack failed while I was under a truck.',
      category: 'safety',
      vehicleTypes: ['car', 'truck', '18-wheeler'],
      media: [
        { id: '4', type: 'video', url: '/videos/safety-setup.mp4', caption: 'Proper vehicle support demonstration' }
      ],
      author: 'Jennifer Lopez',
      createdAt: new Date('2024-01-05'),
      likes: 256,
      tags: ['safety', 'jack-stands', 'support']
    },
    {
      id: '5',
      title: 'Time-Saving Tip: Magnetic Parts Tray',
      description: 'Use a large magnetic parts tray when working on anything with small bolts. It prevents losing fasteners and keeps everything organized. Best $15 investment for any mechanic.',
      category: 'time-saver',
      vehicleTypes: ['car', 'truck'],
      media: [
        { id: '5', type: 'image', url: '/images/magnetic-tray.jpg' }
      ],
      author: 'Carlos Martinez',
      createdAt: new Date('2024-01-03'),
      likes: 78,
      tags: ['organization', 'tools', 'efficiency']
    }
  ]

  const categories = ['tools', 'technique', 'safety', 'time-saver', 'lesson-learned']
  const vehicleTypes = ['car', 'truck', '18-wheeler']

  useEffect(() => {
    loadTips()
  }, [])

  useEffect(() => {
    filterTips()
  }, [tips, searchQuery, categoryFilter, vehicleTypeFilter])

  const loadTips = () => {
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setTips(mockTips)
      setIsLoading(false)
    }, 1000)
  }

  const filterTips = () => {
    let filtered = tips

    if (searchQuery) {
      filtered = filtered.filter(tip =>
        tip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tip.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tip.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    if (categoryFilter && categoryFilter !== 'all') {
      filtered = filtered.filter(tip => tip.category === categoryFilter)
    }

    if (vehicleTypeFilter && vehicleTypeFilter !== 'all') {
      filtered = filtered.filter(tip => 
        tip.vehicleTypes.includes(vehicleTypeFilter as 'car' | 'truck' | '18-wheeler')
      )
    }

    setFilteredTips(filtered)
  }

  const resetFilters = () => {
    setSearchQuery('')
    setCategoryFilter('all')
    setVehicleTypeFilter('all')
  }

  const handleLike = (tipId: string) => {
    const newLikedTips = new Set(likedTips)
    if (newLikedTips.has(tipId)) {
      newLikedTips.delete(tipId)
    } else {
      newLikedTips.add(tipId)
    }
    setLikedTips(newLikedTips)

    // Update the tip likes count
    setTips(prevTips =>
      prevTips.map(tip =>
        tip.id === tipId
          ? {
              ...tip,
              likes: newLikedTips.has(tipId) ? tip.likes + 1 : tip.likes - 1
            }
          : tip
      )
    )
  }

  return (
    <div className="py-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Mechanic Tips & Tricks</h1>
          <p className="text-muted-foreground">
            Learn from experienced mechanics and share your own knowledge
          </p>
        </div>
        <Button asChild>
          <Link href="/tips/create">
            <Plus className="h-4 w-4 mr-2" />
            Share a Tip
          </Link>
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Search & Filter Tips
          </CardTitle>
          <CardDescription>
            Find tips by category, vehicle type, or keywords
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search tips..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Vehicle Type</label>
              <Select value={vehicleTypeFilter} onValueChange={setVehicleTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All vehicles" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All vehicles</SelectItem>
                  {vehicleTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button 
                variant="outline" 
                onClick={resetFilters}
                className="w-full"
              >
                Clear Filters
              </Button>
            </div>
          </div>

          {(searchQuery || categoryFilter || vehicleTypeFilter) && (
            <div className="flex items-center justify-between pt-2 border-t">
              <span className="text-sm text-muted-foreground">
                {filteredTips.length} of {tips.length} tips shown
              </span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Tips List */}
      {isLoading ? (
        <div className="text-center py-12">
          <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Loading tips...</p>
        </div>
      ) : filteredTips.length > 0 ? (
        <div className="space-y-6">
          {filteredTips.map((tip) => (
            <TipCard 
              key={tip.id} 
              tip={tip} 
              isLiked={likedTips.has(tip.id)}
              onLike={() => handleLike(tip.id)}
            />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <Lightbulb className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No tips found</h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery || categoryFilter || vehicleTypeFilter
                ? 'Try adjusting your search criteria'
                : 'Be the first to share a tip!'
              }
            </p>
            <div className="flex gap-2 justify-center">
              {(searchQuery || categoryFilter || vehicleTypeFilter) && (
                <Button onClick={resetFilters} variant="outline">
                  Clear all filters
                </Button>
              )}
              <Button asChild>
                <Link href="/tips/create">
                  <Plus className="h-4 w-4 mr-2" />
                  Share a Tip
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

interface TipCardProps {
  tip: Tip
  isLiked: boolean
  onLike: () => void
}

function TipCard({ tip, isLiked, onLike }: TipCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5" />
              {tip.title}
            </CardTitle>
            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                  {generateUserInitials(tip.author.split(' ')[0], tip.author.split(' ')[1] || '')}
                </div>
                <span>{tip.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>{tip.createdAt.toLocaleDateString()}</span>
              </div>
              <div className={`px-2 py-1 text-xs rounded-full ${
                tip.category === 'safety' ? 'bg-red-100 text-red-800' :
                tip.category === 'tools' ? 'bg-blue-100 text-blue-800' :
                tip.category === 'technique' ? 'bg-green-100 text-green-800' :
                tip.category === 'time-saver' ? 'bg-yellow-100 text-yellow-800' :
                'bg-purple-100 text-purple-800'
              }`}>
                {tip.category.replace('-', ' ')}
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground leading-relaxed">{tip.description}</p>

        {/* Media Preview */}
        {tip.media.length > 0 && (
          <div className="space-y-3">
            {tip.media.map((media) => (
              <div key={media.id} className="border rounded-lg p-3">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0">
                    {media.type === 'image' && <FileImage className="h-8 w-8 text-blue-500" />}
                    {media.type === 'video' && <Play className="h-8 w-8 text-red-500" />}
                    {media.type === 'audio' && <Mic className="h-8 w-8 text-green-500" />}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium capitalize">{media.type} content</div>
                    {media.caption && (
                      <div className="text-sm text-muted-foreground">{media.caption}</div>
                    )}
                  </div>
                  <Button variant="outline" size="sm">
                    <Play className="h-4 w-4 mr-2" />
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {tip.tags.map((tag, index) => (
            <span 
              key={index} 
              className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-muted rounded-full"
            >
              <Tag className="h-3 w-3" />
              {tag}
            </span>
          ))}
        </div>

        {/* Vehicle Types */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Applies to:</span>
          <div className="flex gap-2">
            {tip.vehicleTypes.map((type, index) => (
              <span key={index} className="px-2 py-1 bg-accent rounded-full text-xs">
                {type.replace('-', ' ')}
              </span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center gap-4">
            <Button
              variant={isLiked ? "default" : "outline"}
              size="sm"
              onClick={onLike}
              className="gap-2"
            >
              <ThumbsUp className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
              {tip.likes}
            </Button>
            <Button variant="outline" size="sm">
              <MessageCircle className="h-4 w-4 mr-2" />
              Comment
            </Button>
          </div>
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}