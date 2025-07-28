import { useState, useEffect } from "react";

const totalImages = 16;

export default function Home() {
  const [history, setHistory] = useState([1]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageError, setImageError] = useState(false);

  const currentImage = history[currentIndex];
  const imagePath = `/avatars/${currentImage}.webp`;

  const handleGenerate = () => {
    if (totalImages <= 1) return;
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
    link.href = `${window.location.origin}${imagePath}`;
    link.download = `${currentImage}.webp`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const goBack = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
    setImageError(false);
  };

  const goForward = () => {
    if (currentIndex < history.length - 1) setCurrentIndex(currentIndex + 1);
    setImageError(false);
  };

  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.overflowX = "hidden";
    document.documentElement.style.margin = "0";
    document.documentElement.style.padding = "0";
  }, []);

  return (
    <div style={styles.container}>
      {/* 主头像展示 */}
      <div style={styles.imageWrapper}>
        <img
          src={imageError ? "/fallback.webp" : imagePath}
          alt="avatar"
          onError={() => setImageError(true)}
          style={styles.mainImage}
        />

        {/* 左下小方图 */}
        <img
          src={imageError ? "/fallback.webp" : imagePath}
          alt="small avatar"
          style={styles.bottomLeftImage}
        />

        {/* 右下圆图 */}
        <img
          src={imageError ? "/fallback.webp" : imagePath}
          alt="round avatar"
          style={styles.bottomRightImage}
        />
      </div>

      {/* 标题 */}
      <div style={styles.titleBox}>
        <h2 style={styles.title}>BLUE LIGHT</h2>
        <p style={styles.subtitle}>BASED ON MIXIN INSCRIPTION</p>
      </div>

      {/* 上/下一张按钮 */}
      <div style={styles.buttonRow}>
        <button onClick={goBack} disabled={currentIndex === 0} style={styles.button}>
          PREV
        </button>
        <button onClick={goForward} disabled={currentIndex === history.length - 1} style={styles.button}>
          NEXT
        </button>
      </div>

      {/* 随机/下载按钮 */}
      <div style={styles.buttonRow}>
        <button onClick={handleGenerate} style={styles.button}>
          RANDOM
        </button>
        <button onClick={handleDownload} style={styles.button}>
          DOWNLOAD
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    width: "100vw",
    backgroundColor: "#91b5e6", // 贴近图中背景色
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Segoe UI, sans-serif",
    color: "#ffffff",
    position: "relative",
    overflow: "hidden",
  },

  imageWrapper: {
    position: "relative",
    width: "320px",
    height: "320px",
    borderRadius: "16px",
    overflow: "hidden",
    marginBottom: "2rem",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)",
  },

  mainImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "16px",
  },

  bottomLeftImage: {
    position: "absolute",
    bottom: "-20px",
    left: "-20px",
    width: "80px",
    height: "80px",
    objectFit: "cover",
    borderRadius: "12px",
    border: "3px solid white",
    backgroundColor: "#fff",
  },

  bottomRightImage: {
    position: "absolute",
    bottom: "-25px",
    right: "-25px",
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "3px solid white",
    backgroundColor: "#fff",
  },

  titleBox: {
    textAlign: "center",
    marginBottom: "2rem",
  },

  title: {
    fontSize: "24px",
    fontWeight: "bold",
    letterSpacing: "2px",
    margin: 0,
    color: "#ffffff",
  },

  subtitle: {
    fontSize: "14px",
    letterSpacing: "1px",
    color: "#e0f7fa",
    margin: 0,
    marginTop: "0.5rem",
  },

  buttonRow: {
    display: "flex",
    gap: "1rem",
    marginBottom: "1rem",
    flexWrap: "wrap",
    justifyContent: "center",
  },

  button: {
    padding: "10px 18px",
    backgroundColor: "#6b90c7",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    fontSize: "16px",
    width: "130px",
    height: "44px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
    opacity: 0.95,
    cursor: "pointer",
    transition: "all 0.2s ease-in-out",
  },
};
