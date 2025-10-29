import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <h1 className='text-2xl font-black'>Hola Mundo UpTask</h1>
  </StrictMode>,
)
