import React from 'react'
import ReactSlider from 'react-slider'

export default function PickerOpacity({ opacity, onChange }) {
  return (
    <div className='opacityPicker'>
      <h4>Opacity</h4>
      <ReactSlider
        className="horizontal-slider"
        thumbClassName="example-thumb"
        trackClassName="example-track"
        defaultValue={opacity}
        min={0}
        max={100}
        renderThumb={props => <div {...props}></div>}
        onChange={onChange}
      />
    </div>
  )
}
