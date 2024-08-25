import "./App.css";
import {
  SearchComponent,
  WeatherDetailCard,
  WeatherForecastComponent,
} from "./components";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { GetCurrentWeather } from "./redux/action/WeatherApiAction";
import { getUserLocation } from "./utils/getUserLocation";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    getUserLocation().then((position) => {
      dispatch(
        GetCurrentWeather(position.coords.latitude, position.coords.longitude)
      );
    });
  }, [dispatch]);

  return (
    <div className="App">
      <div className="search_component">
        <SearchComponent />
      </div>

      <div className="current_weather_component">
        <WeatherDetailCard />
      </div>

      <div className="5_days_weather_component">
        <WeatherForecastComponent />
      </div>

      <div className="weather_detail_component"></div>
    </div>
  );
}

export default App;
