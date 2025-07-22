import { useState } from "react";

const totalImages = 16;

export default function Home() {
  const [history, setHistory] = useState([1]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentImage = history[currentIndex];
  const imagePath = `/avatars/${currentImage}.webp`;

  const handleGenerate = () => {
    const random = Math.floor(Math.random() * totalImages) + 1;
    // 如果当前不是在最后一张，就清除 forward 历史
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
      minHeight: "100vh",
      background: "#f2f8fc",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem",
      fontFamily: "Segoe UI, sans-serif"
    }}>
      <h1 style={{ fontSize: "2.2rem", color: "#00796b", marginBottom: "1rem" }}>
        🎲 随机头像生成器
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
        position: "relative"
      }}>
        <img
          src={imagePath}
          alt="avatar"
          style={{ maxWidth: "100%", maxHeight: "100%", borderRadius: "10px" }}
        />

        <button onClick={goBack} style={arrowStyle("left")} disabled={currentIndex === 0}>←</button>
        <button onClick={goForward} style={arrowStyle("right")} disabled={currentIndex === history.length - 1}>→</button>
      </div>

      <p style={{ fontWeight: "bold", color: "#444", marginBottom: "1.2rem" }}>
        当前编号：#{currentImage}
      </p>

      <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
        <button onClick={handleGenerate} style={buttonStyle("#00796b")}>随机生成</button>
        <button onClick={handleDownload} style={buttonStyle("#0097a7")}>下载头像</button>
      </div>

      <footer style={{ fontSize: "14px", color: "#555" }}>
        说明：头像来自 Mixin Inscription 上的 Blue Bight 项目
      </footer>
    </div>
  );
}

function arrowStyle(position) {
  return {
    position: "absolute",
    top: "50%",
    [position]: "-40px",
    transform: "translateY(-50%)",
    fontSize: "1.5rem",
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#00796b"
  };
}

function buttonStyle(bgColor) {
  return {
    padding: "10px 20px",
    backgroundColor: bgColor,
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold"
  };
}
