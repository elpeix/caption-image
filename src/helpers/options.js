const BASE_WIDTH = 400
const MIN_WIDTH = 100
const MAX_WIDTH = 1000
const DEFAULT_FONT = 'Arial'

const DEFAULT_FONT_SIZE = 20
const MIN_FONT_SIZE = 10
const MAX_FONT_SIZE = 100

const DEFAULT_COLOR = '#000000'
const DEFAULT_POSITION = 'north'

const MIN_LETTER_SPACING = 0
const MAX_LETTER_SPACING = 10

export function getOptions({ caption, image }) {
  if (!caption || !image) {
    throw new Error('Caption and image are required')
  }
  const width = getWidth(image.width)
  const imageOptions = getImageOptions(image, width)
  const captionOptions = getCaptionOptions(caption, width)

  return `${imageOptions}/${captionOptions}`
}

function getImageOptions(image, width) {
  const imageOptions = `c_scale,w_${width}`
  return imageOptions
}

function getWidth(width) {
  width = width || BASE_WIDTH
  width = Math.max(MIN_WIDTH, Math.min(MAX_WIDTH, width))
  return width
}

function getCaptionOptions(caption, width) {
  if (!caption || !caption.text) {
    throw new Error('Caption is required')
  }
  const text = encodeURIComponent(caption.text)
  const font = encodeURIComponent(caption.font || DEFAULT_FONT)
  const size = getSize(caption, width)
  const color = getColor(caption)
  const italic = caption.style === 'italic' ? '_italic' : ''
  const bold = caption.weight === 'bold' ? '_bold' : ''
  const underline = caption.underline ? '_underline' : ''
  const position = getPosition(caption)
  const spacing = getSpacing(caption)

  const options = `l_text:${font}_${size}${italic}${bold}${underline}${spacing}:${text},co_${color}/fl_layer_apply,g_${position},y_0.05`
  return options
}

function getColor(caption) {
  let color = (caption.color || DEFAULT_COLOR).toLowerCase()
  if (color.length !== 7 || color.indexOf('#') !== 0) {
    color = DEFAULT_COLOR
  }
  Array.from(color.slice(1)).forEach((char) => {
    if (char < '0' || char > 'f') {
      color = DEFAULT_COLOR
    }
  })
  return color.replace('#', 'rgb:')
}

function getSize(caption, width) {
  if (isNaN(caption.size)) {
    return DEFAULT_FONT_SIZE
  }
  const size = caption.size || DEFAULT_FONT_SIZE
  const sizeRatio = width / BASE_WIDTH
  return Math.round(Math.max(MIN_FONT_SIZE, Math.min(MAX_FONT_SIZE, size)) * sizeRatio)
}

function getPosition(caption) {
  const positions = ['north', 'south', 'east', 'west', 'north_east', 'north_west', 'south_east', 'south_west', 'center']
  if (!positions.includes(caption.position)) {
    return DEFAULT_POSITION
  }
  return caption.position || DEFAULT_POSITION
}

function getSpacing(caption) {
  if (isNaN(caption.letterSpacing)) {
    return ''
  }
  const spacing = Math.max(MIN_LETTER_SPACING, Math.min(MAX_LETTER_SPACING, caption.letterSpacing))
  return `_letter_spacing_${spacing}`
}
