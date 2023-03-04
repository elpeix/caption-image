import React from 'react'

export default function CaptionText({ caption, onChange, backgroundColor}) {

  let color = caption.color
  if (caption.opacity >= 0 && caption.opacity <= 100) {
    const alpha = Math.round((caption.opacity / 100) * 255).toString(16)
    const hexAlpha = alpha.toString(16).padStart(2, '0')
    color = color + hexAlpha
  }

  return (
    <div className='captionText'>
      <input 
        style={{ 
          color: color,
          fontFamily: caption.font,
          backgroundColor: backgroundColor,
          fontSize: caption.size,
          fontStyle: caption.style,
          fontWeight: caption.weight,
          textDecoration: caption.underline? 'underline' : 'none'
        }}
        type="text"
        placeholder="Caption goes here"
        value={caption.value}
        maxLength={30}
        onChange={onChange}
      />
    </div>
  )
}
