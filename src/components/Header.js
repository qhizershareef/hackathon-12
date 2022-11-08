//create a header component using bootstrap components with multiple tabs
import {Navbar, Nav} from 'react-bootstrap';
const Header = () => {
    return (
        <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
        </Nav>
        </Navbar>
    );
}

export default Header;