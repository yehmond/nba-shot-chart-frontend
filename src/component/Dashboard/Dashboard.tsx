import React, { useContext } from "react";
import ShotChartContainer from "../ShotChart/ShotChartContainer";
import Statistic from "../Statistic/Statistic";
import { ShotChartContext } from "../../ShotChartContext";
import { Element } from "react-scroll";
import { getAccuracy, getAvgShotDist, isShotchartLoaded, getMostFrequentShots } from "../../Util";
import "./Dashboard.css";

export default function Dashboard() {
  const [shotcharts] = useContext(ShotChartContext);

  if (!isShotchartLoaded(shotcharts)) {
    return (
      <Element name="dashboard">
        <div id="dashboard">
          <Statistic title={"FG%"} value={""} box={"left-top"} align="right" />
          <Statistic
            title={"Mean Shot Distance"}
            value={""}
            box={"left-bot"}
            align="right"
          />
          <ShotChartContainer box="mid" />
          <Statistic
            title={"Favorite Shot Zone"}
            value={""}
            box={"right-top"}
            align="left"
          />
          <Statistic
            title={"Favorite Shot Direction"}
            value={""}
            box={"right-bot"}
            align="left"
          />
        </div>
      </Element>
    );
  }

  const shotsObj = getMostFrequentShots(shotcharts);
  const fgp = getAccuracy(shotcharts);
  const avgShotDist = getAvgShotDist(shotcharts);

  return (
    <Element name="dashboard">
      <div id="dashboard">
        <Statistic title={"FG%"} value={fgp} box={"left-top"} align="right" />
        <Statistic
          title={"Mean Shot Distance"}
          value={avgShotDist}
          box={"left-bot"}
          align="right"
        />
        <ShotChartContainer box="mid" />
        <Statistic
          title={"Favorite Shot Zone"}
          value={shotsObj.zone}
          box={"right-top"}
          align="left"
        />
        <Statistic
          title={"Favorite Shot Direction"}
          value={shotsObj.area}
          box={"right-bot"}
          align="left"
        />
      </div>
    </Element>
  );
}


