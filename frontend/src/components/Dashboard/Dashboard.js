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
        <h1>All Websites</h1>
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
          <div className="history-con">{/* <History /> */}</div>
        </div>
      </InnerLayout>
    </DashboardStyled>
  );
};

const DashboardStyled = styled.div`
    .stats-con{
        margin-top:10px;
        
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 2rem;
        .chart-con{
            grid-column: 1 / 4;
            height: 400px;
            .amount-con{
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 2rem;
                margin-top: 2rem;
                .income, .expense{
                    grid-column: span 2;
                }
                .income, .expense, .balance{
                    background: #FCF6F9;
                    border: 2px solid #FFFFFF;
                    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                    border-radius: 20px;
                    padding: 1rem;
                    p{
                        font-size: 3.5rem;
                        font-weight: 700;
                    }
                }
                .balance{
                    grid-column: 2 / 4;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    p{
                        color: var(--color-green);
                        opacity: 0.6;
                        font-size: 4.5rem;
                    }
                }
            }
        }
        .history-con{
            grid-column: 4 / -1;
            h2{
                margin: 1rem 0;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
            .salary-title{
                font-size: 1.2rem;
                span{
                    font-size: 1.8rem;
                }
            }
            .salary-item{
                background: #FCF6F9;
                border: 2px solid #FFFFFF;
                box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                padding: 1rem;
                border-radius: 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                p{
                    font-weight: 600;
                    font-size: 1.6rem;
                }
            }
        }
    }
`;

export default Dashboard;
