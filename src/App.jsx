import React from 'react'
import './App.css'
import CaptionGenerator from './components/CaptionGenerator'

function App() {
  return (
    <>
      <header>
        <h1>Caption image</h1>
      </header>
      <main>
        <section className="intro">
          <p>
            This is a simple app to generate a caption image.
            You can upload an image and add a caption to it.
          </p>
          <p>
            <small>
              In some cases, the image may not be generated. In that case, you can
              try again with a different image, font or size.
            </small>
          </p>
        </section>
        <CaptionGenerator />
      </main>
      <footer>
        <p>
          {new Date().getFullYear()} {' - '}
          <a href="https://github.com/elpeix" target="_blank" rel="noreferrer">
            elPeix
          </a>
        </p>
      </footer>
    </>
  )
}

export default App
