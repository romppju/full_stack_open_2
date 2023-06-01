import { useEffect, useState } from "react"
import countriesService from './services/countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState(null)
  const [weatherData, setWeatherData] = useState(null)

  useEffect(() => { 
    countriesService
      .getAll()
      .then(data => {
        
        setCountries(data)
      })
  }, [])

  useEffect(() => {
    //console.log('In useEffect')
    if (countriesToShow.length === 1) {
      countriesService
      .getWeather(countriesToShow[0].capital[0])
      .then(data => {
        setWeatherData(data)
        //console.log(data)      
      })
    }
  }, [newFilter])

  
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const handleShowClick = (name) => {
    setNewFilter(name)
  }

  const countriesToShow = !newFilter ?
    []: countries.filter(country =>
      country.name.common.toLowerCase().includes(newFilter.toLowerCase()))


  return (
    <div>
      <Filter text="find countries" handleChange={handleFilterChange} />
      <CountryList countries={countriesToShow} handleClick={handleShowClick}
       weather={weatherData}/>
    </div>   
  )
}

const Filter = ({handleChange, text}) => {
  return (
  <div>
    {text} <input onChange={handleChange}/>
  </div>
  )
}

const Weather = ({weather}) => {
 
  if (weather) {
    const iconCode = weather.weather[0].icon
    const altText = weather.weather[0].description
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`

    return (
    <div>
      <h3>Weather in {weather.name}</h3>
      <p>temperature {(weather.main.temp-273.15).toFixed(2)} Celsius</p>
      <img src={iconUrl} alt={altText} />
      <p>wind {(weather.wind.speed).toFixed(2)} m/s</p>
    </div>
    )
  }
}

const CountryDetails = ({country, weather}) => {
  return (
    <div>
        <h2>{country.name.common}</h2>
        <p>capital: {country.capital[0]}</p>
        <p>area: {country.area}</p>
        <h3>languages:</h3>
        <ul>
          {Object.entries(country.languages).map(e =>
             <li key={e[0]}>{e[1]}</li>
          )}
        </ul>
        <img src={country.flags.png} alt={country.flags.alt} />
        <Weather weather={weather} />
      </div>
  )
}

const CountryList = ({countries, handleClick, weather}) => {
  
  if (countries.length === 1) {
    const c = countries[0]
    return (
      <div>
        <CountryDetails country={c} weather={weather}/>
      </div>     
    )
  } else if (countries.length < 11) {
    return (
      <div>
        {countries.map(c =>
          <div key={c.name.common}>
            {c.name.common}
            <button type='button' onClick={() =>
              handleClick(c.name.common)}>show</button>
          </div>)}
      </div>    
    )

  } else {
    return (
      <div>Too many matches, specify another filter</div>
    )
  }
}

export default App