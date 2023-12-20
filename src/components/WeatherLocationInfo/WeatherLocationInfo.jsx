import { useEffect, useRef } from "react";
import { WeatherDataView } from "components/WeatherDataView";
import { WeatherDaysDataList } from "components/WeatherDaysDataList";
import { WeatherHistorySlider } from "components/WeatherHistorySlider";
import styled from "@emotion/styled";
import { useWeatherHistory } from "hooks";

export const WeatherLocationInfo = ({weatherLocationData, daysWeatherLocationData}) => {
    const { weatherHistory } = useWeatherHistory();
    const sliderRef = useRef();

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


