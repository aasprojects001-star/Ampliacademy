import React from 'react'

interface AvatarProps {
  name: string
  size?: number | 'xs' | 'sm' | 'md' | 'lg' // ✅ FIXED HERE
  online?: boolean
  rounded?: string
}

export default function Avatar({
  name,
  size = 'md',
  online,
  rounded = 'xl',
}: AvatarProps) {

  // ✅ map string sizes to numbers
  const sizeMap: Record<string, number> = {
    xs: 24,
    sm: 32,
    md: 40,
    lg: 48,
  }

  const finalSize = typeof size === 'number' ? size : sizeMap[size] || 40

  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()

  return (
    <div className="relative flex-shrink-0">
      <div
        style={{ width: finalSize, height: finalSize }}
        className={`bg-gradient-to-br from-primary to-primary-700 flex items-center justify-center text-white font-bold rounded-${rounded}`}
      >
        {initials}
      </div>

      {online !== undefined && (
        <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-dark-bg ${
          online ? 'bg-emerald-400' : 'bg-white/20'
        }`} />
      )}
    </div>
  )
}