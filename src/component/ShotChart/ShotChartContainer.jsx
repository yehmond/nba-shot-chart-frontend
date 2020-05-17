import React, { useContext, useEffect, useState } from "react";
import { ShotChartContext } from "../../ShotChartContext";
import "./ShotChartContainer.css";
import ShotChart from "./ShotChart";
import { Spinner } from "react-bootstrap";

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
    width = dimensions.width;
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

function useWindowSize() {
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });
  useEffect(() => {
    function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });
  return dimensions;
}
