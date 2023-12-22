import styled from "@emotion/styled";
import { useCountryName, useTimeFormat, useUnixTime } from "hooks";
import { useWeatherImage } from "contexts";
import { Sunrise_icon, Sunset_icon, Thermometer_icon, Wet_icon, Wind_icon } from "images/icons";
import { desktopMixin, tabletMixin, textMixin } from "constans";

export const WeatherDataView = ({ weatherData }) => {
    const { updateCurrentWeatherCode } = useWeatherImage();
    const weatherCode = weatherData.weather[0].icon;
    updateCurrentWeatherCode(weatherCode);
    const convertedDate = useTimeFormat(new Date(), 'E dd MMMM yyyy, HH:mm');
    const countryCode = weatherData.sys.country;
    const countryName = useCountryName(countryCode);
    const sunriseTime = useUnixTime(weatherData.sys.sunrise);
    const sunsetTime = useUnixTime(weatherData.sys.sunset);
    const { weatherIcons } = useWeatherImage();
    
    return (
        <Section>
            <Wrap>
                <WeatherDataWrapper>
                    <CityTitle>{weatherData.name}, {countryName}</CityTitle>
                    <Weather>{weatherData.weather[0].description}</Weather>
                    <TempWrapper>
                        <Temp>{Math.round(weatherData.main.temp)}&#176;</Temp>
                        <WeatherImg
                            src={`${weatherIcons[weatherCode]}`}
                            alt={weatherData.weather[0].description}
                        />
                    </TempWrapper>
                    <Data>{convertedDate}</Data>
                </WeatherDataWrapper>
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
            </Wrap>
        </Section>
    );
};

const Section = styled.div`
    padding: 32px;
    ${desktopMixin(`
        padding-left: 0;
        padding-right: 0;
    `)}
`;

const Wrap = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    ${tabletMixin(`
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
    `)}
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
    ${textMixin('14px', '700', '1.36')};
    color: ${props => props.theme.colors.white};
    text-transform: uppercase;
    margin-bottom: 5px;
    ${desktopMixin(`
        font-size: 18px;
        margin-bottom: 10px;
    `)}
`;

const TempWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
`;

const Weather = styled.p`
    ${textMixin('24px', '500', '1.36')};
    color: ${props => props.theme.colors.accentColor};
    text-transform: uppercase;
    ${tabletMixin(`
        font-size: 16px;
    `)}
    ${desktopMixin(`
        font-size: 30px;
    `)}
`;

const Temp = styled.p`
    ${textMixin('38px', '500', '1.36')};
    margin-right: 10px;
    color: ${props => props.theme.colors.white};
    text-transform: uppercase;
    ${tabletMixin(`
        font-size: 48px;
    `)}
`;

const WeatherImg = styled.img`
    width: 60px;
    height: 60px;
        ${desktopMixin(`
            width: 80px;
            height: 80px;
    `)}
`;

const Data = styled.p`
    ${textMixin()};
    color: ${props => props.theme.colors.white};
    ${tabletMixin(`
        font-size: 18px;
    `)}
`;

const TextData = styled.p`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    ${textMixin('18px', '600')};
    color: ${props => props.theme.colors.white};
    text-transform: uppercase;
    ${tabletMixin(`
        font-size: 14px;
    `)}
    ${desktopMixin(`
        font-size: 18px;
    `)}
    & span {
        margin-left: 7px;
        text-transform: none;
        color: ${props => props.theme.colors.accentColor};
    }
    &:last-child {
        margin-bottom: 0;
    }
`;

const IconData = styled.img`
    margin-right: 8px;
    width: 26px;
    height: 26px;
`;