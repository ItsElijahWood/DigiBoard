import './style/css/Register.css';
import digiboard_logo from "./style/img/Digiboard Title.png";

function Register() {
  const reloadRoot = () => {
    window.location.href='/';
  }

  const publishToDB = async() => {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const login_container = document.getElementById("register_container");
    const verify = document.getElementById("verify_container_r");
    const err_msg = document.getElementById("err-msg-reg");

    const req = {
      name,
      email,
      password
    };

    const response = await fetch('/api/auth/register', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req)
    });

    if (!response.ok) {
      const data = await response.json();

      err_msg.innerHTML = data.error;
    } else {
      login_container.style.display = "none";
      verify.style.display = "flex";
    }
  }

  const verifyToDb = async() => {
    const code = document.getElementById("code").value;
    const email = document.getElementById("email").value;

    const req = {
      code,
      email
    };

    const response = await fetch('/api/auth/email/verify', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req)
    });

    if (response.ok) {
      const data = await response.json();

      const response3 = await fetch('/api/account/mkdir', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: data.id })
      });

      if (response3.ok) {
        window.location.href = '/login';
      }
    } else {
      const data = await response.json();
      const err_msg = document.getElementById("err-msg");

      err_msg.innerHTML = data.error;
    }
  }

  return (
    <>
      <div className="header">
        <img src={digiboard_logo} onClick={reloadRoot} style={{ cursor: "pointer" }} title="Home" className="header_logo" width="200px" height="50px" alt="Digiboard Icon"></img>
        <div className="button-container">
          <div className="inner-button-container">
            <a className="button" href="/login">
              Sign in
            </a>
          </div>
        </div>
      </div>
      <div id="register_container" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", height: "500px", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <p className="r-title" style={{ fontSize: "50px" }}>Register.</p>
        <div style={{ display: "flex", height: "100px", flexDirection: "column", gap: "15px" }}>
          <p id="err-msg-reg" style={{ fontSize: "20px", textAlign: "center", margin: "0" }}></p>
          <div style={{ display: "flex", flexDirection: "column", gap: "15px"}}>
            <input id="name" style={{ padding: "20px", width: "300px", border: "2px solid black", borderRadius: "5px" }} placeholder="Full Name" type="text"></input>
            <input id="email" style={{ padding: "20px", width: "300px", border: "2px solid black", borderRadius: "5px" }} placeholder="Email" type="email"></input>
            <input id="password" style={{ padding: "20px", width: "300px", border: "2px solid black", borderRadius: "5px" }} placeholder="Password" type="password"></input>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <button className="rbutton" onClick={publishToDB} style={{ borderRadius: "5px", color: "white", backgroundColor: "black", border: "2px solid white", cursor: "pointer", padding: "15px", width: "100px" }}>
              Sign up
            </button>
            <a className="a-r-link" style={{ color: "#0008ee", fontSize: "14px" }} href="/login">Already have an account?</a>
          </div>
        </div>
      </div>
      <div id="verify_container_r" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", display: "none", height: "500px", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <p className="v-r-title" style={{ fontSize: "35px" }}>Verify your Email.</p>
        <div style={{ display: "flex", height: "100px", flexDirection: "column", gap: "15px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "15px"}}>
            <input id="code" style={{ padding: "20px", width: "300px", border: "2px solid black", borderRadius: "5px" }} placeholder="Code" type="text"></input>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <button className="r-v-button" onClick={verifyToDb} style={{ borderRadius: "5px", color: "white", backgroundColor: "black", border: "2px solid white", cursor: "pointer", padding: "15px", width: "100px" }}>
              Verify
            </button>
            <p id="err-msg" style={{ color: "#ff0000", fontSize: "14px" }}></p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
