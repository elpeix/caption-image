import React, { useEffect, useMemo, useState } from 'react'
import { useDropzone } from 'react-dropzone'

export default function ImageDrop( { setImage }) {

  const [fileErrors, setFileErrors] = useState([])

  const {
    fileRejections,
    isFocused,
    isDragAccept,
    isDragReject,
    getRootProps,
    getInputProps,
  } = useDropzone({
    multiple: false,
    accept: {
      'image/jpeg': [],
      'image/png': [],
    },
    maxFiles: 1,
    onDropAccepted: acceptedFiles => {
      if (acceptedFiles.length > 0) {
        setImage(acceptedFiles[0])
      }
    }
  })

  useEffect(() => {
    if (fileRejections.length > 0) {
      setFileErrors(fileRejections)
      setTimeout(() => setFileErrors([]), 3200)
    }
  }, [fileRejections])

  const styles = useMemo(() => {
    let className = 'uploader'
    if (isFocused) className += ' focused'
    if (isDragAccept) className += ' accepted'
    if (isDragReject) className += ' rejected'
    return className
  }, [isFocused, isDragAccept, isDragReject])

  return (
    <>
      <div className={` ${styles && styles}`}>
        <div {...getRootProps({ className: 'dropzone' })}>
          <input id="file" {...getInputProps()} />
          <p>
            Drag &apos;n&apos; drop your image here, or click to select file
          </p>
          <p>
            Only 1 file is accepted and must be jpg or png format
          </p>
        </div>
      </div>
      {fileErrors.length > 0 && (
        <div className='rejectedFilesMessage'>
          <h4>Rejected Files</h4>
          <ul>
            {fileErrors.map(({ file, errors }) => (
              <li key={file.path}>{file.path} - {errors[0].message}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}
