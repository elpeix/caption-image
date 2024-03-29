export function getConfig() {
  return {
    cloudinary: {
      // eslint-disable-next-line no-undef
      key: process.env.VITE_CLOUDINARY_CLOUD_NAME,
      // eslint-disable-next-line no-undef
      preset: process.env.VITE_CLOUDINARY_PRESET,
      // eslint-disable-next-line no-undef
      api_key: process.env.VITE_CLOUDINARY_API_KEY
    }
  }
}
