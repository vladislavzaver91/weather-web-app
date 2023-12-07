import { useState, useEffect, useCallback } from "react";

export const useWeatherHistory = () => {
    const [weatherHistory, setWeatherHistory] = useState([]);

    useEffect(() => {
        try {
            const storedWeatherHistory = localStorage.getItem("weatherHistory");
            if (storedWeatherHistory) {
                setWeatherHistory(JSON.parse(storedWeatherHistory));
            }
        } catch (error) {
            console.error("Error reading from local storage:", error);
        }
    }, []);

    const addNewQuery = useCallback((query, data) => {
        setWeatherHistory(prevHistory => {
            const updatedHistory = updateHistory(prevHistory, query, data);
            const limitedHistory = limitHistory(updatedHistory);
            saveHistoryToLocalStorage(limitedHistory);
            return limitedHistory;
        });
    }, []);

    const updateHistory = (prevHistory, query, data) => {
        const existingItemIndex = prevHistory.findIndex(item => item.query === query);

        if (existingItemIndex !== -1) {
            const updatedHistory = [...prevHistory];
            updatedHistory[existingItemIndex] = { query, data };
            return updatedHistory;
        } else {
            return [{ query, data }, ...prevHistory];
        }
    };

    const limitHistory = (history) => {
        return history.slice(0, 5);
    };

    const saveHistoryToLocalStorage = (history) => {
        try {
            localStorage.setItem("weatherHistory", JSON.stringify(history));
        } catch (error) {
            console.error("Error writing to local storage:", error);
        }
    };

    return { weatherHistory, addNewQuery };
};





