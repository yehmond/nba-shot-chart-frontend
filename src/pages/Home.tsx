import React from "react";
import NavBar from "../component/NavBar";
import ShotChart from "../component/ShotChart/ShotChart.jsx";
import SelectionBar from "../component/SelectionBar/SelectionBar";
import MadeWithLove from "../component/MadeWithLove/MadeWithLove";
import { ShotChartProvider } from "../ShotChartContext";

export default function Home() {
  return (
    <div>
      <NavBar />
      <ShotChartProvider>
        <SelectionBar />
        <ShotChart />
      </ShotChartProvider>
      <MadeWithLove />
    </div>
  );
}
