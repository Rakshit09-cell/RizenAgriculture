import React, { useState } from 'react';
import { BookOpen, Search, Filter, Sprout, ArrowUpRight, Bookmark, Droplets, Sun, Sparkles } from 'lucide-react';
import { AGRI_DATABASE } from '../data/agriDatabase';

export default function EncyclopediaSection({ onSelectPlant, savedPlants }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Crops & Grains', 'Seeds & Sprout', 'Fruits & Veggies', 'Medicinal', 'Saved Items'];

  const filteredItems = AGRI_DATABASE.filter((item) => {
    const matchesCategory = selectedCategory === 'All' 
      ? true 
      : selectedCategory === 'Saved Items'
      ? savedPlants.some(p => p.plantName === item.name || p.name === item.name)
      : item.category === selectedCategory;

    const matchesSearch = searchQuery === '' || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.commonName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.scientificName.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 24px' }}>
      
      {/* Header Title */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '4px 14px', borderRadius: 'var(--radius-full)', background: 'rgba(245, 158, 11, 0.12)', color: 'var(--amber-500)', fontWeight: 700, fontSize: '0.85rem', marginBottom: '12px' }}>
          <BookOpen size={16} /> Agricultural Knowledge & Seed Directory
        </div>
        <h2 style={{ fontSize: '2.2rem', color: 'var(--text-main)' }}>
          Comprehensive Crop & Seed Encyclopedia
        </h2>
        <p style={{ color: 'var(--text-muted)', maxWidth: '680px', margin: '8px auto 0', fontSize: '1rem' }}>
          Explore complete botanical specs, sowing depths, fertilizer regimes, common disease remedies, and harvest yields.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        marginBottom: '32px'
      }}>
        {/* Category Pills */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                background: selectedCategory === cat ? 'var(--sprout-500)' : 'rgba(23, 82, 64, 0.06)',
                color: selectedCategory === cat ? '#ffffff' : 'var(--text-main)',
                border: '1px solid var(--border-color)',
                padding: '8px 16px',
                borderRadius: 'var(--radius-full)',
                fontWeight: 600,
                fontSize: '0.86rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
                whiteSpace: 'nowrap'
              }}
            >
              {cat} {cat === 'Saved Items' && `(${savedPlants.length})`}
            </button>
          ))}
        </div>

        {/* Directory Local Search Bar */}
        <div style={{ position: 'relative', width: '300px' }}>
          <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter directory..."
            style={{
              width: '100%',
              padding: '8px 12px 8px 36px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              background: 'var(--bg-card)',
              color: 'var(--text-main)',
              fontSize: '0.9rem',
              outline: 'none'
            }}
          />
        </div>
      </div>

      {/* Card Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '24px'
      }}>
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <div
              key={item.id}
              className="glass-panel"
              style={{
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                cursor: 'pointer'
              }}
              onClick={() => onSelectPlant(item)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
              }}
            >
              {/* Card Image */}
              <div style={{ position: 'relative', height: '180px', overflow: 'hidden' }}>
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <span className="badge-pill badge-sprout" style={{ position: 'absolute', top: '12px', left: '12px', backdropFilter: 'blur(8px)' }}>
                  {item.category}
                </span>
              </div>

              {/* Card Content */}
              <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)', marginBottom: '4px' }}>
                  {item.commonName}
                </h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontStyle: 'italic', marginBottom: '12px' }}>
                  {item.scientificName}
                </p>

                <p style={{ fontSize: '0.88rem', color: 'var(--text-main)', marginBottom: '16px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {item.summary}
                </p>

                {/* Specs Pill Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '16px', marginTop: 'auto' }}>
                  <div style={{ padding: '8px', borderRadius: '8px', background: 'rgba(23, 82, 64, 0.05)', border: '1px solid var(--border-color)', fontSize: '0.78rem' }}>
                    <span style={{ color: 'var(--text-muted)', display: 'block', fontWeight: 600 }}>Sowing Depth</span>
                    <strong style={{ color: 'var(--text-main)' }}>{item.sowing.depth}</strong>
                  </div>

                  <div style={{ padding: '8px', borderRadius: '8px', background: 'rgba(23, 82, 64, 0.05)', border: '1px solid var(--border-color)', fontSize: '0.78rem' }}>
                    <span style={{ color: 'var(--text-muted)', display: 'block', fontWeight: 600 }}>Soil pH</span>
                    <strong style={{ color: 'var(--text-main)' }}>{item.soil.ph}</strong>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-color)', paddingTop: '12px' }}>
                  <span style={{ fontSize: '0.82rem', color: 'var(--amber-500)', fontWeight: 700 }}>
                    Harvest: {item.yield.harvestDays}
                  </span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--sprout-500)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    Full Specs <ArrowUpRight size={16} />
                  </span>
                </div>

              </div>
            </div>
          ))
        ) : (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px 20px' }}>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>
              No plants found matching your search query or filter.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
