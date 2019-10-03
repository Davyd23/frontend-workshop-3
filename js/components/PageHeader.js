import React from 'react'
import styled from 'styled-components'
import TopNav from '@govuk-react/top-nav'

const StyledDiv = styled.div`
  position: absolute;
  right: 30px;
  margin-top: -23px;`

const PageHeader = () => (
  <TopNav>
    <StyledDiv>
      <span>Logout</span>
    </StyledDiv>
  </TopNav>
)

export default PageHeader
