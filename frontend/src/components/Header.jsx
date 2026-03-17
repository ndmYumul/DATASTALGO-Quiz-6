import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { logout } from '../actions/userActions';

const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Serenity</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              
              {/* Public link for memberships/tiers */}
              <LinkContainer to="/subscription">
                <Nav.Link><i className="fas fa-crown"></i> Membership</Nav.Link>
              </LinkContainer>

              {userInfo ? (
                <NavDropdown title={userInfo.username || userInfo.first_name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>My Profile & Orders</NavDropdown.Item>
                  </LinkContainer>

                  {/* 1. Only regular "User" level can see the "Apply as Seller" button */}
                  {userInfo.role === 'User' && (
                    <LinkContainer to="/apply-seller">
                      <NavDropdown.Item>Apply as Seller</NavDropdown.Item>
                    </LinkContainer>
                  )}

                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/signin">
                  <Nav.Link><i className="fas fa-user"></i> Login</Nav.Link>
                </LinkContainer>
              )}

              {/* 2. Seller Menu: Accessible by approved Sellers and Admins */}
              {userInfo && (userInfo.role === 'Seller' || userInfo.role === 'Admin') && (
                <NavDropdown title="Seller Panel" id="seller-menu">
                  <LinkContainer to="/seller/dashboard">
                    <NavDropdown.Item>Service Management</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}

              {/* 3. Admin Menu: Dedicated page for Users, Seller Apps, and Subscriptions */}
              {userInfo && userInfo.role === 'Admin' && (
                <NavDropdown title="Admin" id="adminmenu">
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>User & Seller Management</NavDropdown.Item>
                  </LinkContainer>
                  
                  <LinkContainer to="/admin/subscriptionlist">
                    <NavDropdown.Item>Subscription Transactions</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;