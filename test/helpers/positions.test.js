import { describe, expect, it } from 'vitest'
import { getPosition, getMarginPosition } from '../../src/helpers/positions'

describe('positions', () => {
  it('should return center if hpos and vpos are not provided', () => {
    expect(getPosition()).toBe('center')
  })

  it('should return center if hpos and vpos are not valid', () => {
    expect(getPosition('invalid', 'invalid')).toBe('center')
  })

  it('should return correct position if hpos and vpos are valid', () => {
    expect(getPosition('north', 'west')).toBe('north_west')
    expect(getPosition('north', 'center')).toBe('north')
    expect(getPosition('north', 'east')).toBe('north_east')
    expect(getPosition('middle', 'west')).toBe('west')
    expect(getPosition('middle', 'center')).toBe('center')
    expect(getPosition('middle', 'east')).toBe('east')
    expect(getPosition('south', 'west')).toBe('south_west')
    expect(getPosition('south', 'center')).toBe('south')
    expect(getPosition('south', 'east')).toBe('south_east')
  })

  it('should return  [0,0] if position is center', () => {
    expect(getMarginPosition('center')).toEqual([0, 0])
  })
  it('should return [0,0.05] if position is south or north', () => {
    expect(getMarginPosition('south')).toEqual([0, 0.05])
    expect(getMarginPosition('north')).toEqual([0, 0.05])
  })

  it('should return [0.05,0] if position is east or west', () => {
    expect(getMarginPosition('east')).toEqual([0.05, 0])
    expect(getMarginPosition('west')).toEqual([0.05, 0])
  })

  it('should return [0.05,0.05] if position is south_east or south_west or north_east or north_west', () => {
    expect(getMarginPosition('south_east')).toEqual([0.05, 0.05])
    expect(getMarginPosition('south_west')).toEqual([0.05, 0.05])
    expect(getMarginPosition('north_east')).toEqual([0.05, 0.05])
    expect(getMarginPosition('north_west')).toEqual([0.05, 0.05])
  })
})