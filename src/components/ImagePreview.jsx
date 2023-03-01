import React from 'react'

export default function ImagePreview( { file }) {
  return (
    <div className="imagePreview">
      <img
        src={file.preview}
        alt="uploaded file"
        height={160}
        width={160}
        onLoad={() => URL.revokeObjectURL(file.preview)}
      />
    </div>
  )
}
