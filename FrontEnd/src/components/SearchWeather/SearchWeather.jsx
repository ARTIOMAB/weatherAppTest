import { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { AppContext } from '../../context/AppContext';
import "./searchWeather.css"

function SearchWeather() {

    const { handleSubmit, register, reset, formState: { errors } } = useForm();
    const { weatherData, setWeatherData, city, setCity } = useContext(AppContext);


    const fetchWeatherData = async (city) => {
        try {
            if (city) {
                const weatherResponse = await axios.get(`http://localhost:5000/weather?city=${city}`);
                const weatherData = weatherResponse.data;
                setWeatherData(weatherData);

            }
        } catch (error) {
            console.error('Error fetching weather data:', error.message);
        }
    };

    const onSubmit = async (data) => {
        try {
            const autoCompleteCheck = await axios.get(`http://localhost:5000/autocomplete?query=${data.city}`)
            const cities = autoCompleteCheck.data
            const firstMatchedCity = cities[0]
            const cityName = firstMatchedCity.name
            console.log(firstMatchedCity.name)

            setCity(cityName)
            reset()
        }
        catch (error) {
            console.error('Error:', error.message);
        }
    }
    useEffect(() => {
        fetchWeatherData(city || "tel-aviv");
    }, [city, setWeatherData]);

    useEffect(() => {
        if (weatherData) {
            console.log(weatherData);
        }
    }, [weatherData]);



    return (
        <>
            <div className='search-input-box'>
                <form onSubmit={handleSubmit(onSubmit)} >
                    <label htmlFor="search-input">City name</label>
                    <div className='input-button'>
                        <input type="text" name='city' id='search-input' placeholder='  Tel Aviv' {...register('city', { required: true, minLength: 2, maxLength: 15 })} />
                        <button type='submit'>Check</button>
                    </div>
                    {errors.city && (
                        <span className="input-error-massage">The city not found</span>
                    )}
                </form>
            </div>
        </>
    )
}

export default SearchWeather