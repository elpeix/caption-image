import React from 'react'

export default function CaptionText({ caption, onChange, backgroundColor}) {
  return (
    <div className='captionText'>
      <input 
        style={{ 
          color: caption.color,
          fontFamily: caption.font,
          backgroundColor: backgroundColor,
          fontSize: caption.size,
          fontStyle: caption.style,
          fontWeight: caption.weight,
          textDecoration: caption.underline? 'underline' : 'none',
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
