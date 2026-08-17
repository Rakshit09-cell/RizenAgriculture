import React, { useState } from 'react';
import { Upload, Scan, Camera, CheckCircle2, AlertTriangle, ShieldAlert, Sparkles, RefreshCw, Printer, BookOpen, Droplets, Sun, Sprout, Compass } from 'lucide-react';
import { analyzePlantImage } from '../services/plantAnalysisEngine';
import { SAMPLE_SCANNER_IMAGES } from '../data/agriDatabase';

export default function ScannerSection({ onSavePlant }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [report, setReport] = useState(null);
  const [activeReportTab, setActiveReportTab] = useState('diagnosis');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
      runScanProcess(file, null);
    }
  };

  const handleSelectSample = (sample) => {
    setSelectedImage(sample.imageUrl);
    setImagePreview(sample.imageUrl);
    runScanProcess(sample.imageUrl, sample);
  };

  const runScanProcess = async (fileOrUrl, sampleObj) => {
    setIsScanning(true);
    setReport(null);

    // Simulate HUD scanning time for visual impact
    setTimeout(async () => {
      const result = await analyzePlantImage(fileOrUrl, sampleObj);
      setReport(result);
      setIsScanning(false);
    }, 1800);
  };

  const handlePrintReport = () => {
    window.print();
  };

  return (
    <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px' }}>
      
      {/* Header Title */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '4px 14px', borderRadius: 'var(--radius-full)', background: 'rgba(16, 185, 129, 0.12)', color: 'var(--sprout-500)', fontWeight: 700, fontSize: '0.85rem', marginBottom: '12px' }}>
          <Scan size={16} /> AI Visual Plant & Crop Diagnostic Scanner
        </div>
        <h2 style={{ fontSize: '2.2rem', color: 'var(--text-main)' }}>
          Direct Image Recognition & Health Analysis
        </h2>
        <p style={{ color: 'var(--text-muted)', maxWidth: '680px', margin: '8px auto 0', fontSize: '1rem' }}>
          Upload a photo of any crop leaf, seed variety, or affected plant part. Our computer vision engine extracts visual indicators to deliver actionable agronomy reports.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 420px) 1fr', gap: '32px', alignItems: 'start' }}>
        
        {/* Left Side: Upload Dropzone & Sample Images */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Main Dropzone / HUD Canvas View */}
          <div className="glass-panel" style={{ padding: '20px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{
              border: '2px dashed var(--sprout-500)',
              borderRadius: 'var(--radius-md)',
              padding: '30px 16px',
              position: 'relative',
              background: 'rgba(16, 185, 129, 0.03)',
              cursor: 'pointer'
            }}>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{
                  position: 'absolute',
                  inset: 0,
                  opacity: 0,
                  cursor: 'pointer',
                  width: '100%',
                  height: '100%',
                  zIndex: 20
                }}
              />

              {imagePreview ? (
                <div style={{ position: 'relative', width: '100%', height: '240px', borderRadius: '12px', overflow: 'hidden' }}>
                  <img
                    src={imagePreview}
                    alt="Uploaded Crop Preview"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  {/* Laser Beam HUD animation during scanning */}
                  {isScanning && (
                    <>
                      <div className="scanner-laser"></div>
                      <div className="scanner-grid-overlay" style={{ position: 'absolute', inset: 0 }}></div>
                      <div style={{
                        position: 'absolute',
                        bottom: '12px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: 'rgba(10, 38, 28, 0.85)',
                        color: '#ffffff',
                        padding: '6px 14px',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        backdropFilter: 'blur(8px)',
                        border: '1px solid var(--sprout-400)'
                      }}>
                        <RefreshCw size={14} className="spin-animation" style={{ animation: 'spin 1.5s linear infinite' }} />
                        Analyzing Chlorophyll & Lesions...
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Upload size={30} color="var(--sprout-500)" />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.05rem', color: 'var(--text-main)', fontWeight: 700 }}>
                      Drop Plant / Seed Photo Here
                    </h4>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                      Supports PNG, JPG, WEBP (Leaves, Stems, Seeds, Soil)
                    </p>
                  </div>
                  <button className="btn-primary" style={{ marginTop: '8px', fontSize: '0.85rem' }}>
                    <Camera size={16} /> Choose File
                  </button>
                </div>
              )}
            </div>

            {imagePreview && !isScanning && (
              <button
                onClick={() => {
                  setImagePreview(null);
                  setSelectedImage(null);
                  setReport(null);
                }}
                className="btn-secondary"
                style={{ marginTop: '16px', width: '100%', justifyContent: 'center', fontSize: '0.85rem' }}
              >
                <RefreshCw size={14} /> Scan Another Image
              </button>
            )}
          </div>

          {/* Quick Sample Test Drive Bar */}
          <div className="glass-panel" style={{ padding: '20px' }}>
            <h4 style={{ fontSize: '0.92rem', color: 'var(--text-main)', marginBottom: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Sparkles size={16} color="var(--amber-500)" />
              Try Ready Test Samples:
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {SAMPLE_SCANNER_IMAGES.map((sample) => (
                <div
                  key={sample.id}
                  onClick={() => handleSelectSample(sample)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '8px',
                    borderRadius: '10px',
                    border: '1px solid var(--border-color)',
                    background: 'rgba(23, 82, 64, 0.04)',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--sprout-500)'}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-color)'}
                >
                  <img
                    src={sample.imageUrl}
                    alt={sample.name}
                    style={{ width: '40px', height: '40px', borderRadius: '6px', objectFit: 'cover' }}
                  />
                  <div style={{ overflow: 'hidden' }}>
                    <p style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-main)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {sample.name}
                    </p>
                    <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                      {sample.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Side: Diagnostic Report View */}
        <div>
          {isScanning ? (
            <div className="glass-panel" style={{ padding: '60px 30px', textAlign: 'center' }}>
              <div style={{ width: '70px', height: '70px', margin: '0 auto 20px', borderRadius: '50%', background: 'rgba(16,185,129,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Scan size={36} color="var(--sprout-500)" />
              </div>
              <h3 style={{ fontSize: '1.4rem', color: 'var(--text-main)', marginBottom: '8px' }}>
                Processing Visual Diagnostic HUD
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', maxWidth: '420px', margin: '0 auto' }}>
                Calculating leaf symmetry, chlorophyll ratio, lesion spot pattern & matching agronomy database...
              </p>
            </div>
          ) : report ? (
            <div className="glass-panel" style={{ padding: '24px', borderTop: '4px solid var(--sprout-500)' }}>
              
              {/* Report Header */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px', marginBottom: '20px' }}>
                <div>
                  <span className={`badge-pill ${report.healthScore > 80 ? 'badge-sprout' : report.healthScore > 55 ? 'badge-amber' : 'badge-rose'}`}>
                    {report.status}
                  </span>
                  <h3 style={{ fontSize: '1.6rem', color: 'var(--text-main)', marginTop: '8px' }}>
                    {report.plantName}
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                    {report.scientificName} • Scanned at {report.analyzedAt}
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={() => onSavePlant(report)} className="btn-secondary" style={{ fontSize: '0.82rem' }}>
                    Save Profile
                  </button>
                  <button onClick={handlePrintReport} className="btn-primary" style={{ fontSize: '0.82rem' }}>
                    <Printer size={15} /> Export Report
                  </button>
                </div>
              </div>

              {/* Key Diagnostic Score Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '14px', marginBottom: '24px' }}>
                <div style={{ padding: '12px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Health Index</span>
                  <p style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--sprout-500)' }}>
                    {report.healthScore}%
                  </p>
                </div>

                <div style={{ padding: '12px', borderRadius: '10px', background: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Chlorophyll Score</span>
                  <p style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--amber-500)' }}>
                    {report.chlorophyllIndex}/100
                  </p>
                </div>

                <div style={{ padding: '12px', borderRadius: '10px', background: 'rgba(23, 82, 64, 0.08)', border: '1px solid var(--border-color)' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Lesion Spot Density</span>
                  <p style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '4px' }}>
                    {report.spotDensity}
                  </p>
                </div>
              </div>

              {/* Tab Navigation for Detailed Agronomy Breakdown */}
              <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--border-color)', marginBottom: '20px' }}>
                {[
                  { id: 'diagnosis', label: 'Diagnosis & Remedy', icon: ShieldAlert },
                  { id: 'sowing', label: 'Seed & Sowing', icon: Sprout },
                  { id: 'soil', label: 'Soil & Care', icon: Droplets },
                  { id: 'yield', label: 'Harvest & Yield', icon: Compass },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeReportTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveReportTab(tab.id)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        borderBottom: isActive ? '3px solid var(--sprout-500)' : '3px solid transparent',
                        color: isActive ? 'var(--sprout-500)' : 'var(--text-muted)',
                        padding: '8px 14px',
                        fontWeight: 700,
                        fontSize: '0.88rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <Icon size={16} />
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* Tab Content Display */}
              {activeReportTab === 'diagnosis' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ padding: '16px', borderRadius: '12px', background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                    <h4 style={{ fontSize: '1rem', color: 'var(--rose-500)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <AlertTriangle size={18} /> Identified Condition: {report.detectedIssue}
                    </h4>
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-main)' }}>
                      Our visual inspection detected leaf structural patterns matching <strong>{report.detectedIssue}</strong>.
                    </p>
                  </div>

                  <div style={{ padding: '16px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                    <h4 style={{ fontSize: '1rem', color: 'var(--sprout-500)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <CheckCircle2 size={18} /> Recommended Organic Remedy:
                    </h4>
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-main)' }}>
                      {report.remedy}
                    </p>
                  </div>

                  <div style={{ padding: '16px', borderRadius: '12px', background: 'rgba(23, 82, 64, 0.06)', border: '1px solid var(--border-color)' }}>
                    <h4 style={{ fontSize: '0.92rem', color: 'var(--text-main)', marginBottom: '4px' }}>
                      Targeted Chemical Control (if required):
                    </h4>
                    <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>
                      {report.chemicalTreatment}
                    </p>
                  </div>
                </div>
              )}

              {activeReportTab === 'sowing' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div style={{ padding: '14px', borderRadius: '10px', background: 'rgba(23, 82, 64, 0.05)', border: '1px solid var(--border-color)' }}>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Optimal Sowing Depth</span>
                    <p style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '4px' }}>
                      {report.sowing?.depth || '1.5 - 3.0 cm'}
                    </p>
                  </div>

                  <div style={{ padding: '14px', borderRadius: '10px', background: 'rgba(23, 82, 64, 0.05)', border: '1px solid var(--border-color)' }}>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Germination Period</span>
                    <p style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '4px' }}>
                      {report.sowing?.germinationDays || '5 - 9 days'}
                    </p>
                  </div>

                  <div style={{ padding: '14px', borderRadius: '10px', background: 'rgba(23, 82, 64, 0.05)', border: '1px solid var(--border-color)' }}>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Row & Plant Spacing</span>
                    <p style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '4px' }}>
                      {report.sowing?.spacing || '45 cm x 30 cm'}
                    </p>
                  </div>

                  <div style={{ padding: '14px', borderRadius: '10px', background: 'rgba(23, 82, 64, 0.05)', border: '1px solid var(--border-color)' }}>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Seed Rate / Acre</span>
                    <p style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '4px' }}>
                      {report.sowing?.seedRate || '2 - 3 kg/acre'}
                    </p>
                  </div>
                </div>
              )}

              {activeReportTab === 'soil' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ padding: '12px', borderRadius: '10px', background: 'rgba(23, 82, 64, 0.05)', border: '1px solid var(--border-color)' }}>
                    <strong style={{ fontSize: '0.85rem', color: 'var(--sprout-500)' }}>Recommended Soil Type:</strong>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', marginTop: '2px' }}>{report.soil?.type}</p>
                  </div>

                  <div style={{ padding: '12px', borderRadius: '10px', background: 'rgba(23, 82, 64, 0.05)', border: '1px solid var(--border-color)' }}>
                    <strong style={{ fontSize: '0.85rem', color: 'var(--sprout-500)' }}>Optimal Soil pH & NPK Regime:</strong>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', marginTop: '2px' }}>pH {report.soil?.ph} • {report.npkAdvice}</p>
                  </div>

                  <div style={{ padding: '12px', borderRadius: '10px', background: 'rgba(23, 82, 64, 0.05)', border: '1px solid var(--border-color)' }}>
                    <strong style={{ fontSize: '0.85rem', color: 'var(--sprout-500)' }}>Watering & Sunlight:</strong>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', marginTop: '2px' }}>{report.care?.sunlight} • {report.care?.waterFreq}</p>
                  </div>
                </div>
              )}

              {activeReportTab === 'yield' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div style={{ padding: '14px', borderRadius: '10px', background: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Estimated Yield / Acre</span>
                    <p style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--amber-500)', marginTop: '4px' }}>
                      {report.yield?.perAcre}
                    </p>
                  </div>

                  <div style={{ padding: '14px', borderRadius: '10px', background: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Days to Harvest</span>
                    <p style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--amber-500)', marginTop: '4px' }}>
                      {report.yield?.harvestDays}
                    </p>
                  </div>
                </div>
              )}

            </div>
          ) : (
            <div className="glass-panel" style={{ padding: '60px 30px', textAlign: 'center' }}>
              <div style={{ width: '70px', height: '70px', margin: '0 auto 20px', borderRadius: '50%', background: 'rgba(16,185,129,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Camera size={36} color="var(--sprout-500)" />
              </div>
              <h3 style={{ fontSize: '1.3rem', color: 'var(--text-main)', marginBottom: '8px' }}>
                No Image Selected Yet
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', maxWidth: '380px', margin: '0 auto' }}>
                Drop a file on the left or select a sample image above to generate a full visual diagnostic report.
              </p>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
