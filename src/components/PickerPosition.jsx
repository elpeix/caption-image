import React, { useState } from 'react'
import { H_POSITIONS, V_POSITIONS, getPosition } from '../helpers/positions'

export default function PickerPosition({ position, onChange }) {

  const [hPosition, setHPosition] = useState(position.split('_')[0] || 'middle')
  const [vPosition, setVPosition] = useState(position.split('_')[1] || 'center')

  const handlePositionChange = pos => {
    let hpos = hPosition
    let vpos = vPosition
    if (H_POSITIONS.includes(pos)) {
      hpos = pos
      setHPosition(pos)
    } else if (V_POSITIONS.includes(pos)) {
      vpos = pos
      setVPosition(pos)
    }
    onChange(getPosition(hpos, vpos))
  }

  return (
    <div className='positionPicker'>
      <h4>Position</h4>
      <div className='icons'>
        <div className='hIcons'>
          {V_POSITIONS.map((pos, i) => (
            <button
              key={i}
              className={`icon ${pos} ${pos === vPosition ? 'active' : ''}`}
              onClick={e => {
                e.preventDefault()
                handlePositionChange(pos)
              }}
            />
          ))}
        </div>
        <div className='vIcons'>
          {H_POSITIONS.map((pos, i) => (
            <button
              key={i}
              className={`icon ${pos} ${pos === hPosition ? 'active' : ''}`}
              onClick={e => {
                e.preventDefault()
                handlePositionChange(pos)
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
