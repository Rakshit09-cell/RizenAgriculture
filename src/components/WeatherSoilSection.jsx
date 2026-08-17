import React, { useState, useEffect } from 'react';
import { CloudSun, Thermometer, Droplets, Wind, ShieldCheck, RefreshCw, Compass, MapPin } from 'lucide-react';
import { fetchAgriWeather } from '../services/weatherApi';

export default function WeatherSoilSection() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState('Indo-Gangetic Fertile Plains');

  const regions = [
    { name: 'Indo-Gangetic Fertile Plains', lat: 28.6139, lon: 77.2090 },
    { name: 'Deccan Plateau Black Soil', lat: 17.3850, lon: 78.4867 },
    { name: 'Punjab Agri Belt', lat: 30.9010, lon: 75.8573 },
    { name: 'California Central Valley', lat: 36.7783, lon: -119.4179 },
    { name: 'Nile Delta Agro Region', lat: 30.0444, lon: 31.2357 },
  ];

  const loadAgriWeather = async (lat, lon, name) => {
    setLoading(true);
    const data = await fetchAgriWeather(lat, lon, name);
    setWeather(data);
    setLoading(false);
  };

  useEffect(() => {
    const defaultReg = regions[0];
    loadAgriWeather(defaultReg.lat, defaultReg.lon, defaultReg.name);
  }, []);

  return (
    <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px' }}>
      
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '4px 14px', borderRadius: 'var(--radius-full)', background: 'rgba(16, 185, 129, 0.12)', color: 'var(--sprout-500)', fontWeight: 700, fontSize: '0.85rem', marginBottom: '12px' }}>
          <CloudSun size={16} /> Free Open-Meteo Live Agri-Weather API
        </div>
        <h2 style={{ fontSize: '2.2rem', color: 'var(--text-main)' }}>
          Soil Metrics & Microclimate Dashboard
        </h2>
        <p style={{ color: 'var(--text-muted)', maxWidth: '680px', margin: '8px auto 0', fontSize: '1rem' }}>
          Real-time soil temperature, volumetric soil moisture, evapotranspiration (ET0), and spraying feasibility index for precision farming.
        </p>
      </div>

      {/* Region Selector Pills */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '32px' }}>
        {regions.map((reg) => (
          <button
            key={reg.name}
            onClick={() => {
              setSelectedRegion(reg.name);
              loadAgriWeather(reg.lat, reg.lon, reg.name);
            }}
            style={{
              background: selectedRegion === reg.name ? 'var(--sprout-500)' : 'rgba(23, 82, 64, 0.08)',
              color: selectedRegion === reg.name ? '#ffffff' : 'var(--text-main)',
              border: '1px solid var(--border-color)',
              padding: '8px 16px',
              borderRadius: 'var(--radius-full)',
              fontWeight: 600,
              fontSize: '0.86rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s'
            }}
          >
            <MapPin size={14} />
            {reg.name}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="glass-panel" style={{ padding: '60px 20px', textAlign: 'center' }}>
          <RefreshCw size={32} color="var(--sprout-500)" style={{ animation: 'spin 1.5s linear infinite', marginBottom: '16px' }} />
          <h3 style={{ fontSize: '1.2rem', color: 'var(--text-main)' }}>Fetching Live Soil & Weather Telemetry...</h3>
        </div>
      ) : weather && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          
          {/* Soil Temperature Card */}
          <div className="glass-panel" style={{ padding: '24px', borderLeft: '4px solid var(--amber-500)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(245, 158, 11, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Thermometer size={24} color="var(--amber-500)" />
              </div>
              <span className="badge-pill badge-amber">0 - 10 cm Depth</span>
            </div>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Topsoil Temperature</span>
            <h3 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-main)', margin: '4px 0' }}>
              {weather.soilTemp}°C
            </h3>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
              Air Temp Range: {weather.tempMin}°C - {weather.tempMax}°C
            </p>
          </div>

          {/* Soil Moisture Card */}
          <div className="glass-panel" style={{ padding: '24px', borderLeft: '4px solid var(--sprout-500)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Droplets size={24} color="var(--sprout-500)" />
              </div>
              <span className="badge-pill badge-sprout">Volumetric Moisture</span>
            </div>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Volumetric Soil Moisture</span>
            <h3 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--sprout-500)', margin: '4px 0' }}>
              {weather.soilMoisture}%
            </h3>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
              Air Relative Humidity: {weather.humidity}%
            </p>
          </div>

          {/* Evapotranspiration ET0 Card */}
          <div className="glass-panel" style={{ padding: '24px', borderLeft: '4px solid #3b82f6' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(59, 130, 246, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CloudSun size={24} color="#3b82f6" />
              </div>
              <span className="badge-pill" style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
                ET0 FAO Model
              </span>
            </div>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Reference Evapotranspiration</span>
            <h3 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#3b82f6', margin: '4px 0' }}>
              {weather.evapotranspiration} <span style={{ fontSize: '1rem', fontWeight: 600 }}>mm/day</span>
            </h3>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
              Daily Moisture Loss Rate
            </p>
          </div>

          {/* Spraying Suitability Card */}
          <div className="glass-panel" style={{ padding: '24px', borderLeft: '4px solid #8b5cf6' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(139, 92, 246, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ShieldCheck size={24} color="#8b5cf6" />
              </div>
              <span className="badge-pill" style={{ background: 'rgba(139, 92, 246, 0.15)', color: '#8b5cf6', border: '1px solid rgba(139, 92, 246, 0.3)' }}>
                Field Operation
              </span>
            </div>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Spraying Suitability</span>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)', margin: '8px 0' }}>
              {weather.sprayingSuitability}
            </h3>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
              Wind Speed: {weather.windSpeed} km/h • Precip: {weather.rainMax} mm
            </p>
          </div>

        </div>
      )}
    </section>
  );
}
