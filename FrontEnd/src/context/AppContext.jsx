import { createContext, useState } from "react";

export const AppContext = createContext({
    weatherData: '',
    setWeatherData: () => { },
    city: "",
    setCity: () => { },

});

export const ContextProvider = ({ children }) => {

    const [weatherData, setWeatherData] = useState('');
    const [city, setCity] = useState("")

    const contextValue = {
        weatherData,
        setWeatherData,
        city,
        setCity,
    };
    return (
        <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
    );
};
