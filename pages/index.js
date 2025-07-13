import { useState } from "react";

const totalImages = 10; // 假设你有 10 张头像：1.png ~ 10.png

export default function Home() {
  const [imageIndex, setImageIndex] = useState(1);

  const handleGenerate = () => {
    const randomIndex = Math.floor(Math.random() * totalImages) + 1;
    setImageIndex(randomIndex);
  };

  const imagePath = `/avatars/${imageIndex}.png`;

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
      <h1 style={{
        fontSize: "2.5rem",
        marginBottom: "1rem",
        color: "#00796b"
      }}>🎲 随机头像生成器</h1>

      <div style={{
        width: 220,
        height: 220,
        backgroundColor: "#ffffff",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        borderRadius: "12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "1.5rem",
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

      <button
        onClick={handleGenerate}
        style={{
          padding: "12px 28px",
          backgroundColor: "#00796b",
          color: "white",
          border: "none",
          borderRadius: "8px",
          fontSize: "16px",
          cursor: "pointer",
          transition: "all 0.3s ease"
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = "#004d40"}
        onMouseOut={(e) => e.target.style.backgroundColor = "#00796b"}
      >
        生成新头像
      </button>
    </div>
  );
}
