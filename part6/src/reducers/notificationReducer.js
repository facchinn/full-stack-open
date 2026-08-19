import { createSlice } from '@reduxjs/toolkit'
const notificationSlice = createSlice({ name: 'notification', initialState: '', reducers: { show: (_state, action) => action.payload, clear: () => '' } })
const { show, clear } = notificationSlice.actions
let timer
export const setNotification = (message, seconds = 5) => (dispatch) => {
  window.clearTimeout(timer)
  dispatch(show(message))
  timer = window.setTimeout(() => dispatch(clear()), seconds * 1000)
}
export default notificationSlice.reducer
