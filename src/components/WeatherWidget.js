import React, { useState, useEffect } from 'react';
import { Cloud, MapPin, X, Droplets, Wind, Thermometer, Eye, Sunrise, Sunset, Maximize2 } from 'lucide-react';
import './WeatherWidget.css';

export default function WeatherWidget() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchCity, setSearchCity] = useState('');
  const [locationName, setLocationName] = useState('');
  const [activeTab, setActiveTab] = useState('current');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen && !weather) {
      getCurrentLocation();
    }
  }, [isOpen]);

  const getCurrentLocation = () => {
    setLoading(true);
    setError(null);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeatherByCoords(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.error('Geolocation error:', error);
          fetchWeatherByCity('Boston');
        }
      );
    } else {
      fetchWeatherByCity('Boston');
    }
  };

  const fetchWeatherByCity = async (city) => {
    if (!city.trim()) {
      setError('Please enter a city name');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const geoResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
      );

      const geoData = await geoResponse.json();

      if (!geoData.results || geoData.results.length === 0) {
        throw new Error('City not found');
      }

      const location = geoData.results[0];
      setLocationName(`${location.name}, ${location.country}`);

      await fetchWeatherByCoords(location.latitude, location.longitude);
    } catch (err) {
      setError(err.message || 'Unable to find city');
      setLoading(false);
    }
  };

  const fetchWeatherByCoords = async (lat, lon) => {
    setLoading(true);
    setError(null);

    try {
      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,cloud_cover,surface_pressure,wind_speed_10m&hourly=temperature_2m,precipitation_probability,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,wind_speed_10m_max,sunrise,sunset&timezone=auto&forecast_days=7`
      );

      const weatherData = await weatherResponse.json();

      if (!locationName) {
        setLocationName(`${lat.toFixed(2)}°, ${lon.toFixed(2)}°`);
      }

      setWeather(weatherData);
      processForecastData(weatherData);
      setLoading(false);
      setError(null);
    } catch (err) {
      console.error('Weather error:', err);
      setError('Unable to fetch weather');
      setLoading(false);
    }
  };

  const processForecastData = (data) => {
    if (!data) return;

    const now = new Date();
    const currentHour = now.getHours();

    const hourlyData = [];
    for (let i = 0; i < 8; i++) {
      const index = currentHour + i;
      if (index < data.hourly.time.length) {
        hourlyData.push({
          time: data.hourly.time[index],
          temp: data.hourly.temperature_2m[index],
          precipitation_prob: data.hourly.precipitation_probability[index],
          weather_code: data.hourly.weather_code[index],
          wind_speed: data.hourly.wind_speed_10m[index]
        });
      }
    }

    const dailyData = data.daily.time.slice(0, 7).map((date, i) => ({
      date: date,
      weather_code: data.daily.weather_code[i],
      temp_max: data.daily.temperature_2m_max[i],
      temp_min: data.daily.temperature_2m_min[i],
      precipitation_prob: data.daily.precipitation_probability_max[i],
      wind_speed: data.daily.wind_speed_10m_max[i],
      sunrise: data.daily.sunrise[i],
      sunset: data.daily.sunset[i]
    }));

    setForecast({ hourly: hourlyData, daily: dailyData });
  };

  const getWeatherIcon = (code) => {
    if (code === 0) return '☀️';
    if (code <= 3) return '⛅';
    if (code <= 48) return '🌫️';
    if (code <= 67) return '🌧️';
    if (code <= 77) return '❄️';
    if (code >= 95) return '⛈️';
    return '☁️';
  };

  const getWeatherDesc = (code) => {
    const descriptions = {
      0: 'Clear', 1: 'Mainly clear', 2: 'Partly cloudy', 3: 'Overcast',
      45: 'Foggy', 61: 'Rain', 65: 'Heavy rain', 71: 'Snow', 95: 'Thunderstorm'
    };
    return descriptions[code] || 'Cloudy';
  };

  const handleSearch = () => {
    if (searchCity.trim()) {
      fetchWeatherByCity(searchCity);
      setSearchCity('');
    }
  };

  const quickCities = ['New York', 'London', 'Tokyo', 'Mumbai'];

  return (
    <>
      <button 
        className="weather-fab"
        onClick={() => setIsOpen(!isOpen)}
        title="Weather"
      >
        {isOpen ? <X size={20} /> : <Cloud size={20} />}
      </button>

      {isOpen && (
        <div className={`weather-widget ${isExpanded ? 'expanded' : ''}`}>
          <div className="weather-widget-header">
            <div className="weather-title">
              <Cloud size={18} />
              <span>Weather</span>
            </div>
            <div className="weather-actions">
              <button 
                onClick={() => setIsExpanded(!isExpanded)} 
                className="expand-btn"
                title={isExpanded ? 'Minimize' : 'Expand'}
              >
                <Maximize2 size={16} />
              </button>
              <button onClick={() => setIsOpen(false)} className="weather-close-btn">
                <X size={16} />
              </button>
            </div>
          </div>

          {loading ? (
            <div className="weather-loading">
              <div className="weather-spinner"></div>
              <p>Loading...</p>
            </div>
          ) : error ? (
            <div className="weather-error">
              <span>⚠️</span>
              <p>{error}</p>
            </div>
          ) : weather ? (
            <>
              {/* Current Weather */}
              <div className="weather-current">
                <div className="weather-main-display">
                  <div className="weather-icon-large">
                    {getWeatherIcon(weather.current.weather_code)}
                  </div>
                  <div className="weather-temp-display">
                    <div className="weather-temp-large">
                      {Math.round(weather.current.temperature_2m)}°
                    </div>
                    <div className="weather-desc-main">
                      {getWeatherDesc(weather.current.weather_code)}
                    </div>
                  </div>
                </div>

                <div className="weather-location-display">
                  <MapPin size={14} />
                  <span>{locationName || 'Current Location'}</span>
                </div>

                <div className="weather-feels">
                  Feels like {Math.round(weather.current.apparent_temperature)}°C
                </div>

                <div className="weather-quick-stats">
                  <div className="quick-stat">
                    <Droplets size={16} />
                    <span>{weather.current.relative_humidity_2m}%</span>
                  </div>
                  <div className="quick-stat">
                    <Wind size={16} />
                    <span>{Math.round(weather.current.wind_speed_10m)} km/h</span>
                  </div>
                  <div className="quick-stat">
                    <Thermometer size={16} />
                    <span>{Math.round(weather.current.surface_pressure)} hPa</span>
                  </div>
                </div>
              </div>

              {/* Expanded Content */}
              {isExpanded && (
                <>
                  {/* Detailed Stats */}
                  <div className="weather-detailed-stats">
                    <div className="detail-stat-card">
                      <div className="detail-stat-icon">☁️</div>
                      <div className="detail-stat-info">
                        <div className="detail-stat-label">Cloud Cover</div>
                        <div className="detail-stat-value">{weather.current.cloud_cover}%</div>
                      </div>
                    </div>
                    <div className="detail-stat-card">
                      <div className="detail-stat-icon">🌧️</div>
                      <div className="detail-stat-info">
                        <div className="detail-stat-label">Precipitation</div>
                        <div className="detail-stat-value">{weather.current.precipitation} mm</div>
                      </div>
                    </div>
                  </div>

                  {/* Forecast Tabs */}
                  <div className="weather-tabs">
                    <button
                      onClick={() => setActiveTab('current')}
                      className={`weather-tab ${activeTab === 'current' ? 'active' : ''}`}
                    >
                      Current
                    </button>
                    <button
                      onClick={() => setActiveTab('hourly')}
                      className={`weather-tab ${activeTab === 'hourly' ? 'active' : ''}`}
                    >
                      Hourly
                    </button>
                    <button
                      onClick={() => setActiveTab('daily')}
                      className={`weather-tab ${activeTab === 'daily' ? 'active' : ''}`}
                    >
                      7-Day
                    </button>
                  </div>

                  {/* Hourly Forecast */}
                  {activeTab === 'hourly' && forecast?.hourly && (
                    <div className="weather-forecast-section">
                      <div className="hourly-forecast-grid">
                        {forecast.hourly.map((hour, idx) => (
                          <div key={idx} className="hourly-forecast-card">
                            <div className="hourly-forecast-time">
                              {new Date(hour.time).toLocaleTimeString('en-US', { hour: 'numeric' })}
                            </div>
                            <div className="hourly-forecast-icon">
                              {getWeatherIcon(hour.weather_code)}
                            </div>
                            <div className="hourly-forecast-temp">
                              {Math.round(hour.temp)}°
                            </div>
                            <div className="hourly-forecast-rain">
                              💧 {hour.precipitation_prob || 0}%
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Daily Forecast */}
                  {activeTab === 'daily' && forecast?.daily && (
                    <div className="weather-forecast-section">
                      <div className="daily-forecast-list">
                        {forecast.daily.map((day, idx) => (
                          <div key={idx} className="daily-forecast-card">
                            <div className="daily-forecast-day">
                              {idx === 0 ? 'Today' : new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                            </div>
                            <div className="daily-forecast-icon">
                              {getWeatherIcon(day.weather_code)}
                            </div>
                            <div className="daily-forecast-temps">
                              <span className="daily-max">{Math.round(day.temp_max)}°</span>
                              <span className="daily-min">{Math.round(day.temp_min)}°</span>
                            </div>
                            <div className="daily-forecast-rain">
                              💧 {day.precipitation_prob || 0}%
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Current Details */}
                  {activeTab === 'current' && (
                    <div className="weather-forecast-section">
                      <div className="current-details-grid">
                        <div className="current-detail-item">
                          <Sunrise size={20} />
                          <div className="detail-label">Sunrise</div>
                          <div className="detail-value">
                            {forecast?.daily[0]?.sunrise ? 
                              new Date(forecast.daily[0].sunrise).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }) 
                              : 'N/A'}
                          </div>
                        </div>
                        <div className="current-detail-item">
                          <Sunset size={20} />
                          <div className="detail-label">Sunset</div>
                          <div className="detail-value">
                            {forecast?.daily[0]?.sunset ? 
                              new Date(forecast.daily[0].sunset).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }) 
                              : 'N/A'}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* Search */}
              <div className="weather-search-section">
                <input
                  type="text"
                  value={searchCity}
                  onChange={(e) => setSearchCity(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder="Search city..."
                  className="weather-search-input"
                />
                <button onClick={handleSearch} className="weather-search-button">
                  🔍
                </button>
                <button onClick={getCurrentLocation} className="weather-location-button" title="Current location">
                  📍
                </button>
              </div>

              {/* Quick Cities */}
              {isExpanded && (
                <div className="weather-quick-cities">
                  {quickCities.map(city => (
                    <button
                      key={city}
                      onClick={() => fetchWeatherByCity(city)}
                      className="quick-city-btn"
                      disabled={loading}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="weather-empty">
              <Cloud size={48} />
              <p>No weather data</p>
              <button onClick={getCurrentLocation} className="weather-load-btn">
                Load Weather
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}