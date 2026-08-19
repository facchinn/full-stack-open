import { useNotification } from '../context/NotificationContext'
export default function Notification() { const { notification } = useNotification(); return notification ? <div className={`notification ${notification.type}`}>{notification.message}</div> : null }
