import { createContext, useContext, useReducer } from 'react'
const NotificationContext = createContext()
const reducer = (_state, action) => action.type === 'CLEAR' ? '' : action.payload
export function NotificationProvider({ children }) {
  const [notification, dispatch] = useReducer(reducer, '')
  const notify = (message) => { dispatch({ type: 'SHOW', payload: message }); window.setTimeout(() => dispatch({ type: 'CLEAR' }), 5000) }
  return <NotificationContext.Provider value={{ notification, notify }}>{children}</NotificationContext.Provider>
}
export const useNotification = () => useContext(NotificationContext)
