import React from 'react'

import { Container, Navbar } from 'react-bootstrap' 
import { LinkContainer } from 'react-router-bootstrap'

const Header: React.FC = () => {
  return (
    <>
      <Navbar bg='dark' variant='dark'>
        <Container>
          <Navbar.Brand>
            <LinkContainer to="/">
              <h4>
                Amazona
              </h4>
            </LinkContainer>
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  )
}

export default Header