import styled from "@emotion/styled";
import { useCountryName, useTimeFormat, useUnixTime } from "hooks";
import { useWeatherImage } from "contexts";
import { muiIcons } from "utils/icons";

export const WeatherDataView = ({ weatherData }) => {
    const { updateCurrentWeatherCode } = useWeatherImage();
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
                <WeatherDataWrapper>
                    <CityTitle>{weatherData.name}, {countryName}</CityTitle>
                    <Weather>{weatherData.weather[0].description}</Weather>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Temp>{Math.round(weatherData.main.temp)}&#176;</Temp>
                        <WeatherImg
                            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                            alt={weatherData.weather[0].description}
                        />
                    </div>
                    <Data>{convertedDate}</Data>
                </WeatherDataWrapper>
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
padding: 32px;
@media screen and (min-width: 1200px) {
  padding-left: 0;
  padding-right: 0;
}
`;

const Wrap = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    @media screen and (min-width: 768px) {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    }
`;

const WeatherDataWrapper = styled.div`
    @media screen and (max-width: 767px){
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-bottom: 64px;
}
`

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
    font-size: 24px;
    font-weight: 500;
    line-height: 1.36;
    color: #00CED1;
    text-transform: uppercase;
            @media screen and (min-width: 768px) {
    font-size: 16px;
    }
    @media screen and (min-width: 1200px) {
    font-size: 30px;
    }
`;

const Temp = styled.p`
    font-size: 38px;
    font-weight: 500;
    line-height: 1.36;
    color: #ffffff;
    text-transform: uppercase;
    @media screen and (min-width: 768px) {
        font-size: 48px;
    }
`;

const WeatherImg = styled.img`
    width: 80px;
    height: 80px;
    @media screen and (min-width: 768px) {
    width: 60px;
    height: 60px;
    }
    @media screen and (min-width: 1200px) {
        width: 100px;
        height: 100px;
    }
`;

const Data = styled.p`
    font-size: 16px;
    font-weight: 400;
    line-height: 1.17;
    color: #ffffff;
    @media screen and (min-width: 768px) {
        font-size: 18px;
    }
`;

const TextData = styled.p`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    font-size: 18px;
    font-weight: 600;
    line-height: 1.17;
    color: #ffffff;
    text-transform: uppercase;
    @media screen and (min-width: 768px) {
        font-size: 14px;
    }
    @media screen and (min-width: 1200px) {
        font-size: 18px;
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