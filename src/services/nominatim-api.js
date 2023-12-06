import axios from 'axios';

const BASE_URL = process.env.REACT_APP_NOMINATIUM_BASE_API_URL

export const fetchCityLocation = async (latitude, longitude) => {
    const url = `${BASE_URL}?format=json&accept-language=en&lat=${latitude}&lon=${longitude}&zoom=13`;
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        throw error;
    }
};
