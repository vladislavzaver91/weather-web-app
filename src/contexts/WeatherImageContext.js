import React, { createContext, useCallback, useContext, useState } from 'react';
import { Clear_sky, Clear_sky_night, Mist, Rain, Scattered_clouds, Broken_clouds, Few_clouds, Few_clouds_night, Shower_rain, Snow, Snow_night, Thunderstorm } from 'images';

export const WeatherImageContext = createContext();

export const WeatherImageProvider = ({ children }) => {
    const [weatherImages] = useState({
        '01d': Clear_sky,
        '01n': Clear_sky_night,
        '02d': Few_clouds,
        '02n': Few_clouds_night,
        '03d': Scattered_clouds,
        '03n': Scattered_clouds,
        '04d': Broken_clouds,
        '04n': Broken_clouds,
        '09d': Shower_rain,
        '09n': Shower_rain,
        '10d': Rain,
        '10n': Rain,
        '11d': Thunderstorm,
        '11n': Thunderstorm,
        '13d': Snow,
        '13n': Snow_night,
        '50d': Mist,
        '50n': Mist,
    });

    const [currentWeatherCode, setCurrentWeatherCode] = useState('');

    const updateCurrentWeatherCode = useCallback((newWeatherCode) => {
        console.log('Updating currentWeatherCode:', newWeatherCode);
        setCurrentWeatherCode(newWeatherCode);
    }, []);

    return (
        <WeatherImageContext.Provider value={{weatherImages, currentWeatherCode, updateCurrentWeatherCode}}>
            {children}
        </WeatherImageContext.Provider>
    );
};

export const useWeatherImages = () => {
    return useContext(WeatherImageContext);
};
