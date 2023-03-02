import FontPicker from 'font-picker-react'
import React from 'react'
import { getConfig } from '../config'

export default function PickerFont({ font, onChange }) {
  return (
    <div className="fontPicker">
      <h4>Font</h4>
      <FontPicker
        apiKey={getConfig().google.font_api_key}
        categories={[
          'sans-serif',
          'serif',
          'display',
          'handwriting',
          'monospace',
        ]}
        sort='popularity'
        activeFontFamily={font}
        className='fontPickerSelector'
        onChange={onChange}
      />
    </div>
  )
}
