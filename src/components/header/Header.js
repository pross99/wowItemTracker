import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPuzzlePiece } from '@fortawesome/free-solid-svg-icons'
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import {NavLink} from "react-router-dom"
import { useState, useContext } from 'react'
import AuthContext, { useAuth } from '../login/AuthProvider'
import Login from '../login/Login'
import Register from '../login/Register'

const Header = () => {

    /* const [seen, setSeen] = useState(false)  split in to two with showLogin and showRegister */
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false); 
   // const {user} = useContext(UserContext); // Get the user from context
    const { user, isLoggedIn } = useAuth();



    const toggleLogin = () => {
        setShowLogin(!showLogin);
        if (showRegister) setShowRegister(false) // close registration popup if active
    };
    const toggleRegistration = () => {
        setShowRegister(!showRegister);
        if (showLogin) setShowLogin(false) // close login popup if active
    };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
        <Container fluid>
            <Navbar.Brand href="/" style={{"color":"gold"}}>
                <FontAwesomeIcon icon={faPuzzlePiece}/>TransmogTracker
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
                <Nav
                className="me-auto my-2 my-lg-0"
                style={{maxHeight: '100px'}}
                >
                    <NavLink className="nav-link" to="/">Home</NavLink>
                    <NavLink className="nav-link" to="/Add">Add item</NavLink>
                </Nav>
                {isLoggedIn ? (
                    <p style={{marginRight: 50}}>Welcome, {user.username}!</p>
                ) : (
                  <>
                  <p style={{paddingRight: 10}}>Register or login to start your item tracking journey</p>
                  <Button variant="outline-info" onClick={toggleLogin} className="me-2">Login</Button>
                  <Button variant="outline-info" onClick={toggleRegistration} className="me-2">Register</Button>
                  </>
                    
                )}
                
                
            </Navbar.Collapse>
        </Container>
        {showLogin ? <Login toggle={toggleLogin} /> : null}
        {showRegister ? <Register toggle={toggleRegistration} />: null}
    </Navbar>
  )
}

export default Header