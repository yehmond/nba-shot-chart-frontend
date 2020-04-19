import { ResponsiveScatterPlot } from "@nivo/scatterplot";
import React, { useContext } from "react";
import "./ShotChart.css";
import { ShotChartContext } from "../../ShotChartContext";
const imgUrl = require("../../images/halfcourt.png");

export default function ShotChart() {
  let [data] = useContext(ShotChartContext);
  const factor = 1;
  const height = 470 * factor;
  const width = 500 * factor;
  return (
    <div
      id={"shot-chart-container"}
      style={{
        height: `${height}px`,
        width: `${width}px`,
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: `${width}px ${height}px`,
      }}
    >
      <ResponsiveScatterPlot
        data={data ? data : []}
        // margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
        xScale={{ type: "linear", min: -250, max: 250 }}
        xFormat={displayLength}
        yScale={{ type: "linear", min: -50, max: 420 }}
        yFormat={displayLength}
        nodeSize={15}
        colors={{ scheme: "nivo" }}
        borderColor="#ffffff"
        blendMode="normal"
        enableGridX={false}
        enableGridY={false}
        axisTop={null}
        axisRight={null}
        axisBottom={null}
        axisLeft={null}
        animate={false}
        motionStiffness={300}
        // motionDamping={40}
        useMesh={false}
        legends={[]}
        tooltip={({ node }) => {
          // console.log(node);
          return (
            <div
              style={{
                color: node.style.color,
                background: "#333",
                padding: "12px 16px",
              }}
            >
              <strong>
                {node.data.SHOT_MADE_FLAG === 1 ? "Made Shot" : "Missed Shot"}
              </strong>
              <br />
              {`x: ${node.data.formattedX}`}
              <br />
              {`y: ${node.data.formattedY}`}
              <br />
              {`Shot zone: ${node.data.SHOT_ZONE_BASIC}`}
              <br />
              {`Action type: ${node.data.ACTION_TYPE}`}
            </div>
          );
        }}
      />
    </div>
  );
}

function displayLength(e) {
  const meters = ((e / 10) * 0.3048).toFixed(1);
  return `${meters} m (${e / 10} ft)`;
}
