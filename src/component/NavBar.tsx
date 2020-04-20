import React from "react";
import { Nav, Navbar } from "react-bootstrap";

export default function NavBar() {
  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <Navbar.Brand href="/">
        <span role="img" aria-label="Basketball">
          🏀
        </span>
        &nbsp;NBA Shot Chart
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link href="/">
            <span role="img" aria-label="Green Circle">
              🟢
            </span>
            &nbsp; Shot Plot
          </Nav.Link>
          <Nav.Link href="/heatmap" eventKey="heat-map" disabled>
            <span role="img" aria-label="Fire">
              🔥
            </span>
            &nbsp; Heat Map (Coming Soon)
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
