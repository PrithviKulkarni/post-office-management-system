import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";

/**
 * 
 * @returns a list of options for the user to navigate to when the user clicks on the links.
 */
const Header = () => {
  return (
    <Navbar expand="lg" style={{ backgroundColor: "#232627" }}>
      <Container>
        <Navbar.Brand style={{ padding: "10px 20px", color: "white" }}>
          {" "}
          Post Office Management System
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to={"/letters"} style={{ padding: "10px 20px" }}>
              Letters
            </Link>
            <Link to={"/parcels"} style={{ padding: "10px 20px" }}>
              Parcels
            </Link>
            <Link to={"/drivers"} style={{ padding: "10px 20px" }}>
              Drivers
            </Link>
            <Link to={"/depots"} style={{ padding: "10px 20px" }}>
              Depots
            </Link>
          </Nav>
          <NavDropdown
            title="Create"
            id="basic-nav-dropdown"
            style={{ color: "white" }}
          >
            <NavDropdown.Item className="bg-info">
              {" "}
              <Link to={"/createLetter"}>New Letter</Link>
            </NavDropdown.Item>
            <NavDropdown.Item className="bg-info"> 
              {" "}
              <Link to={"/createParcel"}>New Parcel</Link>
            </NavDropdown.Item>
            <NavDropdown.Item className="bg-info">
              {" "}
              <Link to={"/createDriver"}>New Driver</Link>
            </NavDropdown.Item>
            <NavDropdown.Item className="bg-info">
              {" "}
              <Link to={"/createDepot"}>New Depot</Link>
            </NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
