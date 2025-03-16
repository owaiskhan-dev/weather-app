import { useState } from "react";
import axios from "axios";

export default function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY; // .env file se API key le rahe hain

  const fetchWeather = async () => {
    if (!city) return;
    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`
      );
      setWeather(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white p-4">
      <h1 className="text-3xl font-bold mb-4">Weather App 🌦️</h1>
      <input
        type="text"
        className="p-2 text-white border-2 border-white bg-transparent rounded w-64"
        placeholder="Enter city name..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button
        onClick={fetchWeather}
        className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Get Weather
      </button>

      {weather && (
        <div className="mt-6 text-center">
          <h2 className="text-2xl font-bold">{weather.location.name}, {weather.location.country}</h2>
          <p className="text-xl">{weather.current.temp_c}°C</p>
          <p>{weather.current.condition.text}</p>
          <img src={weather.current.condition.icon} alt="weather icon" />
        </div>
      )}
    </div>
  );
}