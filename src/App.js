import './App.css';
import { useState, useEffect } from "react";
import digiboard_logo from "./style/img/Digiboard Title.png";
import noticeboard_example_video from "./style/video/digiboard.mp4"
import noticeboard_example_video_mobile from "./style/video/digiboard_mobile.mp4"

function App() {
  const [videoUrl, setVideoUrl] = useState(null);

  const reloadRoot = () => {
    window.location.href = '/';
  }

  useEffect(() => {
    if (window.innerWidth <= 480) {
      setVideoUrl(noticeboard_example_video_mobile);
    } else {
      setVideoUrl(noticeboard_example_video);
    }
  }, []);

  function alertScreenSize() {
    if (window.innerWidth < 1080) {
      alert(`Unsupported screen resolution: ${window.innerWidth}x${window.innerHeight} Supported screen resolutions: 1080P or bigger`);
      return;
    }

    window.location.href = `/noticeboard?v=example1`;
  }

  return (
    <>
      <div className="main-wrapper">
        <div className="header">
          <img src={digiboard_logo} onClick={reloadRoot} style={{ cursor: "pointer" }} title="Home" className="header_logo" width="200px" height="50px" alt="Digiboard Icon"></img>
          <div className="button-container">
            <div className="inner-button-container">
              <a className="button" href="/login">
                Login
              </a>
            </div>
          </div>
        </div>
        <div className="container" id="introduction">
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <p className="main_title">Digiboard. The modern and easy to use noticeboard.</p>
            {videoUrl && (
              <video className="example_video" autoPlay muted loop>
                <source src={videoUrl} type="video/mp4">
                </source>
              </video>
            )}
            <div style={{ display: "flex", gap: "15px" }}>
              <a href="#features" className="continue-button">Features</a>
              <a href="/register" className="register-button">Register</a>
              <a onClick={alertScreenSize} className="viewdemo-button">View Demo</a>
            </div>
          </div>
        </div>
        <div className="container-perks">
          <div className="perk-card">
            <p style={{ fontSize: "25px" }}>Interactive</p>
            <p style={{ fontSize: "18px" }}>An easy, intuitive noticeboard for your audience to interact with.</p>
          </div>
          <div className="perk-card">
            <p style={{ fontSize: "25px" }}>Responsive</p>
            <p style={{ width: "350px", fontSize: "18px" }}>Uploaded images are automatically resized to fit your screen.</p>
          </div>
          <div className="perk-card">
            <p style={{ fontSize: "25px" }}>Attractive</p>
            <p style={{ fontSize: "18px" }}>Configure each noticeboard exactly to your preference.</p>
          </div>
        </div>
        <div className="features" id="features">
          <p>Features</p>
          <ul>
            <li>
              Up to 4 noticeboards
            </li>
            <li>
              Customisable
            </li>
            <li>
              Interactive
            </li>
            <li>
              Real time updates
            </li>
            <li>
              4K and 1080P compatible
            </li>
            <p style={{ margin: 0, fontSize: "17px" }}>
              (4K recommended)
            </p>
          </ul>
        </div>
        <div className="footer" style={{ opacity: "0.9" }}>
          <div style={{ width: "80%", paddingLeft: "10%", display: "flex", gap: "55px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <p className="footer-title" style={{ fontSize: "15px", color: "#fff" }}>LEGAL</p>
              <a className="footer-a" style={{ fontSize: "14px", textDecoration: "none", color: "#fff" }} href="/privacy">Privacy Policy</a>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <p className="footer-title" style={{ fontSize: "15px", color: "#fff" }}>CONTACT US</p>
              <a className="footer-a" style={{ fontSize: "14px", textDecoration: "none", color: "#fff" }} href="mailto:sales@digiboard.cloud">sales@digiboard.cloud</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
