import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App'
import { NotificationProvider } from './context/NotificationContext'
import './styles.css'

const client = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')).render(<QueryClientProvider client={client}><NotificationProvider><BrowserRouter><App /></BrowserRouter></NotificationProvider></QueryClientProvider>)
