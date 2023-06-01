import axios from 'axios'
const url = 'https://studies.cs.helsinki.fi/restcountries/'
const api_key = process.env.REACT_APP_API_KEY


const getAll = () => {
    const request = axios.get(`${url}/api/all`)
    return request.then(response => response.data)
}

const getWeather = (city) => {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`
    const request = axios.get(weatherUrl)
    return request.then(response => response.data)
}

export default {getAll, getWeather}