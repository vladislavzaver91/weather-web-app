import { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { fetchByLocationCoords, fetchCallFiveDayByCoords } from 'services';

export const useGeolocation = () => {
    const [hasLocationData, setHasLocationData] = useState(false);
    const [weatherLocationData, setWeatherLocationData] = useState(null);
    const [daysWeatherLocationData, setDaysWeatherLocationData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const hasErrorRef = useRef(false);
    
    const getUserLocation = () => {
        if ('geolocation' in navigator) {
            setIsLoading(true);
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    fetchByLocationCoords(latitude, longitude)
                        .then((data) => {
                            setWeatherLocationData(data);
                        })
                        .catch((error) => {
                            setHasError(true);
                            console.error('Ошибка при запросе к OpenWeatherMap:', error);
                        });

                    fetchCallFiveDayByCoords(latitude, longitude)
                        .then(({ list }) => {
                            const filteredDaysWeatherLocation = list.filter((item, index) => index % 2 === 0);
                            setDaysWeatherLocationData(filteredDaysWeatherLocation);
                            setHasLocationData(true);
                        })
                        .catch((error) => {
                            setHasError(true);
                            console.error('Ошибка при запросе по дням к OpenWeatherMap:', error);
                        })
                        .finally(() => {
                            setIsLoading(false);
                        });
                },
                (error) => {
                    if (!hasErrorRef.current) {
                        hasErrorRef.current = true;
                        setHasError(true);
                        setIsLoading(false);
                        return toast.info('Error getting geolocation. Please enable geolocation on your device.');
                    }
                },
            );
        }
    };

    useEffect(() => {
        if (!hasLocationData) {
            getUserLocation();
        }
    }, [hasLocationData]);
    
    return {
        hasLocationData,
        weatherLocationData,
        setWeatherLocationData,
        daysWeatherLocationData,
        setDaysWeatherLocationData,
        isLoading,
        setIsLoading,
        hasError,
        setHasError,
    }
};