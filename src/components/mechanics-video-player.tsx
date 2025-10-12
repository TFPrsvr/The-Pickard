'use client'

import { useState, useRef } from 'react'
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react'

// Curated list of embeddable YouTube mechanics videos
// Note: Using placeholder with a single verified video for now
// TODO: Add more verified embeddable videos
const MECHANICS_VIDEOS = [
  {
    id: 'O1hF25Cowv8',
    title: 'ChrisFix - How to Change Your Oil',
    channel: 'ChrisFix'
  },
  {
    id: 'O1hF25Cowv8',
    title: 'ChrisFix - How to Change Your Oil',
    channel: 'ChrisFix'
  },
  {
    id: 'O1hF25Cowv8',
    title: 'ChrisFix - How to Change Your Oil',
    channel: 'ChrisFix'
  },
  {
    id: 'O1hF25Cowv8',
    title: 'ChrisFix - How to Change Your Oil',
    channel: 'ChrisFix'
  },
  {
    id: 'O1hF25Cowv8',
    title: 'ChrisFix - How to Change Your Oil',
    channel: 'ChrisFix'
  },
  {
    id: 'O1hF25Cowv8',
    title: 'ChrisFix - How to Change Your Oil',
    channel: 'ChrisFix'
  },
  {
    id: 'O1hF25Cowv8',
    title: 'ChrisFix - How to Change Your Oil',
    channel: 'ChrisFix'
  },
  {
    id: 'O1hF25Cowv8',
    title: 'ChrisFix - How to Change Your Oil',
    channel: 'ChrisFix'
  }
]

interface MechanicsVideoPlayerProps {
  videoIndex?: number
  onVideoChange?: (index: number) => void
}

export default function MechanicsVideoPlayer({ videoIndex = 0, onVideoChange }: MechanicsVideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(75)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  // Get current video from prop
  const currentVideo = MECHANICS_VIDEOS[videoIndex]
  const videoId = currentVideo.id

  const handlePlayPause = () => {
    if (iframeRef.current) {
      const message = isPlaying ? 'pauseVideo' : 'playVideo'
      iframeRef.current.contentWindow?.postMessage(
        JSON.stringify({ event: 'command', func: message, args: '' }),
        '*'
      )
      setIsPlaying(!isPlaying)
    }
  }

  const handleSkipBack = () => {
    if (iframeRef.current) {
      iframeRef.current.contentWindow?.postMessage(
        JSON.stringify({ event: 'command', func: 'seekTo', args: [-10, true] }),
        '*'
      )
    }
  }

  const handleSkipForward = () => {
    if (iframeRef.current) {
      iframeRef.current.contentWindow?.postMessage(
        JSON.stringify({ event: 'command', func: 'seekTo', args: [10, true] }),
        '*'
      )
    }
  }

  const handleMuteToggle = () => {
    if (iframeRef.current) {
      const message = isMuted ? 'unMute' : 'mute'
      iframeRef.current.contentWindow?.postMessage(
        JSON.stringify({ event: 'command', func: message, args: '' }),
        '*'
      )
      setIsMuted(!isMuted)
    }
  }

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0]
    setVolume(newVolume)
    if (iframeRef.current) {
      iframeRef.current.contentWindow?.postMessage(
        JSON.stringify({ event: 'command', func: 'setVolume', args: [newVolume] }),
        '*'
      )
    }
  }

  return (
    <div className="w-full">
      {/* Video Container */}
      <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden shadow-lg">
        <iframe
          key={videoId}
          ref={iframeRef}
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&controls=1&modestbranding=1&rel=0`}
          title={currentVideo.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>

      {/* Video Description */}
      <div className="text-center mt-1 bg-transparent">
        <p className="text-[10px] font-medium text-foreground bg-transparent">
          {currentVideo.title}
        </p>
        <p className="text-[9px] text-muted-foreground bg-transparent">
          {currentVideo.channel}
        </p>
      </div>
    </div>
  )
}
