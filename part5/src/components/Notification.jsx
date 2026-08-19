export default function Notification({ notification }) {
  if (!notification) return null
  return <div className={`notification ${notification.type || 'success'}`} role="status">{notification.message}</div>
}
