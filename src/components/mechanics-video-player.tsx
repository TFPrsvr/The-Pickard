'use client'

import { useState, useRef } from 'react'
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'

export default function MechanicsVideoPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(75)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  // YouTube video ID for mechanics tutorials
  // Replace with any mechanics video from YouTube
  const videoId = 'g5fz8H7QHmQ' // ChrisFix - How to do Car Maintenance

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
    <div className="w-full space-y-4">
      {/* Video Container */}
      <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden shadow-lg">
        <iframe
          ref={iframeRef}
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&controls=1&modestbranding=1&rel=0`}
          title="Automotive Mechanics Tutorial Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>

      {/* Custom Controls */}
      <div className="bg-card border border-border rounded-lg p-4 shadow-md">
        <div className="flex items-center justify-between gap-4">
          {/* Playback Controls */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handleSkipBack}
              aria-label="Skip backward 10 seconds"
              className="h-10 w-10"
            >
              <SkipBack className="h-5 w-5" aria-hidden="true" />
            </Button>

            <Button
              variant="default"
              size="icon"
              onClick={handlePlayPause}
              aria-label={isPlaying ? 'Pause video' : 'Play video'}
              className="h-12 w-12"
            >
              {isPlaying ? (
                <Pause className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Play className="h-6 w-6" aria-hidden="true" />
              )}
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={handleSkipForward}
              aria-label="Skip forward 10 seconds"
              className="h-10 w-10"
            >
              <SkipForward className="h-5 w-5" aria-hidden="true" />
            </Button>
          </div>

          {/* Volume Controls */}
          <div className="flex items-center gap-3 flex-1 max-w-xs">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleMuteToggle}
              aria-label={isMuted ? 'Unmute video' : 'Mute video'}
              className="h-10 w-10"
            >
              {isMuted ? (
                <VolumeX className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Volume2 className="h-5 w-5" aria-hidden="true" />
              )}
            </Button>

            <div className="flex-1">
              <Slider
                value={[volume]}
                onValueChange={handleVolumeChange}
                max={100}
                step={1}
                aria-label="Volume control"
                className="cursor-pointer"
              />
            </div>

            <span className="text-sm text-muted-foreground min-w-[3ch]" aria-live="polite">
              {volume}%
            </span>
          </div>
        </div>
      </div>

      {/* Video Description */}
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Watch automotive mechanics tutorials and repair guides from ChrisFix
        </p>
      </div>
    </div>
  )
}
