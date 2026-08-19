import { useEffect, useState } from 'react'
import axios from 'axios'

const Country = ({ country }) => {
  const [weather, setWeather] = useState(null)
  const capital = country.capital?.[0]
  const coordinates = country.capitalInfo?.latlng

  useEffect(() => {
    if (!coordinates) {
      setWeather(null)
      return
    }

    const [latitude, longitude] = coordinates

    axios
      .get('https://api.open-meteo.com/v1/forecast', {
        params: {
          latitude,
          longitude,
          current: 'temperature_2m,wind_speed_10m',
        },
      })
      .then((response) => setWeather(response.data.current))
      .catch(() => setWeather(null))
  }, [coordinates])

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital {capital}</p>
      <p>area {country.area}</p>

      <h2>languages</h2>
      <ul>
        {Object.values(country.languages || {}).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>

      <img
        src={country.flags.png}
        alt={country.flags.alt || `Flag of ${country.name.common}`}
        width="160"
      />

      <h2>Weather in {capital}</h2>
      {weather ? (
        <div>
          <p>temperature {weather.temperature_2m} °C</p>
          <p>wind {weather.wind_speed_10m} km/h</p>
        </div>
      ) : (
        <p>Weather data is not available.</p>
      )}
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then((response) => setCountries(response.data))
  }, [])

  const handleSearch = (event) => {
    setSearch(event.target.value)
    setSelectedCountry(null)
  }

  const matchingCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(search.toLowerCase()),
  )

  const countryToShow = selectedCountry
    || (matchingCountries.length === 1 ? matchingCountries[0] : null)

  return (
    <div>
      <div>
        find countries <input value={search} onChange={handleSearch} />
      </div>

      {countryToShow ? (
        <Country country={countryToShow} />
      ) : matchingCountries.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : (
        <div>
          {matchingCountries.map((country) => (
            <p key={country.cca3}>
              {country.name.common}{' '}
              <button type="button" onClick={() => setSelectedCountry(country)}>
                show
              </button>
            </p>
          ))}
        </div>
      )}
    </div>
  )
}

export default App
