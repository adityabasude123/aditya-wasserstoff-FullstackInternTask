import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { kelvinToCelsius, kelvinToFahrenheit } from "../utils/UnitConverter";

const WeatherDetailCard = () => {
  const [weather, setWeather] = useState(null);
  const { loading, error } = useSelector((state) => state.weatherApi);
  const currentWeather = useSelector((state) => state.weatherApi.weather);
  const { cityWeather } = useSelector((state) => state.weatherDetailsByCity);
  const { unit } = useSelector((state) => state.unit);

  useEffect(() => {
    if (cityWeather) setWeather(cityWeather);
    else setWeather(currentWeather);
  }, [cityWeather, currentWeather, loading]);

  if (weather?.cod === "404") {
    return <div>City not found</div>;
  }

  if (!weather || !weather.weather || !weather.weather[0]) {
    return <p>Loading...</p>;
  }
  return (
    <div className="container">
      {!loading ? (
        <div className="wrapper">
          <div className="title">Weather details</div>
          <div className="card">
            <div className="current_weather">
              <div className="city_name">
                <h1>{weather?.name}</h1>
              </div>
              <div>
                <img
                  src={`https://openweathermap.org/img/wn/${weather?.weather[0]?.icon}@2x.png`}
                  alt=""
                />
                <h1>
                  {unit === "°C"
                    ? kelvinToCelsius(weather?.main.temp)
                    : kelvinToFahrenheit(weather?.main.temp)}
                  <sup>{unit}</sup>
                </h1>
              </div>
              <div className="weather_description">
                <h3>{weather?.weather[0]?.description}</h3>
              </div>
            </div>
            <div className="weather_detail">
              <div className="humidity">
                Humidity <span>{weather?.main.humidity}%</span>
              </div>
              <div className="wind">
                Wind <span>{weather?.wind.speed} m/s</span>
              </div>
              <div className="feels_like">
                Feels like{" "}
                <span>
                  {unit === "°C"
                    ? kelvinToCelsius(weather?.main.feels_like)
                    : kelvinToFahrenheit(weather?.main.feels_like)}
                  {unit}
                </span>
              </div>
              <div className="pressure">
                Pressure <span>{weather?.main.pressure} hPa</span>
              </div>
              <div className="visibility">
                Visibility <span>{weather?.visibility} m</span>
              </div>
              <div className="max_temp">
                Max temp{" "}
                <span>
                  {unit === "°C"
                    ? kelvinToCelsius(weather?.main.temp_max)
                    : kelvinToFahrenheit(weather?.main.temp_max)}
                  {unit}
                </span>
              </div>
              <div className="min_temp">
                Min temp{" "}
                <span>
                  {unit === "°C"
                    ? kelvinToCelsius(weather?.main.temp_min)
                    : kelvinToFahrenheit(weather?.main.temp_min)}
                  {unit}
                </span>
              </div>
              <div className="sunrise">
                Sunrise{" "}
                <span>
                  {new Date(weather?.sys.sunrise * 1000).toLocaleTimeString()}
                </span>
              </div>
              <div className="sunset">
                Sunset{" "}
                <span>
                  {new Date(weather?.sys.sunset * 1000).toLocaleTimeString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default WeatherDetailCard;
