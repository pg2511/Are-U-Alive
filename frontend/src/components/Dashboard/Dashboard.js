import React, { useEffect } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../../context/globalContext";
import { InnerLayout } from "../../styles/Layouts";
import WebsiteItem from '../WebsiteItem/WebsiteItem';

const Dashboard = () => {
  const {
    fetchAllWebsites,
    websites,
    setWebsites,
    loadingWebsites,
    setLoadingWebsites,
  } = useGlobalContext();

  useEffect(() => {
    fetchAllWebsites();
  }, []);

  return (
    <DashboardStyled>
      <InnerLayout>
        <h2>All Websites</h2>
        <div className="stats-con">
          <div className="chart-con">
            {loadingWebsites ? (
              <p>LOADING...</p>
            ) : (
              <div>
                {websites.length ? (
                  websites.map((website) => {
                    const { _id, url, isActive } = website;
                    return (
                      <WebsiteItem
                        key={_id}
                        id={_id}
                        url={url}
                        isActive={isActive}
                      />
                    );
                  })
                ) : (
                  <p>No Websites added !</p>
                )}
              </div>
            )}
          </div>
        </div>
      </InnerLayout>
    </DashboardStyled>
  );
};

const DashboardStyled = styled.div`
    .stats-con{
      margin-top:30px;
      gap: 2rem;
    }

`;

export default Dashboard;
