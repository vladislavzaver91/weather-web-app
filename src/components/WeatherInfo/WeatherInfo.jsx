import { useState, useEffect, useRef } from "react";
import { fetchByLocationName, fetchCallFiveDay } from "services";
import { useWeatherHistory } from "hooks";
import { WeatherDaysDataList } from "components/WeatherDaysDataList";
import { WeatherHistorySlider } from "components/WeatherHistorySlider";
import { Loader } from "components/Loader";
import { WeatherDataView } from "components/WeatherDataView";
import styled from "@emotion/styled";

export const WeatherInfo = ({ searchQuery }) => {
    const [weatherData, setWeatherData] = useState(null);
    const [fewDaysWeatherData, setFewDaysWeatherData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { weatherHistory, addNewQuery } = useWeatherHistory();
    const sliderRef = useRef();

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!searchQuery) {
                    return;
                }

                setIsLoading(true);

                const weatherResult = await fetchByLocationName(searchQuery);
                const { list } = await fetchCallFiveDay(searchQuery);

                if (weatherResult.length === 0) {
                    console.log('Unfortunately, your search returned no results.');
                }

                setWeatherData(weatherResult);

                const filteredFewDaysWeatherData = list.filter((item, index) => index % 2 === 0);
                setFewDaysWeatherData(filteredFewDaysWeatherData);
                addNewQuery(searchQuery, weatherResult);

                if (sliderRef.current) {
                    sliderRef.current.slickGoTo(0);
                };
                
            } catch (error) {
                console.log(`There were no results found for "${searchQuery}"`);
            } finally {
                setIsLoading(false);
            };
        };

        fetchData();
        console.log('WeatherInfo was re-rendered');
    }, [addNewQuery, searchQuery]);

    return (
        <div>
            {isLoading && (<Loader visible={isLoading} />)}
            {!isLoading && weatherData ? (
                <>
                    <WeatherDataView weatherData={weatherData} />
                    {weatherHistory.length >= 2 ? (
                        <WeatherHistoryWrapper>
                            <WeatherDaysDataList weatherData={fewDaysWeatherData} />
                            <WeatherHistorySlider weatherHistory={weatherHistory} sliderRef={sliderRef} />
                        </WeatherHistoryWrapper>
                    ) : (
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <WeatherDaysDataList weatherData={fewDaysWeatherData} />
                        </div>
                    )}
                </>
            ) : !isLoading && (
                <div>Что-то пошло не так...</div>
            )}
        </div>
    )
};

const WeatherHistoryWrapper = styled.div`
@media screen and (min-width: 768px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
}
`;