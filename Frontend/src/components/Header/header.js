import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container } from 'react-bootstrap'
import Logo from '../../images/logo.png'
const Header = () => {
  return (
    <>
      <Navbar bg='light' collapseOnSelect>
        <Container>
          <LinkContainer to='/home'>
            <Navbar.Brand>  <img style={{maxWidth : '3rem' , width : '100%' , textAlign : 'right'}} src={Logo} /> SKILL KITS</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              <LinkContainer to='/logout'>
                <Nav.Link href='/logout'>
                  <i className='fa fa-user'></i>Logout
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default Header
