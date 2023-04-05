import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { InnerLayout } from "../../styles/Layouts";

const Dashboard = () => {
  const [websites, setWebsites] = useState([]);
  const [loadingWebsites, setLoadingWebsites] = useState(true);

  const init = async () => {
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
    // console.log(data);

    setWebsites(data.data);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <DashboardStyled>
      <InnerLayout>
          <h1>All Websites</h1>
               
          {loadingWebsites ? (
                <p>LOADING...</p>
              ) : ( 
                <div>
                {websites.length ? (
                    websites.map((item) => (
                      <div className={"card"} key={item._id}>
                        <div className="left">
                          <p
                            className={`link ${
                              item.isActive ? "green" : "red"
                            }`}
                          >
                            {item.isActive ? "ACTIVE" : "DOWN"}
                          </p>
                          <p className="url">{item.url}</p>
                        </div>
                      </div>
                      ))
                  ) : (
                    <p>No Websites added !</p>
                  )}
                </div>
              )
          }
      </InnerLayout>
    </DashboardStyled>
  );
};

const DashboardStyled = styled.div``;

export default Dashboard;
