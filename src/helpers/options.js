import { DEFAULT_POSITION, getMarginPosition, VALID_POSITIONS } from './positions'

const BASE_WIDTH = 400
const MIN_WIDTH = 100
const MAX_WIDTH = 1920
const DEFAULT_FONT = 'Arial'

const DEFAULT_FONT_SIZE = 20
const MIN_FONT_SIZE = 10
const MAX_FONT_SIZE = 100

const DEFAULT_COLOR = '#000000'

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
  return Math.max(MIN_WIDTH, Math.min(MAX_WIDTH, width))
}

function getCaptionOptions(caption, width) {
  if (!caption || !caption.text) {
    throw new Error('Caption is required')
  }
  const text = encodeURIComponent(caption.text)
  const font = encodeURIComponent(caption.font || DEFAULT_FONT)
  const size = getSize(caption.size, width)
  const color = getColor(caption)
  const italic = caption.style === 'italic' ? '_italic' : ''
  const bold = caption.weight === 'bold' ? '_bold' : ''
  const underline = caption.underline ? '_underline' : ''
  const position = getPosition(caption)
  const spacing = getSpacing(caption)
  const opacity = getOpacity(caption)

  const options = `l_text:${font}_${size}${italic}${bold}${underline}${spacing}:${text},co_${color}${opacity}/fl_layer_apply,g_${position}`
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

function getSize(size, width) {
  if (isNaN(size) || !size) {
    size = DEFAULT_FONT_SIZE
  }
  size = size || DEFAULT_FONT_SIZE
  size = Math.max(MIN_FONT_SIZE, Math.min(MAX_FONT_SIZE, size))
  const sizeRatio = width / BASE_WIDTH
  return Math.round(size * sizeRatio)
}

function getPosition(caption) {
  if (!VALID_POSITIONS.includes(caption.position) || !caption.position) {
    return DEFAULT_POSITION
  }
  const [x, y] = getMarginPosition(caption.position)
  if (x > 0) {
    caption.position = `${caption.position},x_${x}`
  }
  if (y > 0) {
    caption.position = `${caption.position},y_${y}`
  }
  return caption.position
}

function getSpacing(caption) {
  if (isNaN(caption.letterSpacing)) {
    return ''
  }
  const spacing = Math.max(MIN_LETTER_SPACING, Math.min(MAX_LETTER_SPACING, caption.letterSpacing))
  return `_letter_spacing_${spacing}`
}

function getOpacity(caption) {
  if (isNaN(caption.opacity) || !caption.opacity) {
    return ''
  }
  const opacity = Math.max(0, Math.min(100, caption.opacity))
  return `,o_${opacity}`
}