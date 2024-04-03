import { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import "./weatherCard.css"

function WeatherCard() {
    const { weatherData } = useContext(AppContext)
    const { city, country, temp, condition, precipitation, humidity, wind, temperatures } = weatherData

    const temp13 = temperatures && Math.floor(temperatures.weatherAt13);
    const temp14 = temperatures && Math.floor(temperatures.weatherAt14)
    const temp15 = temperatures && Math.floor(temperatures.weatherAt15)
    const temp16 = temperatures && Math.floor(temperatures.weatherAt16)
    const temp17 = temperatures && Math.floor(temperatures.weatherAt17)



    function formatDate(inputDate) {
        const date = new Date(inputDate);

        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear() % 100;
        const hours = date.getHours();
        const minutes = date.getMinutes();

        const formattedDate = `${day}/${month}/${year} at ${hours}:${minutes < 10 ? '0' : ''}${minutes}`;

        return formattedDate;
    }

    const inputDate = weatherData.date
    const formattedDate = formatDate(inputDate);
    return (
        <>
            <div className='weather-container'>
                <div className='weather-card-visual'>
                    <section className='weather-card-header'>
                        <div className='weather-card-date-city'>
                            <h2>{city}</h2>
                            <h3>{country}</h3>
                            <h4>{formattedDate}</h4>

                        </div>
                        <div className='weather-card-temp'>
                            <span className='temp-num'>{temp}&deg;</span>
                            <span className='temp-condition'>{condition}</span>
                        </div>
                    </section>
                    <section className='weather-card-body'>
                        <div className='weather-card-data'>
                            <span className='precipitation'>precipitation</span>
                            <span className='humidity'>humidity</span>
                            <span className='wind'>wind</span>
                            <span>{precipitation} mm </span>
                            <span>{humidity}%</span>
                            <span>{wind} km/h</span>
                        </div>
                        <div className='weather-card-hours-temp'>
                            <span className='temp13'>13:00</span>
                            <span className='temp14'>14:00</span>
                            <span className='temp15'>15:00</span>
                            <span className='temp16'>16:00</span>
                            <span className='temp17'>17:00</span>
                            <span>{temp13}&deg;</span>
                            <span>{temp14}&deg;</span>
                            <span>{temp15}&deg;</span>
                            <span>{temp16}&deg;</span>
                            <span>{temp17}&deg;</span>
                        </div>
                    </section>
                </div>
            </div>
        </>

    )
}

export default WeatherCard