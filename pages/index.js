import React, { useState } from 'react';

const TOTAL_IMAGES = 16;

function App() {
  const [avatarIndex, setAvatarIndex] = useState(() => Math.floor(Math.random() * TOTAL_IMAGES) + 1);

  const handleGenerate = () => {
    const random = Math.floor(Math.random() * TOTAL_IMAGES) + 1;
    setAvatarIndex(random);
  };

  const handleDownload = () => {
    const imagePath = `/avatars/#${avatarIndex}.webp`;
    const link = document.createElement('a');
    link.href = imagePath;
    link.download = `avatar-${avatarIndex}.webp`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrev = () => {
    setAvatarIndex(prev => prev === 1 ? TOTAL_IMAGES : prev - 1);
  };

  const handleNext = () => {
    setAvatarIndex(prev => prev === TOTAL_IMAGES ? 1 : prev + 1);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(to bottom, #1e1f3a, #2c2f4a)",
      color: "white",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Segoe UI', sans-serif",
      padding: "20px"
    }}>
      <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>随机头像生成器</h1>

      <div style={{
        backgroundColor: "rgba(255, 255, 255, 0.08)",
        padding: "20px",
        borderRadius: "20px",
        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
        textAlign: "center"
      }}>
        <img
          src={`/avatars/#${avatarIndex}.webp`}
          alt={`Avatar #${avatarIndex}`}
          style={{ width: "200px", height: "200px", objectFit: "contain", borderRadius: "12px" }}
        />
        <p style={{ marginTop: "10px", fontSize: "1.1rem" }}>编号：#{avatarIndex}</p>

        <div style={{ marginTop: "20px", display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "center" }}>
          <button onClick={handlePrev} style={buttonStyle}>《 上一个</button>
          <button onClick={handleGenerate} style={buttonStyle}>🎲 随机生成</button>
          <button onClick={handleNext} style={buttonStyle}>下一个 》</button>
          <button onClick={handleDownload} style={buttonStyle}>📥 下载</button>
        </div>
      </div>

      <footer style={{ marginTop: "40px", fontSize: "0.9rem", opacity: 0.8 }}>
        基于 Mixin 上项目 Blue Bight
      </footer>
    </div>
  );
}

const buttonStyle = {
  backgroundColor: "#4a4df6",
  border: "none",
  padding: "10px 16px",
  borderRadius: "8px",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
  fontSize: "1rem"
};

export default App;
