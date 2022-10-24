import { useState } from "react";
import "./App.css";
import axios from "axios";

const App = () => {
  const [city, setCity] = useState("");
  const [name, setName] = useState("");
  const [temp, setTemp] = useState("");
  const [rain, setRain] = useState("");
  const [speedWind, setSpeedWind] = useState("");
  const [humidity, setHumidity] = useState("");
  const [description, setDescription] = useState("");

  const geoLoc = (e) => {
    e.preventDefault();

    axios({
      method: "get",
      url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=fr&units=metric&appid=9441e8e415b28eb0a638f4fff0765741`,
    }).then((res) => {
      console.log(res);
      if (res.data.rain) {
        setRain(res.data.rain["1h"] + "mm /1h")
      }else{
        setRain("Aucune")
      }
      setName(res.data.name);
      setSpeedWind(res.data.wind.speed);
      setHumidity(res.data.main.humidity);
      setHumidity(res.data.main.humidity);
      setDescription(res.data.weather[0].description);
      setTemp(Math.round(res.data.main.temp));
    });
  };

  return (
    <div className="app">
      <nav className="navBar">
        <h1>Millenium Météo</h1>
        <form className="city-code-container" onSubmit={geoLoc}>
          <input
            type="text"
            id="nb-city"
            placeholder="Entrez une ville"
            onChange={(e) => setCity(e.target.value)}
          />
          <input type="submit" id="btn-schearch" value="Shearch" />
        </form>
      </nav>
      <div className="card-container">
        <div className="card-left">
          <img src="" alt=""></img>
          <p id="degre"><span>{temp}°C</span></p>
        </div>
        <div className="card-right">
          <h2 className="city"><span>{name}</span></h2>
          <ul className="data-meteo">
            <li> <span className="span">{description}</span></li>
            <li>Précipitation: <span className="span">{rain}</span> </li>
            <li>vent: <span className="span">{speedWind} km/h</span></li>
            <li>Humidité: <span className="span">{humidity} %</span></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;
