import React, { useEffect, useState } from "react";
import { MainLayout } from "../../styles/Layouts";
import styled from "styled-components";
import bg from '../../img/bg.png'
import { useGlobalContext } from '../../context/globalContext';

function Auth() {
  const [signupActive, setSignupActive] = useState(false);
  const [values, setValues] = useState({
    name: "",
    email: "",
    pass: "",
  });

  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const {errorMsg, setErrorMsg} = useGlobalContext();

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      );
  };

  // Signup validation
  const handleSignup = async () => {
    if (submitButtonDisabled) return;
    if (!values.name.trim() || !values.email.trim() || !values.pass) {
      setErrorMsg("All fields are required");
      return;
    }
    if (!validateEmail(values.email)) {
      setErrorMsg("Email is not valid");
      return;
    }
    if (values.pass.length < 6) {
      setErrorMsg("Password must be of 6 characters");
      return;
    }
    setErrorMsg("");

    setSubmitButtonDisabled(true);
    const res = await fetch("http://localhost:5000/user/signup", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: values.name.trim(),
        email: values.email,
        password: values.pass,
      }),
    }).catch((err) => {
      setErrorMsg("Error creating the user - ", err.message);
    });
    setSubmitButtonDisabled(false);

    if (!res) {
      setErrorMsg("Error creating the user");
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

  // Login validation
  const handleLogin = async () => {
    if (submitButtonDisabled) return;
    if (!values.email.trim() || !values.pass) {
      setErrorMsg("All fields are required");
      return;
    }
    if (!validateEmail(values.email)) {
      setErrorMsg("Email is not valid");
      return;
    }
    if (values.pass.length < 6) {
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
        email: values.email,
        password: values.pass,
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

  useEffect(() => {
    setValues({});
  }, [signupActive]);

  const signupDiv = (
    <div className="box signup">
      <p className={"heading"}>Sign Up</p>

      <div className={"elem"}>
        <label>Name</label>
        <input
          className="input"
          placeholder="Enter name"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, name: event.target.value }))
          }
        />
      </div>

      <div className={"elem"}>
        <label>Email</label>
        <input
          className="input"
          placeholder="Enter email"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, email: event.target.value }))
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
            setValues((prev) => ({ ...prev, pass: event.target.value }))
          }
        />
      </div>

      {errorMsg && <p className='error'>{errorMsg}</p>}

      <button onClick={handleSignup} disabled={submitButtonDisabled}>
        {" "}
        {submitButtonDisabled ? "Signing up..." : "Signup"}
      </button>

      <p className="bottom-text">
        Already a user ?{" "}
        <span onClick={() => setSignupActive(false)}>Login here</span>
      </p>
    </div>
  );

  const loginDiv = (
    <div className="box signup">
      <p className={"heading"}>Login</p>

      <div className={"elem"}>
        <label>Email</label>
        <input
          className="input"
          placeholder="Enter email"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, email: event.target.value }))
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
            setValues((prev) => ({ ...prev, pass: event.target.value }))
          }
        />
      </div>

      <button onClick={handleLogin} disabled={submitButtonDisabled}>
        {submitButtonDisabled ? "Logging in..." : "Login"}
      </button>

      <p className="bottom-text">
        New user ?{" "}
        <span onClick={() => setSignupActive(true)}>Sign up here</span>
      </p>
    </div>
  );

  return (
    <AuthStyled bg={bg} className="app">
      <MainLayout>
        <main>
          {signupActive ? signupDiv : loginDiv}
        </main>
      </MainLayout>
    </AuthStyled>
  );
}

const AuthStyled = styled.div`

    height: 100vh;
    width: fit-content;
    background-image: url(${props => props.bg});
    position: relative;
    main{
      background: rgba(252, 246, 249, 0.78);
      border: 3px solid #FFFFFF;
      backdrop-filter: blur(4.5px);
      border-radius: 32px;
      overflow-x: hidden;
      margin: auto;
      margin-left:30rem;
      &::-webkit-scrollbar{
        width: 0;
      }

      display: flex;
      justify-content: center;
      align-items: center;
      padding: 25px;
    }

  .box {
    width: 400px;
    max-width: 100%;
    padding: 25px;
    display: flex;
    flex-direction: column;
    gap: 25px;
    align-items: center;
    margin: auto auto;
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
`
export default Auth;
