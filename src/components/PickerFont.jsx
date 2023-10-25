import React from 'react'

export default function PickerFont({ font, onChange }) {

  const fonts = [
    'Arial',
    'Impact',
    'Times New Roman',
    'Verdana',
    'Georgia',
  ]

  const onSelect = e => {
    onChange(e.target.value)
  }

  return (
    <div className="fontPicker">
      <h4>Font</h4>
      <select value={font} onChange={onSelect}>
        {fonts.map((font, index) => (
          <option key={index} value={font}>
            {font}
          </option>
        ))}
      </select>
    </div>
  )
}
