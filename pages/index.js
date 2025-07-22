// pages/index.js
import { useState } from "react";

const totalImages = 16;

export default function Home() {
  const [history, setHistory] = useState([1]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentImage = history[currentIndex];
  const imagePath = `/avatars/${currentImage}.webp`;

  const handleGenerate = () => {
    const random = Math.floor(Math.random() * totalImages) + 1;
    const newHistory = history.slice(0, currentIndex + 1);
    newHistory.push(random);
    setHistory(newHistory);
    setCurrentIndex(newHistory.length - 1);
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
    }
  };

  const goForward = () => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
      background: "#f2f8fc",
      fontFamily: "Segoe UI, sans-serif",
      position: "relative",
    }}>
      {/* Logo 左上角 */}
      <div style={{
        position: "absolute",
        top: "20px",
        left: "20px"
      }}>
        <img src="/logo.png" alt="Logo" style={{ height: "40px", objectFit: "contain" }} />
      </div>

      {/* 主体内容区域 */}
      <main style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "4rem",
        paddingBottom: "2rem"
      }}>
        <h1 style={{ fontSize: "2.2rem", color: "#00796b", marginBottom: "1rem" }}>
          随机头像生成
        </h1>

        <div style={{
          width: 220,
          height: 220,
          backgroundColor: "#fff",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          borderRadius: "12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "1rem",
          padding: "10px",
        }}>
          <img
            src={imagePath}
            alt="avatar"
            style={{ maxWidth: "100%", maxHeight: "100%", borderRadius: "10px" }}
          />
        </div>

        <p style={{ fontWeight: "bold", color: "#444", marginBottom: "1.5rem" }}>
          编号：#{currentImage}
        </p>

        {/* 上下导航按钮 */}
        <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
          <button onClick={goBack} style={navButtonStyle} disabled={currentIndex === 0}>⬅️ 上一张</button>
          <button onClick={goForward} style={navButtonStyle} disabled={currentIndex === history.length - 1}>下一张 ➡️</button>
        </div>

        {/* 随机 / 下载按钮 */}
        <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
          <button onClick={handleGenerate} style={mainButtonStyle("#00796b")}>随机生成</button>
          <button onClick={handleDownload} style={mainButtonStyle("#0097a7")}>下载头像</button>
        </div>
      </main>

      {/* 页脚贴底 */}
      <footer style={{
        fontSize: "14px",
        color: "#555",
        textAlign: "center",
        padding: "1rem 0",
      }}>
        说明：头像来自 Mixin Inscription 上的 Blue Bight 项目
      </footer>
    </div>
  );
}

const mainButtonStyle = (bgColor) => ({
  padding: "8px 18px",
  backgroundColor: bgColor,
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "16px",
  minWidth: "110px",
  transition: "0.2s ease",
});

const navButtonStyle = {
  padding: "8px 18px",
  backgroundColor: "#e0f2f1",
  color: "#00796b",
  border: "none",
  borderRadius: "8px",
  fontSize: "16px",
  fontWeight: "bold",
  cursor: "pointer",
  minWidth: "110px",
  transition: "0.2s ease",
};
