import React, { useState } from 'react';
import { X, ExternalLink, Bookmark, Sprout, Droplets, ShieldAlert, Compass, Check, Printer, Sun, Layers, AlertTriangle, Clock, Gauge } from 'lucide-react';

export default function PlantDetailModal({ plant, onClose, onSavePlant, isSaved }) {
  const [activeTab, setActiveTab] = useState('overview');

  if (!plant) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 200,
      background: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div className="glass-panel" style={{
        width: '100%',
        maxWidth: '920px',
        maxHeight: '92vh',
        overflowY: 'auto',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-color)',
        boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
        position: 'relative',
        background: 'var(--bg-card)'
      }}>
        
        {/* Prominent High-Visibility Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            zIndex: 9999,
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            background: 'rgba(10, 38, 28, 0.92)',
            color: '#ffffff',
            border: '2px solid rgba(255, 255, 255, 0.6)',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 16px rgba(0,0,0,0.6)',
            transition: 'transform 0.2s, background 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1)';
            e.currentTarget.style.background = '#ef4444';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.background = 'rgba(10, 38, 28, 0.92)';
          }}
        >
          <X size={22} color="#ffffff" />
        </button>

        {/* Modal Banner Image Header */}
        <div style={{ position: 'relative', height: '240px', overflow: 'hidden' }}>
          <img
            src={plant.imageUrl || 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80'}
            alt={plant.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(10, 38, 28, 0.95), transparent 70%)',
            display: 'flex',
            alignItems: 'flex-end',
            padding: '24px'
          }}>
            <div style={{ paddingRight: '50px' }}>
              <span className="badge-pill badge-sprout" style={{ marginBottom: '8px' }}>
                {plant.category || 'Agricultural Crop'}
              </span>
              <h2 style={{ fontSize: '2.0rem', color: '#ffffff', fontWeight: 800 }}>
                {plant.commonName || plant.name}
              </h2>
              <p style={{ fontSize: '0.92rem', color: 'rgba(255, 255, 255, 0.85)', fontStyle: 'italic' }}>
                {plant.scientificName}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '4px' }}>
            {[
              { id: 'overview', label: 'Summary' },
              { id: 'water', label: '💧 Water & Irrigation' },
              { id: 'prep', label: 'Field Prep' },
              { id: 'sowing', label: 'Seed & Sowing' },
              { id: 'soil', label: 'Soil & NPK' },
              { id: 'diseases', label: 'Pest & Diseases' },
              { id: 'yield', label: 'Harvest & Storage' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  background: activeTab === tab.id ? 'var(--sprout-500)' : 'transparent',
                  color: activeTab === tab.id ? '#ffffff' : 'var(--text-muted)',
                  border: 'none',
                  padding: '8px 14px',
                  borderRadius: 'var(--radius-md)',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => onSavePlant(plant)}
              className="btn-secondary"
              style={{ fontSize: '0.82rem', padding: '6px 12px' }}
            >
              <Bookmark size={15} color={isSaved ? 'var(--sprout-500)' : 'currentColor'} />
              {isSaved ? 'Saved' : 'Save Profile'}
            </button>
            {plant.wikiUrl && (
              <a
                href={plant.wikiUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-primary"
                style={{ fontSize: '0.82rem', padding: '6px 12px', textDecoration: 'none' }}
              >
                Wikipedia API <ExternalLink size={14} />
              </a>
            )}
          </div>
        </div>

        {/* Tab Content Display */}
        <div style={{ padding: '24px' }}>
          
          {activeTab === 'overview' && (
            <div>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)', marginBottom: '10px' }}>Farmer Agronomic Summary</h3>
              <p style={{ fontSize: '1.0rem', color: 'var(--text-main)', lineHeight: 1.6, marginBottom: '24px' }}>
                {plant.summary || plant.extract || 'Comprehensive cultivation guide covering soil prep, nursery care, fertigation schedule, and pest prevention.'}
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                <div style={{ padding: '14px', borderRadius: '12px', background: 'rgba(59, 130, 246, 0.08)', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
                  <span style={{ fontSize: '0.8rem', color: '#3b82f6', fontWeight: 700 }}>Total Water Requirement</span>
                  <p style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '4px' }}>
                    {plant.waterRequirement?.totalWater || '600 - 800 mm / crop cycle'}
                  </p>
                </div>

                <div style={{ padding: '14px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.06)', border: '1px solid var(--border-color)' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Sowing Season</span>
                  <p style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '4px' }}>
                    {plant.sowing?.season || 'Warm Season / Spring & Monsoon'}
                  </p>
                </div>

                <div style={{ padding: '14px', borderRadius: '12px', background: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Expected Yield / Acre</span>
                  <p style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--amber-500)', marginTop: '4px' }}>
                    {plant.yield?.perAcre || 'High Yield Market Variety'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'water' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ padding: '16px', borderRadius: '12px', background: 'rgba(59, 130, 246, 0.08)', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
                <h4 style={{ fontSize: '1.1rem', color: '#3b82f6', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Droplets size={20} /> Total Water Quantity Needed:
                </h4>
                <p style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)' }}>
                  {plant.waterRequirement?.totalWater || '600 - 800 mm (approx. 6.0 to 8.0 Lakh Liters per acre over full cycle)'}
                </p>
                {plant.waterRequirement?.perPlantWater && (
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    Daily Rate per Plant: <strong>{plant.waterRequirement.perPlantWater}</strong>
                  </p>
                )}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
                <div style={{ padding: '14px', borderRadius: '10px', background: 'rgba(23, 82, 64, 0.05)', border: '1px solid var(--border-color)' }}>
                  <strong style={{ fontSize: '0.85rem', color: 'var(--sprout-500)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Clock size={16} /> Summer Watering Frequency:
                  </strong>
                  <p style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '4px' }}>
                    {plant.waterRequirement?.frequencySummer || 'Every 2 - 3 days'}
                  </p>
                </div>

                <div style={{ padding: '14px', borderRadius: '10px', background: 'rgba(23, 82, 64, 0.05)', border: '1px solid var(--border-color)' }}>
                  <strong style={{ fontSize: '0.85rem', color: 'var(--sprout-500)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Clock size={16} /> Winter Watering Frequency:
                  </strong>
                  <p style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '4px' }}>
                    {plant.waterRequirement?.frequencyWinter || 'Every 7 - 10 days'}
                  </p>
                </div>
              </div>

              <div style={{ padding: '16px', borderRadius: '12px', background: 'rgba(23, 82, 64, 0.06)', border: '1px solid var(--border-color)' }}>
                <h4 style={{ fontSize: '0.95rem', color: 'var(--sprout-500)', marginBottom: '4px' }}>🚿 Recommended Irrigation Method:</h4>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-main)', lineHeight: 1.5 }}>
                  {plant.waterRequirement?.method || 'Drip Irrigation with online emitters is highly recommended to conserve 40% water and keep leaves dry.'}
                </p>
              </div>

              <div style={{ padding: '16px', borderRadius: '12px', background: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
                <h4 style={{ fontSize: '0.95rem', color: 'var(--amber-500)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <AlertTriangle size={18} /> Critical Water Stages & Stress Alerts:
                </h4>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-main)', lineHeight: 1.5 }}>
                  {plant.waterRequirement?.criticalStages || 'Flowering onset & fruit expansion. Never allow water stress during flowering to prevent blossom drop.'}
                </p>
              </div>
            </div>
          )}

          {activeTab === 'prep' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ padding: '16px', borderRadius: '12px', background: 'rgba(23, 82, 64, 0.06)', border: '1px solid var(--border-color)' }}>
                <h4 style={{ fontSize: '1.05rem', color: 'var(--sprout-500)', marginBottom: '6px' }}>🚜 Land Preparation & Tillage:</h4>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-main)', lineHeight: 1.6 }}>
                  {plant.fieldPrep?.soilPrep || 'Deep plowing (20-25 cm) followed by 2-3 harrowings. Incorporate 10-12 tons of well-decomposed FYM or organic vermicompost per acre 15 days before transplanting.'}
                </p>
              </div>

              <div style={{ padding: '16px', borderRadius: '12px', background: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
                <h4 style={{ fontSize: '1.05rem', color: 'var(--amber-500)', marginBottom: '6px' }}>☀️ Soil Solarization & Sterilization:</h4>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-main)', lineHeight: 1.6 }}>
                  {plant.fieldPrep?.soilSolarization || 'Cover moist soil with 25-micron transparent polyethylene film for 30 days during summer to destroy soil-borne fungi, weed seeds, and root-knot nematodes.'}
                </p>
              </div>
            </div>
          )}

          {activeTab === 'sowing' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
              <div style={{ padding: '14px', borderRadius: '10px', background: 'rgba(23, 82, 64, 0.05)', border: '1px solid var(--border-color)' }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Sowing Depth</span>
                <p style={{ fontSize: '1.0rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '4px' }}>
                  {plant.sowing?.depth || '2.0 cm'}
                </p>
              </div>

              <div style={{ padding: '14px', borderRadius: '10px', background: 'rgba(23, 82, 64, 0.05)', border: '1px solid var(--border-color)' }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Germination Period</span>
                <p style={{ fontSize: '1.0rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '4px' }}>
                  {plant.sowing?.germinationDays || '5 - 8 days'}
                </p>
              </div>

              <div style={{ padding: '14px', borderRadius: '10px', background: 'rgba(23, 82, 64, 0.05)', border: '1px solid var(--border-color)' }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Plant & Row Spacing</span>
                <p style={{ fontSize: '1.0rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '4px' }}>
                  {plant.sowing?.spacing || '60 cm x 45 cm'}
                </p>
              </div>

              <div style={{ padding: '14px', borderRadius: '10px', background: 'rgba(23, 82, 64, 0.05)', border: '1px solid var(--border-color)' }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Recommended Seed Rate</span>
                <p style={{ fontSize: '1.0rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '4px' }}>
                  {plant.sowing?.seedRate || '100 - 150 grams/acre'}
                </p>
              </div>

              <div style={{ gridColumn: '1 / -1', padding: '16px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.08)', border: '1px solid var(--sprout-500)' }}>
                <h4 style={{ fontSize: '0.95rem', color: 'var(--sprout-500)', marginBottom: '4px' }}>🌱 Seed Treatment & Nursery Care:</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: 1.5 }}>
                  {plant.sowing?.nurseryCare || 'Soak seeds in bio-fertilizer slurry (Azotobacter + Trichoderma @ 10g/kg) for 15 minutes before sowing to prevent root rot and enhance germination.'}
                </p>
              </div>
            </div>
          )}

          {activeTab === 'soil' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ padding: '16px', borderRadius: '12px', background: 'rgba(23, 82, 64, 0.06)', border: '1px solid var(--border-color)' }}>
                <strong style={{ fontSize: '0.9rem', color: 'var(--sprout-500)', display: 'block', marginBottom: '4px' }}>Recommended Soil Texture:</strong>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-main)' }}>{plant.soil?.type}</p>
              </div>

              <div style={{ padding: '16px', borderRadius: '12px', background: 'rgba(23, 82, 64, 0.06)', border: '1px solid var(--border-color)' }}>
                <strong style={{ fontSize: '0.9rem', color: 'var(--sprout-500)', display: 'block', marginBottom: '4px' }}>Stage-wise Fertilizer & NPK Schedule:</strong>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-main)', lineHeight: 1.6 }}>{plant.soil?.npkRatio}</p>
              </div>

              <div style={{ padding: '16px', borderRadius: '12px', background: 'rgba(23, 82, 64, 0.06)', border: '1px solid var(--border-color)' }}>
                <strong style={{ fontSize: '0.9rem', color: 'var(--sprout-500)', display: 'block', marginBottom: '4px' }}>Sunlight Requirement:</strong>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-main)' }}>{plant.care?.sunlight}</p>
              </div>
            </div>
          )}

          {activeTab === 'diseases' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {(plant.diseases && plant.diseases.length > 0) ? (
                plant.diseases.map((d, idx) => (
                  <div key={idx} style={{ padding: '16px', borderRadius: '12px', background: 'rgba(239, 68, 68, 0.06)', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                    <h4 style={{ fontSize: '1.05rem', color: 'var(--rose-500)', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <AlertTriangle size={18} /> {d.name}
                    </h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', marginBottom: '8px' }}>
                      <strong>Early Symptoms:</strong> {d.symptoms}
                    </p>
                    <p style={{ fontSize: '0.9rem', color: 'var(--sprout-500)', marginBottom: '6px' }}>
                      <strong>Organic / Biological Cure:</strong> {d.organicRemedy}
                    </p>
                    {d.chemicalTreatment && (
                      <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                        <strong>Chemical Treatment:</strong> {d.chemicalTreatment}
                      </p>
                    )}
                  </div>
                ))
              ) : (
                <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)' }}>
                  Preventive Care: Apply Neem Seed Kernel Extract (NSKE 5%) or Trichoderma viride every 15 days.
                </div>
              )}
            </div>
          )}

          {activeTab === 'yield' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
              <div style={{ padding: '18px', borderRadius: '12px', background: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Expected Harvest Yield / Acre</span>
                <p style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--amber-500)', marginTop: '4px' }}>
                  {plant.yield?.perAcre || 'High Yield'}
                </p>
              </div>

              <div style={{ padding: '18px', borderRadius: '12px', background: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Days to Harvest Maturity</span>
                <p style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--amber-500)', marginTop: '4px' }}>
                  {plant.yield?.harvestDays || '90 Days'}
                </p>
              </div>

              <div style={{ gridColumn: '1 / -1', padding: '16px', borderRadius: '12px', background: 'rgba(23, 82, 64, 0.06)', border: '1px solid var(--border-color)' }}>
                <strong style={{ fontSize: '0.9rem', color: 'var(--sprout-500)', display: 'block', marginBottom: '4px' }}>Post-Harvest Curing & Storage Conditions:</strong>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-main)', lineHeight: 1.5 }}>
                  {plant.yield?.shelfLife || 'Dry produce under shade to recommended moisture levels (<12% for grains, 85-90% humidity at 12°C for vegetables).'}
                </p>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
