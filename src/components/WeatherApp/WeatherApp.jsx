import React, { useEffect, useState } from "react";
import axios from "axios";
import "./WeatherApp.css";
import search_icon from "../Assets/search.png";
import cloud_icon from "../Assets/cloud.png";
import wind_icon from "../Assets/wind.png";
import humidity_icon from "../Assets/humidity.png";

const WeatherApp = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [data, setData] = useState({
    celcius: 10,
    name: "London",
    humidity: 10,
    speed: 2,
  });

  useEffect(() => {}, []);
  const handleClick = () => {
    if (name !== "") {
      const api_key = "ac711990ae61025fcba8784d5e991da1";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${api_key}&units=Metric`;
      axios
        .get(url)
        .then((res) => {
          console.log(res);
          setData({
            ...data,
            celcius: res.data.main.temp,
            name: res.data.name,
            humidity: res.data.main.humidity,
            speed: res.data.wind.speed,
          });
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <div className="container">
      <div className="top_bar">
        <input
          type="text"
          className="cityInput"
          placeholder="Search.."
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <div className="search-icon" onClick={handleClick}>
          <img src={search_icon} />
        </div>
      </div>
      <div className="weather-image">
        <img src={cloud_icon} alt="" />
      </div>
      <div className="weather-temp">{Math.floor(data.celcius)}°C</div>
      <div className="weather-location">{data.name}</div>
      <div className="data-container">
        <div className="element">
          <img src={humidity_icon} alt="humidity" className="icon" />
          <div className="data">
            <div className="humidity-percentage">
              {Math.round(data.humidity)}
            </div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={wind_icon} alt="wind" className="icon" />
          <div className="data">
            <div className="wind-rate">{data.speed}</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
