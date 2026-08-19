import { createContext, useContext, useReducer } from 'react'
const Context = createContext()
function reducer(state, action) {
  if (action.type === 'CLEAR') return null
  return { message: action.message, type: action.kind || 'success', id: state?.id + 1 || 1 }
}
export function NotificationProvider({ children }) {
  const [notification, dispatch] = useReducer(reducer, null)
  const notify = (message, kind) => { dispatch({ type: 'SHOW', message, kind }); window.setTimeout(() => dispatch({ type: 'CLEAR' }), 4000) }
  return <Context.Provider value={{ notification, notify }}>{children}</Context.Provider>
}
export const useNotification = () => useContext(Context)
