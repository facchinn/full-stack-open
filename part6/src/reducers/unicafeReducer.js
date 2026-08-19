export const initialState = { good: 0, ok: 0, bad: 0 }
export default function unicafeReducer(state = initialState, action) {
  if (action.type === 'ZERO') return initialState
  if (['GOOD', 'OK', 'BAD'].includes(action.type)) {
    const key = action.type.toLowerCase()
    return { ...state, [key]: state[key] + 1 }
  }
  return state
}
