import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideoSlash } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import {NavLink, useNavigate} from "react-router-dom";
import {useState, useEffect} from 'react';
import './Header.css';

const Header = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [username, setUsername] = useState(null);
    const navigate = useNavigate();

    useEffect(()=>{
        const token = localStorage.getItem('authToken');
        const user = localStorage.getItem('authUsername');
        setLoggedIn(!!token);
        setUsername(user);
    },[])

    const handleLogout = ()=>{
        localStorage.removeItem('authToken');
        localStorage.removeItem('authUsername');
        setLoggedIn(false);
        setUsername(null);
        navigate('/');
        window.location.reload();
    }

    return (
        <Navbar className="app-navbar" expand="lg">
                <Container fluid>
                        <Navbar.Brand href="/" className="brand">
                                <FontAwesomeIcon icon ={faVideoSlash}/>𝓑έ𝐒𝕥𝐌➃ย
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="navbarScroll" />
                        <Navbar.Collapse id="navbarScroll">
                                        <Nav
                                                className="me-auto my-2 my-lg-0"
                                                style={{maxHeight: '100px'}}
                                                navbarScroll
                                        >
                                        <NavLink className ="nav-link" to="/">Home</NavLink>
                                        <NavLink className ="nav-link" to="/watchList">Watch List</NavLink>      
                                </Nav>
                                {!loggedIn ? (
                                    <>
                                        <NavLink to="/login"><Button variant="outline-info" className="me-2">Login</Button></NavLink>
                                        <NavLink to="/register"><Button variant="outline-info">Register</Button></NavLink>
                                    </>
                                ) : (
                                    <div style={{display:'flex',alignItems:'center',gap:10}}>
                                        <span style={{color:'rgba(255,255,255,0.9)'}}>Hi, {username || 'User'}</span>
                                        <Button variant="outline-info" onClick={handleLogout}>Logout</Button>
                                    </div>
                                )}
                        </Navbar.Collapse>
                </Container>
        </Navbar>
    )
}

export default Header