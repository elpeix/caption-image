import React from 'react'
import { useState } from 'react'
import CaptionEntry from './CaptionEntry'
import ImageDrop from './ImageDrop'
import ImagePreview from './ImagePreview'
import { getConfig } from '../config'
import { getOptions } from '../helpers/options'

export default function CaptionGenerator() {

  const [image, setImage] = useState(null)
  const [caption, setCaption] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const handleUpload = event => {
    event.preventDefault()
    if (!image || !caption.text) {
      return
    }
    setError(false)
    setLoading(true)

    const options = getOptions({ caption, image })
    const config = getConfig()
    
    const formData = new FormData()
    formData.append('file', image.originalFile)
    formData.append('upload_preset', config.cloudinary.preset)
    formData.append('timestamp', Date.now() / 1000)
    formData.append('api_key', config.cloudinary.api_key)

    fetch(`https://api.cloudinary.com/v1_1/${config.cloudinary.key}/image/upload`, {
      method: 'POST',
      body: formData,
      redirect: 'follow',
    })
      .then(res => res.json())
      .then(res => {
        const { secure_url } = res
        const image_url = secure_url.replace(`https://res.cloudinary.com/${config.cloudinary.key}/image/upload/`, '')
        const url = `https://res.cloudinary.com/${config.cloudinary.key}/image/upload/${options}/f_webp/${image_url}`
        setImage({ preview: url, processed: true })
      })
      .catch(err => {
        console.log('error', err)
        setError(true)
        setLoading(false)
      })
      .finally(() => setTimeout(() => setLoading(false), 2000))
  }

  const dropFilehandler = originalFile => {
    setError(false)
    const preview = URL.createObjectURL(originalFile)
    const img = new Image()
    img.src = preview
    img.onload = () => {
      const { width, height } = img
      console.log('width', width)
      console.log('height', height)
      setImage({ 
        originalFile,
        preview,
        width,
        height,
        processed: false,
      })
    }
  }

  const clear = (e) => {
    e.preventDefault()
    setError(false)
    setImage(null)
  }

  return (
    <>
      <div className='editContainer'>
        <div>
          <h3></h3>
          {!image && <ImageDrop setImage={dropFilehandler} />}
          {image && <ImagePreview 
            file={image} 
            onLoad={() => setLoading(false)}
            onError={() => setError(true)}
          />}
        </div>
        <div>
          <h3></h3>
          <CaptionEntry setCaption={setCaption} />
        </div>
      </div>
      {(!image || !caption.text) && (
        <p>
          <small>
            <strong>Tip:</strong> Upload an image and add a caption to generate a meme.
          </small>
        </p>
      )}

      {error && (
        <p className='error'>
          There was an error loading the image.<br />
          <strong>May be the Font is not supported.</strong>          
        </p>
      )}

      { loading && <div className='loading'></div>}

      { !loading && (
        <div className='buttons'>
          {(!image || !image.processed) && (
            <button type="submit" onClick={handleUpload} disabled={!image || !caption.text || loading}>
              {loading ? 'Loading...' : 'Generate'}
            </button>
          )}
          {image && (
            <>
              {image.processed && !error && (
                <a
                  download
                  href={image.preview}
                  target="_blank"
                  className="button"
                  rel="noreferrer"
                >
                  Download
                </a>
              )}
              <button className="clear" onClick={clear}>Clear</button>
            </>
          )}
        </div>
      )}
    </>
  )
}
