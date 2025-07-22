// pages/index.jsx 或 app/page.jsx（Next.js 项目）

import { useState } from "react";

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

  return (
    <div style={styles.container}>
      {/* 左上角 Logo */}
      <div style={styles.logo}>
        <img src="/logo.png" alt="Logo" style={{ height: "40px" }} />
      </div>

      {/* 主体内容 */}
      <div style={styles.main}>
        <h1 style={styles.title}>随机头像生成</h1>

        {/* 图片展示区域 */}
        <div style={styles.imageBox}>
          <img
            src={imageError ? "/fallback.webp" : imagePath}
            alt="avatar"
            onError={() => setImageError(true)}
            style={styles.image}
          />
        </div>
        <p style={styles.imageId}>编号：#{currentImage}</p>

        {/* 前后导航按钮 */}
        <div style={styles.buttonRow}>
          <button
            onClick={goBack}
            disabled={currentIndex === 0}
            style={styles.navButton}
          >
            ⬅️ 上一张
          </button>
          <button
            onClick={goForward}
            disabled={currentIndex === history.length - 1}
            style={styles.navButton}
          >
            下一张 ➡️
          </button>
        </div>

        {/* 生成/下载按钮 */}
        <div style={styles.buttonRow}>
          <button onClick={handleGenerate} style={styles.mainButton("#00796b")}>
            随机生成
          </button>
          <button onClick={handleDownload} style={styles.mainButton("#0097a7")}>
            下载头像
          </button>
        </div>
      </div>

      {/* 固定页脚 */}
      <footer style={styles.footer}>
        说明：头像来自 Mixin Inscription 上的 Blue Bight 项目
      </footer>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "#f2f8fc",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    paddingBottom: "60px", // 留出页脚空间
    fontFamily: "Segoe UI, sans-serif",
  },
  logo: {
    position: "absolute",
    top: 20,
    left: 20,
  },
  main: {
    marginTop: "6rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "1rem",
  },
  title: {
    fontSize: "2rem",
    color: "#00796b",
    marginBottom: "1rem",
  },
  imageBox: {
    width: "220px",
    height: "220px",
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
    color: "#444",
    marginBottom: "1rem",
  },
  buttonRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "1rem",
    marginBottom: "1rem",
    justifyContent: "center",
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
    minWidth: "110px",
    transition: "0.2s ease",
  }),
  navButton: {
    padding: "10px 18px",
    backgroundColor: "#e0f2f1",
    color: "#00796b",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    fontSize: "16px",
    minWidth: "110px",
    cursor: "pointer",
    transition: "0.2s ease",
  },
  footer: {
    position: "absolute",
    bottom: 10,
    width: "100%",
    textAlign: "center",
    fontSize: "14px",
    color: "#555",
  },
};
