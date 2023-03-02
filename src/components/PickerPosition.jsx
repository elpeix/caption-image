import React from 'react'

export default function PickerPosition({ position, onChange }) {

  const positions = ['north', 'center', 'south']

  return (
    <div className='positionPicker'>
      <h4>Position</h4>
      <div className='icons'>
        {positions.map((pos, i) => (
          <button
            key={i}
            className={`icon ${pos} ${pos === position ? 'active' : ''}`}
            onClick={e => {
              e.preventDefault()
              onChange(pos)
            }}
          />
        ))}
      </div>
    </div>
  )
}
