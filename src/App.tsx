import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./component/NavBar";
import { ShotChartProvider } from "./ShotChartContext";
import SelectionBar from "./component/SelectionBar/SelectionBar";
import MadeWithLove from "./component/MadeWithLove/MadeWithLove";
import Dashboard from "./component/Dashboard/Dashboard";

function App() {
  return (
    <>
      <NavBar />
      <ShotChartProvider>
        <SelectionBar />
        <Dashboard />
      </ShotChartProvider>
      <MadeWithLove />
    </>
  );
}

export default App;
