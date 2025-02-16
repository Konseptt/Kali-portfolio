import React, { useState, useEffect } from 'react';

const Weather = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=London&appid=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch weather data');
                }
                const data = await response.json();
                setWeatherData(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchWeatherData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Weather in {weatherData.name}</h1>
            <p>Temperature: {Math.round(weatherData.main.temp - 273.15)}°C</p>
            <p>Weather: {weatherData.weather[0].description}</p>
            <p>Humidity: {weatherData.main.humidity}%</p>
            <p>Wind Speed: {weatherData.wind.speed} m/s</p>
        </div>
    );
};

export const displayWeather = () => {
    return <Weather />;
};

export default Weather;
