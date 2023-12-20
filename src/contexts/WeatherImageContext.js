import React, { createContext, useCallback, useContext, useState } from 'react';
import {
    Clear_sky,
    Clear_sky_night,
    Mist,
    Rain,
    Scattered_clouds,
    Broken_clouds,
    Few_clouds,
    Few_clouds_night,
    Shower_rain,
    Snow,
    Snow_night,
    Thunderstorm,
    Mob_Clear_sky,
    Mob_Clear_sky_night,
    Mob_Few_clouds,
    Mob_Few_clouds_night,
    Mob_Scattered_clouds,
    Mob_Broken_clouds,
    Mob_Shower_rain,
    Mob_Rain,
    Mob_Thunderstorm,
    Mob_Snow,
    Mob_Snow_night,
    Mob_Mist,
    Tab_Clear_sky,
    Tab_Clear_sky_night,
    Tab_Few_clouds,
    Tab_Few_clouds_night,
    Tab_Scattered_clouds,
    Tab_Broken_clouds,
    Tab_Shower_rain,
    Tab_Rain,
    Tab_Thunderstorm,
    Tab_Snow,
    Tab_Snow_night,
    Tab_Mist
} from 'images';
import {
    Clear_sky_icon,
    Clear_sky_night_icon,
    Clouds_icon,
    Few_clouds_icon,
    Few_clouds_night_icon,
    Mist_day_icon,
    Mist_night_icon,
    Rain_icon,
    Shower_rain_icon,
    Snow_icon,
    Thunderstorm_icon,
} from 'images/icons';

export const WeatherImageContext = createContext();

export const useWeatherImage = () => {
    const value = useContext(WeatherImageContext);

    if (!value) {
        throw new Error('Context error')
    }

    return value;
};

export const WeatherImageProvider = ({ children }) => {
    const [weatherImages] = useState({
        desktopImages: {
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
        },
        tabletImages: {
            '01d': Tab_Clear_sky,
            '01n': Tab_Clear_sky_night,
            '02d': Tab_Few_clouds,
            '02n': Tab_Few_clouds_night,
            '03d': Tab_Scattered_clouds,
            '03n': Tab_Scattered_clouds,
            '04d': Tab_Broken_clouds,
            '04n': Tab_Broken_clouds,
            '09d': Tab_Shower_rain,
            '09n': Tab_Shower_rain,
            '10d': Tab_Rain,
            '10n': Tab_Rain,
            '11d': Tab_Thunderstorm,
            '11n': Tab_Thunderstorm,
            '13d': Tab_Snow,
            '13n': Tab_Snow_night,
            '50d': Tab_Mist,
            '50n': Tab_Mist,
        },
        mobileImages: {
            '01d': Mob_Clear_sky,
            '01n': Mob_Clear_sky_night,
            '02d': Mob_Few_clouds,
            '02n': Mob_Few_clouds_night,
            '03d': Mob_Scattered_clouds,
            '03n': Mob_Scattered_clouds,
            '04d': Mob_Broken_clouds,
            '04n': Mob_Broken_clouds,
            '09d': Mob_Shower_rain,
            '09n': Mob_Shower_rain,
            '10d': Mob_Rain,
            '10n': Mob_Rain,
            '11d': Mob_Thunderstorm,
            '11n': Mob_Thunderstorm,
            '13d': Mob_Snow,
            '13n': Mob_Snow_night,
            '50d': Mob_Mist,
            '50n': Mob_Mist,
        }
    });
    const [weatherIcons] = useState({
        '01d': Clear_sky_icon,
        '01n': Clear_sky_night_icon,
        '02d': Few_clouds_icon,
        '02n': Few_clouds_night_icon,
        '03d': Clouds_icon,
        '03n': Clouds_icon,
        '04d': Clouds_icon,
        '04n': Clouds_icon,
        '09d': Shower_rain_icon,
        '09n': Shower_rain_icon,
        '10d': Rain_icon,
        '10n': Rain_icon,
        '11d': Thunderstorm_icon,
        '11n': Thunderstorm_icon,
        '13d': Snow_icon,
        '13n': Snow_icon,
        '50d': Mist_day_icon,
        '50n': Mist_night_icon,
    });

    const [currentWeatherCode, setCurrentWeatherCode] = useState('');

    const updateCurrentWeatherCode = useCallback((newWeatherCode) => {
        setCurrentWeatherCode(newWeatherCode);
    }, []);

    const value = { weatherImages, weatherIcons, currentWeatherCode, updateCurrentWeatherCode };

    return (
        <WeatherImageContext.Provider value={value}>
            {children}
        </WeatherImageContext.Provider>
    );
};

