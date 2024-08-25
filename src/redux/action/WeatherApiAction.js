export const GetCurrentWeather = (latitude, longitude) => async (dispatch) => {
  dispatch({ type: "GET_CURRENT_WEATHER_REQUEST" });
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_API_KEY}`
    );
    const data = await response.json();
    dispatch({ type: "GET_CURRENT_WEATHER_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "GET_CURRENT_WEATHER_FAILURE", payload: error.message });
  }
};

export const GetWeatherDetailsByCity = (city) => async (dispatch) => {
  dispatch({ type: "GET_WEATHER_DETAILS_BY_CITY_REQUEST" });
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}`
    );
    const data = await response.json();
    dispatch({ type: "GET_WEATHER_DETAILS_BY_CITY_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "GET_WEATHER_DETAILS_BY_CITY_FAILURE",
      payload: error.message,
    });
  }
};

export const GetWeatherForecast = (latitude, longitude) => async (dispatch) => {
  dispatch({ type: "GET_WEATHER_FORECAST_REQUEST" });
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_API_KEY}`
    );
    const data = await response.json();

    const dailyForecasts = {};
    data.list.forEach((forecast) => {
      const date = new Date(forecast.dt * 1000).toLocaleDateString("en-US");
      if (!dailyForecasts[date]) {
        dailyForecasts[date] = [];
      }
      dailyForecasts[date].push(forecast);
    });

    // extract only relevant content from forecast
    const summarizedForecasts = Object.keys(dailyForecasts).map((date) => {
      const dayForecasts = dailyForecasts[date];
      const avg_temp =
        dayForecasts
          .map((forecast) => forecast.main.temp)
          .reduce((a, b) => a + b, 0) / dayForecasts.length;
      const temp = avg_temp.toFixed(2);
      const weatherDescription = dayForecasts[0].weather[0].description;
      const icon = dayForecasts[0].weather[0].icon;

      return { date, temp, weatherDescription, icon };
    });
    dispatch({
      type: "GET_WEATHER_FORECAST_SUCCESS",
      payload: summarizedForecasts,
    });
  } catch (error) {
    dispatch({ type: "GET_WEATHER_FORECAST_FAILURE", payload: error.message });
  }
};


//action for change the unit
export const changeUnit = (unit) => (dispatch) => {
  if (unit === "°F") {
    dispatch({ type: "CHANGE_UNIT", payload: "°F" });
  } else {
    dispatch({ type: "CHANGE_UNIT", payload: "°C" });
  }
};
