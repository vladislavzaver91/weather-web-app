import styled from "@emotion/styled";
import { useWeatherImage } from "contexts";
import { useCountryName, useTimeFormat, useUnixTime } from "hooks";
import { Sunrise_icon, Sunset_icon, Thermometer_icon, Wet_icon, Wind_icon } from "images/icons";

export const WeatherHistoryDataView = ({ weatherData }) => {
    const countryCode = weatherData.sys.country;
    const countryName = useCountryName(countryCode);
    const sunriseTime = useUnixTime(weatherData.sys.sunrise);
    const sunsetTime = useUnixTime(weatherData.sys.sunset);
    const weatherCode = weatherData.weather[0].icon;
    const { weatherIcons } = useWeatherImage();
    console.log(weatherData);
    return (
        <div>
            <CityTitle>{weatherData.name}, {countryName}</CityTitle>
            <Weather>{weatherData.weather[0].description}</Weather>

            <WrapTemp>
                <Temp>{Math.round(weatherData.main.temp)}&#176;</Temp>
                <WeatherImg
                    src={`${weatherIcons[weatherCode]}`}
                    alt={weatherData.weather[0].description}
                />
                <div>
                    <TextData>
                        <IconData src={Thermometer_icon} alt={Thermometer_icon} />
                        feels like: <span>{Math.round(weatherData.main.temp)}&#176;</span>
                    </TextData>
                    <TextData>
                        <IconData src={Wind_icon} alt={Wind_icon} />
                        wind: <span>{weatherData.wind.speed}  m/s</span>
                    </TextData>
                    <TextData>
                        <IconData src={Wet_icon} alt={Wet_icon} />
                        humidity: <span>{weatherData.main.humidity} %</span>
                    </TextData>
                    <TextData>
                        <IconData src={Sunrise_icon} alt={Sunrise_icon} />
                        sunrise: <span>{useTimeFormat(sunriseTime, 'HH:mm')}</span>
                    </TextData>
                    <TextData>
                        <IconData src={Sunset_icon} alt={Sunset_icon} />
                        sunset: <span>{useTimeFormat(sunsetTime, 'HH:mm')}</span>
                    </TextData>
                </div>
            </WrapTemp>
        </div>
    )
};

const CityTitle = styled.h2`
    font-size: 14px;
    font-weight: 400;
    line-height: 1.36;
    color: #ffffff;
    text-transform: uppercase;
    margin-bottom: 5px;
    @media screen and (min-width: 1200px) {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 10px;
    }
    @media screen and (min-width: 1440px) {
    font-size: 24px;
    }
`;

const Weather = styled.p`
    font-size: 14px;
    font-weight: 700;
    line-height: 1.36;
    color: #00CED1;
    text-transform: uppercase;
    @media screen and (min-width: 1200px) {
    font-size: 18px;
    font-weight: 700;
    }
`;

const WrapTemp = styled.div`
@media screen and (max-width: 439px) {
    display: flex; 
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;
}
    @media screen and (min-width: 440px) {
    display: flex; 
    justify-content: space-evenly;
    align-items: flex-start;
}
    @media screen and (min-width: 768px) and (max-width: 1199px) {
        flex-wrap: wrap;
        align-items: center;
    }
    @media screen and (min-width: 1200px) {
    display: flex; 
    justify-content: space-evenly;
    align-items: flex-start;
}
`;

const Temp = styled.p`
    font-size: 60px;
    font-weight: 500;
    line-height: 1.36;
    color: #ffffff;
    text-transform: uppercase;
    @media screen and (min-width: 768px) {
        font-size: 50px;
    }
    @media screen and (min-width: 1200px) {
        font-size: 90px;
    }
`;

const WeatherImg = styled.img`
    width: 60px;
    height: 60px;
    @media screen and (min-width: 1200px) {
        width: 80px;
        height: 80px;
    }
    @media screen and (min-width: 1440px) {
        width: 100px;
        height: 100px;
    }
`;

const TextData = styled.p`
    display: flex;
    align-items: center;
    margin-bottom: 4px;
    font-size: 12px;
    font-weight: 600;
    line-height: 1.17;
    color: #ffffff;
    text-transform: uppercase;
    @media screen and (min-width: 768px) {
        font-size: 10px;
    }
    @media screen and (min-width: 1200px) {
        font-size: 14px;
        margin-bottom: 8px;
    }
    & span {
        margin-left: 7px;
        text-transform: none;
        color: #00CED1;
    }
    &:last-child {
        margin-bottom: 0;
    }
`;

const IconData = styled.img`
margin-right: 8px;
width: 20px;
height: 20px;
`;