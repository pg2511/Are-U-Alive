import React, {useState, useEffect} from 'react'
import styled from "styled-components";
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth'
import bg from './img/bg.png'

function App() {

  const [pageLoaded, setPageLoaded] = useState(false);
  const [showAuth, setShowAuth] = useState(false);

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
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <AppStyled bg={bg} className="app">
      {pageLoaded ? (
        showAuth ? (
          <Auth />
        ) : (
          <Home/>
        )): (
        <div className="loading">
          <p>LOADING...</p>
        </div>
      )}
    </AppStyled>
  );
}

const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${props => props.bg});
  position: relative;
  main{
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar{
      width: 0;
    }
  }
`;

export default App;
