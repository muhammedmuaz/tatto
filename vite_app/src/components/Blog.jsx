"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./TattooPreview.module.css";

const tattooOptions = {
  minimalist: [
    { id: "min1", src: "https://placehold.co/100x100?text=Simple+Line", name: "Simple Line" },
    { id: "min2", src: "https://placehold.co/100x100?text=Small+Symbol", name: "Small Symbol" },
    { id: "min3", src: "https://placehold.co/100x100?text=Tiny+Text", name: "Tiny Text" },
  ],
  tribal: [
    { id: "tri1", src: "https://placehold.co/100x100?text=Maori", name: "Maori" },
    { id: "tri2", src: "https://placehold.co/100x100?text=Polynesian", name: "Polynesian" },
    { id: "tri3", src: "https://placehold.co/100x100?text=Celtic", name: "Celtic" },
  ],
  realistic: [
    { id: "real1", src: "https://placehold.co/100x100?text=Portrait", name: "Portrait" },
    { id: "real2", src: "https://placehold.co/100x100?text=Nature", name: "Nature" },
    { id: "real3", src: "https://placehold.co/100x100?text=Animal", name: "Animal" },
  ],
  geometric: [
    { id: "geo1", src: "https://placehold.co/100x100?text=Mandala", name: "Mandala" },
    { id: "geo2", src: "https://placehold.co/100x100?text=Sacred+Geometry", name: "Sacred Geometry" },
    { id: "geo3", src: "https://placehold.co/100x100?text=Abstract", name: "Abstract" },
  ],
  traditional: [
    { id: "trad1", src: "https://placehold.co/100x100?text=Old+School", name: "Old School" },
    { id: "trad2", src: "https://placehold.co/100x100?text=Japanese", name: "Japanese" },
    { id: "trad3", src: "https://placehold.co/100x100?text=American", name: "American" },
  ],
};

