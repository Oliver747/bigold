import { useState, useEffect } from "react";

const totalImages = 16;

export default function Home() {
  const [history, setHistory] = useState([1]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.documentElement.style.margin = "0";
    document.documentElement.style.padding = "0";
  }, []);

  const currentImage = history[currentIndex];
  const imagePath = `/avatars/${currentImage}.webp`;

  const handleGenerate = () => {
    const newId = Math.floor(Math.random() * totalImages) + 1;
    const newHistory = [...history.slice(0, currentIndex + 1), newId];
    setHistory(newHistory);
    setCurrentIndex(newHistory.length - 1);
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleNext = () => {
    if (currentIndex < history.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = imagePath;
    link.download = `avatar_${currentImage}.webp`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const styles = {
    container: {
      minHeight: "100vh",
      background: "#f1f5f9",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      paddingBottom: "60px", // 给页脚留空间
      position: "relative",
    },
    title: {
      fontSize: "2rem",
      fontWeight: "bold",
      marginBottom: "0.5rem",
      color: "#1e3a8a",
    },
    subtitle: {
      fontSize: "1rem",
      marginBottom: "1rem",
      color: "#475569",
    },
    avatar: {
      width: 280,
      height: 280,
      borderRadius: "50%",
      objectFit: "cover",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      marginBottom: "1rem",
      background: "#cbd5e1",
    },
    buttonRow: {
      display: "flex",
      justifyContent: "center",
      gap: "1rem",
      marginBottom: "1rem",
    },
    button: {
      padding: "10px 20px",
      backgroundColor: "#3b82f6",
      color: "white",
      border: "none",
      borderRadius: "8px",
      fontSize: "1rem",
      cursor: "pointer",
      boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
      textAlign: "center",
    },
    cornerLeft: {
      position: "fixed",
      left: 10,
      bottom: 10,
      width: 60,
      height: 60,
      borderRadius: "50%",
      objectFit: "cover",
      zIndex: 10,
    },
    cornerRight: {
      position: "fixed",
      right: 10,
      bottom: 10,
      width: 60,
      height: 60,
      borderRadius: "50%",
      objectFit: "cover",
      zIndex: 10,
    },
    footer: {
      position: "fixed",
      bottom: 0,
      width: "100%",
      backgroundColor: "rgba(255,255,255,0.8)",
      textAlign: "center",
      padding: "10px 0",
      fontSize: "0.9rem",
      color: "#64748b",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.title}>
        BLUE LIGHT <span style={{ fontSize: "1rem", marginLeft: "0.5rem" }}>#{currentImage}</span>
      </div>
      <div style={styles.subtitle}>AI Avatar Generator</div>

      {!imageError && (
        <img
          key={currentImage}
          src={imagePath}
          alt="avatar"
          style={styles.avatar}
          onLoad={() => {
            setImageError(false);
            setImageLoaded(true);
          }}
          onError={() => {
            setImageError(true);
            setImageLoaded(false);
          }}
        />
      )}

      {imageLoaded && (
        <>
          <img src={imagePath} alt="corner-left" style={styles.cornerLeft} />
          <img src={imagePath} alt="corner-right" style={styles.cornerRight} />

          <div style={styles.buttonRow}>
            <button style={styles.button} onClick={handlePrev}>PREV</button>
            <button style={styles.button} onClick={handleNext}>NEXT</button>
          </div>
          <div style={styles.buttonRow}>
            <button style={styles.button} onClick={handleGenerate}>RANDOM</button>
            <button style={styles.button} onClick={handleDownload}>DOWNLOAD</button>
          </div>
        </>
      )}

      <div style={styles.footer}>
        © 2025 Your Avatar Generator. All rights reserved.
      </div>
    </div>
  );
}
