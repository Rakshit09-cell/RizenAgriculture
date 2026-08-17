import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ScannerSection from './components/ScannerSection';
import EncyclopediaSection from './components/EncyclopediaSection';
import WeatherSoilSection from './components/WeatherSoilSection';
import CalculatorsSection from './components/CalculatorsSection';
import PlantDetailModal from './components/PlantDetailModal';
import { Sprout, BookOpen, ShieldCheck, Heart, Sparkles } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('search-hub');
  const [isDark, setIsDark] = useState(false);
  const [selectedPlantModal, setSelectedPlantModal] = useState(null);
  const [savedPlants, setSavedPlants] = useState(() => {
    try {
      const saved = localStorage.getItem('agri_terra_saved');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  useEffect(() => {
    localStorage.setItem('agri_terra_saved', JSON.stringify(savedPlants));
  }, [savedPlants]);

  const handleSavePlant = (plant) => {
    const exists = savedPlants.some((p) => p.name === plant.name || p.plantName === plant.plantName);
    if (exists) {
      setSavedPlants(savedPlants.filter((p) => (p.name || p.plantName) !== (plant.name || plant.plantName)));
    } else {
      setSavedPlants([...savedPlants, plant]);
    }
  };

  const isPlantSaved = (plant) => {
    if (!plant) return false;
    return savedPlants.some((p) => (p.name || p.plantName) === (plant.name || plant.plantName));
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Top Sticky Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isDark={isDark}
        setIsDark={setIsDark}
        savedCount={savedPlants.length}
      />

      {/* Main View Port Routing based on activeTab */}
      <main style={{ flexGrow: 1 }}>
        {activeTab === 'search-hub' && (
          <>
            <HeroSection
              onSelectPlant={(plant) => setSelectedPlantModal(plant)}
              setActiveTab={setActiveTab}
            />
            <EncyclopediaSection
              onSelectPlant={(plant) => setSelectedPlantModal(plant)}
              savedPlants={savedPlants}
            />
          </>
        )}

        {activeTab === 'visual-scanner' && (
          <ScannerSection
            onSavePlant={handleSavePlant}
          />
        )}

        {activeTab === 'encyclopedia' && (
          <EncyclopediaSection
            onSelectPlant={(plant) => setSelectedPlantModal(plant)}
            savedPlants={savedPlants}
          />
        )}

        {activeTab === 'weather-soil' && (
          <WeatherSoilSection />
        )}

        {activeTab === 'calculators' && (
          <CalculatorsSection />
        )}
      </main>

      {/* Detail Drawer Modal */}
      {selectedPlantModal && (
        <PlantDetailModal
          plant={selectedPlantModal}
          onClose={() => setSelectedPlantModal(null)}
          onSavePlant={handleSavePlant}
          isSaved={isPlantSaved(selectedPlantModal)}
        />
      )}

      {/* Premium Footer */}
      <footer style={{
        background: 'var(--emerald-900)',
        color: '#ffffff',
        padding: '40px 24px 24px',
        marginTop: '60px',
        borderTop: '1px solid rgba(52, 211, 153, 0.2)'
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'var(--sprout-500)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Sprout size={22} color="#ffffff" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>AgriTerra</h3>
              <p style={{ fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.7)' }}>
                Powered by Open-Meteo & Wikipedia Public APIs
              </p>
            </div>
          </div>

          <p style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.7)', textAlign: 'center' }}>
            © {new Date().getFullYear()} AgriTerra Portal • Sustainable Smart Agriculture & Seed Intelligence
          </p>

          <div style={{ display: 'flex', gap: '16px', fontSize: '0.85rem' }}>
            <span style={{ color: 'var(--sprout-400)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShieldCheck size={16} /> Free Open APIs Integrated
            </span>
          </div>
        </div>
      </footer>

    </div>
  );
}
