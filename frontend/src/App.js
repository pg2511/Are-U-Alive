import React, { useEffect, useState } from "react";
import "./App.css";
import Auth from "./components/Auth/Auth";

function App() {
  const [pageLoaded, setPageLoaded] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [websites, setWebsites] = useState([]);
  const [loadingWebsites, setLoadingWebsites] = useState(true);
  const [inputUrl, setInputUrl] = useState("");

  const init = async () => {
    const rawTokens = localStorage.getItem("tokens");
    if (!rawTokens) {
      setShowAuth(true);
      setPageLoaded(true);
      return;
    }
    const tokens = JSON.parse(rawTokens);

    const accessToken = tokens.accessToken;
    const aExpiry = new Date(accessToken.expireAt);
    if (new Date() > aExpiry) {
      const res = await fetch("http://localhost:5000/user/new-token", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          refreshToken: tokens?.refreshToken?.token,
        }),
      }).catch((err) => void err);

      if (!res) {
        setPageLoaded(true);
        setShowAuth(true);
        localStorage.removeItem("tokens");
        return;
      }

      const data = await res.json();
      if (!data || !data.status) {
        setPageLoaded(true);
        setShowAuth(true);
        localStorage.removeItem("tokens");
        return;
      }

      const newTokens = data.data?.tokens;
      localStorage.setItem("tokens", JSON.stringify(newTokens));

      setPageLoaded(true);
      setShowAuth(false);
    } else {
      setPageLoaded(true);
      setShowAuth(false);
    }

    fetchAllWebsites();
  };

  const fetchAllWebsites = async () => {
    const rawToken = localStorage.getItem("tokens");
    const tokens = JSON.parse(rawToken);
    const accessToken = tokens.accessToken.token;

    const res = await fetch("http://localhost:5000/website", {
      headers: {
        Authorization: accessToken,
      },
    }).catch((err) => void err);
    setLoadingWebsites(false);
    if (!res) {
      return;
    }

    const data = await res.json();
    console.log(data);
    // setWebsites(data.data);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div className="app">
      {pageLoaded ? (
        showAuth ? (
          <Auth />
        ) : (
          <div className="inner-app">
            <div className={"app-header"}>
                <p className="heading">Add a website for monitoring</p>
              <div className="elem">
                <label>Enter Website URL</label>
                <input className="input" placeholder="https://google.com" />
              </div>

              <button>Add</button>
            </div>

            <div className="body">
              <p className="heading">Your Websites</p>

              <div className={"cards"}>
                {[1, 1, 1, 1, 1, 1].map((item, index) => (
                  <div className={"card"}>
                    <div className="left">
                      <p className="link green">Active</p>
                      <p className="url">https://amazon.com</p>
                    </div>

                    <div className="right">
                      <p className="link red">Delete</p>
                    </div>
                  </div>
                ))}

              </div>
            </div>
          </div>
        )
      ) : (
        <div className="loading">
          <p>LOADING...</p>
        </div>
      )}
    </div>
  );
}

export default App;
