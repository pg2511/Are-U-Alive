import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../context/globalContext";
import "./Auth.css";

const Login = () => {
  const { singupActive, setSingupActive } = useGlobalContext();

  const [logvalues, setLogValues] = useState({
    logEmail: "",
    logPass: "",
  });

  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const handleLogin = async () => {
    if (submitButtonDisabled) return;
    if (!logvalues.logEmail.trim() || !logvalues.logPass) {
      setErrorMsg("All fields are required");
      return;
    }
    if (!validateEmail(logvalues.logEmail)) {
      setErrorMsg("Email is not valid");
      return;
    }
    if (logvalues.logPass.length < 6) {
      setErrorMsg("Password must be of 6 characters");
      return;
    }
    setErrorMsg("");

    setSubmitButtonDisabled(true);
    const res = await fetch("http://localhost:5000/user/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: logvalues.logEmail,
        password: logvalues.logPass,
      }),
    }).catch((err) => {
      setErrorMsg("Error in login - ", err.message);
    });
    setSubmitButtonDisabled(false);

    if (!res) {
      setErrorMsg("Error in login");
      return;
    }
    const data = await res.json();

    if (!data.status) {
      setErrorMsg(data.message);
      return;
    }

    const tokens = data.data.tokens;

    localStorage.setItem("tokens", JSON.stringify(tokens));

    window.location.reload();
  };

  const loginDiv = (
    <div className="box">
      <p className={"heading"}>Login</p>

      <div className={"elem"}>
        <label>Email</label>
        <input
          className="input"
          placeholder="Enter email"
          onChange={(event) =>
            setLogValues((prev) => ({ ...prev, logEmail: event.target.value }))
          }
        />
      </div>

      <div className={"elem"}>
        <label>Password</label>
        <input
          className="input"
          type="password"
          placeholder="Enter password"
          onChange={(event) =>
            setLogValues((prev) => ({ ...prev, logPass: event.target.value }))
          }
        />
      </div>

      {errorMsg && <p className="error">{errorMsg}</p>}

      <button onClick={handleLogin} disabled={submitButtonDisabled}>
        {submitButtonDisabled ? "Logging in..." : "Login"}
      </button>

      <p className="bottom-text">
        New user ?{" "}
        <span onClick={() => setSingupActive(true)}>Signup here</span>
      </p>
    </div>
  );

  return <div className="container">{loginDiv}</div>;
};

export default Login;
