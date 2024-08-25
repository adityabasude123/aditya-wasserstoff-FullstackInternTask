export const weatherApiReducer = (
  state = {
    weather: null,
    loading: false,
    error: null,
  },
  action
) => {
  switch (action.type) {
    case "GET_CURRENT_WEATHER_REQUEST":
      return { loading: true };
    case "GET_CURRENT_WEATHER_SUCCESS":
      return { loading: false, weather: action.payload };
    case "GET_CURRENT_WEATHER_FAILURE":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getWeatherDetailsByCityReducer = (
  state = {
    cityWeather: null,
    cityLoading: false,
    error: null,
  },
  action
) => {
  switch (action.type) {
    case "GET_WEATHER_DETAILS_BY_CITY_REQUEST":
      return { cityLoading: true };
    case "GET_WEATHER_DETAILS_BY_CITY_SUCCESS":
      return { cityLoading: false, cityWeather: action.payload };
    case "GET_WEATHER_DETAILS_BY_CITY_FAILURE":
      return { cityLoading: false, error: action.payload };
    default:
      return state;
  }
};


export const getWeatherForecastReducer = (
  state = {
    weatherForecast: null,
    loading: false,
    error: null,
  },
  action
) => {
  switch (action.type) {
    case "GET_WEATHER_FORECAST_REQUEST":
      return { loading: true };
    case "GET_WEATHER_FORECAST_SUCCESS":
      return { loading: false, weatherForecast: action.payload };
    case "GET_WEATHER_FORECAST_FAILURE":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const changeUnitReducer = (
  state = {
    unit: "°C",
  },
  action
) => {
  switch (action.type) {
    case "CHANGE_UNIT":
      return { unit: action.payload };
    default:
      return state;
  }
};