import React from 'react'
import { TwitterPicker } from 'react-color'

export default function PickerColor({ color, onChange }) {

  return (
    <div className="colorPicker">
      <h4>
        Color
        <span className="colorPickerSwatch" style={{ backgroundColor: color }}></span>
      </h4>
      <TwitterPicker color={color} onChangeComplete={onChange}/>
    </div>
  )
}
