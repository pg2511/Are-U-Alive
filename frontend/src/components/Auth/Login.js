import React, { useEffect, useState, useMemo } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../../context/globalContext";
import { InnerLayout } from "../../styles/Layouts";
import Orb from "../Orb/Orb";
import bg from "../../img/bg.png";

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
        New user ? {"  "}
        <span onClick={() => setSingupActive(true)}>Signup here</span>
      </p>
    </div>
  );

  const orbMemo = useMemo(() => {
    return <Orb />;
  }, []);

  return (
    <LoginStyled bg={bg}>
      {orbMemo}
      <InnerLayout>
        <main>
        <div>{loginDiv}</div>
        </main>
      </InnerLayout>
    </LoginStyled>
  );
};

export default Login;

const LoginStyled = styled.div`
  height: 100vh;
  background-image: url(${props => props.bg});
  position: relative;
  main{
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    width: fit-content;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    &::-webkit-scrollbar{
      width: 0;
    }
  }

  .box {
    width: 400px;
    max-width: 100%;
    padding: 25px;
    display: flex;
    flex-direction: column;
    gap: 25px;
    align-items: center;
    border-radius: 10px;
    box-shadow: 1px 1px 10px 1px rgba(255, 255, 255, 0.1);
  }

  .elem {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
  }

  .elem label {
    font-size: 16px;
    font-size: 500;
    line-height: 22px;
  }

  .input {
    width: 100%;
    padding: 8px 16px;
    outline: none;
    border: none;
    background-color: white;
    font-size: 16px;
    line-height: 18px;
    border: 1px solid gray;
    transition: 200ms;
    border-radius: 5px;
  }

  .input::placeholder {
    color: #00000088;
  }

  .input:focus {
    border: 1px solid #6f17ea;
  }

  .heading {
    font-size: 25px;
    font-weight: bold;
    line-height: 32px;
  }

  .bottom-text {
    text-align: center;
    font-size: 14px;
    line-height: 18px;
  }

  .bottom-text span {
    font-weight: bold;
    color: #6f17ea;
    cursor: pointer;
  }

  .box button {
    padding: 12px 24px;
    width: 100%;
    font-size: 16px;
    line-height: 18px;
    font-weight: 500;
    cursor: pointer;
    border: none;
    background-color: #6f17ea;
    color: white;
    border-radius: 5px;
  }
`;
