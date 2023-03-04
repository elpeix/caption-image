
export const DEFAULT_POSITION = 'center'
export const H_POSITIONS = ['north', 'middle', 'south']
export const V_POSITIONS = ['west', 'center', 'east']
export const VALID_POSITIONS = [
  'north', 'south', 'east', 'west', 
  'north_east', 'north_west', 'south_east', 
  'south_west', 'center'
]

export function getPosition(hpos, vpos) {
  if (hpos === 'middle') {
    hpos = ''
  }
  if (vpos === 'center') {
    vpos = ''
  }
  const arr = [hpos, vpos]
  const finalPosition = arr.filter(Boolean).join('_')
  if (VALID_POSITIONS.includes(finalPosition)) {
    return finalPosition
  }
  return DEFAULT_POSITION
}

export function getMarginPosition(position) {
  if (position === 'center') {
    return [0, 0]
  }
  if (position === 'north' || position === 'south') {
    return [0, 0.05]
  }
  if (position === 'east' || position === 'west') {
    return [0.05, 0]
  }
  return [0.05, 0.05]
}