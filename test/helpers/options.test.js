import { describe, expect, it } from 'vitest'
import { getOptions  } from '../../src/helpers/options'

describe('options', () => {
  it('should throw error if caption is not provided', () => {
    expect(() => getOptions({})).toThrow()
  })

  it('should throw error if caption.text is not provided', () => {
    expect(() => getOptions({ caption: {} })).toThrow()
    expect(() => getOptions({ caption: {text: ''} })).toThrow()
  })

  it('should throw error if image is not provided', () => {
    expect(() => getOptions({ caption: { text: 'Hello World' } })).toThrow()
  })

  it('should return correct default options', () => {
    expect(getOptions({
      caption: {
        text: 'Hello World'
      },
      image: {}
    })).toBe('c_scale,w_400/l_text:Arial_20:Hello%20World,co_rgb:000000/fl_layer_apply,g_north,y_0.05')
  })

  it('should return correct options with custom font', () => {
    expect(getOptions({
      caption: {
        text: 'Hello World',
        font: 'Times New Roman'
      },
      image: {}
    })).toBe('c_scale,w_400/l_text:Times%20New%20Roman_20:Hello%20World,co_rgb:000000/fl_layer_apply,g_north,y_0.05')
  })

  it('should return correct options with custom font size', () => {
    expect(getOptions({
      caption: {
        text: 'Hello World',
        size: 30
      },
      image: {}
    })).toBe('c_scale,w_400/l_text:Arial_30:Hello%20World,co_rgb:000000/fl_layer_apply,g_north,y_0.05')
  })

  it('should return max font size when size is greater than max', () => {
    expect(getOptions({
      caption: {
        text: 'Hello World',
        size: 101
      },
      image: {}
    })).toBe('c_scale,w_400/l_text:Arial_100:Hello%20World,co_rgb:000000/fl_layer_apply,g_north,y_0.05')
  })

  it('should return min font size when size is less than min', () => {
    expect(getOptions({
      caption: {
        text: 'Hello World',
        size: 9
      },
      image: {}
    })).toBe('c_scale,w_400/l_text:Arial_10:Hello%20World,co_rgb:000000/fl_layer_apply,g_north,y_0.05')
  })

  it('should return default font size when size is not a number', () => {
    expect(getOptions({
      caption: {
        text: 'Hello World',
        size: 'invalid'
      },
      image: {}
    })).toBe('c_scale,w_400/l_text:Arial_20:Hello%20World,co_rgb:000000/fl_layer_apply,g_north,y_0.05')
  })

  it('should return correct options with custom color', () => {
    expect(getOptions({
      caption: {
        text: 'Hello World',
        color: '#ffffFF'
      },
      image: {}
    })).toBe('c_scale,w_400/l_text:Arial_20:Hello%20World,co_rgb:ffffff/fl_layer_apply,g_north,y_0.05')
  })

  it('should return default color when color is invalid', () => {
    expect(getOptions({
      caption: {
        text: 'Hello World',
        color: 'invalid'
      },
      image: {}
    })).toBe('c_scale,w_400/l_text:Arial_20:Hello%20World,co_rgb:000000/fl_layer_apply,g_north,y_0.05')
  })

  it('should return default color when color is invalid', () => {
    expect(getOptions({
      caption: {
        text: 'Hello World',
        color: '#ffffgf'
      },
      image: {}
    })).toBe('c_scale,w_400/l_text:Arial_20:Hello%20World,co_rgb:000000/fl_layer_apply,g_north,y_0.05')
  })

  it('should return correct options with custom position', () => {
    expect(getOptions({
      caption: {
        text: 'Hello World',
        position: 'south'
      },
      image: {}
    })).toBe('c_scale,w_400/l_text:Arial_20:Hello%20World,co_rgb:000000/fl_layer_apply,g_south,y_0.05')
  })

  it('should return default position when position is invalid', () => {
    expect(getOptions({
      caption: {
        text: 'Hello World',
        position: 'invalid'
      },
      image: {}
    })).toBe('c_scale,w_400/l_text:Arial_20:Hello%20World,co_rgb:000000/fl_layer_apply,g_north,y_0.05')
  })

  it('should return correct options with custom style', () => {
    expect(getOptions({
      caption: {
        text: 'Hello World',
        style: 'italic'
      },
      image: {}
    })).toBe('c_scale,w_400/l_text:Arial_20_italic:Hello%20World,co_rgb:000000/fl_layer_apply,g_north,y_0.05')
  })

  it('should return correct options with custom weight', () => {
    expect(getOptions({
      caption: {
        text: 'Hello World',
        weight: 'bold'
      },
      image: {}
    })).toBe('c_scale,w_400/l_text:Arial_20_bold:Hello%20World,co_rgb:000000/fl_layer_apply,g_north,y_0.05')
  })

  it('should return correct options with custom underline', () => {
    expect(getOptions({
      caption: {
        text: 'Hello World',
        underline: true
      },
      image: {}
    })).toBe('c_scale,w_400/l_text:Arial_20_underline:Hello%20World,co_rgb:000000/fl_layer_apply,g_north,y_0.05')
  })

  it('should return correct options with custom letter spacing', () => {
    expect(getOptions({
      caption: {
        text: 'Hello World',
        letterSpacing: 10
      },
      image: {}
    })).toBe('c_scale,w_400/l_text:Arial_20_letter_spacing_10:Hello%20World,co_rgb:000000/fl_layer_apply,g_north,y_0.05')
  })

  it('should return min letter spacing when spacing is less than min', () => {
    expect(getOptions({
      caption: {
        text: 'Hello World',
        letterSpacing: -1
      },
      image: {}
    })).toBe('c_scale,w_400/l_text:Arial_20_letter_spacing_0:Hello%20World,co_rgb:000000/fl_layer_apply,g_north,y_0.05')
  })

  it('should return max letter spacing when spacing is greater than max', () => {
    expect(getOptions({
      caption: {
        text: 'Hello World',
        letterSpacing: 11
      },
      image: {}
    })).toBe('c_scale,w_400/l_text:Arial_20_letter_spacing_10:Hello%20World,co_rgb:000000/fl_layer_apply,g_north,y_0.05')
  })
})