import { useState } from "react";
import { ToastContainer, Zoom } from 'react-toastify';
import { SearchAppBar } from "components/SearchAppBar";
import { WeatherLocationInfo } from "components/WeatherLocationInfo";
import { WeatherInfo } from "components/WeatherInfo";
import { Loader } from "components/Loader";
import { useBackgroundImages, useGeolocation } from 'hooks';
import styled from '@emotion/styled';
import 'react-toastify/dist/ReactToastify.css';
import { textMixin } from "constans";

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const {
    isLoading,
    setIsLoading,
    weatherLocationData,
    daysWeatherLocationData,
    hasLocationData,
    hasError,
    setHasError
  } = useGeolocation();
  const backgroundImg = useBackgroundImages();

  return (
    <Container style={backgroundImg}>
      <SearchAppBar searchQuery={setSearchQuery} isLoading={isLoading} setIsLoading={setIsLoading} />
      {isLoading && (<Loader visible={isLoading} />)}
      {!isLoading && !searchQuery && hasLocationData ? (
        <WeatherLocationInfo weatherLocationData={weatherLocationData} daysWeatherLocationData={daysWeatherLocationData} />
      ) : (
        <WeatherInfo searchQuery={searchQuery} hasError={hasError} setHasError={setHasError} />
      )}
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
    padding: 0px 15px 15px 15px;
    background-color: ${props => props.theme.colors.bgColor};
`;

const Signature = styled.p`
  text-align: center;
  margin-top: auto;
  ${textMixin('14px', '500', '1.36')};
  color: ${props => props.theme.colors.white};
`;
