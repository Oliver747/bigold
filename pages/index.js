
import { useState } from "react";
import { FiArrowLeft, FiArrowRight, FiCode } from "react-icons/fi";

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

        <div style={styles.navButtons}>
          <button onClick={goBack} disabled={currentIndex === 0} style={styles.iconButton}>
            <FiArrowLeft size={22} />
          </button>
          <button onClick={handleGenerate} style={styles.iconButton}>
            <span style={{ fontSize: 18 }}>⏯️</span>
          </button>
          <button onClick={goForward} disabled={currentIndex === history.length - 1} style={styles.iconButton}>
            <FiArrowRight size={22} />
          </button>
          <button onClick={() => {}} style={styles.iconButton}>
            <FiCode size={20} />
          </button>
        </div>

        <div style={styles.buttonRow}>
          <button onClick={handleGenerate} style={styles.mainButton}>
            随机生成
          </button>
          <button onClick={handleDownload} style={styles.mainButton}>
            下载头像
          </button>
        </div>
      </main>

      <footer style={styles.footer}>
        Made by 0泡　|　
        <a href="#" style={{ color: "#fff", textDecoration: "underline" }}>
          English
        </a>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(to bottom, #0f2027, #203a43, #2c5364)",
    display: "flex",
    flexDirection: "column",
    fontFamily: "Segoe UI, sans-serif",
    color: "#fff",
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
    color: "#fff",
    marginBottom: "1.5rem",
  },
  imageBox: {
    width: 240,
    height: 240,
    background: "#fff",
    borderRadius: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "1rem",
  },
  image: {
    maxWidth: "100%",
    maxHeight: "100%",
    borderRadius: 12,
  },
  imageId: {
    fontWeight: "bold",
    marginBottom: "1.5rem",
    f
