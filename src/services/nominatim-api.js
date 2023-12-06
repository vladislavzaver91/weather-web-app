import axios from 'axios';

const BASE_URL = 'https://nominatim.openstreetmap.org/reverse'

export const fetchCityLocation = async (latitude, longitude) => {
    const url = `${BASE_URL}?format=json&accept-language=en&lat=${latitude}&lon=${longitude}&zoom=13`;
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        throw error;
    }
};
