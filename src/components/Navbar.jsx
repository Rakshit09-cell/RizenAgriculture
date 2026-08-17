import React from 'react';
import { Sprout, Search, Scan, BookOpen, CloudSun, Calculator, Moon, Sun, Bookmark } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, isDark, setIsDark, savedCount }) {
  const navItems = [
    { id: 'search-hub', label: 'Search & Hub', icon: Search },
    { id: 'visual-scanner', label: 'AI Visual Scanner', icon: Scan, badge: 'Direct Upload' },
    { id: 'encyclopedia', label: 'Plant & Seed Directory', icon: BookOpen },
    { id: 'weather-soil', label: 'Soil & Weather', icon: CloudSun },
    { id: 'calculators', label: 'Farm Calculators', icon: Calculator },
  ];

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'var(--bg-header)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border-color)',
      padding: '12px 24px'
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab('search-hub')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer'
          }}
        >
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, var(--emerald-600), var(--sprout-500))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
          }}>
            <Sprout size={26} color="#ffffff" />
          </div>
          <div>
            <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.5px' }}>
              Agri<span style={{ color: 'var(--sprout-500)' }}>Terra</span>
            </h1>
            <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 500 }}>
              Agriculture & Seed Intelligence Hub
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '4px' }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  background: isActive ? 'var(--sprout-500)' : 'transparent',
                  color: isActive ? '#ffffff' : 'var(--text-muted)',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-md)',
                  fontWeight: 600,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s ease',
                  boxShadow: isActive ? '0 4px 14px rgba(16, 185, 129, 0.35)' : 'none'
                }}
              >
                <Icon size={18} />
                {item.label}
                {item.badge && (
                  <span style={{
                    fontSize: '0.65rem',
                    background: isActive ? 'rgba(255,255,255,0.25)' : 'rgba(16,185,129,0.15)',
                    color: isActive ? '#ffffff' : 'var(--sprout-500)',
                    padding: '2px 6px',
                    borderRadius: '8px',
                    fontWeight: 700
                  }}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Action Icons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={() => setActiveTab('encyclopedia')}
            style={{
              background: 'rgba(23, 82, 64, 0.08)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-main)',
              padding: '8px 12px',
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontWeight: 600,
              fontSize: '0.85rem'
            }}
            title="Saved Plants & Crop Profiles"
          >
            <Bookmark size={18} color="var(--sprout-500)" />
            <span>Saved ({savedCount})</span>
          </button>

          <button
            onClick={() => setIsDark(!isDark)}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(23, 82, 64, 0.08)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-main)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            title={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
          >
            {isDark ? <Sun size={20} color="#f59e0b" /> : <Moon size={20} color="#10b981" />}
          </button>
        </div>
      </div>
    </header>
  );
}
