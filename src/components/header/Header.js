import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPuzzlePiece } from '@fortawesome/free-solid-svg-icons'
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import {NavLink} from "react-router-dom"
import { useState, useContext } from 'react'
import UserContext from '../UserContext'
import Login from '../login/Login'

const Header = () => {

    const [seen, setSeen] = useState(false)
    const {user} = useContext(UserContext); // Get the user from context
    function togglePop () {
        setSeen (!seen);
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
                {user ? (
                    <p style={{marginRight: 50}}>Welcome, {user.username} {user.userId}!</p>
                ) : (
                  <>
                  <p style={{paddingRight: 10}}>Register or login to start your item tracking journey</p>
                  <Button variant="outline-info" onClick={togglePop} className="me-2">Login</Button>
                  <Button variant="outline-info" className="me-2">Register</Button>
                  </>
                    
                )}
                
                {seen ? <Login toggle={togglePop} /> : null}
                
            </Navbar.Collapse>
        </Container>
    </Navbar>
  )
}

export default Header