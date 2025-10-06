import React from 'react';
import './Weather.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      weather: null,
      error: ''
    };
  }

  
  API_KEY = 'c8b06eebf5e442728c591121253006';

  handleInputChange = (e) => {
    this.setState({ city: e.target.value });
  };

  getWeather = async (e) => {
    e.preventDefault();
    this.setState({ error: '', weather: null });
    if (!this.state.city) {
      this.setState({ error: 'Please enter a city name.' });
      return;
    }
    try {
      const res = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${this.API_KEY}&q=${encodeURIComponent(this.state.city)}&aqi=no`
      );
      if (!res.ok) {
        this.setState({ error: 'City not found.' });
        return;
      }
      const data = await res.json();
      this.setState({
        weather: {
          temp: data.current.temp_c,
          desc: data.current.condition.text,
          name: data.location.name + ', ' + data.location.country,
          feelslike: data.current.feelslike_c,
          wind: data.current.wind_kph,
          humidity: data.current.humidity
        }
      });
    } catch {
      this.setState({ error: 'Error fetching weather.' });
    }
  };

  render() {
    const { city, weather, error } = this.state;
    return (
      <div className="weather-container">
        <h2 className="weather-title">Weather App</h2>
        <form onSubmit={this.getWeather} className="weather-form">
          <input
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={this.handleInputChange}
            className="weather-input"
          />
          <button type="submit" className="weather-btn">
            Get Weather
          </button>
        </form>
        {error && <div className="weather-error">{error}</div>}
        {weather && (
          <div className="weather-result">
            <h3>{weather.name}</h3>
            <p className="weather-temp">{weather.temp}°C</p>
            <p className="weather-desc">{weather.desc}</p>
            <div className="weather-details">
              <span>Feels like: <b>{weather.feelslike}°C</b></span>
              <span>Humidity: <b>{weather.humidity}%</b></span>
              <span>Wind: <b>{weather.wind} kph</b></span>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default App;

