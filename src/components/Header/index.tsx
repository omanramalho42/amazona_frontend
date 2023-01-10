import React, { useContext, useEffect } from 'react';

import { Badge, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'; 

import { LinkContainer } from 'react-router-bootstrap';

import { Link } from 'react-router-dom';

import { Store } from '../../context/Store';

const Header: React.FC = () => {
  const { state, dispatch: ctxDispatch } = useContext<any>(Store);
  const { cart, userInfo } = state;
  
  const handleSignOut = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('payamentMethod');
  }

  return (
    <Navbar bg='dark' variant='dark'>
      <Container>
        <Navbar.Brand>
          <LinkContainer to="/">
            <h4>
              Amazona
            </h4>
          </LinkContainer>
        </Navbar.Brand>
        <Nav style={{ alignItems: 'center' }}>
          <Link to="/cart">
            Cart
            {cart.cartItems.length > 0 && (
              <Badge pill bg="danger">
                {cart.cartItems.reduce((a:any, c:any) => a + c.quantity, 0)}
              </Badge>
            )}
          </Link>
          {userInfo ? (
            <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
              <LinkContainer to="/profile">
                <NavDropdown.Item>
                  Perfil do usuário
                </NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/orderhistroy">
                <NavDropdown.Item>
                  Histórico de compras
                </NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Divider />
              <Link 
                className="dropdown-items" 
                to="#signout" 
                onClick={handleSignOut}
              >
                SignOut
              </Link>
            </NavDropdown>
          ) : (
            <Link 
              className="nav-link" 
              to="/signin"
            >
              Login
            </Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  )
}

export default Header