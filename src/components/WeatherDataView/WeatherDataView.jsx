import styled from "@emotion/styled";
import { useCountryName, useTimeFormat, useUnixTime } from "hooks";
import { useWeatherImages } from "contexts";
import { muiIcons } from "utils/icons";

export const WeatherDataView = ({ weatherData, isLocation, cityLocation }) => {
    const { updateCurrentWeatherCode } = useWeatherImages();
const weatherCode = weatherData.weather[0].icon;
updateCurrentWeatherCode(weatherCode);
    const convertedDate = useTimeFormat(new Date(), 'E dd MMMM yyyy, HH:mm');
    const countryCode = weatherData.sys.country;
    const countryName = useCountryName(countryCode);
    const sunriseTime = useUnixTime(weatherData.sys.sunrise);
    const sunsetTime = useUnixTime(weatherData.sys.sunset);
    
    return (
        <Section>
        <Wrap>
            <div>
                
                {isLocation ? (
                    <CityTitle>{ cityLocation.address.district || cityLocation.address.borough }, { cityLocation.address.village || cityLocation.address.city }, { cityLocation.address.country } </CityTitle>
                ) : (
                    <CityTitle>{weatherData.name}, {countryName}</CityTitle>
                )}
                
                <Weather>{weatherData.weather[0].description}</Weather>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Temp>{Math.round(weatherData.main.temp)}&#176;</Temp>
                    <WeatherImg
                        src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                        alt={weatherData.weather[0].description}
                    />
                </div>
                <Data>{convertedDate}</Data>
            </div>
            <div>
                <TextData>
                    <muiIcons.ThermostatIcon sx={{ mr: 1, fontSize: 20 }} />
                    feels like: <span>{Math.round(weatherData.main.temp)}&#176;</span>
                </TextData>
                <TextData>
                    <muiIcons.AirIcon sx={{ mr: 1, fontSize: 20 }} />
                    wind: <span>{weatherData.wind.speed}  m/s</span>
                </TextData>
                <TextData>
                    <muiIcons.WaterDropIcon sx={{ mr: 1, fontSize: 20 }} />
                    humidity: <span>{weatherData.main.humidity} %</span>
                </TextData>
                <TextData>
                    <muiIcons.WbSunnyIcon sx={{ mr: 1, fontSize: 20 }} />
                    sunrise: <span>{useTimeFormat(sunriseTime, 'HH:mm')}</span>
                </TextData>
                <TextData>
                    <muiIcons.WbTwilightIcon sx={{ mr: 1, fontSize: 20 }} />
                    sunset: <span>{useTimeFormat(sunsetTime, 'HH:mm')}</span>
                </TextData>
            </div>
            </Wrap>
            </Section>
    );
};

const Section = styled.div`
margin: 0 auto;
padding: 32px;
@media screen and (min-width: 1200px) {
  padding-left: 0;
  padding-right: 0;
}
`;

const Wrap = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
`;

const CityTitle = styled.h2`
    font-size: 14px;
    font-weight: 700;
    line-height: 1.36;
    color: #ffffff;
    text-transform: uppercase;
    margin-bottom: 5px;
    @media screen and (min-width: 1200px) {
    font-size: 18px;
    margin-bottom: 10px;
    }
`;

const Weather = styled.p`
    font-size: 16px;
    font-weight: 500;
    line-height: 1.36;
    color: #00CED1;
    text-transform: uppercase;
    @media screen and (min-width: 1200px) {
    font-size: 30px;
    }
`;

const Temp = styled.p`
    font-size: 32px;
    font-weight: 500;
    line-height: 1.36;
    color: #ffffff;
    text-transform: uppercase;
    @media screen and (min-width: 768px) {
        font-size: 48px;
    }
`;

const WeatherImg = styled.img`
    width: 60px;
    height: 60px;
    @media screen and (min-width: 1200px) {
        width: 100px;
        height: 100px;
    }
`;

const Data = styled.p`
    font-size: 12px;
    font-weight: 400;
    line-height: 1.17;
    color: #ffffff;
    @media screen and (min-width: 768px) {
        font-size: 18px;
    }
`;

const TextData = styled.p`
    @media screen and (max-width: 439px) {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
        font-size: 10px;
        font-weight: 500;
    line-height: 1.17;
    color: #ffffff;
    text-transform: uppercase;
    }
    @media screen and (min-width: 440px) {
        display: flex;
    align-items: center;
    margin-bottom: 5px;
        font-size: 12px;
        font-weight: 500;
    line-height: 1.17;
    color: #ffffff;
    text-transform: uppercase;
    }
    @media screen and (min-width: 768px) {
        margin-bottom: 10px;
        font-size: 14px;
        font-weight: 600;
    }
    @media screen and (min-width: 1200px) {
        font-size: 18px;
    }
    & span {
        margin-left: 3px;
        text-transform: none;
        color: #00CED1;
        @media screen and (min-width: 440px) {
    margin-left: 7px;
    }
    }
    &:last-child {
        margin-bottom: 0;
    }
`;