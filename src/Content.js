import digiboard_logo from "./style/img/Digiboard Title.png";
import SettingCog from "./style/img/settings-cog.svg";
import { useEffect, useState } from "react";
import './style/css/Content.css';
import EyeIcon from "./style/img/eye-alt-svgrepo-com.svg"
import DeleteIcon from "./style/img/bin-delete-recycle-svgrepo-com.svg"
import DownloadIcon from "./style/img/download-svgrepo-com.svg"

function Content() {
  const [url, setURL_1] = useState("");
  const [url_2, setURL_2] = useState("");
  const [url_3, setURL_3] = useState("");
  const [url_4, setURL_4] = useState("");
  const [id, setId] = useState("");
  const [fileName1, setFileName1] = useState([]);
  const [fileName2, setFileName2] = useState([]);
  const [fileName3, setFileName3] = useState([]);
  const [fileName4, setFileName4] = useState([]);
  const [Title1, setTitle1] = useState("");
  const [Title2, setTitle2] = useState("");
  const [Title3, setTitle3] = useState("");
  const [Title4, setTitle4] = useState("");
  const [eyeFile, setEyeFile] = useState([]);
  const [Preview1, setPreview1] = useState(true);
  const [Preview2, setPreview2] = useState(true);
  const [Preview3, setPreview3] = useState(true);
  const [Preview4, setPreview4] = useState(true);

  useEffect(() => {
    async function authToken() {
      const response = await fetch("/api/auth/me", {
        method: 'GET',
        credentials: "include"
      });

      if (!response.ok) {
        window.location.href = '/login';
      } else {
        const data = await response.json();
        const id = data.ok;

        setId(data.ok);

        const response2 = await fetch('/api/content/file_1', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id })
        });

        if (response2.ok) {
          const data = await response2.json();

          setFileName1(data.files_array);
        }

        const response3 = await fetch('/api/content/file_2', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id })
        });

        if (response3.ok) {
          const data = await response3.json();

          setFileName2(data.files_array);
        }

        const response4 = await fetch('/api/content/file_3', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id })
        });

        if (response4.ok) {
          const data = await response4.json();

          setFileName3(data.files_array);
        }


        const response5 = await fetch('/api/content/file_4', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id })
        });

        if (response5.ok) {
          const data = await response5.json();

          setFileName4(data.files_array);
        }

        const response6 = await fetch('/api/noticeboard/config', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id })
        });

        if (response6.ok) {
          const data = await response6.json();

          setTitle1(data.n1t1);
          setTitle2(data.n2t2);
          setTitle3(data.n3t3);
          setTitle4(data.n4t4);
        }
      }
    }
    authToken();

    async function fetchUrls() {
      const response = await fetch("/api/auth/me", {
        method: 'GET',
        credentials: "include"
      });

      if (!response.ok) {
        window.location.href = '/login';
      } else {
        const data = await response.json();

        const response2 = await fetch("/api/noticeboard/id/url/fetch", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id: data.ok })
        });

        if (response2.ok) {
          const data = await response2.json();

          setURL_1(data.n1);
          setURL_2(data.n2);
          setURL_3(data.n3);
          setURL_4(data.n4);
        } else {
          const data = await response2.json();

          alert(data.ok);
        }
      }
    }
    fetchUrls();
  }, []);

  const reloadRoot = () => {
    window.location.href = '/';
  }
  const settingsDirect = () => {
    window.location.href = '/noticeboard/conf';
  }
  const NoticeBoardPublic1 = () => {
    window.location.href = `/noticeboard?v=${url.n1}`;
  };
  const NoticeBoardPublic2 = () => {
    window.location.href = `/noticeboard_2?v=${url_2.n2}`;
  };
  const NoticeBoardPublic3 = () => {
    window.location.href = `/noticeboard_3?v=${url_3.n3}`;
  };
  const NoticeBoardPublic4 = () => {
    window.location.href = `/noticeboard_4?v=${url_4.n4}`;
  };

  async function submitFile1() {
    const file = document.getElementById('file1').files[0];

    if (!file) return alert('Select a file first.');

    const allowedExt = ['png', 'jpg'];
    const fileExt = file.name.split(".").pop().toLowerCase();

    if (!allowedExt.includes(fileExt)) {
      return alert(`Invalid file type, allowed: ${allowedExt.join(', ')}`);
    }

    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`/api/content/upload_1?i=${id}`, {
      method: "POST",
      body: formData
    });

    if (response.ok) {
      alert('Uploaded successfully.');

      window.location.reload();
    } else {
      alert(`Error uploading file. Contact support@digiboard.cloud if it still happens in the next 24 hours.`);
    }
  }

  async function submitFile2() {
    const file = document.getElementById('file2').files[0];

    if (!file) return alert('Select a file first.');

    const allowedExt = ['png', 'jpg'];
    const fileExt = file.name.split(".").pop().toLowerCase();

    if (!allowedExt.includes(fileExt)) {
      return alert(`Invalid file type, allowed: ${allowedExt.join(', ')}`);
    }

    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`/api/content/upload_2?i=${id}`, {
      method: "POST",
      body: formData
    });

    if (response.ok) {
      alert('Uploaded successfully.');

      window.location.reload();
    } else {
      alert(`Error uploading file. Contact support@digiboard.cloud if it still happens in the next 24 hours.`);
    }
  }

  async function submitFile3() {
    const file = document.getElementById('file3').files[0];

    if (!file) return alert('Select a file first.');

    const allowedExt = ['png', 'jpg'];
    const fileExt = file.name.split(".").pop().toLowerCase();

    if (!allowedExt.includes(fileExt)) {
      return alert(`Invalid file type, allowed: ${allowedExt.join(', ')}`);
    }

    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`/api/content/upload_3?i=${id}`, {
      method: "POST",
      body: formData
    });

    if (response.ok) {
      alert('Uploaded successfully.');

      window.location.reload();
    } else {
      alert(`Error uploading file. Contact support@digiboard.cloud if it still happens in the next 24 hours.`);
    }
  }

  async function submitFile4() {
    const file = document.getElementById('file4').files[0];

    if (!file) return alert('Select a file first.');

    const allowedExt = ['png', 'jpg'];
    const fileExt = file.name.split(".").pop().toLowerCase();

    if (!allowedExt.includes(fileExt)) {
      return alert(`Invalid file type, allowed: ${allowedExt.join(', ')}`);
    }

    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`/api/content/upload_4?i=${id}`, {
      method: "POST",
      body: formData
    });

    if (response.ok) {
      alert('Uploaded successfully.');

      window.location.reload();
    } else {
      alert(`Error uploading file. Contact support@digiboard.cloud if it still happens in the next 24 hours.`);
    }
  }

  async function viewFile(fileNameView, noticeboard_view) {
    const response = await fetch(`/api/content/view?i=${id}&n=${noticeboard_view}&f=${fileNameView}`, {
      method: "POST",
    });

    if (response.ok) {
      const data = await response.blob();
      const urlObject = URL.createObjectURL(data);
      const display = document.getElementById("display-eye");

      const arrayEyeFiles = [];

      arrayEyeFiles.push({ data: urlObject });
      setEyeFile(arrayEyeFiles);
      display.style.display = "inline-block";
    }
  }

  async function deleteFile(fName, n) {
    const id_string = `${id}`;

    const body_req = {
      id_string,
      n,
      fName
    }

    const response = await fetch('/api/content/delete', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body_req)
    });

    if (response.ok) {
      window.location.reload();
    }
  }

  async function downloadFile(fName, n) {
    const response = await fetch(`/api/content/download?i=${id}&n=${n}&f=${fName}`, {
      method: "GET"
    });

    if (response.ok) {
      const data = await response.blob();

      const url = URL.createObjectURL(data);
      const a = document.createElement("a");
      a.href = url;

      a.download = fName;

      document.body.appendChild(a);
      a.click();

      a.remove();
      window.URL.revokeObjectURL(url);
    }
  }

  function closeEye() {
    const display = document.getElementById("display-eye");

    if (display) {
      display.style.display = "none";

      setEyeFile([]);
    }
  }

  return (
    <>
      <div className="header">
        <img src={digiboard_logo} onClick={reloadRoot} style={{ cursor: "pointer" }} title="Home" className="header_logo" width="200px" height="50px" alt="Digiboard Icon"></img>
        <div className="button-container">
          <div className="inner-button-container" style={{ alignItems: "center" }}>
            <img className="conf-cog" src={SettingCog} onClick={settingsDirect} alt="Settings cog" ></img>
            <a className="buttons-c" onClick={NoticeBoardPublic1}>{Title1}</a>
            <a className="buttons-c" onClick={NoticeBoardPublic2}>{Title2}</a>
            <a className="buttons-c" onClick={NoticeBoardPublic3}>{Title3}</a>
            <a className="buttons-c" onClick={NoticeBoardPublic4}>{Title4}</a>
          </div>
        </div>
      </div>
      <div style={{ paddingTop: "100px", paddingBottom: "100px", paddingLeft: "2rem", display: "flex", flexDirection: "column", gap: "50px" }}>
        <div style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          paddingTop: "30px",
          gap: "15px"
        }}>
          <label style={{ fontSize: "23px" }} htmlFor="file1">
            {Title1}
          </label>
          <input
            type="file"
            id="file1"
            style={{
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              cursor: "pointer",
              width: "250px"
            }}
          />
          <button
            onClick={submitFile1}
            style={{
              padding: "10px 20px",
              border: "none",
              borderRadius: "4px",
              backgroundColor: "#4CAF50",
              color: "white",
              cursor: "pointer",
              fontWeight: "bold",
              width: "100px",
              userSelect: "none"
            }}
          >
            Upload
          </button>
          <a style={{ cursor: "pointer", width: "90px" }} onClick={() => setPreview1(prev => !prev)}>{Preview1 ? "Hide Files" : "Show Files"}</a>
          {Preview1 && (
            <div style={{ gap: "20px", flexDirection: "column", display: "flex", gap: "15px", padding: "10px", height: "auto" }}>
              {fileName1.map((file, idx) => (
                <div key={idx} className="mobile-class-files" style={{ backgroundColor: "#d0e7cc", padding: "10px", width: "230px", borderRadius: "10px", paddingTop: "10px", display: "flex", width: "70%", justifyContent: "space-between", alignItems: "center", gap: "10px" }}>
                  <p style={{ fontFamily: "Publicsans", margin: 0, color: "black" }}>{file}</p>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <img
                      src={EyeIcon}
                      onClick={() => viewFile(file, "n1")}
                      style={{
                        padding: "3px 20px",
                        border: "none",
                        borderRadius: "4px",
                        backgroundColor: "rgb(76, 175, 80)",
                        color: "white",
                        cursor: "pointer",
                        fontWeight: "bold",
                        width: "30px",
                        userSelect: "none",
                        height: "30px"
                      }}
                    >
                    </img>
                    <img
                      src={DeleteIcon}
                      onClick={() => deleteFile(file, "n1")}
                      style={{
                        padding: "3px 20px",
                        border: "none",
                        borderRadius: "4px",
                        backgroundColor: "rgb(76, 175, 80)",
                        color: "white",
                        cursor: "pointer",
                        fontWeight: "bold",
                        width: "30px",
                        userSelect: "none",
                        height: "30px"
                      }}
                    >
                    </img>
                    <img
                      src={DownloadIcon}
                      onClick={() => downloadFile(file, "n1")}
                      style={{
                        padding: "3px 20px",
                        border: "none",
                        borderRadius: "4px",
                        backgroundColor: "rgb(76, 175, 80)",
                        color: "white",
                        cursor: "pointer",
                        fontWeight: "bold",
                        width: "30px",
                        userSelect: "none",
                        height: "30px"
                      }}
                    >
                    </img>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          paddingTop: "50px",
          gap: "15px"
        }}>
          <label style={{ fontSize: "23px" }} htmlFor="file1">
            {Title2}
          </label>
          <input
            type="file"
            id="file2"
            style={{
              padding: "10px",
              width: "250px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              cursor: "pointer"
            }}
          />
          <button
            onClick={submitFile2}
            style={{
              padding: "10px 20px",
              border: "none",
              borderRadius: "4px",
              backgroundColor: "#4CAF50",
              color: "white",
              cursor: "pointer",
              fontWeight: "bold",
              width: "100px",
              userSelect: "none",
            }}
          >
            Upload
          </button>
          <a style={{ cursor: "pointer", width: "90px" }} onClick={() => setPreview2(prev => !prev)}>{Preview2 ? "Hide Files" : "Show Files"}</a>
          {Preview2 && (
            <div style={{ gap: "20px", flexDirection: "column", display: "flex", gap: "15px", padding: "10px", height: "auto" }}>
              {fileName2.map((file, idx) => (
                <div key={idx} className="mobile-class-files" style={{ backgroundColor: "#d0e7cc", padding: "10px", width: "230px", borderRadius: "10px", paddingTop: "10px", display: "flex", width: "70%", justifyContent: "space-between", alignItems: "center", gap: "10px" }}>
                  <p style={{ fontFamily: "Publicsans", margin: 0, color: "black" }}>{file}</p>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <img
                      src={EyeIcon}
                      onClick={() => viewFile(file, "n2")}
                      style={{
                        padding: "3px 20px",
                        border: "none",
                        borderRadius: "4px",
                        backgroundColor: "rgb(76, 175, 80)",
                        color: "white",
                        cursor: "pointer",
                        fontWeight: "bold",
                        width: "30px",
                        userSelect: "none",
                        height: "30px"
                      }}
                    >
                    </img>
                    <img
                      src={DeleteIcon}
                      onClick={() => deleteFile(file, "n2")}
                      style={{
                        padding: "3px 20px",
                        border: "none",
                        borderRadius: "4px",
                        backgroundColor: "rgb(76, 175, 80)",
                        color: "white",
                        cursor: "pointer",
                        fontWeight: "bold",
                        width: "30px",
                        userSelect: "none",
                        height: "30px"
                      }}
                    >
                    </img>
                    <img
                      src={DownloadIcon}
                      onClick={() => downloadFile(file, "n2")}
                      style={{
                        padding: "3px 20px",
                        border: "none",
                        borderRadius: "4px",
                        backgroundColor: "rgb(76, 175, 80)",
                        color: "white",
                        cursor: "pointer",
                        fontWeight: "bold",
                        width: "30px",
                        userSelect: "none",
                        height: "30px"
                      }}
                    >
                    </img>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          paddingTop: "50px",
          gap: "15px"
        }}>
          <label style={{ fontSize: "23px" }} htmlFor="file1">
            {Title3}
          </label>
          <input
            type="file"
            id="file3"
            style={{
              padding: "10px",
              width: "250px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              cursor: "pointer"
            }}
          />
          <button
            onClick={submitFile3}
            style={{
              padding: "10px 20px",
              border: "none",
              borderRadius: "4px",
              backgroundColor: "#4CAF50",
              color: "white",
              cursor: "pointer",
              fontWeight: "bold",
              width: "100px",
              userSelect: "none",
            }}
          >
            Upload
          </button>
          <a style={{ cursor: "pointer", width: "90px" }} onClick={() => setPreview3(prev => !prev)}>{Preview3 ? "Hide Files" : "Show Files"}</a>
          {Preview3 && (
            <div style={{ gap: "20px", flexDirection: "column", display: "flex", gap: "15px", padding: "10px", height: "auto" }}>
              {fileName3.map((file, idx) => (
                <div key={idx} className="mobile-class-files" style={{ backgroundColor: "#d0e7cc", padding: "10px", width: "230px", borderRadius: "10px", paddingTop: "10px", display: "flex", width: "70%", justifyContent: "space-between", alignItems: "center", gap: "10px" }}>
                  <p style={{ fontFamily: "Publicsans", margin: 0, color: "black" }}>{file}</p>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <img
                      src={EyeIcon}
                      onClick={() => viewFile(file, "n3")}
                      style={{
                        padding: "3px 20px",
                        border: "none",
                        borderRadius: "4px",
                        backgroundColor: "rgb(76, 175, 80)",
                        color: "white",
                        cursor: "pointer",
                        fontWeight: "bold",
                        width: "30px",
                        userSelect: "none",
                        height: "30px"
                      }}
                    >
                    </img>
                    <img
                      src={DeleteIcon}
                      onClick={() => deleteFile(file, "n3")}
                      style={{
                        padding: "3px 20px",
                        border: "none",
                        borderRadius: "4px",
                        backgroundColor: "rgb(76, 175, 80)",
                        color: "white",
                        cursor: "pointer",
                        fontWeight: "bold",
                        width: "30px",
                        userSelect: "none",
                        height: "30px"
                      }}
                    >
                    </img>
                    <img
                      src={DownloadIcon}
                      onClick={() => downloadFile(file, "n3")}
                      style={{
                        padding: "3px 20px",
                        border: "none",
                        borderRadius: "4px",
                        backgroundColor: "rgb(76, 175, 80)",
                        color: "white",
                        cursor: "pointer",
                        fontWeight: "bold",
                        width: "30px",
                        userSelect: "none",
                        height: "30px"
                      }}
                    >
                    </img>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          paddingTop: "50px",
          gap: "15px"
        }}>
          <label style={{ fontSize: "23px" }} htmlFor="file1">
            {Title4}
          </label>
          <input
            type="file"
            id="file4"
            style={{
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              width: "250px",
              cursor: "pointer"
            }}
          />
          <button
            onClick={submitFile4}
            style={{
              padding: "10px 20px",
              border: "none",
              borderRadius: "4px",
              backgroundColor: "#4CAF50",
              color: "white",
              cursor: "pointer",
              fontWeight: "bold",
              width: "100px",
              userSelect: "none"
            }}
          >
            Upload
          </button>
          <a style={{ cursor: "pointer", width: "90px" }} onClick={() => setPreview4(prev => !prev)}>{Preview4 ? "Hide Files" : "Show Files"}</a>
          {Preview4 && (
            <div style={{ gap: "20px", flexDirection: "column", display: "flex", gap: "15px", padding: "10px", height: "auto" }}>
              {fileName4.map((file, idx) => (
                <div key={idx} className="mobile-class-files" style={{ backgroundColor: "#d0e7cc", padding: "10px", width: "230px", borderRadius: "10px", paddingTop: "10px", display: "flex", width: "70%", justifyContent: "space-between", alignItems: "center", gap: "10px" }}>
                  <p style={{ fontFamily: "Publicsans", margin: 0, color: "black" }}>{file}</p>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <img
                      src={EyeIcon}
                      onClick={() => viewFile(file, "n4")}
                      style={{
                        padding: "3px 20px",
                        border: "none",
                        borderRadius: "4px",
                        backgroundColor: "rgb(76, 175, 80)",
                        color: "white",
                        cursor: "pointer",
                        fontWeight: "bold",
                        width: "30px",
                        userSelect: "none",
                        height: "30px"
                      }}
                    >
                    </img>
                    <img
                      src={DeleteIcon}
                      onClick={() => deleteFile(file, "n4")}
                      style={{
                        padding: "3px 20px",
                        border: "none",
                        borderRadius: "4px",
                        backgroundColor: "rgb(76, 175, 80)",
                        color: "white",
                        cursor: "pointer",
                        fontWeight: "bold",
                        width: "30px",
                        userSelect: "none",
                        height: "30px"
                      }}
                    >
                    </img>
                    <img
                      src={DownloadIcon}
                      onClick={() => downloadFile(file, "n4")}
                      style={{
                        padding: "3px 20px",
                        border: "none",
                        borderRadius: "4px",
                        backgroundColor: "rgb(76, 175, 80)",
                        color: "white",
                        cursor: "pointer",
                        fontWeight: "bold",
                        width: "30px",
                        userSelect: "none",
                        height: "30px"
                      }}
                    >
                    </img>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div
        id="display-eye"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          border: "2px solid #000000",
          display: "none",
          padding: "30px",
          backgroundColor: "grey"
        }}>
        <a style={{
          color: "red",
          right: 0,
          top: 0,
          padding: "8px",
          cursor: "pointer",
          position: "absolute",
          backgroundColor: "none"
        }}
          onClick={() => closeEye()}
        >
          X
        </a>
        {eyeFile.map((file, idx) => (
          <img
            key={idx}
            src={file.data}
            style={{ display: "block", width: "auto", height: "auto", maxHeight: "80vh", maxWidth: "100%" }}
          />
        ))}
      </div>
    </>
  );
}

export default Content;
