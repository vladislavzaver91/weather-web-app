import { useState, useEffect } from "react";
import { useWeatherImage } from "contexts";
import { useMediaQuery } from "react-responsive";

export const useBackgroundImages = () => {
    const { weatherImages, currentWeatherCode } = useWeatherImage();
    const [backgroundImg, setBackgroundImg] = useState({
        backgroundImage: '',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
    });
    const isSmallScreen = useMediaQuery({ maxWidth: 767 });
    const isMediumScreen = useMediaQuery({ maxWidth: 1199 });
    const isLargeScreen = useMediaQuery({ minWidth: 1200 });
    
    useEffect(() => {
        const screenSize = isSmallScreen ? 'small' : isMediumScreen ? 'medium' : isLargeScreen ? 'large' : 'large';

        const getBackgroundImageForSize = (code) => {
            if (screenSize === 'small') {
                return weatherImages.mobileImages[code]
            }
            if (screenSize === 'medium') {
                return weatherImages.tabletImages[code]
            }
            if (screenSize === 'large') {
                return weatherImages.desktopImages[code]
            }
        };

        const newBackgroundImg = {
            backgroundImage: `linear-gradient(
                rgba(105, 93, 93, 0.5),
                rgba(105, 93, 93, 0.6),
                rgba(105, 93, 93, 0.8)),
                url(${getBackgroundImageForSize(currentWeatherCode)})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
        };

        setBackgroundImg(newBackgroundImg);
    }, [isSmallScreen, isMediumScreen, isLargeScreen, currentWeatherCode, weatherImages]);
    
    return backgroundImg;
};
