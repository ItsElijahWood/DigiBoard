import digiboard_logo from "./style/img/Digiboard Title.png";
import './style/css/Login.css';

function Login() {
  const reloadRoot = () => {
    window.location.href='/';
  }

  const publishToDB = async() => {
    const email = document.getElementById("email_reset").value;
    const password = document.getElementById("password_reset").value;
    const err_msg = document.getElementById("err_msg");

    const req = {
      email,
      password
    };

    if (!email || !password) {
      err_msg.innerHTML = "Required fields missing.";

      return;
    }

    const response = await fetch('/api/auth/login', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: "include",
      body: JSON.stringify(req)
    });

    if (response.ok) {
      window.location.href = '/noticeboard/content';
      
      return;
    } else {
      const data = await response.json();
      err_msg.innerHTML = data.error;
      
      return;
    }
  }

  const resetPasswordToDb = async () => {
    const email = document.getElementById("email-new").value;
    const password = document.getElementById("new-password").value;
    const err_msg = document.getElementById("err_msg_reset_password");
    const reset_password_container = document.getElementById("reset-password-container");
    const verify_reset_container = document.getElementById("verify_reset_container");

    if (!email || !password) {
      return err_msg.innerHTML = "Required fields are empty.";
    }

    const res = {
      email,
      password
    }

    const response = await fetch('/api/auth/password/reset', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(res)
    });

    if (!response.ok) {
      const data = await response.json();
      err_msg.innerHTML = data.error;

      return;
    } else {
      reset_password_container.style.display = "none";
      verify_reset_container.style.display = "flex";

      return;
    }
  }

  const reset = () => {
    const login_container = document.getElementById("login-container");
    const reset_password_container = document.getElementById("reset-password-container");

    login_container.style.display = "none";
    reset_password_container.style.display = "flex";
  }

  const verifyToDb = async() => {
    const code = document.getElementById("code").value;
    const email = document.getElementById("email-new").value;

    const req = {
      code,
      email
    };

    const response = await fetch('/api/auth/password/reset/verify', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req)
    });

    if (response.ok) {
      window.location.href = '/login';
    } else {
      const data = await response.json();
      const err_msg = document.getElementById("err-msg-verify");

      err_msg.innerHTML = data.error;
    }
  }

  return (
    <>
      <div className="header">
        <img src={digiboard_logo} onClick={reloadRoot} style={{ cursor: "pointer" }} title="Home" className="header_logo" width="200px" height="50px" alt="Digiboard Icon"></img>
        <div className="button-container">
          <div className="inner-button-container">
            <a className="button" href="/register">
              Sign up
            </a>
          </div>
        </div>
      </div>
      <div id="login-container" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", height: "400px", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <p className="login-title" style={{ fontSize: "50px" }}>Login.</p>
        <div style={{ display: "flex", height: "100px", flexDirection: "column", gap: "15px" }}>
          <p id="err_msg" style={{ fontSize: "20px", margin: "0", textAlign: "center", color: "red" }}></p>
          <div style={{ display: "flex", flexDirection: "column", gap: "15px"}}>
            <input style={{ padding: "20px", width: "300px", border: "2px solid black", borderRadius: "5px" }} id="email_reset" placeholder="Email" type="email"></input>
            <input style={{ padding: "20px", width: "300px", border: "2px solid black", borderRadius: "5px" }} id="password_reset" placeholder="Password" type="password"></input>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <button onClick={publishToDB} className="sign-in-button" style={{ borderRadius: "5px", color: "white", backgroundColor: "black", border: "2px solid white", cursor: "pointer", padding: "15px", width: "100px" }}>
              Sign in
            </button>
            <button className="rpass-a" style={{ color: "#0008ee", fontSize: "14px", border: "0", textDecoration: "underline", cursor: "pointer", backgroundColor: "#fff" }} onClick={reset}>Forgot your password?</button>
          </div>
        </div>
      </div>
      <div id="reset-password-container" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", height: "400px", display: "none", flexDirection: "column", alignItems: "center" }}>
        <p className="rtitle" style={{ fontSize: "35px" }}>Reset Password.</p>
        <div style={{ display: "flex", height: "100px", flexDirection: "column", gap: "15px" }}>
          <p id="err_msg_reset_password" style={{ fontSize: "20px", margin: "0", textAlign: "center", color: "red" }}></p>
          <div style={{ display: "flex", flexDirection: "column", gap: "15px"}}>
            <input style={{ padding: "20px", width: "300px", border: "2px solid black", borderRadius: "5px" }} id="email-new" placeholder="Email" type="email"></input>
            <input style={{ padding: "20px", width: "300px", border: "2px solid black", borderRadius: "5px" }} id="new-password" placeholder="New Password" type="password"></input>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <button className="rbutton-l" onClick={resetPasswordToDb} style={{ borderRadius: "5px", width: "100px", color: "white", backgroundColor: "black", border: "2px solid white", cursor: "pointer", padding: "15px" }}>
              Verify
            </button>
          </div>
        </div>
      </div>
      <div id="verify_reset_container" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", display: "none", paddingTop: "130px", height: "500px", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <p className="verify-title" style={{ fontSize: "35px" }}>Verify your Email.</p>
        <div style={{ display: "flex", height: "100px", flexDirection: "column", gap: "15px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "15px"}}>
            <input id="code" style={{ padding: "20px", width: "300px", border: "2px solid black", borderRadius: "5px" }} placeholder="Code" type="text"></input>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <button className="vbutton" onClick={verifyToDb} style={{ borderRadius: "5px", color: "white", backgroundColor: "black", border: "2px solid white", cursor: "pointer", padding: "15px", width: "100px" }}>
              Verify
            </button>
            <p id="err-msg-verify" style={{ color: "#ff0000", fontSize: "14px" }}></p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
