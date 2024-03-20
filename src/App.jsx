import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import WeatherCard from './components/WeatherCard'


function App() {

  const [coords, setCoords] = useState()
  const [weather, setWeather] = useState()
  const [temp, setTemp] = useState({})

  const success = info => {
    setCoords({
      lat: info.coords.latitude,
      lon: info.coords.longitude,
    })
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success)
  }, [])
  
  useEffect(() => {
    if(coords) {
      const APIKEY = 'a049ca36fa5fea2558e60c35a5622bc5'
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${APIKEY}`

      axios.get(url)
        .then(res => {
          setWeather(res.data)
          const celcius = (res.data.main.temp - 273.15).toFixed(1)
          const fahrenheit = ((9/5) * celcius + 32).toFixed(1)
          setTemp({
            celcius,
            fahrenheit,
          })
        })
        .catch(err => console.log(err))
    }
  }, [coords])

  return (
    <div className='app--contaniner'>
      <WeatherCard
        weather={weather}
        temp={temp}
      />
    </div>
  )
}

export default App;