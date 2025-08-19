import digiboard_logo from "./style/img/Digiboard Title.png";
import { useEffect, useState } from "react";
import './style/css/Conf.css';

export function Config() {
  const [Title1, setTitle1] = useState("");
  const [BColour1, setBColour1] = useState("#ffffff");
  const [NButtonToggle1, setNButtonToggle1] = useState("");
  const [TC1, setTC1] = useState("#000000");
  const [Title2, setTitle2] = useState("");
  const [BColour2, setBColour2] = useState("#ffffff");
  const [NButtonToggle2, setNButtonToggle2] = useState("");
  const [TC2, setTC2] = useState("#000000");
  const [Title3, setTitle3] = useState("");
  const [BColour3, setBColour3] = useState("#ffffff");
  const [NButtonToggle3, setNButtonToggle3] = useState("");
  const [TC3, setTC3] = useState("#000000");
  const [Title4, setTitle4] = useState("");
  const [BColour4, setBColour4] = useState("#ffffff");
  const [NButtonToggle4, setNButtonToggle4] = useState("");
  const [TC4, setTC4] = useState("#000000");

  useEffect(() => {
    async function authTokenAndFetchConf() {
      const response = await fetch("/api/auth/me", {
        method: 'GET',
        credentials: "include"
      });

      if (!response.ok) {
        window.location.href = '/login';
      } else {
        const data = await response.json();
        localStorage.setItem("i", data.ok);
      }

      const id = localStorage.getItem("i");

      const response2 = await fetch('/api/noticeboard/config', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
      });

      if (response2.ok) {
        const data = await response2.json();

        const colour_hex1 = document.getElementById("colour-hex1");
        const colour_hex2 = document.getElementById("colour-hex2");
        const colour_hex3 = document.getElementById("colour-hex3");
        const colour_hex4 = document.getElementById("colour-hex4");
        const colour_hex5 = document.getElementById("colour-hex5");
        const colour_hex6 = document.getElementById("colour-hex6");
        const colour_hex7 = document.getElementById("colour-hex7");
        const colour_hex8 = document.getElementById("colour-hex8");

        setBColour1(data.n1bc);
        colour_hex1.innerHTML = data.n1bc;
        colour_hex5.innerHTML = data.n1tc;
        setTitle1(data.n1t1);
        setTC1(data.n1tc)

        setBColour2(data.n2bc);
        colour_hex2.innerHTML = data.n2bc;
        colour_hex6.innerHTML = data.n2tc;
        setTitle2(data.n2t2);
        setTC2(data.n2tc)

        setBColour3(data.n3bc);
        colour_hex3.innerHTML = data.n3bc;
        colour_hex7.innerHTML = data.n3tc;
        setTitle3(data.n3t3);
        setTC3(data.n3tc)

        setBColour4(data.n4bc);
        colour_hex4.innerHTML = data.n4bc;
        colour_hex8.innerHTML = data.n4tc;
        setTitle4(data.n4t4);
        setTC4(data.n4tc)

        const n1bth = document.getElementById("n1bth");
        const n2bth = document.getElementById("n2bth");
        const n3bth = document.getElementById("n3bth");
        const n4bth = document.getElementById("n4bth");

        if (data.n1bt === "true") {
          setNButtonToggle1("ON");
          n1bth.style.backgroundColor = "#03c065";
        } else {
          setNButtonToggle1("OFF");
          n1bth.style.backgroundColor = "red";
        }
        if (data.n2bt === "true") {
          setNButtonToggle2("ON");
          n2bth.style.backgroundColor = "#03c065";
        } else {
          setNButtonToggle2("OFF");
          n2bth.style.backgroundColor = "red";
        }
        if (data.n3bt === "true") {
          setNButtonToggle3("ON");
          n3bth.style.backgroundColor = "#03c065";
        } else {
          setNButtonToggle3("OFF");
          n3bth.style.backgroundColor = "red";
        }
        if (data.n4bt === "true") {
          setNButtonToggle4("ON");
          n4bth.style.backgroundColor = "#03c065";
        } else {
          setNButtonToggle4("OFF");
          n4bth.style.backgroundColor = "red";
        }
      } else {
        localStorage.removeItem("i");

        window.location.href = "/login";
      }
    }
    authTokenAndFetchConf();
  }, []);

  const reloadRoot = () => {
    window.location.href = '/noticeboard/content';
  }

  const onChangedColor1 = (e) => {
    const colour_hex = document.getElementById("colour-hex1");

    setBColour1(e.target.value);
    colour_hex.innerHTML = e.target.value;
  }

  const onChangedColor2 = (e) => {
    const colour_hex = document.getElementById("colour-hex2");

    setBColour2(e.target.value);
    colour_hex.innerHTML = e.target.value;
  }

  const onChangedColor3 = (e) => {
    const colour_hex = document.getElementById("colour-hex3");

    setBColour3(e.target.value);
    colour_hex.innerHTML = e.target.value;
  }

  const onChangedColor4 = (e) => {
    const colour_hex = document.getElementById("colour-hex4");

    setBColour4(e.target.value);
    colour_hex.innerHTML = e.target.value;
  }

  const onChangedColor5 = (e) => {
    const colour_hex = document.getElementById("colour-hex5");

    setTC1(e.target.value);
    colour_hex.innerHTML = e.target.value;
  }

  const onChangedColor6 = (e) => {
    const colour_hex = document.getElementById("colour-hex6");

    setTC2(e.target.value);
    colour_hex.innerHTML = e.target.value;
  }

  const onChangedColor7 = (e) => {
    const colour_hex = document.getElementById("colour-hex7");

    setTC3(e.target.value);
    colour_hex.innerHTML = e.target.value;
  }

  const onChangedColor8 = (e) => {
    const colour_hex = document.getElementById("colour-hex8");

    setTC4(e.target.value);
    colour_hex.innerHTML = e.target.value;
  }

  const updateDbConfig = async () => {
    const id = localStorage.getItem("i");

    if (!id) {
      alert("Id is empty.");

      return;
    }

    const NBT1 = NButtonToggle1 === "ON" ? "true" : "false";
    const NBT2 = NButtonToggle2 === "ON" ? "true" : "false";
    const NBT3 = NButtonToggle3 === "ON" ? "true" : "false";
    const NBT4 = NButtonToggle4 === "ON" ? "true" : "false";

    const body = {
      id,
      Title1,
      BColour1,
      NBT1,
      TC1,
      Title2,
      BColour2,
      NBT2,
      TC2,
      Title3,
      BColour3,
      NBT3,
      TC3,
      Title4,
      BColour4,
      NBT4,
      TC4
    };

    const response = await fetch('/api/noticeboard/config/update', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    if (response.ok) {
      window.location.reload();
    } else {
      const data = await response.json();

      alert(data.error);
    }
  }

  function ChangedColour2() {
    const n2bth = document.getElementById("n2bth");

    if (NButtonToggle2 === "OFF") {
      setNButtonToggle2("ON");
      n2bth.style.backgroundColor = "#03c065";
    } else {
      setNButtonToggle2("OFF");
      n2bth.style.backgroundColor = "red";
    }
  }

  function ChangedColour3() {
    const n3bth = document.getElementById("n3bth");

    if (NButtonToggle3 === "OFF") {
      setNButtonToggle3("ON");
      n3bth.style.backgroundColor = "#03c065";
    } else {
      setNButtonToggle3("OFF");
      n3bth.style.backgroundColor = "red";
    }
  }

  function ChangedColour4() {
    const n4bth = document.getElementById("n4bth");

    if (NButtonToggle4 === "OFF") {
      setNButtonToggle4("ON");
      n4bth.style.backgroundColor = "#03c065";
    } else {
      setNButtonToggle4("OFF");
      n4bth.style.backgroundColor = "red";
    }
  }

  return (
    <>
      <div className="header">
        <img src={digiboard_logo} onClick={reloadRoot} style={{ cursor: "pointer" }} title="Home" className="header_logo" width="200px" height="50px" alt="Digiboard Icon"></img>
      </div>
      <div className="main-conf-container" style={{ display: "flex", flexWrap: "wrap", gap: "40px", alignItems: "center", paddingLeft: "2rem" }}>
        <div style={{ paddingTop: "100px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            <div style={{ display: "flex", gap: "30px", width: "100%", alignItems: "center" }}>
              <p id="t1c" style={{ fontSize: "35px" }}>Noticeboard 1</p>
              <button id="n1bth" style={{ width: "100px", fontSize: "30px", height: "40px", color: "black", border: "2px solid black", userSelect: "none", backgroundColor: "#03c065" }}>ON</button>
            </div>
            <div className="container-conf" style={{ display: "flex", gap: "50px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
                <label className="l-1-c" style={{ fontSize: "20px", paddingTop: "6px" }}>Title</label>
                <label className="l-1-c" style={{ fontSize: "20px" }}>Background Colour</label>
                <label className="l-1-c" style={{ fontSize: "20px" }}>Text Colour</label>
              </div>
              <div className="fourk" style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                <input className="i-1-c" type="text" value={Title1} onChange={e => setTitle1(e.target.value)} style={{ padding: "8px", marginLeft: "4px", width: "150px" }}></input>
                <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <input type="color" style={{ border: 0, backgroundColor: "#fff", height: "35px", width: "60px", cursor: "pointer" }} value={BColour1} onChange={onChangedColor1} />
                  <p id="colour-hex1" style={{ color: "#2d3a4d", margin: 0 }}></p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <input type="color" style={{ border: 0, backgroundColor: "#fff", height: "35px", width: "60px", cursor: "pointer" }} value={TC1} onChange={onChangedColor5} />
                  <p id="colour-hex5" style={{ color: "#2d3a4d", margin: 0 }}></p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ paddingTop: "100px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            <div style={{ display: "flex", gap: "30px", width: "100%", alignItems: "center" }}>
              <p id="t2c" style={{ fontSize: "35px" }}>Noticeboard 2</p>
              <button id="n2bth" style={{ width: "100px", cursor: "pointer", fontSize: "30px", height: "40px", userSelect: "none", backgroundColor: "" }} onClick={ChangedColour2}>{NButtonToggle2}</button>
            </div>
            <div className="container-conf" style={{ display: "flex", gap: "50px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
                <label className="l-1-c" style={{ fontSize: "20px", paddingTop: "6px" }}>Title</label>
                <label className="l-1-c" style={{ fontSize: "20px" }}>Background Colour</label>
                <label className="l-1-c" style={{ fontSize: "20px" }}>Text Colour</label>
              </div>
              <div className="fourk" style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                <input className="i-1-c" type="text" value={Title2} onChange={e => setTitle2(e.target.value)} style={{ padding: "8px", marginLeft: "4px", width: "150px" }}></input>
                <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <input type="color" style={{ border: 0, backgroundColor: "#fff", height: "35px", width: "60px", cursor: "pointer" }} value={BColour2} onChange={onChangedColor2} />
                  <p id="colour-hex2" style={{ color: "#2d3a4d", margin: 0 }}></p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <input type="color" style={{ border: 0, backgroundColor: "#fff", height: "35px", width: "60px", cursor: "pointer" }} value={TC2} onChange={onChangedColor6} />
                  <p id="colour-hex6" style={{ color: "#2d3a4d", margin: 0 }}></p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ paddingTop: "100px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            <div style={{ display: "flex", gap: "30px", width: "100%", alignItems: "center" }}>
              <p id="t3c" style={{ fontSize: "35px" }}>Noticeboard 3</p>
              <button id="n3bth" style={{ width: "100px", cursor: "pointer", fontSize: "30px", height: "40px", userSelect: "none", backgroundColor: "" }} onClick={ChangedColour3}>{NButtonToggle3}</button>
            </div>
            <div className="container-conf" style={{ display: "flex", gap: "50px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
                <label className="l-1-c" style={{ fontSize: "20px", paddingTop: "6px" }}>Title</label>
                <label className="l-1-c" style={{ fontSize: "20px" }}>Background Colour</label>
                <label className="l-1-c" style={{ fontSize: "20px" }}>Text Colour</label>
              </div>
              <div className="fourk" style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                <input className="i-1-c" type="text" value={Title3} onChange={e => setTitle3(e.target.value)} style={{ padding: "8px", marginLeft: "4px", width: "150px" }}></input>
                <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <input type="color" style={{ border: 0, backgroundColor: "#fff", height: "35px", width: "60px", cursor: "pointer" }} value={BColour3} onChange={onChangedColor3} />
                  <p id="colour-hex3" style={{ color: "#2d3a4d", margin: 0 }}></p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <input type="color" style={{ border: 0, backgroundColor: "#fff", height: "35px", width: "60px", cursor: "pointer" }} value={TC3} onChange={onChangedColor7} />
                  <p id="colour-hex7" style={{ color: "#2d3a4d", margin: 0 }}></p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "15px", paddingTop: "100px" }}>
          <div style={{ display: "flex", gap: "30px", width: "100%", alignItems: "center" }}>
            <p id="t4c" style={{ fontSize: "35px" }}>Noticeboard 4</p>
            <button id="n4bth" style={{ width: "100px", cursor: "pointer", fontSize: "30px", height: "40px", userSelect: "none", backgroundColor: "" }} onClick={ChangedColour4}>{NButtonToggle4}</button>
          </div>
          <div className="container-conf" style={{ display: "flex", gap: "50px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
              <label className="l-1-c" style={{ fontSize: "20px", paddingTop: "6px" }}>Title</label>
              <label className="l-1-c" style={{ fontSize: "20px" }}>Background Colour</label>
              <label className="l-1-c" style={{ fontSize: "20px" }}>Text Colour</label>
            </div>
            <div className="fourk" style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              <input className="i-1-c" type="text" value={Title4} onChange={e => setTitle4(e.target.value)} style={{ padding: "8px", marginLeft: "4px", width: "150px" }}></input>
              <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <input type="color" style={{ border: 0, backgroundColor: "#fff", height: "35px", width: "60px", cursor: "pointer" }} value={BColour4} onChange={onChangedColor4} />
                <p id="colour-hex4" style={{ color: "#2d3a4d", margin: 0 }}></p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <input type="color" style={{ border: 0, backgroundColor: "#fff", height: "35px", width: "60px", cursor: "pointer" }} value={TC4} onChange={onChangedColor8} />
                <p id="colour-hex8" style={{ color: "#2d3a4d", margin: 0 }}></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <button
          className="save-button-conf"
          onClick={updateDbConfig}
          style={{
            width: "80px",
            backgroundColor: "#03c065",
            padding: "10px",
            userSelect: "none",
            borderRadius: "2px",
            cursor: "pointer",
            fontFamily: "PublicSans",
            position: "fixed",
            right: 0,
            bottom: 0,
            border: "0",
            color: "#fff",
            marginRight: "1rem",
            marginBottom: "1rem",
          }}>
          Save
        </button>
      </div>
    </>
  );
}
