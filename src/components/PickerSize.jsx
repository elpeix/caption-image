import React from 'react'
import ReactSlider from 'react-slider'

export default function PickerSize({ size, onChange }) {
  return (
    <div className='sizePicker'>
      <h4>Size</h4>
      <ReactSlider
        className="horizontal-slider"
        thumbClassName="example-thumb"
        trackClassName="example-track"
        defaultValue={size}
        min={16}
        max={100}
        renderThumb={props => <div {...props}></div>}
        onChange={onChange}
      />
    </div>
  )
}
