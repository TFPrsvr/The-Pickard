'use client'

import PropTypes from 'prop-types'

const MECHANICS_VIDEOS = [
  { id: 'tBHZb7zjBfU', title: 'How to Super Clean Your Engine Bay', channel: 'ChrisFix' },
  { id: 'YfpDSNNgYhE', title: 'How to Change Your Oil', channel: 'ChrisFix' },
  { id: 'ot0ssFAnzFc', title: 'How to Replace Brake Pads and Rotors', channel: 'ChrisFix' },
  { id: 'UlB3JBtFWqQ', title: 'How to Fix a Car that Won\'t Start', channel: 'ChrisFix' },
  { id: 'ox-IinIsmB0', title: 'How to Diagnose a Check Engine Light', channel: 'ChrisFix' },
  { id: 'ErC0_7OBxbs', title: 'How to Replace a Car Battery', channel: 'ChrisFix' },
  { id: 'oEIhQml9hCM', title: 'How to Replace Windshield Wipers', channel: 'ChrisFix' },
  { id: 'YkNMEKHHpAc', title: 'How to Replace an Air Filter', channel: 'ChrisFix' },
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

      {/* Prev arrow */}
      <button
        onClick={goPrev}
        className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 text-white text-xl opacity-0 group-hover:opacity-100 hover:bg-black/75 transition-all focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-white"
        aria-label="Previous video"
      >
        ‹
      </button>

      {/* Next arrow */}
      <button
        onClick={goNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 text-white text-xl opacity-0 group-hover:opacity-100 hover:bg-black/75 transition-all focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-white"
        aria-label="Next video"
      >
        ›
      </button>

      {/* Title/channel/counter overlay — bottom, shown on hover or active */}
      <div className="absolute bottom-0 left-0 right-0 px-3 py-2 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between">
        <div className="flex flex-col min-w-0">
          <span className="text-xs font-medium text-white truncate">{current.title}</span>
          <span className="text-[10px] text-white/70">{current.channel}</span>
        </div>
        <span className="text-[10px] text-white/70 shrink-0 ml-2">{videoIndex + 1} / {total}</span>
      </div>
    </div>
  )
}

MechanicsVideoPlayer.propTypes = {
  videoIndex: PropTypes.number,
  onVideoChange: PropTypes.func,
}
