import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../context/globalContext";

const Signup = () => {
  const { singupActive, setSingupActive } = useGlobalContext();
  const [values, setValues] = useState({
    signupName: "",
    signupEmail: "",
    signupPass: "",
  });

  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const handleSignup = async () => {
    if (submitButtonDisabled) return;
    if (
      !values.signupEmail.trim() ||
      !values.signupEmail.trim() ||
      !values.signupPass
    ) {
      setErrorMsg("All fields are required");
      return;
    }
    if (!validateEmail(values.signupEmail)) {
      setErrorMsg("Email is not valid");
      return;
    }
    if (values.signupPass.length < 6) {
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
        name: values.signupName.trim(),
        email: values.signupEmail,
        password: values.signupPass,
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

  const signupDiv = (
    <div className="box">
      <p className={"heading"}>Sign Up</p>

      <div className={"elem"}>
        <label>Name</label>
        <input
          className="input"
          placeholder="Enter name"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, signupName: event.target.value }))
          }
        />
      </div>

      <div className={"elem"}>
        <label>Email</label>
        <input
          className="input"
          placeholder="Enter email"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, signupEmail: event.target.value }))
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
            setValues((prev) => ({ ...prev, signupPass: event.target.value }))
          }
        />
      </div>

      {errorMsg && <p className="error">{errorMsg}</p>}

      <button onClick={handleSignup} disabled={submitButtonDisabled}>
        {submitButtonDisabled ? "Signing up..." : "Signup"}
      </button>

      <p className="bottom-text">
        Already a user ?{" "}
        <span onClick={() => setSingupActive(false)}>Login here</span>
      </p>
    </div>
  );

  return <div className="container">{signupDiv}</div>;
};

export default Signup;
