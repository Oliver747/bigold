import { useState } from "react";

const totalImages = 16;

export default function Home() {
  const [history, setHistory] = useState([1]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageError, setImageError] = useState(false);

  const currentImage = history[currentIndex];
  const imagePath = `/avatars/${currentImage}.webp`;

  const handleGenerate = () => {
    const newImage = Math.floor(Math.random() * totalImages) + 1;
    const newHistory = [...history.slice(0, currentIndex + 1), newImage];
    setHistory(newHistory);
    setCurrentIndex(newHistory.length - 1);
    setImageError(false);
  };

  const handleBack = () => {
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

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>头像生成器</h1>
      </div>

      <div style={styles.imageContainer}>
        {!imageError ? (
          <img
            src={imagePath}
            alt={`头像${currentImage}`}
            style={styles.image}
            onError={() => setImageError(true)}
          />
        ) : (
          <p style={styles.errorText}>图像加载失败</p>
        )}
      </div>

      <div style={styles.navigation}>
        <button onClick={handleBack} disabled={currentIndex === 0} style={styles.navButton}>
          ←
        </button>
        <button onClick={handleNext} disabled={currentIndex === history.length - 1} style={styles.navButton}>
          →
        </button>
      </div>

      <div style={styles.buttonRow}>
        <button onClick={handleGenerate} style={styles.mainButton("#10b981")}>
          生成头像
        </button>
        <button onClick={handleDownload} style={styles.mainButton("#3b82f6")}>
          下载头像
        </button>
      </div>

      <footer style={styles.footer}>
        <p>© 2025 Avatar Generator</p>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    width: "100vw",
    margin: 0,
    padding: 0,
    display: "flex",
    flexDirection: "column",
    background: "linear-gradient(to bottom right, #4f46e5, #9333ea)",
    fontFamily: "Segoe UI, sans-serif",
    color: "#ffffff",
  },
  header: {
    padding: "1.5rem 0 0.5rem 0",
    textAlign: "center",
  },
  title: {
    margin: 0,
    fontSize: "2.2rem",
    fontWeight: "700",
  },
  imageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
    padding: "1rem 0",
  },
  image: {
    width: "280px",
    height: "280px",
    borderRadius: "16px",
    objectFit: "cover",
    boxShadow: "0 0 20px rgba(0,0,0,0.3)",
    border: "4px solid white",
  },
  errorText: {
    color: "red",
    fontWeight: "bold",
  },
  navigation: {
    display: "flex",
    justifyContent: "center",
    gap: "2rem",
    marginTop: "1rem",
  },
  navButton: {
    padding: "10px 18px",
    backgroundColor: "#e0f2f1",
    color: "#00796b",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    fontSize: "16px",
    width: "120px",
    height: "42px",
    whiteSpace: "nowrap",
    textAlign: "center",
    cursor: "pointer",
    transition: "0.2s ease",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonRow: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "1rem",
    marginTop: "1.5rem",
    marginBottom: "2rem",
  },
  mainButton: (bgColor) => ({
    padding: "10px 18px",
    backgroundColor: bgColor,
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "16px",
    minWidth: "120px",
    height: "42px",
    whiteSpace: "nowrap",
    transition: "0.2s ease",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  }),
  footer: {
    textAlign: "center",
    padding: "1rem 0",
    backgroundColor: "transparent",
    fontSize: "14px",
    marginTop: "auto",
  },
};
