import React from 'react'
import styled from 'styled-components'
import { InnerLayout } from '../../styles/Layouts';
import help from '../../assets/help.png'

const Help = () => {
    return (
      <HelpStyled>
          <InnerLayout>
            <h1>Process</h1>
            <img src={help} className='helpimg'/>
          </InnerLayout>
      </HelpStyled>
    )
  }
  
  const HelpStyled = styled.div`
      .helpimg {
        margin: auto 350px;
        height: 33.5rem;
        width: 25rem;
      }
  `

export default Help