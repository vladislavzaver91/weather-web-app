import { useLocation } from "./useLocation";

export const useRefreshBtn = () => {
    const { getUserLocation, setIsLoading } = useLocation();

    const handleClick = () => {
        getUserLocation();
        setIsLoading(true);
    };

    return handleClick;
};