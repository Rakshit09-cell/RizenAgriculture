import React, { useState } from 'react';
import { Calculator, Sprout, Calendar, Scale, Compass, CheckCircle2, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CalculatorsSection() {
  const [landArea, setLandArea] = useState(1);
  const [areaUnit, setAreaUnit] = useState('Acres');
  const [selectedCrop, setSelectedCrop] = useState('Wheat');
  const [germinationRate, setGerminationRate] = useState(90);

  const [sowingDate, setSowingDate] = useState(new Date().toISOString().split('T')[0]);
  const [plannerCrop, setPlannerCrop] = useState('Tomato');

  const cropSeedRates = {
    'Wheat': { ratePerAcre: 45, unit: 'kg', pricePerKg: 1.8, maturityDays: 125, germinationDays: 6, floweringDays: 65 },
    'Tomato': { ratePerAcre: 0.12, unit: 'kg', pricePerKg: 120, maturityDays: 85, germinationDays: 8, floweringDays: 45 },
    'Paddy Rice': { ratePerAcre: 10, unit: 'kg', pricePerKg: 2.5, maturityDays: 130, germinationDays: 4, floweringDays: 70 },
    'Bt Cotton': { ratePerAcre: 1.8, unit: 'kg', pricePerKg: 45, maturityDays: 160, germinationDays: 9, floweringDays: 80 },
    'Hybrid Maize': { ratePerAcre: 8.5, unit: 'kg', pricePerKg: 6.0, maturityDays: 100, germinationDays: 7, floweringDays: 50 },
    'Sunflower': { ratePerAcre: 3.5, unit: 'kg', pricePerKg: 8.0, maturityDays: 95, germinationDays: 7, floweringDays: 48 },
  };

  const currentCropSpec = cropSeedRates[selectedCrop];
  const acres = areaUnit === 'Hectares' ? landArea * 2.47105 : landArea;
  const totalSeedRequired = (currentCropSpec.ratePerAcre * acres * (100 / germinationRate)).toFixed(2);
  const estimatedCost = (totalSeedRequired * currentCropSpec.pricePerKg).toFixed(2);

  // Calculate timeline dates
  const currentPlannerSpec = cropSeedRates[plannerCrop];
  const sowDateObj = new Date(sowingDate);
  
  const germDate = new Date(sowDateObj);
  germDate.setDate(germDate.getDate() + currentPlannerSpec.germinationDays);

  const flowerDate = new Date(sowDateObj);
  flowerDate.setDate(flowerDate.getDate() + currentPlannerSpec.floweringDays);

  const harvestDate = new Date(sowDateObj);
  harvestDate.setDate(harvestDate.getDate() + currentPlannerSpec.maturityDays);

  const triggerCelebration = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.7 }
    });
  };

  return (
    <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px' }}>
      
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '36px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '4px 14px', borderRadius: 'var(--radius-full)', background: 'rgba(16, 185, 129, 0.12)', color: 'var(--sprout-500)', fontWeight: 700, fontSize: '0.85rem', marginBottom: '12px' }}>
          <Calculator size={16} /> Precision Agronomy Tools
        </div>
        <h2 style={{ fontSize: '2.2rem', color: 'var(--text-main)' }}>
          Seed Requirement & Harvest Timeline Calculators
        </h2>
        <p style={{ color: 'var(--text-muted)', maxWidth: '680px', margin: '8px auto 0', fontSize: '1rem' }}>
          Calculate exact seed weight requirements for your field acreage and plan your seasonal crop harvest milestones.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '32px' }}>
        
        {/* Calculator 1: Seed Weight & Cost */}
        <div className="glass-panel" style={{ padding: '28px', borderTop: '4px solid var(--sprout-500)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Scale size={22} color="var(--sprout-500)" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)' }}>Seed Quantity Calculator</h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Calculate exact seed weight needed</p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            {/* Select Crop */}
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>
                Select Crop Variety:
              </label>
              <select
                value={selectedCrop}
                onChange={(e) => setSelectedCrop(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-main)',
                  color: 'var(--text-main)',
                  fontWeight: 600,
                  fontSize: '0.92rem',
                  outline: 'none'
                }}
              >
                {Object.keys(cropSeedRates).map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Land Area & Unit */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>
                  Field Land Size:
                </label>
                <input
                  type="number"
                  min="0.1"
                  step="0.5"
                  value={landArea}
                  onChange={(e) => setLandArea(Math.max(0.1, parseFloat(e.target.value) || 0.1))}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-main)',
                    color: 'var(--text-main)',
                    fontWeight: 700,
                    fontSize: '1rem',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>
                  Unit:
                </label>
                <select
                  value={areaUnit}
                  onChange={(e) => setAreaUnit(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 10px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-main)',
                    color: 'var(--text-main)',
                    fontWeight: 600,
                    fontSize: '0.92rem',
                    outline: 'none'
                  }}
                >
                  <option value="Acres">Acres</option>
                  <option value="Hectares">Hectares</option>
                </select>
              </div>
            </div>

            {/* Seed Germination Rate (%) */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>
                <span>Seed Germination Rate:</span>
                <span style={{ color: 'var(--sprout-500)' }}>{germinationRate}%</span>
              </div>
              <input
                type="range"
                min="60"
                max="100"
                value={germinationRate}
                onChange={(e) => setGerminationRate(parseInt(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--sprout-500)' }}
              />
            </div>

            {/* Result Box */}
            <div style={{ padding: '20px', borderRadius: '14px', background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.25)', marginTop: '8px' }}>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
                Required Total Seed Weight
              </span>
              <h4 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--sprout-500)', margin: '4px 0' }}>
                {totalSeedRequired} <span style={{ fontSize: '1.1rem', fontWeight: 600 }}>{currentCropSpec.unit}</span>
              </h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-main)' }}>
                Estimated Seed Investment: <strong>${estimatedCost} USD</strong>
              </p>
              <button onClick={triggerCelebration} className="btn-primary" style={{ width: '100%', marginTop: '14px', justifyContent: 'center', fontSize: '0.85rem' }}>
                <CheckCircle2 size={16} /> Save Calculation
              </button>
            </div>

          </div>
        </div>

        {/* Calculator 2: Sowing to Harvest Timeline Predictor */}
        <div className="glass-panel" style={{ padding: '28px', borderTop: '4px solid var(--amber-500)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(245, 158, 11, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Calendar size={22} color="var(--amber-500)" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)' }}>Harvest Timeline Predictor</h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Forecast key seasonal crop growth stages</p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>
                Select Crop Type:
              </label>
              <select
                value={plannerCrop}
                onChange={(e) => setPlannerCrop(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-main)',
                  color: 'var(--text-main)',
                  fontWeight: 600,
                  fontSize: '0.92rem',
                  outline: 'none'
                }}
              >
                {Object.keys(cropSeedRates).map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>
                Planned Sowing Date:
              </label>
              <input
                type="date"
                value={sowingDate}
                onChange={(e) => setSowingDate(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-main)',
                  color: 'var(--text-main)',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  outline: 'none'
                }}
              />
            </div>

            {/* Timeline Stepper */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '8px' }}>
              
              <div style={{ padding: '12px', borderRadius: '10px', background: 'rgba(23, 82, 64, 0.05)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Germination Stage</span>
                  <p style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)' }}>
                    {germDate.toDateString()}
                  </p>
                </div>
                <span className="badge-pill badge-sprout">Day {currentPlannerSpec.germinationDays}</span>
              </div>

              <div style={{ padding: '12px', borderRadius: '10px', background: 'rgba(245, 158, 11, 0.06)', border: '1px solid rgba(245, 158, 11, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Flowering / Podding</span>
                  <p style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--amber-500)' }}>
                    {flowerDate.toDateString()}
                  </p>
                </div>
                <span className="badge-pill badge-amber">Day {currentPlannerSpec.floweringDays}</span>
              </div>

              <div style={{ padding: '14px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ fontSize: '0.78rem', color: 'var(--sprout-500)', fontWeight: 700 }}>Estimated Full Harvest</span>
                  <p style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)' }}>
                    {harvestDate.toDateString()}
                  </p>
                </div>
                <span className="badge-pill badge-sprout" style={{ background: 'var(--sprout-500)', color: '#fff' }}>
                  {currentPlannerSpec.maturityDays} Days Cycle
                </span>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
