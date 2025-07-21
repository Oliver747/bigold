import { useState } from "react";

const totalImages = 2000; // 请根据你的图片数量修改此值

export default function Home() {
  const [imageIndex, setImageIndex] = useState(1);

  const handleGenerate = () => {
    const randomIndex = Math.floor(Math.random() * totalImages) + 1;
    setImageIndex(randomIndex);
  };

  const imagePath = `/avatars/${imageIndex}.png`;

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = imagePath;
    link.download = `${imageIndex}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(to bottom right, #e0f7fa, #fff)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem", color: "#00796b" }}>
        🎲 随机头像生成器
      </h1>

      <div style={{
        width: 220,
        height: 220,
        backgroundColor: "#ffffff",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        borderRadius: "12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "1rem",
        padding: "10px"
      }}>
        <img
          src={imagePath}
          alt="avatar"
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            objectFit: "contain",
            borderRadius: "10px"
          }}
        />
      </div>

      <p style={{ marginBottom: "1rem", fontWeight: "bold", color: "#333" }}>
        当前编号：#{imageIndex}
      </p>

      <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
        <button
          onClick={handleGenerate}
          style={{
            padding: "10px 24px",
            backgroundColor: "#00796b",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer"
          }}
        >
          生成新头像
        </button>

        <button
          onClick={handleDownload}
          style={{
            padding: "10px 24px",
            backgroundColor: "#0097a7",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer"
          }}
        >
          下载头像
        </button>
      </div>

      <footer style={{ fontSize: "14px", color: "#555" }}>
        说明：以上头像基于 Mixin Inscription 上的 Blue Bight 项目
      </footer>
    </div>
  );
}
