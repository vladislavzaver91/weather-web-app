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
        return [{ query, data }, ...prevHistory.filter(item => item.query !== query)];
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

    const clearWeatherHistory = useCallback(() => {
        localStorage.removeItem("weatherHistory");
        setWeatherHistory([]);
    }, []);

    return { weatherHistory, addNewQuery, clearWeatherHistory };
};

// import { useState, useEffect, useCallback } from "react";

// export const useWeatherHistory = () => {
//     const [weatherHistory, setWeatherHistory] = useState([]);
//     const [currentLanguage, setCurrentLanguage] = useState("en");

//     useEffect(() => {
//         try {
//             const storedWeatherHistory = localStorage.getItem("weatherHistory");
//             if (storedWeatherHistory) {
//                 const parsedHistory = JSON.parse(storedWeatherHistory);
//                 setWeatherHistory(parsedHistory);
//             }
//         } catch (error) {
//             console.error("Error reading from local storage:", error);
//         }
//     }, []);

//     const saveHistoryToLocalStorage = (history) => {
//         try {
//             localStorage.setItem("weatherHistory", JSON.stringify(history));
//         } catch (error) {
//             console.error("Error writing to local storage:", error);
//         }
//     };

//     const addNewQuery = useCallback((query, data) => {
//         setWeatherHistory(prevHistory => {
//             const updatedHistory = [{ query, data, language: currentLanguage }, ...prevHistory.filter(item => item.query !== query)];
//             const limitedHistory = limitHistory(updatedHistory);
//             saveHistoryToLocalStorage(limitedHistory);
//             return limitedHistory;
//         });
//     }, [currentLanguage]);

//     const limitHistory = (history) => {
//         return history.slice(0, 5);
//     };

//     const updateLanguage = useCallback((language) => {
//         setCurrentLanguage(language);
//     }, []);

//     return { weatherHistory, addNewQuery, updateLanguage };
// };






