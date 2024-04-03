import './App.css'
import Header from './components/header/Header'
import SearchWeather from './components/SearchWeather/SearchWeather'
import LocationData from './components/locationData/LocationData'
import WeatherCard from './components/weatherCard/WeatherCard'
import { ContextProvider } from './context/AppContext'
function App() {


  return (
    <>
      <ContextProvider>
        <div className='app-container'>
          <main className='main-element'>
            <section className='right-section'>
              <div className='right-card'>
                <Header />
                <SearchWeather />
                <LocationData />
              </div>
            </section>
            <section className='left-section'>
              <WeatherCard />
            </section>
          </main>
        </div>
      </ContextProvider>
    </>
  )
}

export default App
