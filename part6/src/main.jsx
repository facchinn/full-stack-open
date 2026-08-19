import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App'
import store from './store'
import { NotificationProvider } from './context/NotificationContext'
import './styles.css'

const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')).render(<Provider store={store}><QueryClientProvider client={queryClient}><NotificationProvider><App /></NotificationProvider></QueryClientProvider></Provider>)
