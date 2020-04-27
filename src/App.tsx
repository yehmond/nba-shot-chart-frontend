import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./component/NavBar";
import { ShotChartProvider } from "./ShotChartContext";
import SelectionBar from "./component/SelectionBar/SelectionBar";
import ShotChart from "./component/ShotChart/ShotChart";
import MadeWithLove from "./component/MadeWithLove/MadeWithLove";

function App() {
  return (
    <>
      <NavBar />
      <ShotChartProvider>
        <SelectionBar />
        <ShotChart />
      </ShotChartProvider>
      <MadeWithLove />
    </>
  );
}

export default App;
