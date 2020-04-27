import React from "react";
import { Navbar } from "react-bootstrap";

export default function NavBar() {
  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <Navbar.Brand href="/">
        <span role="img" aria-label="Basketball">
          🏀
        </span>
        &nbsp;NBA Shot Chart
      </Navbar.Brand>
    </Navbar>
  );
}
