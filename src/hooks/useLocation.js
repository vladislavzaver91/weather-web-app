import { useState, useCallback } from 'react';
import { fetchByLocationCoords, fetchCallFiveDayByCoords, fetchCityLocation } from "services";

export const useLocation = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [hasLocationData, setHasLocationData] = useState(false);
    const [weatherLocationData, setWeatherLocationData] = useState(null);
    const [daysWeatherLocationData, setDaysWeatherLocationData] = useState(null);
    const [cityLocationData, setCityLocationData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const getUserLocation = useCallback(() => {
        if ('geolocation' in navigator) {
            setIsLoading(true);
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;

                fetchCityLocation(latitude, longitude)
                    .then((data) => {
                        // console.log('Результат геокодирования Nominatim:', data);
                        setCityLocationData(data);
                    })
                    .catch((error) => {
                        console.error('Ошибка при запросе к Nominatim:', error);
                    });
                
                fetchByLocationCoords(latitude, longitude)
                    .then((data) => {
                        // console.log('Результат геокодирования OpenWeatherMap:', data);
                        setWeatherLocationData(data);
                    })
                    .catch((error) => {
                        console.error('Ошибка при запросе к OpenWeatherMap:', error);
                    });
                
                fetchCallFiveDayByCoords(latitude, longitude)
                    .then(({ list }) => {
                        // console.log('Результат геокодирования по дням OpenWeatherMap:', list);
                        const filteredDaysWeatherLocation = list.filter((item, index) => index % 2 === 0);
                        setDaysWeatherLocationData(filteredDaysWeatherLocation);
                        setHasLocationData(true);
                        setSearchQuery('');
                        setIsLoading(false);
                    })
                    .catch((error) => {
                        console.error('Ошибка при запросе по дням к OpenWeatherMap:', error);
                    });
            })
        }
    }, []);

    return {
        getUserLocation,
        isLoading,
        setIsLoading,
        searchQuery,
        setSearchQuery,
        hasLocationData,
        weatherLocationData,
        daysWeatherLocationData,
        cityLocationData,
    }
};