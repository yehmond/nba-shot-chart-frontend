import React from "react";
import { ResponsiveScatterPlotCanvas } from "@nivo/scatterplot";
import { getDistance } from "../../Util";
import "./ShotChart.css";

export default function ShotChart(props) {
  return (
    <ResponsiveScatterPlotCanvas
      data={props.data}
      xScale={{ type: "linear", min: -250, max: 250 }}
      xFormat={displayLength}
      yScale={{ type: "linear", min: -50, max: 420 }}
      yFormat={displayLength}
      nodeSize={9}
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
      useMesh={false}
      legends={[]}
      tooltip={({ node }) => {
        const xM = node.data.formattedX.meters;
        const xFt = node.data.formattedX.feet;
        const yM = node.data.formattedY.meters;
        const yFt = node.data.formattedY.feet;
        const distM = getDistance(xM, yM).toFixed(2);
        const distFt = getDistance(xFt, yFt).toFixed(2);
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
            {`Player name: ${node.data.PLAYER_NAME}`}
            <br />
            {`Distance to basket: ${distM} m (${distFt} ft)`}
            <br />
            {`Shot zone: ${node.data.SHOT_ZONE_BASIC}`}
            <br />
            {`Action type: ${node.data.ACTION_TYPE}`}
          </div>
        );
      }}
    />
  );
}

function displayLength(e) {
  const meters = ((e / 10) * 0.3048).toFixed(1);
  const feet = e / 10;
  return { meters, feet };
}
