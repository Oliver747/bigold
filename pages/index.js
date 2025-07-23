import { useState, useEffect } from "react";

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
      {/* 左上角 Logo */}
      <div style={styles.logo}>
        <img src="/logo.png" alt="Logo" style={{ height: "40px" }} />
      </div>

      {/* 主内容区域 */}
      <div style={styles.main}>
        <h1 style={styles.title}></h1>

        <div style={styles.imageBox}>
          <img
            src={imageError ? "/fallback.webp" : imagePath}
            alt="avatar"
            onError={() => setImageError(true)}
            style={styles.image}
          />
        </div>

        <p style={styles.imageId}>#{currentImage}</p>

        {/* 上/下一张按钮组 */}
        <div style={styles.navRow}>
          <button
            onClick={goBack}
            disabled={currentIndex === 0}
            style={{ ...styles.baseButton, ...styles.navButton }}
          >
            Prev
          </button>
          <button
            onClick={goForward}
            disabled={currentIndex === history.length - 1}
            style={{ ...styles.baseButton, ...styles.navButton }}
          >
            Next
          </button>
        </div>

        {/* 随机/下载按钮组 */}
        <div style={styles.buttonRow}>
          <button
            onClick={handleGenerate}
            style={{ ...styles.baseButton, ...styles.mainButton("#00796b") }}
          >
            Random
          </button>
          <button
            onClick={handleDownload}
            style={{ ...styles.baseButton, ...styles.mainButton("#0097a7") }}
          >
            Download
          </button>
        </div>
      </div>

      {/* 页脚 */}
      <footer style={styles.footer}>
        Made by YIMO | Blue Light
      </footer>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    width: "100vw",
    margin: "0",
    padding: "0",
    overflowX: "hidden",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    background: "linear-gradient(to bottom right, #4f46e5, #9333ea)",
    fontFamily: "Segoe UI, sans-serif",
    color: "#ffffff",
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
    justifyContent: "center",
  },
  title: {
    fontSize: "2rem",
    color: "#00796b",
    marginBottom: "1.5rem",
  },
  imageBox: {
    width: "240px",
    height: "240px",
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "1rem",
  },
  image: {
    maxWidth: "100%",
    maxHeight: "100%",
    borderRadius: "10px",
  },
  imageId: {
    fontWeight: "bold",
    color: "#fff",
    marginBottom: "1rem",
  },

  baseButton: {
    padding: "10px 18px",
    width: "120px",
    height: "44px",
    fontSize: "16px",
    fontWeight: "bold",
    border: "none",
    borderRadius: "8px",
    whiteSpace: "nowrap",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "0.2s ease",
  },

  navButton: {
    backgroundColor: "#e0f2f1",
    color: "#00796b",
  },

  mainButton: (bgColor) => ({
    backgroundColor: bgColor,
    color: "#fff",
  }),

  navRow: {
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
  gap: "0.5rem",
  marginBottom: "1rem",
  maxWidth: "280px", // ✅ 控制容器宽度
  marginLeft: "auto", // ✅ 居中
  marginRight: "auto",
},

buttonRow: {
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
  gap: "0.5rem",
  marginBottom: "1rem",
  maxWidth: "280px", // ✅ 一样处理
  marginLeft: "auto",
  marginRight: "auto",
},


  footer: {
    textAlign: "center",
    fontSize: "14px",
    color: "#ffffff",
    padding: "1rem",
    borderTop: "1px solid rgba(255, 255, 255, 0.2)",
    background: "transparent",
    marginTop: "auto",
    width: "100%",
  },
};
