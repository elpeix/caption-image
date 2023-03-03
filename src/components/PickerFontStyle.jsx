import React, { useState } from 'react'

export default function PickerFontStyle({ 
  fontStyle,
  fontWeight,
  fontUnderline,
  onChangeStyle,
  onChangeWeight,
  onChangeUnderline,
}) {

  const [italic, setItalic] = useState(fontStyle === 'italic')
  const [bold, setBold] = useState(fontWeight === 'bold')

  const handleItalicClick = e => {
    e.preventDefault()
    setItalic(!italic)
    onChangeStyle(italic ? 'normal' : 'italic')
  }

  const handleBoldClick = e => {
    e.preventDefault()
    setBold(!bold)
    onChangeWeight(bold ? 'normal' : 'bold')
  }

  const handleUnderlineClick = e => {
    e.preventDefault()
    onChangeUnderline(!fontUnderline)
  }

  return (
    <div className="fontStylePicker">
      <h4>Style</h4>
      <div className="buttons">
        <button className={`italic ${italic ? 'active' : ''}`} onClick={handleItalicClick}>
          A
        </button>
        <button className={`bold ${bold ? 'active' : ''}`} onClick={handleBoldClick}>
          A
        </button>
        <button className={`underline ${fontUnderline ? 'active' : ''}`} onClick={handleUnderlineClick}>
          A
        </button>
      </div>
    </div>
  )
}
