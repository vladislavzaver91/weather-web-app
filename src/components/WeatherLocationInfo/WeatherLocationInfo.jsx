import { useState, useEffect, useRef } from "react";
import { fetchByLocationCoords, fetchCallFiveDayByCoords, fetchCityLocation } from "services";
import { Loader } from "components/Loader";
import { WeatherDataView } from "components/WeatherDataView";
import { WeatherDaysDataList } from "components/WeatherDaysDataList";
import { WeatherHistorySlider } from "components/WeatherHistorySlider";
import styled from "@emotion/styled";
import { toast } from "react-toastify";
import { useWeatherHistory } from "hooks";

export const WeatherLocationInfo = ({setSearchQuery, setIsLoading, setHasError }) => {
    // const [searchQuery, setSearchQuery] = useState('');
    const [hasLocationData, setHasLocationData] = useState(false);
    const [weatherLocationData, setWeatherLocationData] = useState(null);
    const [daysWeatherLocationData, setDaysWeatherLocationData] = useState(null);
    // const [isLoading, setIsLoading] = useState(false);
    // const [hasError, setHasError] = useState(false);
    const { weatherHistory } = useWeatherHistory();
    const sliderRef = useRef();
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
                            setSearchQuery('');
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
                        return toast.info('Error getting geolocation. Please enable geolocation on your device.');
                    }
                    setIsLoading(false);
                },
            );
        }
    };

    useEffect(() => {
        if (!hasLocationData) {
            getUserLocation();
        }
    }, [hasLocationData]);

    useEffect(() => {
        if (sliderRef.current) {
            sliderRef.current.slickGoTo(0);
        };
    }, []);
    
    return (
        <>
            <WeatherDataView weatherData={weatherLocationData} />
            {weatherHistory.length >= 2 ? (
                <WeatherHistoryWrapper>
                    <WeatherDaysDataList weatherData={daysWeatherLocationData} />
                    <WeatherHistorySlider weatherHistory={weatherHistory} sliderRef={sliderRef} />
                </WeatherHistoryWrapper>
            ) : (
                <WeatherWrapper >
                    <WeatherDaysDataList weatherData={daysWeatherLocationData} />
                </WeatherWrapper>
            )}
        </>
    )
};

const WeatherWrapper = styled.div`
    @media screen and (min-width: 768px) {
    display: flex;
    justify-content: center;
}
`;

const WeatherHistoryWrapper = styled.div`
@media screen and (min-width: 768px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
}
`;


