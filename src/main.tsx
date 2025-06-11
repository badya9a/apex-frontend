import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import MainProvider from './MainProvider'
import './assets/styles/index.css'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<MainProvider />
	</StrictMode>
)
