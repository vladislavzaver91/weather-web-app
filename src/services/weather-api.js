import axios from "axios";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY
axios.defaults.baseURL = process.env.REACT_APP_WEATHER_BASE_API_URL

export const fetchByLocationName = async (searchQuery) => {
    const { data } = await axios.get(`/data/2.5/weather?q=${searchQuery}&appid=${API_KEY}&units=metric`);
    return data;
};

export const fetchCallFiveDay = async (searchQuery) => {
    const { data } = await axios.get(`/data/2.5/forecast?q=${searchQuery}&appid=${API_KEY}&units=metric`);
    return data;
};

export const fetchByLocationCoords = async (latitude, longitude) => {
    const url = `/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const fetchCallFiveDayByCoords = async (latitude, longitude) => {
    const url = `/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        throw error;
    }
};