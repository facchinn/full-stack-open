import { useEffect, useState } from 'react'
import axios from 'axios'
export default function useCountry(name) {
  const [country, setCountry] = useState(null)
  useEffect(() => {
    if (!name) return setCountry(null)
    axios.get(`https://restcountries.com/v3.1/name/${encodeURIComponent(name)}?fullText=true`)
      .then((response) => setCountry({ found: true, data: response.data[0] }))
      .catch(() => setCountry({ found: false }))
  }, [name])
  return country
}
