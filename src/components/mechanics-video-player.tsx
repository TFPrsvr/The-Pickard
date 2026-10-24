'use client'

import PropTypes from 'prop-types'

const MECHANICS_VIDEOS = [
  { id: 'CCsKGBxbzFg', title: 'How to Super Clean Your Engine Bay', channel: 'ChrisFix' },
  { id: 'L5OEHBmFHDc', title: 'How to Change Your Oil', channel: 'ChrisFix' },
  { id: '5pKHODHp5_A', title: 'How to Replace Brake Pads and Rotors', channel: 'ChrisFix' },
  { id: 'Z6VJUT1BVUQ', title: 'How to Fix a Car that Won\'t Start', channel: 'ChrisFix' },
  { id: 'nTrXxNb7_bg', title: 'Diagnosing a Check Engine Light', channel: 'ScannerDanner' },
  { id: 'X9NhDe4aEWo', title: 'How to Replace an Alternator', channel: 'EricTheCarGuy' },
  { id: 'RjE3-1HPRbc', title: 'Transmission Fluid Change', channel: '1A Auto' },
  { id: 'YJmHdvOH4Ts', title: 'How to Replace a Starter Motor', channel: '1A Auto' },
]

export const TOTAL_VIDEOS = MECHANICS_VIDEOS.length

interface MechanicsVideoPlayerProps {
  videoIndex?: number
  onVideoChange?: (index: number) => void
}

export default function MechanicsVideoPlayer({ videoIndex = 0, onVideoChange }: MechanicsVideoPlayerProps) {
  const total = MECHANICS_VIDEOS.length
  const current = MECHANICS_VIDEOS[videoIndex] ?? MECHANICS_VIDEOS[0]

  const goPrev = () => {
    const next = videoIndex === 0 ? total - 1 : videoIndex - 1
    onVideoChange?.(next)
  }

  const goNext = () => {
    const next = videoIndex === total - 1 ? 0 : videoIndex + 1
    onVideoChange?.(next)
  }

  return (
    <div className="w-full flex flex-col gap-2">
      {/* Video with overlaid prev/next arrows */}
      <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden shadow-lg group">
        <iframe
          key={current.id}
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${current.id}?enablejsapi=1&controls=1&modestbranding=1&rel=0`}
          title={current.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          aria-label={`Video: ${current.title} by ${current.channel}`}
        />

        {/* Prev overlay */}
        <button
          onClick={goPrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 hover:bg-black/75 transition-all focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-white"
          aria-label="Previous video"
        >
          ‹
        </button>

        {/* Next overlay */}
        <button
          onClick={goNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 hover:bg-black/75 transition-all focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-white"
          aria-label="Next video"
        >
          ›
        </button>
      </div>

      {/* Title + counter below video */}
      <div className="flex items-center justify-between px-1">
        <div className="flex flex-col">
          <span className="text-xs font-medium text-gray-800 truncate max-w-[220px]">{current.title}</span>
          <span className="text-[10px] text-muted-foreground">{current.channel}</span>
        </div>
        <span className="text-[10px] text-muted-foreground shrink-0">{videoIndex + 1} / {total}</span>
      </div>
    </div>
  )
}

MechanicsVideoPlayer.propTypes = {
  videoIndex: PropTypes.number,
  onVideoChange: PropTypes.func,
}
