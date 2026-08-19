import { useState } from 'react'
export default function useField(type, options = {}) {
  const [value, setValue] = useState('')
  return {
    input: { type, value, onChange: (event) => setValue(event.target.value), ...options },
    reset: () => setValue(''),
  }
}
