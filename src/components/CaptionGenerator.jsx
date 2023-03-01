import React from 'react'
import { useState } from 'react'
import CaptionEntry from './CaptionEntry'
import ImageDrop from './ImageDrop'
import ImagePreview from './ImagePreview'
import { config } from '../config'

export default function CaptionGenerator() {

  const [image, setImage] = useState(null)
  const [caption, setCaption] = useState('')
  const [loading, setLoading] = useState(false)

  const handleUpload = event => {
    event.preventDefault()
    if (!image || !caption.text) {
      return
    }
    setLoading(true)

    const text = encodeURIComponent(caption.text)
    const font = encodeURIComponent(caption.font)
    const size = Math.max(10, Math.min(100, caption.size))
    const color = caption.color.replace('#', 'rgb:')
    const options = `l_text:${font}_${size}:${text},co_${color}/fl_layer_apply,g_${caption.position},y_0.05`

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
        const url = `https://res.cloudinary.com/${config.cloudinary.key}/image/upload/c_thumb,g_face,h_400,w_400/${options}/f_webp/${image_url}`
        setImage({ preview: url, processed: true })
      })
      .catch(err => console.log('error', err))
      .finally(() => setLoading(false))
  }

  const dropFilehandler = originalFile => {
    setImage({
      originalFile,
      preview: URL.createObjectURL(originalFile),
      processed: false,
    })
  }

  const clear = (e) => {
    e.preventDefault()
    setImage(null)
  }

  return (
    <>
      <div className='editContainer'>
        <div>
          <h3></h3>
          {!image && <ImageDrop setImage={dropFilehandler} />}
          {image && <ImagePreview file={image} />}
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
      <div className='buttons'>
        {(!image || !image.processed) && (
          <button type="submit" onClick={handleUpload} disabled={!image || !caption.text || loading}>
            {loading ? 'Loading...' : 'Generate'}
          </button>
        )}
        {image && (
          <>
            {image.processed && (
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
    </>
  )
}
