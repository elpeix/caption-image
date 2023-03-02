import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig(({mode}) => {
  // eslint-disable-next-line no-undef
  const env = loadEnv(mode, process.cwd())
  return {
    plugins: [react()],
    define: {
      'process.env': env
    }
  }
})