export default function TattooPreview() {
  const [bodyImage, setBodyImage] = useState(null);
  const [tattoos, setTattoos] = useState([]);
  const [customTattoo, setCustomTattoo] = useState(null);
  const [selectedTattooCategory, setSelectedTattooCategory] = useState('');
  const [showColorOptions, setShowColorOptions] = useState(false);
  const [tattooColor, setTattooColor] = useState('#000000');
  const [bodyPart, setBodyPart] = useState('');

  const canvasRef = useRef(null);
  const bodyUploadRef = useRef(null);
  const tattooUploadRef = useRef(null);

  useEffect(() => {
    updateCanvas();
  }, [bodyImage, tattoos, showColorOptions, tattooColor]);

  const handleBodyImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setBodyImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCustomTattooUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCustomTattoo(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCategoryChange = (e) => {
    setSelectedTattooCategory(e.target.value);
  };

  const handleBodyPartChange = (e) => {
    setBodyPart(e.target.value);
  };

  const handleTattooSelect = (id) => {
    console.log(`Tattoo selected: ${id}`); // Debugging
    setTattoos(prevTattoos => [
      ...prevTattoos,
      {
        id,
        position: { x: canvasRef.current.width / 2, y: canvasRef.current.height / 2 }, // Centered
        size: 100,
        opacity: 80,
        rotation: 0,
        color: tattooColor
      }
    ]);
  };

  const updateCanvas = () => {
    if (!bodyImage) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const bodyImg = new Image();
    bodyImg.onload = () => {
      canvas.width = bodyImg.width;
      canvas.height = bodyImg.height;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(bodyImg, 0, 0, canvas.width, canvas.height);

      tattoos.forEach(tattoo => {
        let tattooSrc = '';

        if (tattoo.id === 'custom' && customTattoo) {
          tattooSrc = customTattoo;
        } else {
          for (const category in tattooOptions) {
            const found = tattooOptions[category].find(t => t.id === tattoo.id);
            if (found) {
              tattooSrc = found.src;
              break;
            }
          }
        }

        if (tattooSrc) {
          const tattooImg = new Image();
          tattooImg.crossOrigin = 'anonymous';
          tattooImg.onload = () => {
            ctx.save();
            ctx.translate(tattoo.position.x, tattoo.position.y);
            ctx.rotate((tattoo.rotation * Math.PI) / 180);
            ctx.globalAlpha = tattoo.opacity / 100;

            if (showColorOptions && tattoo.id !== 'custom') {
              const tempCanvas = document.createElement('canvas');
              const tempCtx = tempCanvas.getContext('2d');

              tempCanvas.width = tattooImg.width;
              tempCanvas.height = tattooImg.height;

              tempCtx.drawImage(tattooImg, 0, 0);
              tempCtx.globalCompositeOperation = 'source-in';
              tempCtx.fillStyle = tattoo.color;
              tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

              ctx.drawImage(tempCanvas, -tattoo.size / 2, -tattoo.size / 2, tattoo.size, tattoo.size);
            } else {
              ctx.drawImage(tattooImg, -tattoo.size / 2, -tattoo.size / 2, tattoo.size, tattoo.size);
            }

            ctx.restore();
          };
          tattooImg.src = tattooSrc;
        }
      });
    };
    bodyImg.src = bodyImage;
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = 'tattoo-preview.png';
    link.href = dataUrl;
    link.click();
  };

  const resetAll = () => {
    setBodyImage(null);
    setSelectedTattooCategory('');
    setCustomTattoo(null);
    setTattoos([]);
    setShowColorOptions(false);
    setTattooColor('#000000');
    setBodyPart('');
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>AI Tattoo Preview</h1>
        <p>Upload a photo, choose a tattoo, and see how it looks on your body</p>
      </header>

      <div className={styles.mainContent}>
        <div className={styles.leftColumn}>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>1. Upload Your Photo</h2>
            <div className={styles.uploadArea} onClick={() => bodyUploadRef.current.click()}>
              {!bodyImage ? (
                <div id="upload-placeholder">
                  <div className={styles.uploadIcon}>📷</div>
                  <p className={styles.uploadText}>Upload a photo to preview your tattoo</p>
                  <button className={`${styles.btn} ${styles.btnSecondary}`}>Select Image</button>
                  <input
                    ref={bodyUploadRef}
                    type="file"
                    accept="image/*"
                    className={styles.hidden}
                    onChange={handleBodyImageUpload}
                  />
                </div>
              ) : (
                <div className={styles.previewContainer}>
                  <canvas
                    ref={canvasRef}
                    className={styles.previewCanvas}
                  />
                </div>
              )}
            </div>

            {bodyImage && (
              <div className={styles.selectWrapper} style={{ marginTop: '20px' }}>
                <label className={styles.controlLabel}>Which body part is this?</label>
                <select
                  className={styles.select}
                  value={bodyPart}
                  onChange={handleBodyPartChange}
                >
                  <option value="">Select body part</option>
                  <option value="arm">Arm</option>
                  <option value="forearm">Forearm</option>
                  <option value="shoulder">Shoulder</option>
                  <option value="back">Back</option>
                  <option value="chest">Chest</option>
                  <option value="leg">Leg</option>
                  <option value="ankle">Ankle</option>
                  <option value="wrist">Wrist</option>
                  <option value="neck">Neck</option>
                  <option value="other">Other</option>
                </select>
              </div>
            )}
          </div>

          {bodyImage && (
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>3. Customize & Download</h2>

              <div className={styles.buttonGroup}>
                <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={handleDownload}>
                  <span className={styles.btnIcon}>↓</span> Download
                </button>
              </div>

              <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <button className={`${styles.btn} ${styles.btnSecondary}`} onClick={resetAll}>
                  Start Over
                </button>
              </div>
            </div>
          )}
        </div>

        <div className={styles.rightColumn}>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>2. Choose Your Tattoo</h2>

            {!bodyImage ? (
              <div className={styles.tattooSelectionPlaceholder}>
                <p>Please upload a photo first to choose a tattoo design.</p>
              </div>
            ) : (
              <div className={styles.tattooSelection}>
                <div className={styles.selectWrapper}>
                  <label className={styles.controlLabel}>Which type of tattoo do you want?</label>
                  <select
                    className={styles.select}
                    value={selectedTattooCategory}
                    onChange={handleCategoryChange}
                  >
                    <option value="">Select a tattoo style</option>
                    <option value="minimalist">SMALL</option>
                    <option value="tribal">STIPPLING</option>
                    <option value="realistic">LOVE</option>
                    <option value="geometric">RELIGIOUS</option>
                    <option value="traditional">COVER</option>
                    <option value="custom">NATURE</option>
                  </select>
                </div>

                {selectedTattooCategory && selectedTattooCategory !== 'custom' && (
                  <div className={styles.tattooGrid}>
                    {tattooOptions[selectedTattooCategory].map((tattoo) => (
                      <div
                        key={tattoo.id}
                        className={`${styles.tattooItem}`}
                        onClick={() => handleTattooSelect(tattoo.id)}
                      >
                        <img src={tattoo.src} alt={tattoo.name} />
                        <p>{tattoo.name}</p>
                      </div>
                    ))}
                  </div>
                )}

                {selectedTattooCategory === 'custom' && (
                  <div className={styles.customUpload}>
                    <label className={styles.controlLabel}>Upload Your Own Tattoo Design</label>
                    <div className={styles.uploadArea} onClick={() => tattooUploadRef.current.click()}>
                      <div className={styles.uploadIcon}>🎨</div>
                      <p className={styles.uploadText}>Upload a PNG with transparent background</p>
                      <button className={`${styles.btn} ${styles.btnSecondary}`}>Select Design</button>
                      <input
                        ref={tattooUploadRef}
                        type="file"
                        accept="image/*"
                        className={styles.hidden}
                        onChange={handleCustomTattooUpload}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {bodyImage && (
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>AI Recommendations</h2>
              <p>Based on your uploaded image, here are some tattoo styles that might look good:</p>

              <div className={styles.recommendationItem}>
                <div className={styles.recommendationIcon}>🎨</div>
                <div className={styles.recommendationText}>
                  <h3>Minimalist</h3>
                  <p>Clean lines that complement your body shape</p>
                </div>
              </div>

              <div className={styles.recommendationItem}>
                <div className={styles.recommendationIcon}>🎨</div>
                <div className={styles.recommendationText}>
                  <h3>Geometric</h3>
                  <p>Modern patterns that create visual interest</p>
                </div>
              </div>

              {bodyPart && (
                <div className={styles.recommendationItem}>
                  <div className={styles.recommendationIcon}>✨</div>
                  <div className={styles.recommendationText}>
                    <h3>Perfect for {bodyPart}</h3>
                    <p>This design works well on the {bodyPart} area</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}