// 安装依赖：npm install react-icons

import { useState } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

const totalImages = 16;

export default function Home() {
  const [history, setHistory] = useState([1]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageError, setImageError] = useState(false);

  const currentImage = history[currentIndex];
  const imagePath = `/avatars/${currentImage}.webp`;

  const handleGenerate = () => {
    let random = Math.floor(Math.random() * totalImages) + 1;
    while (random === currentImage) {
      random = Math.floor(Math.random() * totalImages) + 1;
    }
    const newHistory = history.slice(0, currentIndex + 1);
    newHistory.push(random);
    setHistory(newHistory);
    setCurrentIndex(newHistory.length - 1);
    setImageError(false);
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = imagePath;
    link.download = `${currentImage}.webp`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const goBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setImageError(false);
    }
  };

  const goForward = () => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setImageError(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.logo}>
        <img src="/logo.png" alt="Logo" style={{ height: 40 }} />
      </div>

      <main style={styles.main}>
        <h1 style={styles.title}>Blue Light</h1>
        <div style={styles.imageBox}>
          <img
            src={imageError ? "/fallback.webp" : imagePath}
            alt="avatar"
            onError={() => setImageError(true)}
            style={styles.image}
          />
        </div>
        <p style={styles.imageId}>#{currentImage}</p>

        {/* 📐 新版箭头按钮 */}
        <div style={styles.navButtons}>
          <button
            onClick={goBack}
            disabled={currentIndex === 0}
            style={styles.arrowButton}
          >
            <FiArrowLeft size={24} />
          </button>
          <button
            onClick={goForward}
            disabled={currentIndex === history.length - 1}
            style={styles.arrowButton}
          >
            <FiArrowRight size={24} />
          </button>
        </div>

        <div style={styles.buttonRow}>
          <button onClick={handleGenerate} style={styles.mainButton("#00796b")}>
            Randomize
          </button>
          <button onClick={handleDownload} style={styles.mainButton("#0097a7")}>
            Download
          </button>
        </div>
      </main>

      <footer style={styles.footer}>
        Made by YIMO | The avatar is from the Blue Light project on Mixin Inscription.
      </footer>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    background: "#f2f8fc",
    fontFamily: "Segoe UI, sans-serif",
    position: "relative",
  },
  logo: {
    position: "absolute",
    top: 20,
    left: 20,
  },
  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "2rem 1rem",
    marginTop: "4rem",
  },
  title: {
    fontSize: "2.2rem",
    color: "#00796b",
    marginBottom: "1.5rem",
  },
  imageBox: {
    width: 240,
    height: 240,
    background: "#fff",
    borderRadius: 12,
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "1rem",
  },
  image: {
    maxWidth: "100%",
    maxHeight: "100%",
    borderRadius: 10,
  },
  imageId: {
    fontWeight: "bold",
    color: "#444",
    marginBottom: "1rem",
  },
  navButtons: {
    display: "flex",
    gap: "1rem",
    marginBottom: "1rem",
  },
  arrowButton: {
    background: "#fff",
    border: "1px solid #ccc",
    borderRadius: "50%",
    padding: 10,
    cursor: "pointer",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    transition: "all 0.2s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonRow: {
    display: "flex",
    gap: "1rem",
  },
  mainButton: (bgColor) => ({
    padding: "10px 18px",
    backgroundColor: bgColor,
    color: "#fff",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: 16,
    minWidth: 110,
    transition: "0.2s ease",
  }),
  footer: {
    textAlign: "center",
    fontSize: 14,
    color: "#555",
    padding: "1rem 0",
    borderTop: "1px solid #ccc",
    background: "#f2f8fc",
  },
};
