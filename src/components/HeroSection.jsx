import React, { useState, useEffect } from 'react';
import { Search, Scan, Sprout, ArrowRight, Sparkles, ExternalLink, Leaf, ShieldAlert } from 'lucide-react';
import { searchWikipedia, fetchPlantDetails } from '../services/wikipediaApi';

export default function HeroSection({ onSelectPlant, setActiveTab }) {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [wikiSelectedDetail, setWikiSelectedDetail] = useState(null);

  const quickTags = [
    'Tomato', 'Hybrid Wheat', 'Paddy Rice', 'Cotton Bt', 'Neem Biopesticide', 
    'Sunflower Seed', 'Soil NPK Ratio', 'Drip Irrigation', 'Early Blight'
  ];

  // Debounced search via Wikipedia API
  useEffect(() => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      const results = await searchWikipedia(query);
      setSearchResults(results);
      setLoading(false);
    }, 350);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSelectSearchResult = async (title) => {
    setLoading(true);
    const detail = await fetchPlantDetails(title);
    setLoading(false);
    if (detail) {
      onSelectPlant({
        name: detail.title,
        scientificName: detail.description,
        summary: detail.extract,
        imageUrl: detail.thumbnail || detail.originalImage || 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80',
        wikiUrl: detail.wikiUrl,
        category: 'Live Search Result',
        sowing: { depth: '1 - 2 cm', germinationDays: '7 - 10 days', spacing: '30 - 45 cm', season: 'All Seasons' },
        soil: { type: 'Loamy to Sandy Loam', ph: '6.0 - 7.0', npkRatio: 'Balanced Organic 10-10-10' },
        care: { sunlight: '6+ Hours Sun', waterFreq: 'Moderate Regular Irrigation' },
        yield: { perAcre: 'High Market Grade', harvestDays: '90 - 120 Days' },
        diseases: [
          { name: 'Common Fungal Spot', symptoms: 'Leaf surface yellowing/browning', organicRemedy: 'Neem Oil 5ml/L spray', chemicalTreatment: 'Copper Oxychloride 2.5g/L' }
        ]
      });
    }
  };

  return (
    <section style={{
      position: 'relative',
      padding: '60px 24px 40px',
      background: 'linear-gradient(180deg, rgba(16, 185, 129, 0.08) 0%, transparent 100%)',
      borderBottom: '1px solid var(--border-color)'
    }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
        
        {/* Top Feature Pill */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 16px',
          borderRadius: 'var(--radius-full)',
          background: 'rgba(16, 185, 129, 0.12)',
          border: '1px solid rgba(16, 185, 129, 0.25)',
          color: 'var(--sprout-500)',
          fontWeight: 700,
          fontSize: '0.85rem',
          marginBottom: '20px'
        }}>
          <Sparkles size={16} />
          Complete Plant, Seed & Crop Agronomy Portal
        </div>

        <h1 style={{
          fontSize: 'clamp(2.2rem, 5vw, 3.4rem)',
          fontWeight: 800,
          letterSpacing: '-1px',
          color: 'var(--text-main)',
          marginBottom: '16px',
          lineHeight: 1.15
        }}>
          Everything About <span style={{
            background: 'linear-gradient(135deg, #10b981, #059669)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>Plants, Seeds & Agriculture</span>
        </h1>

        <p style={{
          fontSize: '1.15rem',
          color: 'var(--text-muted)',
          maxWidth: '740px',
          margin: '0 auto 36px',
          fontWeight: 500
        }}>
          Search any crop, seed variety, soil condition, or pest remedy — or simply 
          <strong style={{ color: 'var(--sprout-500)' }}> upload a photo</strong> of your plant for instant AI visual diagnosis and care guides.
        </p>

        {/* Live Search Input Bar */}
        <div style={{ position: 'relative', maxWidth: '750px', margin: '0 auto 24px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            background: 'var(--bg-card)',
            backdropFilter: 'blur(16px)',
            border: '2px solid var(--sprout-500)',
            borderRadius: 'var(--radius-lg)',
            padding: '8px 16px',
            boxShadow: '0 8px 30px rgba(16, 185, 129, 0.2)'
          }}>
            <Search size={24} color="var(--sprout-500)" style={{ marginRight: '12px' }} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search crop, seed type, disease (e.g., Tomato, Hybrid Seeds, Early Blight)..."
              style={{
                width: '100%',
                border: 'none',
                outline: 'none',
                background: 'transparent',
                fontSize: '1.05rem',
                color: 'var(--text-main)',
                fontWeight: 500
              }}
            />
            {loading && (
              <span style={{ fontSize: '0.85rem', color: 'var(--sprout-500)', fontWeight: 600, whitespace: 'nowrap' }}>
                Fetching API...
              </span>
            )}
          </div>

          {/* Wikipedia API Autocomplete Dropdown */}
          {searchResults.length > 0 && (
            <div style={{
              position: 'absolute',
              top: '108%',
              left: 0,
              right: 0,
              background: 'var(--bg-card)',
              backdropFilter: 'blur(20px)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              boxShadow: 'var(--shadow-lg)',
              zIndex: 50,
              maxHeight: '360px',
              overflowY: 'auto',
              textAlign: 'left'
            }}>
              <div style={{ padding: '8px 16px', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-light)', borderBottom: '1px solid var(--border-color)', textTransform: 'uppercase' }}>
                Live Wikipedia API Search Results
              </div>
              {searchResults.map((res) => (
                <div
                  key={res.pageid}
                  onClick={() => {
                    handleSelectSearchResult(res.title);
                    setSearchResults([]);
                    setQuery('');
                  }}
                  style={{
                    padding: '12px 16px',
                    borderBottom: '1px solid var(--border-color)',
                    cursor: 'pointer',
                    transition: 'background 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(16, 185, 129, 0.1)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <div style={{ fontWeight: 700, color: 'var(--text-main)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span>{res.title}</span>
                    <ExternalLink size={14} color="var(--sprout-500)" />
                  </div>
                  <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginTop: '4px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {res.snippet}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Tag Pills */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '8px',
          marginBottom: '40px'
        }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-light)', fontWeight: 600 }}>Quick Topics:</span>
          {quickTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              style={{
                background: 'rgba(23, 82, 64, 0.08)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-main)',
                padding: '4px 12px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--sprout-500)';
                e.currentTarget.style.color = 'var(--sprout-500)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-color)';
                e.currentTarget.style.color = 'var(--text-main)';
              }}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Action Dual Callouts */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px',
          textAlign: 'left'
        }}>
          <div 
            onClick={() => setActiveTab('visual-scanner')}
            className="glass-panel"
            style={{
              padding: '24px',
              cursor: 'pointer',
              transition: 'transform 0.25s ease, box-shadow 0.25s ease',
              borderLeft: '4px solid var(--sprout-500)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'var(--shadow-md)';
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Scan size={22} color="var(--sprout-500)" />
              </div>
              <span className="badge-pill badge-sprout">Instant AI Scanner</span>
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '8px', color: 'var(--text-main)' }}>
              Upload Plant / Crop Photo
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
              Upload a picture of any leaf, crop, seed, or diseased plant part. Get instant diagnostic report & organic cures.
            </p>
            <span style={{ fontSize: '0.9rem', color: 'var(--sprout-500)', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              Scan Plant Now <ArrowRight size={16} />
            </span>
          </div>

          <div 
            onClick={() => setActiveTab('encyclopedia')}
            className="glass-panel"
            style={{
              padding: '24px',
              cursor: 'pointer',
              transition: 'transform 0.25s ease, box-shadow 0.25s ease',
              borderLeft: '4px solid var(--amber-500)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'var(--shadow-md)';
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(245, 158, 11, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Sprout size={22} color="var(--amber-500)" />
              </div>
              <span className="badge-pill badge-amber">Seed & Crop Catalog</span>
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '8px', color: 'var(--text-main)' }}>
              Explore Plant Encyclopedia
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
              Browse detailed agronomic data for 100+ crops: sowing depth, NPK fertilizer ratios, pest defenses, and expected yield.
            </p>
            <span style={{ fontSize: '0.9rem', color: 'var(--amber-500)', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              Browse Directory <ArrowRight size={16} />
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
