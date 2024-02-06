import React, { useState, useEffect } from "react";
import axios from "axios";
import apiKeys from "../../config";
import ReactAnimatedWeather from "react-animated-weather";

const defaults = {
  color: "white",
  size: 112,
  animate: true,
};

const Forcast = (props) => {
  const [query, setQuery] = useState("");
  const [error, setError] = useState(null);
  const [weather, setWeather] = useState(null);

  const search = async (city) => {
    try {
      const response = await axios.get(
        `${apiKeys.base}weather?q=${city || query}&units=metric&APPID=${apiKeys.key}`
      );
      //console.log(response);
      setWeather(response.data);
      setQuery("");
    } catch (error) {
      console.error(error);
      setWeather(null);
      setQuery("");
      setError({ message: "Not Found", query: query });
    }
  };

  const checkTime = (i) => {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  };

  useEffect(() => {
    search("delhi");
  }, []);

  return (
    <div className="forecast">
      <div className="forecast-icon">
        <ReactAnimatedWeather
          icon={props.icon}
          color={defaults.color}
          size={defaults.size}
          animate={defaults.animate}
        />
      </div>
      <div className="today-weather">
        <h3>{props.weather}</h3>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search any city"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
          />
          <div className="img-box">
            <img
              src="https://images.avishkaar.cc/workflow/newhp/search-white.png"
              onClick={() => search()}
              alt="Search"
            />
          </div>
        </div>
        <ul>
          {weather ? (
            <>
              <li className="cityHead">
                <p>
                  {weather.name}, {weather.sys.country}
                </p>
                <img
                  className="temp"
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                  alt="Weather Icon"
                />
                  
              </li>
              
              <li>
                Temperature{" "}
                <span className="temp">
                  {Math.round(weather.main.temp)}°c ({weather.weather[0].main})
                </span>
              </li>
              <li>
                Humidity{" "}
                <span className="temp">
                  {Math.round(weather.main.humidity)}%
                </span>
              </li>
              <li>
                Visibility{" "}
                <span className="temp">
                  {Math.round(weather.visibility)} mi
                </span>
              </li>
              <li>
                Wind Speed{" "}
                <span className="temp">
                  {Math.round(weather.wind.speed)} Km/h
                </span>
              </li>
              <li>
                Time{" "}
                <span className="temp">
                  {checkTime(new Date().getHours())}:
                  {checkTime(new Date().getMinutes())}
                </span>
              </li>
            </>
          ) : (
            <li>
              {error && `${error.query} ${error.message}`}
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Forcast;
