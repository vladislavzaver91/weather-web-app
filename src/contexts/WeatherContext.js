import React, { createContext, useContext, useState } from "react";

export const WeatherContext = createContext();

export const useWeatherContext = () => {
    const value = useContext(WeatherContext);

    if (!value) {
        throw new Error('Context error')
    }

    return value;
};

export const WeatherContextProvider = ({ children }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [hasLocationData, setHasLocationData] = useState(false);
    const [weatherLocationData, setWeatherLocationData] = useState(null);
    const [daysWeatherLocationData, setDaysWeatherLocationData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    
    const value = {
        searchQuery,
        setSearchQuery,
        hasLocationData,
        setHasLocationData,
        weatherLocationData,
        setWeatherLocationData,
        daysWeatherLocationData,
        setDaysWeatherLocationData,
        isLoading,
        setIsLoading,
        hasError,
        setHasError,
    };

    return (
        <WeatherContext.Provider value={value}>
            {children}
        </WeatherContext.Provider>
    );
};