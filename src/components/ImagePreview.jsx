import React from 'react'
import errorImgage from '../assets/error.svg'

export default function ImagePreview( { file, onLoad, onError }) {

  return (
    <div className="imagePreview">
      <img
        src={file.preview}
        alt="uploaded file"
        height={160}
        width={160}
        onLoad={() => {
          URL.revokeObjectURL(file.preview)
          onLoad()
        }}
        onError={el => {
          el.target.onError = null
          el.target.src = errorImgage
          onError()
        }}
      />
    </div>
  )
}
