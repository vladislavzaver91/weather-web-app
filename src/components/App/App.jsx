import { useState, useEffect, useRef } from "react";
import { ToastContainer, Zoom, toast } from 'react-toastify';
import { SearchAppBar } from "components/SearchAppBar";
import { WeatherInfo } from "components/WeatherInfo";
import { Loader } from "components/Loader";
import { WeatherDaysDataList } from 'components/WeatherDaysDataList';
import { WeatherDataView } from 'components/WeatherDataView';
import { WeatherHistorySlider } from 'components/WeatherHistorySlider';
import { fetchByLocationCoords, fetchCallFiveDayByCoords, fetchCityLocation } from "services";
import { useWeatherImages } from "contexts";
import { useWeatherHistory } from 'hooks';
import styled from '@emotion/styled';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [hasLocationData, setHasLocationData] = useState(false);
    const [weatherLocationData, setWeatherLocationData] = useState(null);
    const [daysWeatherLocationData, setDaysWeatherLocationData] = useState(null);
    const [cityLocationData, setCityLocationData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);

    const [backgroundImg, setBackgroundImg] = useState({
        backgroundImage: '',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
    });
    const { weatherImages, currentWeatherCode } = useWeatherImages();

    const { weatherHistory } = useWeatherHistory();
    const sliderRef = useRef();
    const hasErrorRef = useRef(false);

const getUserLocation = () => {
    if ('geolocation' in navigator) {
        setIsLoading(true);
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;

                fetchCityLocation(latitude, longitude)
                    .then((data) => {
                        setCityLocationData(data);
                    })
                    .catch((error) => {
                        setHasError(true);
                        console.error('Ошибка при запросе к Nominatim:', error);
                    });

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

    useEffect(() => {
        const newBackgroundImg = {
            backgroundImage: `linear-gradient(
                rgba(105, 93, 93, 0.5),
                rgba(105, 93, 93, 0.6),
                rgba(105, 93, 93, 0.8)),
                url(${weatherImages[currentWeatherCode]})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
        };
        setBackgroundImg(newBackgroundImg);
    }, [currentWeatherCode, weatherImages]);

    return (
        <Container style={backgroundImg}>
            <SearchAppBar searchQuery={setSearchQuery} isLoading={isLoading} setIsLoading={setIsLoading} />
            {isLoading && (<Loader visible={isLoading} />)}
            {!isLoading && !searchQuery && hasLocationData ? (
                <>
                    <WeatherDataView isLocation={hasLocationData} weatherData={weatherLocationData} cityLocation={cityLocationData} />
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
            ) : (isLoading)}
            {!isLoading && searchQuery && <WeatherInfo searchQuery={searchQuery} hasError={hasError} setHasError={setHasError} />}
            <ToastContainer
                position="top-center"
                transition={Zoom}
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <Signature>VladZaver2023&#169;</Signature>
        </Container>
    )
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    margin: 0 auto;
    padding-left: 15px;
    padding-right: 15px;
    background-color: rgb(140, 179, 229);
`;

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

const Signature = styled.p`
margin-top: auto;
font-size: 14px; 
font-weight: 500; 
line-height: 1.36; 
color: #ffffff; 
`;