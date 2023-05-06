import axios from "axios"
import React from "react";
import ReactDOM from "react-dom/client";
import "./App.scss";
const API_KEY = "56a2c31c64a6247e0e851f88799c0dd5";

const WeatherInfoIcons = {
  Night: <img src="https://img.icons8.com/fluency/48/000000/sunset.png" />,
  Day: <img src="https://img.icons8.com/fluency/48/000000/sunrise.png" />,
  humidity: (
    <img src="https://img.icons8.com/fluency/48/000000/hygrometer.png" />
  ),
  wind: <img src="https://img.icons8.com/fluency/48/000000/wind.png" />,
  pressure: (
    <img src="https://img.icons8.com/fluency/48/000000/atmospheric-pressure.png" />
  ),
};
const WeatherIcons = {
  "01d": <img src="https://img.icons8.com/fluency/96/000000/sun.png" />,
  "01n": <img src="https://img.icons8.com/fluency/96/000000/full-moon.png" />,
  "02d": (
    <img src="https://img.icons8.com/fluency/96/000000/partly-cloudy-day.png" />
  ),
  "02n": (
    <img src="https://img.icons8.com/fluency/96/000000/partly-cloudy-night.png" />
  ),
  "03d": (
    <img src="https://img.icons8.com/fluency/96/000000/moderate-rain.png" />
  ),
  "03n": (
    <img src="https://img.icons8.com/fluency/96/000000/moderate-rain.png" />
  ),
  "04d": <img src="https://img.icons8.com/fluency/96/000000/clouds.png" />,
  "04n": (
    <img src="https://img.icons8.com/fluency/96/000000/partly-cloudy-night.png" />
  ),
  "09d": (
    <img src="https://img.icons8.com/fluency/96/000000/partly-cloudy-rain.png" />
  ),
  "09n": <img src="https://img.icons8.com/fluency/96/000000/rainy-night.png" />,
  "10d": (
    <img src="https://img.icons8.com/fluency/96/000000/partly-cloudy-rain.png" />
  ),
  "10n": <img src="https://img.icons8.com/fluency/96/000000/rainy-night.png" />,
  "11d": (
    <img src="https://img.icons8.com/fluency/96/000000/chance-of-storm.png" />
  ),
  "11n": (
    <img src="https://img.icons8.com/fluency/96/000000/stormy-night.png" />
  ),
};

const CityComponent = (props) => {
  const { updateCity, fetchWeather } = props;

  return (
    <div className="cityComponent">
      <img
        src="https://img.icons8.com/fluency/96/000000/smiling-sun.png"
        className="weatherLogo"
      />
      <span className="chooseCityLabel">Find Weather of your city</span>
      <form className="searchBox" onSubmit={fetchWeather}>
        <input
          placeholder="City"
          onChange={(event) => updateCity(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

const WeatherInfoComponent = (props) => {
  const { name, value } = props;

  return (
    <div className="infoContainer">
      <div className="infoIcon">{WeatherInfoIcons[name]}</div>
      <span className="infoLabel">
        {value}
        <span>{name}</span>
      </span>
    </div>
  );
};

const WeatherComponent = ({weather}) => {

  const [currentData, setCurrentData] = React.useState({})
  
  React.useEffect(()=>{
    setCurrentData(weather)
  },[weather])

  const isDay = weather?.current?.condition?.icon?.includes("night");
  const getTime = (timeStamp) => {
    return `${new Date(timeStamp * 1000).getHours()} : ${new Date(
      timeStamp * 1000
    ).getMinutes()}`;
  };
  const seperateTime = ((weather?.location?.localtime).split(" "))
  return (
    <div className="weatherComponent">
      <div className="weatherCondition">
        <span className="condition">
          <span>{`${Math.floor(weather.current.temp_c)}°C/${weather.current.condition.text}`}</span>
        </span>
      </div>
      <span className="location">{`${weather.location.name},${weather.location.country}`}</span>
      <span className="weatherInfoLabel">Weather info</span>
      <div className="weatherInfoContainer">
        <WeatherInfoComponent
          name={isDay ? "Night" : "Day"}
          value = {seperateTime[1]}
        />
        <WeatherInfoComponent name="humidity" value={weather?.current?.humidity} />
        <WeatherInfoComponent name="wind" value={weather?.current?.wind_kph} />
        <WeatherInfoComponent name="pressure" value={weather?.current?.pressure_mb} />
      </div>
    </div>
  );
};

export default function App() {
  const [city, updateCity] = React.useState();
  const [weather, updateWeather] = React.useState();

// console.log(weather)

  const fetchWeather = async (event) => {
    event.preventDefault();
    const {data} = await axios.get(
      `http://api.weatherapi.com/v1/current.json?key=eec7b272a14d4d68bce172252230205&q=${city}&aqi=no`
    );
    updateWeather(data);
  };

  return (
    <div className="container">
      <span className="appLabel">React Weather App</span>
      {city && weather ? (
        <WeatherComponent weather={weather} city={city} />
      ) : (
        <CityComponent updateCity={updateCity} fetchWeather={fetchWeather} />
      )}
    </div>
  );
}

// ReactDOM.render(<App />, document.getElementById("app"));
