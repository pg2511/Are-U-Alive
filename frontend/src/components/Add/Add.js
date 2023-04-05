import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';
import Form from '../Form/Form';
import WebsiteItem from '../WebsiteItem/WebsiteItem';

const Add = () => {
  const {websites, fetchAllWebsites, totalWebsite} = useGlobalContext()

  useEffect(() =>{
    fetchAllWebsites()
  }, [])

  return (
    <AddStyled>
        <InnerLayout>
            <h2>Add Website</h2>
             <h2 className="total-websites">Total Websites: <span>{totalWebsite()}</span></h2>
             
             <div className="website-content">
                <div className="form-container">
                    <Form />
                </div>
                
                <div className="incomes">
                    {websites.map((website) => {
                        const {_id, url, isActive} = website;
                        return <WebsiteItem
                            key={_id}
                            id={_id}
                            url={url}
                            isActive={isActive}
                        />
                    })}
                </div>
              </div>

        </InnerLayout>
    </AddStyled>
  )
}

const AddStyled = styled.div`
  display: flex;
    overflow: auto;
    .total-websites{
        display: flex;
        justify-content: center;
        align-items: center;
        background: #FCF6F9;
        border: 2px solid #FFFFFF;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        border-radius: 20px;
        padding: 1rem;
        margin: 1rem 0;
        font-size: 2rem;
        gap: .5rem;
        span{
            font-size: 2.5rem;
            font-weight: 800;
            color: var(--color-green);
        }
    }
    .website-content{
        display: flex;
        gap: 2rem;
        .incomes{
            flex: 1;
        }
    }
`

export default Add