import React, { useContext } from "react";
import ShotChartContainer from "../ShotChart/ShotChartContainer";
import Statistic from "../Statistic/Statistic";
import { ShotChartContext } from "../../ShotChartContext";
import { Element } from "react-scroll";
import {
  getAccuracy,
  getAvgShotDist,
  getMostFrequentShots,
  isEmpty,
  isError,
} from "../../Util";
import "./Dashboard.css";
import NoResultModal from "../NoResultModal";

export default function Dashboard() {
  const [shotcharts] = useContext(ShotChartContext);

  const shotsObj = getMostFrequentShots(shotcharts);
  const fgp = getAccuracy(shotcharts);
  const avgShotDist = getAvgShotDist(shotcharts);

  return (
    <Element name="dashboard">
      {isEmpty(shotcharts) && (
        <NoResultModal
          title={"No Data Found"}
          message={`Seems like the selected team didn't make the playoffs for the selected year 👻`}
        />
      )}
      {isError(shotcharts) && (
        <NoResultModal
          title={"Data size too large"}
          message={"Please select another filter and try again."}
        />
      )}
      <div id="dashboard">
        <Statistic title={"FG%"} value={fgp} box={"left-top"} align="right" />
        <Statistic
          title={"Mean Shot Distance"}
          value={avgShotDist}
          box={"left-bot"}
          align="right"
        />
        <ShotChartContainer box="mid" shotcharts={shotcharts} />
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
