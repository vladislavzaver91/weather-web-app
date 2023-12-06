import { useState, useEffect } from "react";
import { fetchByLocationCoords, fetchCallFiveDayByCoords, fetchCityLocation } from "services";
import { Loader } from "components/Loader";

export const WeatherLocationInfo = ({ getUserLocation, isLocation }) => {
    const [hasLocationData, setHasLocationData] = useState(false);
    const [weatherLocationData, setWeatherLocationData] = useState({});
    const [daysWeatherLocationData, setDaysWeatherLocationData] = useState({});
    const [cityLocationData, setCityLocationData] = useState({});
    const [isLoading, setIsLoading] = useState(false);

        const getUserLocation = () => {
        if ('geolocation' in navigator) {
            setIsLoading(true);
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;

                fetchCityLocation(latitude, longitude)
                    .then((data) => {
                        console.log('Результат геокодирования Nominatim:', data);
                        setCityLocationData(data);
                        setIsLoading(false);
                        setHasLocationData(true);
                    })
                    .catch((error) => {
                        console.error('Ошибка при запросе к Nominatim:', error);
                    });
                
                fetchByLocationCoords(latitude, longitude)
                    .then((data) => {
                        console.log('Результат геокодирования OpenWeatherMap:', data);
                        setWeatherLocationData(data);
                    })
                    .catch((error) => {
                        console.error('Ошибка при запросе к OpenWeatherMap:', error);
                    });
                
                fetchCallFiveDayByCoords(latitude, longitude)
                    .then(({list}) => {
                        console.log('Результат геокодирования по дням OpenWeatherMap:', list);
                        const filteredDaysWeatherLocation = list.filter((item, index) => index % 2 === 0);
                        setDaysWeatherLocationData(filteredDaysWeatherLocation);
                    })
                    .catch((error) => {
                        console.error('Ошибка при запросе по дням к OpenWeatherMap:', error);
                    });
            })
        }
    };

    useEffect(() => {
        if (!hasLocationData) {
            getUserLocation();
        }
    }, [hasLocationData]);

    return (
        <div>
            Получилось.Что дальше?..
        </div>
    )
};