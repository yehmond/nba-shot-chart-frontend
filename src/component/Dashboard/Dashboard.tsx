import React, { useContext } from "react";
import ShotChartContainer from "../ShotChart/ShotChartContainer";
import Statistic from "../Statistic/Statistic";
import { ShotChartContext } from "../../ShotChartContext";
import { Element } from "react-scroll";
import "./Dashboard.css";

export default function Dashboard() {
  const [shotcharts] = useContext(ShotChartContext);
  if (!isShotchartLoaded(shotcharts)) {
    return (
      <Element name="dashboard">
        <div id="dashboard">
          <Statistic title={"FG%"} value={""} box={"left-top"} align="right" />
          <Statistic
            title={"Favorite Shot Action"}
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

  return (
    <Element name="dashboard">
      <div id="dashboard">
        <Statistic title={"FG%"} value={fgp} box={"left-top"} align="right" />
        <Statistic
          title={"Favorite Shot"}
          value={shotsObj.action}
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

function isShotchartLoaded(shotcharts: any) {
  return shotcharts.length > 0 && shotcharts[0] !== "loading";
}

function getMostFrequentShots(shotcharts: any) {
  const actionFreqMap: any = {};
  const zoneFreqMap: any = {};
  let maxAction = "";
  let maxActionFreq = 0;
  let maxZone = "";
  let maxZoneFreq = 0;
  let maxArea = "";
  let maxAreaFreq = 0;
  shotcharts[0].data.forEach((shot: any) => {
    if (actionFreqMap[shot.ACTION_TYPE]) {
      actionFreqMap[shot.ACTION_TYPE]++;
    } else {
      actionFreqMap[shot.ACTION_TYPE] = 1;
    }
    if (zoneFreqMap[shot.SHOT_ZONE_BASIC]) {
      zoneFreqMap[shot.SHOT_ZONE_BASIC]++;
    } else {
      zoneFreqMap[shot.SHOT_ZONE_BASIC] = 1;
    }
    if (zoneFreqMap[shot.SHOT_ZONE_AREA]) {
      zoneFreqMap[shot.SHOT_ZONE_AREA]++;
    } else {
      zoneFreqMap[shot.SHOT_ZONE_AREA] = 1;
    }

    if (maxActionFreq < actionFreqMap[shot.ACTION_TYPE]) {
      maxAction = shot.ACTION_TYPE;
      maxActionFreq = actionFreqMap[shot.ACTION_TYPE];
    }
    if (maxZoneFreq < zoneFreqMap[shot.SHOT_ZONE_BASIC]) {
      maxZone = shot.SHOT_ZONE_BASIC;
      maxZoneFreq = zoneFreqMap[shot.SHOT_ZONE_BASIC];
    }
    if (maxAreaFreq < zoneFreqMap[shot.SHOT_ZONE_AREA]) {
      maxArea = shot.SHOT_ZONE_AREA;
      maxAreaFreq = zoneFreqMap[shot.SHOT_ZONE_AREA];
    }
  });

  return {
    action: maxAction,
    zone: maxZone,
    area: removeBrackets(maxArea),
  };
}

function getAccuracy(shotcharts: any) {
  // Made shot / Total shots taken

  const fgp = (
    (100 * shotcharts[0].data.length) /
    (shotcharts[0].data.length + shotcharts[1].data.length)
  ).toFixed(1);

  if (isNaN(Number(fgp))) {
    return "";
  }
  return fgp + "%";
}

function removeBrackets(text: string) {
  return text.replace(/\s*\(.*\)\s*/g, "");
}
