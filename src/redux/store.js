import { thunk } from "redux-thunk";
import { applyMiddleware, createStore, combineReducers } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import { changeUnitReducer, getWeatherDetailsByCityReducer, getWeatherForecastReducer, weatherApiReducer } from "./reducers/WeatherReducer";

const reducer = combineReducers({
    weatherApi: weatherApiReducer,
    weatherDetailsByCity: getWeatherDetailsByCityReducer,
    weatherForecast: getWeatherForecastReducer,
    unit: changeUnitReducer
});

export const store = createStore(reducer, composeWithDevTools(applyMiddleware(...[thunk])));
