import React from "react";
import { Navbar } from "react-bootstrap";

export default function NavBar() {
  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <Navbar.Brand href="/">
        <span role="img" aria-label="Basketball">
          🏀
        </span>
        &nbsp;&nbsp;
        <span style={{ fontWeight: 600 }}>NBA Shot Chart</span>
      </Navbar.Brand>
    </Navbar>
  );
}
