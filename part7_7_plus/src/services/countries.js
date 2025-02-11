import axios from 'axios'

const baseURL = 'https://studies.cs.helsinki.fi/restcountries/api'


export const getCountries = () => 
    axios.get(`${baseURL}/all`).then(res => res.data)

export const getCountryByName = (name, setCountry) => 
    axios.get(`${baseURL}/name/${name}`)
    .then( res => setCountry({ ... res.data, found: true }))
    .catch(function (error) {
        setCountry( {found: false} )
    })