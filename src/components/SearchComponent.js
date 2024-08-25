import { SearchIcon } from "lucide-react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  changeUnit,
  GetWeatherDetailsByCity,
} from "../redux/action/WeatherApiAction";

const SearchComponent = () => {
  const [searchInput, setSearchInput] = useState("");
  const dispatch = useDispatch();

  const handleSearch = (event) => {
    setSearchInput(event.target.value);
  };

  return (
    <div className="search_input">
      <div className="input_wrapper">
        <input
          type="text"
          placeholder="Search..."
          onChange={handleSearch}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              dispatch(GetWeatherDetailsByCity(searchInput));
            }
          }}
          value={searchInput}
        />
        <button
          onClick={() => dispatch(GetWeatherDetailsByCity(searchInput))}
          className="search_button"
        >
          <SearchIcon />
        </button>
      </div>
      <div className="unit_converter">
        <select onChange={(e) => dispatch(changeUnit(e.target.value))}>
          <option>°C</option>
          <option>°F</option>
        </select>
      </div>
    </div>
  );
};

export default SearchComponent;
