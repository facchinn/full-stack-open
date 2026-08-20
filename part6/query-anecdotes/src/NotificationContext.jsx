import { createContext, useContext, useEffect, useRef, useState } from 'react'

const NotificationContext = createContext()

export const NotificationContextProvider = ({ children }) => {
  const [notification, setNotification] = useState('')
  const timer = useRef()

  const notify = (message, seconds = 5) => {
    clearTimeout(timer.current)
    setNotification(message)
    timer.current = setTimeout(() => {
      setNotification('')
    }, seconds * 1000)
  }

  useEffect(() => () => clearTimeout(timer.current), [])

  return (
    <NotificationContext.Provider value={{ notification, notify }}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotification = () => {
  const context = useContext(NotificationContext)
  return context.notification
}

export const useNotify = () => {
  const context = useContext(NotificationContext)
  return context.notify
}

export default NotificationContext
