import React, { useEffect, useState } from 'react'
import CaptionText from './CaptionText'
import PickerColor from './PickerColor'
import PickerFont from './PickerFont'
import PickerSize from './PickerSize'
import PickerPosition from './PickerPosition'
import PickerFontStyle from './PickerFontStyle'

export default function CaptionEntry({ setCaption: defineCaption }) {

  const [caption, setCaption] = useState({
    text: '',
    color: '#555555',
    font: 'Arial',
    size: 40,
    position: 'center',
    weight: 'normal',
    style: 'normal',
    underline: false,
  })

  useEffect(() => {
    defineCaption(caption)
  }, [caption, defineCaption])

  const handleValueChange = e => {
    e.preventDefault()
    if (e.target.value.length > 20) {
      return
    }
    setCaption({ ...caption, text: e.target.value.trim() })
  }

  const handleColorChange = color => setCaption({ ...caption, color: color.hex })
  const handleFontChange = font => setCaption({ ...caption, font: font.family })
  const handleFontSizeChange = value => setCaption({ ...caption, size: value })
  const handlePositionChange = position => setCaption({ ...caption, position })
  const handleFontStyleChange = style => setCaption({ ...caption, style })
  const handleFontWeightChange = weight => setCaption({ ...caption, weight })
  const handleFontUnderlineChange = underline => setCaption({ ...caption, underline })

  const getBackgroundColor = () => {
    const hex = caption.color.replace('#', '')
    const c_r = parseInt(hex.substring(0, 0 + 2), 16)
    const c_g = parseInt(hex.substring(2, 2 + 2), 16)
    const c_b = parseInt(hex.substring(4, 4 + 2), 16)
    const brightness = ((c_r * 299) + (c_g * 587) + (c_b * 114)) / 1000
    return brightness > 155 ? '#333' : '#eee'
  }  

  return (
    <div className="captionEntry">
      <CaptionText caption={caption} onChange={handleValueChange} backgroundColor={getBackgroundColor()} />
      <PickerFont font={caption.font} onChange={handleFontChange} />
      <PickerColor color={caption.color} onChange={handleColorChange} />
      <PickerSize size={caption.size} onChange={handleFontSizeChange} />
      <PickerFontStyle 
        fontStyle={caption.style}
        fontWeight={caption.weight}
        fontUnderline={caption.underline}
        onChangeStyle={handleFontStyleChange}
        onChangeWeight={handleFontWeightChange}
        onChangeUnderline={handleFontUnderlineChange}
      />
      <PickerPosition position={caption.position} onChange={handlePositionChange} />
    </div>
  )
}
