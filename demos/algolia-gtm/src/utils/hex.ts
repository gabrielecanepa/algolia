const hex = (color: string): string => {
  if (typeof window === 'undefined' || CSS.supports('color', color)) {
    return color
  }

  throw new Error(`Invalid hex color: ${color}`)
}

export default hex
