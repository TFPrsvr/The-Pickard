'use client'

import { useState, useEffect } from 'react'

interface Video {
  id: string
  title: string
  embedUrl: string
  platform: 'youtube'
}

interface VideoFilterProps {
  position: 'left' | 'right'
  className?: string
}

export default function VideoFilter({ position, className = '' }: VideoFilterProps) {
  const [videos, setVideos] = useState<Video[]>([])
  const [currentVideoIndex, setCurrentVideoIndex] = useState(position === 'left' ? 0 : 1)
  const [loading, setLoading] = useState(true)

  // Left side - Engine & Diagnostic videos (ChrisFix channel)
  const leftSideVideos: Video[] = [
    {
      id: 'L1',
      title: 'How to Diagnose Engine Problems',
      embedUrl: 'https://www.youtube.com/embed/t8cOcuwjU9k',
      platform: 'youtube'
    },
    {
      id: 'L2', 
      title: 'How to Use an OBD Scanner',
      embedUrl: 'https://www.youtube.com/embed/2wd2PFqSyRk',
      platform: 'youtube'
    },
    {
      id: 'L3',
      title: 'How to Check Engine Oil Level',
      embedUrl: 'https://www.youtube.com/embed/VxQWuNEO3JU',
      platform: 'youtube'
    },
    {
      id: 'L4',
      title: 'Engine Basics Explained',
      embedUrl: 'https://www.youtube.com/embed/uI_PX6AZDWc',
      platform: 'youtube'
    }
  ]

  // Right side - Maintenance & Repair videos (Various automotive channels)
  const rightSideVideos: Video[] = [
    {
      id: 'R1',
      title: 'How to Replace Brake Pads',
      embedUrl: 'https://www.youtube.com/embed/lzRBr7qQ2dQ',
      platform: 'youtube'
    },
    {
      id: 'R2',
      title: 'Complete Oil Change Guide',
      embedUrl: 'https://www.youtube.com/embed/XvKbdTRO3h8',
      platform: 'youtube'
    },
    {
      id: 'R3',
      title: 'How to Change a Tire',
      embedUrl: 'https://www.youtube.com/embed/joBmbh0AGSQ',
      platform: 'youtube'
    },
    {
      id: 'R4',
      title: 'Battery Testing and Replacement',
      embedUrl: 'https://www.youtube.com/embed/ZNzKgHn6SbA',
      platform: 'youtube'
    }
  ]

  useEffect(() => {
    const videoSet = position === 'left' ? leftSideVideos : rightSideVideos
    setVideos(videoSet)
    setLoading(false)
    
    // Ensure left and right start with completely different videos immediately
    const startIndex = position === 'left' ? 0 : 1 // Left starts at video 1, Right starts at video 2  
    setCurrentVideoIndex(startIndex)
    
    // Different cycle timing to prevent synchronization
    const cycleTime = position === 'left' ? 35000 : 41000 // Left: 35s, Right: 41s
    const interval = setInterval(() => {
      setCurrentVideoIndex(prev => (prev + 1) % videoSet.length)
    }, cycleTime)
    
    return () => clearInterval(interval)
  }, [position])

  if (loading || videos.length === 0) {
    return (
      <div className={`w-full h-full bg-gray-900/20 backdrop-blur-sm rounded-lg animate-pulse ${className}`}>
        <div className="flex items-center justify-center h-full">
          <div className="text-white/60 text-sm">Loading video...</div>
        </div>
      </div>
    )
  }

  const currentVideo = videos[currentVideoIndex]

  return (
    <div className={`relative w-full h-full overflow-hidden rounded-lg bg-gray-900 ${className}`}>
      <div className="absolute inset-0">
        <iframe
          src={`${currentVideo.embedUrl}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&modestbranding=1&loop=1&playlist=${currentVideo.embedUrl.split('/').pop()}`}
          title={currentVideo.title}
          className="w-full h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      </div>
      
      {/* Dark overlay for better text visibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
      
      {/* Video Controls Overlay */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className="flex items-center justify-between text-white text-sm">
          <div className="bg-black/60 px-3 py-1 rounded-md backdrop-blur-sm">
            <span className="font-medium truncate">{currentVideo.title}</span>
          </div>
          <div className="bg-black/60 px-2 py-1 rounded-md backdrop-blur-sm">
            {currentVideoIndex + 1}/{videos.length}
          </div>
        </div>
      </div>
      
    </div>
  )
}