import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Route exact path='/' component={Home}/>
    </BrowserRouter>
  );
}

export default App;
