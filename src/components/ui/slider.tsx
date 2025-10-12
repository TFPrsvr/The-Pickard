import * as React from "react"

export interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  value?: number[]
  onValueChange?: (value: number[]) => void
}

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ className, value = [50], onValueChange, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onValueChange) {
        onValueChange([Number(e.target.value)])
      }
    }

    return (
      <input
        type="range"
        ref={ref}
        value={value[0]}
        onChange={handleChange}
        className={`w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary ${className}`}
        {...props}
      />
    )
  }
)

Slider.displayName = "Slider"

export { Slider }
