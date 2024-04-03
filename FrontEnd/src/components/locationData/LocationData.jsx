import { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import "./locationData.css"

function LocationData() {
    const { weatherData } = useContext(AppContext)

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
            <div className='location-card'>
                <div className='location-box'>
                    <span>Latitude: {weatherData.latitude}</span>
                    <span>Longitude: {weatherData.longitude}</span>
                    <span>accurate to {formattedDate}</span>
                </div>
            </div>
        </>
    )
}

export default LocationData