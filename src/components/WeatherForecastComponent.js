import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetWeatherForecast } from "../redux/action/WeatherApiAction";
import { kelvinToCelsius, kelvinToFahrenheit } from "../utils/UnitConverter";

const WeatherForecastComponent = () => {
  const dispatch = useDispatch();
  const [weather, setWeather] = useState(null);

  const { weatherForecast, loading } = useSelector(
    (state) => state.weatherForecast
  );
  const currentWeather = useSelector((state) => state.weatherApi.weather);
  const { cityWeather } = useSelector((state) => state.weatherDetailsByCity);
  const { unit } = useSelector((state) => state.unit);

  // when the user changes the city, the weather details will be fetched again
  useEffect(() => {
    if (cityWeather) setWeather(cityWeather);
    else setWeather(currentWeather);
  }, [cityWeather, currentWeather, loading]);

  useEffect(() => {
    if (!weather?.coord) return;
    dispatch(GetWeatherForecast(weather?.coord.lat, weather?.coord.lon));
  }, [weather, dispatch]);

  if (weather?.cod === "404") {
    return <div>City not found</div>;
  }

  if (!weather || loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="forecast_container">
      <div className="wrapper">
        <div className="title">6 days weather</div>
        <div className="forecast_cards">
          {weatherForecast?.map((weatherForecast) => (
            <div className="card" key={weatherForecast.date}>
              <div>{weatherForecast.date}</div>
              <img
                src={`https://openweathermap.org/img/wn/${weatherForecast.icon}@2x.png`}
                alt=""
              />
              <div className="avg_temp">
                <span>
                  {unit === "°C"
                    ? kelvinToCelsius(weatherForecast.temp)
                    : kelvinToFahrenheit(weatherForecast.temp)}
                </span>
                <sup>{unit}</sup>
              </div>
              <div className="weather_description">
                {weatherForecast.weatherDescription}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherForecastComponent;
