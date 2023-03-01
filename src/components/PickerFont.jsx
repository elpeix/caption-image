import FontPicker from 'font-picker-react'
import React from 'react'
import { config } from '../config'

export default function PickerFont({ font, onChange }) {
  return (
    <div className="fontPicker">
      <h4>Font</h4>
      <FontPicker
        apiKey={config.google.font_api_key}
        categories={['sans-serif', 'serif', 'display', 'handwriting', 'monospace']}ç
        sort='popularity'
        activeFontFamily={font}
        className='fontPickerSelector'
        onChange={onChange}
      />
    </div>
  )
}
