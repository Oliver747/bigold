import { useState, useEffect } from "react";

const totalImages = 16;

export default function Home() {
  const [history, setHistory] = useState([1]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  const currentImage = history[currentIndex];
  const imagePath = `/avatars/${currentImage}.webp`;

  const handleGenerate = () => {
    const newId = Math.floor(Math.random() * totalImages) + 1;
    const newHistory = [...history.slice(0, currentIndex + 1), newId];
    setHistory(newHistory);
    setCurrentIndex(newHistory.length - 1);
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div style={styles.page}>
      {/* 左下角图片 */}
      <img src="/avatars/3.webp" style={styles.cornerImage("left")} />
      {/* 右下角图片 */}
      <img src="/avatars/4.webp" style={styles.cornerImage("right")} />

      {/* 标题 */}
      <h1 style={styles.title}>BLUE LIGHT #{currentImage}</h1>

      {/* 主图片展示区 */}
      <div style={{ ...styles.imageContainer, minHeight: imageLoaded ? "auto" : "420px" }}>
        <img
          key={currentImage}
          src={imagePath}
          alt="Avatar"
          onLoad={() => setImageLoaded(true)}
          style={styles.mainImage}
        />
      </div>

      {/* 操作按钮 */}
      <div style={styles.buttonGroup}>
        <button onClick={handlePrev} style={styles.button}>←</button>
        <button onClick={handleGenerate} style={styles.button}>🎲 Generate</button>
        <button onClick={handleNext} style={styles.button}>→</button>
      </div>

      {/* 页脚 */}
      <footer style={styles.footer}>© 2025 Avatar Generator. All rights reserved.</footer>
    </div>
  );
}

const styles = {
  page: {
    margin: 0,
    padding: 0,
    minHeight: "100vh",
    background: "#f5f8ff",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
  },
  title: {
    fontSize: "2rem",
    marginTop: "40px",
    marginBottom: "20px",
    fontWeight: "bold",
    color: "#2a2a2a",
  },
  mainImage: {
    width: "320px",
    borderRadius: "20px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    zIndex: 5,
  },
  imageContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "min-height 0.3s ease-in-out",
    marginBottom: "20px",
  },
  buttonGroup: {
    display: "flex",
    gap: "10px",
    marginBottom: "40px",
  },
  button: {
    background: "#4A90E2",
    color: "#fff",
    padding: "12px 20px",
    border: "none",
    borderRadius: "12px",
    fontSize: "16px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "60px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },
  footer: {
    marginTop: "auto",
    width: "100%",
    padding: "20px 0",
    textAlign: "center",
    backgroundColor: "transparent",
    fontSize: "14px",
    color: "#777",
  },
  cornerImage: (position) => ({
    position: "absolute",
    bottom: "10px",
    [position]: "10px",
    width: "100px",
    zIndex: 10,
    borderRadius: "12px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  }),
};
