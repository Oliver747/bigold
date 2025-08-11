import { useState, useEffect } from "react";

const totalImages = 2000;

export default function Home() {
  const [history, setHistory] = useState([0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageError, setImageError] = useState(false);

  const currentImage = history[currentIndex];
  const imagePath = `/avatars/${currentImage}.webp`;

  const handleGenerate = () => {
    const newImage = Math.floor(Math.random() * totalImages);
    setHistory([...history.slice(0, currentIndex + 1), newImage]);
    setCurrentIndex(currentIndex + 1);
    setImageError(false);
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = imagePath;
    link.download = `avatar_${currentImage}.webp`;
    link.click();
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

    useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.overflowX = "hidden";
    document.documentElement.style.margin = "0";
    document.documentElement.style.padding = "0";
  }, []);
  
  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.avatarWrapper}>
          <img
            key={currentImage}
            src={imagePath}
            alt="avatar"
            style={styles.avatar}
            onError={() => setImageError(true)}
          />
          {!imageError && (
            <>
              <img src={imagePath} style={styles.cornerLeft} />
              <img src={imagePath} style={styles.cornerRight} />
            </>
          )}
        </div>

        <div style={styles.title}>
          BLUE LIGHT <span style={styles.imageId}>#{currentImage}</span>
        </div>
        <div style={styles.subtitle}>Based on Mixin Inscription</div>

        <div style={styles.buttonGroup}>
  <div style={styles.buttonRow}>
    <button style={styles.button} onClick={handlePrev}>Prev</button>
    <button style={styles.button} onClick={handleNext}>Next</button>
  </div>
  <div style={styles.buttonRow}>
    <button style={styles.button} onClick={handleGenerate}>Random</button>
    <button style={styles.button} onClick={handleDownload}>Download</button>
  </div>
</div>
      </div>

      <footer style={styles.footer}>
        <p>© 2025 Bigold Club. All rights reserved.</p>
      </footer>
    </div>
  );
}

const styles = {
  page: {
   minHeight: "100vh",
    width: "100vw", // 解决白边
    margin: "0", // ✅ 添加这行
  padding: "0", // ✅ 添加这行
    overflowX: "hidden", // 防止横向滚动
      boxsizing:"border-box",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    background: "linear-gradient(to bottom right, #4878cb, #48c9c7)",
    fontFamily: "Segoe UI, sans-serif",
    color: "#ffffff",
  },
  container: {
    textAlign: "center",
    flexGrow: 1,
  flex: 1, // 加在 styles.container 中
  },
  avatarWrapper: {
    position: "relative",
    marginBottom: 20,
    minHeight: "400px",
  },
  avatar: {
    width: "400px",
    height: "400px",
    borderRadius: "10px",// ✅ 圆角
    boxShadow: "0 8px 15px rgba(0,0,0,0.4)",
  },
  cornerLeft: {
    position: "absolute",
    bottom: "-50px",
    left: "5px",
    width: "100px",
    height: "100px",
    borderRadius: "16px",
    objectFit: "cover",
    border: "0px solid white",
    zIndex: 10,
    boxShadow: "0px 2px 7px rgba(0,0,0,0.5)", // ✅ 灰色阴影
    background: "#7BA8D1",
  },
  cornerRight: {
    position: "absolute",
    bottom: "-40px",
    right: "5px",
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "0px solid white",
    zIndex: 10,
    boxShadow: "0px 2px 7px rgba(0,0,0,0.5)", // ✅ 灰色阴影
    background: "#7BA8D1",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    marginTop: "50px",
    textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)"
  },
  imageId: {
    fontSize: "24px",
    fontWeight: "bold",
    marginLeft: "10px",
    textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)"
  },
  subtitle: {
    fontSize: "14px",
    marginBottom: "30px",
    marginTop: "5px",
    textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)"
  },
  buttonRow: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginBottom: "20px",
  },
  button: {
  flex: "0 0 33%",                            // ✅ 每个按钮宽度一致
  margin: "0 5px",                    // ✅ 保持间隔
  padding: "10px 0",                  // ✅ 上下 padding，左右 padding 取消
  border: "none",
  borderRadius: "16px",
  cursor: "pointer",
  fontSize: "16px",
  color: "#fff",                      // ✅ 字体白色
  backgroundColor: "rgba(240,245,250, 0.3)",        // ✅ 默认背景（你也可以自定义）
  boxShadow: "2px 2px 5px rgba(0,0,0,0.4)", // ✅ 灰色右下阴影
},

buttonGroup: {
  marginTop: "50px", // ← 控制整体向下偏移的距离，自行调大或调小
},

  footer: {
    marginTop: "1px",
    padding: "10px 0",
    width: "100%",
    textAlign: "center",
    fontSize: "14px",
    color: "#e0e0e0",
  },
};
