import styled from '@emotion/styled';
import { useState, useEffect } from "react";
import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SearchAppBar } from "components/SearchAppBar";
import { WeatherInfo } from "components/WeatherInfo";
// import { fetchByLocationCoords, fetchCallFiveDayByCoords, fetchCityLocation } from "services";
import { Loader } from "components/Loader";
import { WeatherDaysDataList } from 'components/WeatherDaysDataList';
import { WeatherDataView } from 'components/WeatherDataView';
import { useWeatherImages } from "contexts";
import { useLocation } from 'hooks/useLocation';

export const App = () => {
    // const [searchQuery, setSearchQuery] = useState('');
    // const [hasLocationData, setHasLocationData] = useState(false);
    // const [weatherLocationData, setWeatherLocationData] = useState(null);
    // const [daysWeatherLocationData, setDaysWeatherLocationData] = useState(null);
    // const [cityLocationData, setCityLocationData] = useState(null);
    // const [isLoading, setIsLoading] = useState(false);

    const { getUserLocation, isLoading, setIsLoading, searchQuery, setSearchQuery, hasLocationData, weatherLocationData, daysWeatherLocationData, cityLocationData } = useLocation();

    const [backgroundImg, setBackgroundImg] = useState({
        backgroundImage: '',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
    });
    const { weatherImages, currentWeatherCode } = useWeatherImages();

    // const getUserLocation = () => {
    //     if ('geolocation' in navigator) {
    //         setIsLoading(true);
    //         navigator.geolocation.getCurrentPosition((position) => {
    //             const { latitude, longitude } = position.coords;

    //             fetchCityLocation(latitude, longitude)
    //                 .then((data) => {
    //                     // console.log('Результат геокодирования Nominatim:', data);
    //                     setCityLocationData(data);
    //                 })
    //                 .catch((error) => {
    //                     console.error('Ошибка при запросе к Nominatim:', error);
    //                 });
                
    //             fetchByLocationCoords(latitude, longitude)
    //                 .then((data) => {
    //                     // console.log('Результат геокодирования OpenWeatherMap:', data);
    //                     setWeatherLocationData(data);
    //                 })
    //                 .catch((error) => {
    //                     console.error('Ошибка при запросе к OpenWeatherMap:', error);
    //                 });
                
    //             fetchCallFiveDayByCoords(latitude, longitude)
    //                 .then(({ list }) => {
    //                     // console.log('Результат геокодирования по дням OpenWeatherMap:', list);
    //                     const filteredDaysWeatherLocation = list.filter((item, index) => index % 2 === 0);
    //                     setDaysWeatherLocationData(filteredDaysWeatherLocation);
    //                     setHasLocationData(true);
    //                     setSearchQuery('');
    //                     setIsLoading(false);
    //                 })
    //                 .catch((error) => {
    //                     console.error('Ошибка при запросе по дням к OpenWeatherMap:', error);
    //                 });
    //         })
    //     }
    // };

    useEffect(() => {
        if (!hasLocationData) {
            getUserLocation();
        }
    }, [hasLocationData]);

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
            <SearchAppBar searchQuery={setSearchQuery} getUserLocation={getUserLocation} isLoading={isLoading} setIsLoading={setIsLoading} />
            {isLoading && (<Loader visible={isLoading} />)}
            {!isLoading && !searchQuery && hasLocationData ? (
                <>
                    <WeatherDataView isLocation={hasLocationData} weatherData={weatherLocationData} cityLocation={cityLocationData} />
                    <WeatherWrapper >
                        <WeatherDaysDataList weatherData={daysWeatherLocationData} />
                    </WeatherWrapper>
                    
                </>
            ) : (isLoading)}
            {!isLoading && searchQuery && <WeatherInfo searchQuery={searchQuery} />}
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
        </Container>
    )
};

// без NOMINATIUM

// import styled from '@emotion/styled';
// import { useState, useEffect } from "react";
// import { ToastContainer, Zoom } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { SearchAppBar } from "components/SearchAppBar";
// import { WeatherInfo } from "components/WeatherInfo";
// import { Loader } from "components/Loader";
// import { useWeatherImages } from "contexts";

// export const App = () => {
//     const [backgroundImg, setBackgroundImg] = useState({
//         backgroundImage: '',
//         backgroundSize: 'cover',
//         backgroundRepeat: 'no-repeat',
//         backgroundPosition: 'center',
//         backgroundAttachment: 'fixed',
//     });

//     const [searchQuery, setSearchQuery] = useState('');
//     const [isLoading, setIsLoading] = useState(false);
//     const { weatherImages, currentWeatherCode } = useWeatherImages();

//     // console.log(currentWeatherCode);
//     // console.log(weatherImages[currentWeatherCode]);

//     useEffect(() => {
//         const newBackgroundImg = {
//             backgroundImage: `linear-gradient(
//                 rgba(105, 93, 93, 0.5),
//                 rgba(105, 93, 93, 0.6),
//                 rgba(105, 93, 93, 0.8)),
//                 url(${weatherImages[currentWeatherCode]})`,
//             backgroundSize: 'cover',
//             backgroundRepeat: 'no-repeat',
//             backgroundPosition: 'center',
//             backgroundAttachment: 'fixed',
//         };

//         setBackgroundImg(newBackgroundImg);
//     }, [currentWeatherCode, weatherImages]);

//     return (
//         <Container style={backgroundImg}>
//             <SearchAppBar searchQuery={setSearchQuery} isLoading={isLoading} setIsLoading={setIsLoading} />
//             {isLoading && (<Loader visible={isLoading} />)}
//             {!isLoading && searchQuery && <WeatherInfo searchQuery={searchQuery} />}
//             <ToastContainer
//                 position="top-center"
//                 transition={Zoom}
//                 autoClose={3000}
//                 hideProgressBar={false}
//                 newestOnTop={false}
//                 closeOnClick
//                 rtl={false}
//                 pauseOnFocusLoss
//                 draggable
//                 pauseOnHover
//                 theme="light"
//             />
//         </Container>
//     )
// };

const Container = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
/* max-width: 1170px; */
    margin: 0 auto;
    padding-left: 15px;
    padding-right: 15px;
    background-color: grey;
`;

const WeatherWrapper = styled.div`
    @media screen and (min-width: 768px) {
    display: flex;
    justify-content: center;
}
`;

