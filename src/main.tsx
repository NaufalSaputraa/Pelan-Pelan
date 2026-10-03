import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { applyReadingMode, readStoredReadingMode } from './hooks/useReadingMode'

// Mount prefs mode baca (Warm/Light) SEBELUM render pertama. Kalau ini
// ditunda ke useEffect, halaman akan berkedip dari warm ke light setiap kali
// dibuka. `readStoredReadingMode()` selalu mengembalikan nilai yang valid, jadi
// storage kosong / rusak tidak masalah.
applyReadingMode(readStoredReadingMode())

const root = document.getElementById('root')
if (!root) throw new Error('Elemen #root tidak ditemukan di index.html')

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
)