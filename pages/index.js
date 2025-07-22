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

        {/* 上/下一张按钮组 */}
        <div style={styles.navRow}>
          <button
            onClick={goBack}
            disabled={currentIndex === 0}
            style={styles.navButton}
          >
            Prev
          </button>
          <button
            onClick={goForward}
            disabled={currentIndex === history.length - 1}
            style={styles.navButton}
          >
            Next
          </button>
        </div>

        {/* 随机/下载按钮组 */}
        <div style={styles.buttonRow}>
          <button
            onClick={handleGenerate}
            style={styles.mainButton("#00796b")}
          >
            Randomize
          </button>
          <button
            onClick={handleDownload}
            style={styles.mainButton("#0097a7")}
          >
            Download
          </button>
        </div>
      </div>

      {/* 页脚（始终贴底） */}
      <footer style={styles.footer}>
        Made by YIMO | The avatar is from the Blue Light project on Mixin Inscription.
      </footer>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    width: "100vw", // 解决白边
    overflowX: "hidden", // 防止横向滚动
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
  navRow: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "1rem",
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
    minWidth: "100px", // ✅ 稍微减小，避免换行
  height: "42px", // ✅ 强制高度
  whiteSpace: "nowrap", // ✅ 防止换行
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
    width: "100px", // 统一宽度
  height: "42px", // ✅ 强制高度，避免内容多换行
  whiteSpace: "nowrap", // ✅ 防止文字换行
  textAlign: "center",
    cursor: "pointer",
    transition: "0.2s ease",
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
