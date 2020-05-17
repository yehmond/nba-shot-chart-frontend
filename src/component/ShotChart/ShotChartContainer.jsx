import React, { useContext } from "react";
import { ShotChartContext } from "../../ShotChartContext";
import "./ShotChartContainer.css";
import ShotChart from "./ShotChart";
import { Spinner } from "react-bootstrap";
import { useWindowSize } from "../../Util";

export default function ShotChartContainer({ box }) {
  const dimensions = useWindowSize();
  let [data] = useContext(ShotChartContext);
  let width;
  if (dimensions.width > 600 && dimensions.width > dimensions.height) {
    // Wide screen
    width = 0.4 * dimensions.width;
  } else if (dimensions.width > 600) {
    // Vertical screen
    width = 0.5 * dimensions.width;
  } else {
    // Mobile
    width = dimensions.width - 24;
  }
  const height = (470 / 500) * width;
  return (
    <div id={"shot-chart-container"} className={box}>
      <div
        id={"shot-chart"}
        style={{
          height: `${height}px`,
          width: `${width}px`,
        }}
      >
        {data[0] === "loading" ? (
          <div id="spinner-container" style={{ height }}>
            <Spinner id="spinner" animation="border" variant="primary" />
          </div>
        ) : (
          <ShotChart data={data} />
        )}
      </div>
    </div>
  );
}
