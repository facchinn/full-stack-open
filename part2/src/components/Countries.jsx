import { useEffect, useState } from 'react'
import axios from 'axios'

const Country = ({ country }) => {
  const [weather, setWeather] = useState(null)
  const capital = country.capital?.[0]
  const coordinates = country.capitalInfo?.latlng

  useEffect(() => {
    if (!coordinates) return
    const [latitude, longitude] = coordinates
    axios.get('https://api.open-meteo.com/v1/forecast', {
      params: { latitude, longitude, current: 'temperature_2m,wind_speed_10m,weather_code' },
    }).then((response) => setWeather(response.data.current)).catch(() => setWeather(null))
  }, [coordinates])

  return (
    <article className="country-card panel">
      <header>
        <img src={country.flags.svg} alt={country.flags.alt || `Flag of ${country.name.common}`} />
        <div><p className="eyebrow">{country.cca3}</p><h2>{country.name.common}</h2><p>{country.region}</p></div>
      </header>
      <dl>
        <div><dt>Capital</dt><dd>{capital || '—'}</dd></div>
        <div><dt>Area</dt><dd>{country.area.toLocaleString()} km²</dd></div>
        <div><dt>Population</dt><dd>{country.population.toLocaleString()}</dd></div>
      </dl>
      <h3>Languages</h3>
      <div className="chips">{Object.values(country.languages || {}).map((language) => <span key={language}>{language}</span>)}</div>
      {weather && <div className="weather"><strong>{weather.temperature_2m} °C</strong><span>{capital} · wind {weather.wind_speed_10m} km/h</span></div>}
    </article>
  )
}

export default function Countries() {
  const [countries, setCountries] = useState([])
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all?fields=name,capital,area,languages,flags,population,region,cca3,capitalInfo')
      .then((response) => setCountries(response.data))
  }, [])

  const matches = countries.filter((country) => country.name.common.toLowerCase().includes(query.toLowerCase()))
  const detail = selected || (matches.length === 1 ? matches[0] : null)

  return (
    <section>
      <div className="page-title"><p>2.18—2.20</p><h1>Data for countries</h1></div>
      <label className="search-box">Find countries<input value={query} onChange={(event) => { setQuery(event.target.value); setSelected(null) }} placeholder="Try Finland…" /></label>
      {detail ? <Country country={detail} /> : matches.length > 10 ? (
        <p className="hint">Too many matches. Make your query more specific.</p>
      ) : (
        <div className="country-list">{matches.map((country) => <button key={country.cca3} onClick={() => setSelected(country)}><img src={country.flags.svg} alt="" /><span>{country.name.common}</span><small>Show →</small></button>)}</div>
      )}
    </section>
  )
}
