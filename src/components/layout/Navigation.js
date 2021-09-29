import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const Navigation = () => {
    return (
        <Navbar bg="dark" variant="dark" className="mb-3">
            <Container>
                <Navbar.Brand>Teamleader: Opdracht 2</Navbar.Brand>
                <Nav>
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/orders" className="nav-link">Orders</Link>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default Navigation;