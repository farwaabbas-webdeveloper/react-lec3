import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [weatherInfo, setWeatherInfo] = useState({
    tempCelcius: 0,
    windSpeed: 0,
    cityName: "",
    state: "",
  });

  const [cityName, setCityName] = useState("Lahore");

  async function submitWeatherForm(e) {
    e.preventDefault();
    try {
      const res = await axios.get(
        `https://p2pclouds.up.railway.app/v1/learn/weather?city=${cityName}`,
      );

      console.log(res.data);

      setWeatherInfo({
        tempCelcius: res.data.current.temp_c,
        windSpeed: res.data.current.wind_kph,
        cityName: res.data.location.name,
        state: res.data.location.region,
      });
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    async function getWeather() {
      try {
        const res = await axios.get(
          "https://p2pclouds.up.railway.app/v1/learn/weather?city=lahore",
        );
        setWeatherInfo({
          tempCelcius: res.data.current.temp_c,
          windSpeed: res.data.current.wind_kph,
          cityName: res.data.location.name,
          state: res.data.location.region,
        });
      } catch (err) {
        console.log(err);
      }
    }
    getWeather();
  }, []);

  return (
    <div>
      <h1>Weather App</h1>

      <form onSubmit={submitWeatherForm}>
        <input
          type="text"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
          placeholder="Enter City Name"
        />
        <button type="submit">Search</button>
      </form>

      <br />

      <div>
        <h2>
          {weatherInfo.cityName}, {weatherInfo.state}
        </h2>
        <h3>Celcius: {weatherInfo.tempCelcius}°C</h3>
        <p>Wind Speed is {weatherInfo.windSpeed} kph</p>
      </div>
    </div>
  );
}

export default App;
