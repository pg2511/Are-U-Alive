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
        margin: auto 230px;
        height: 32rem;
        width: 43rem;
      }
  `

export default Help