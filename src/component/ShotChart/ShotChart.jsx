import { ResponsiveScatterPlotCanvas } from "@nivo/scatterplot";
import React, { useContext } from "react";
import "./ShotChart.css";
import { ShotChartContext } from "../../ShotChartContext";
import useWindowSize from "../../utils/useWindowSize";
// const imgUrl = require("../../images/halfcourt.png");

export default function ShotChart() {
  const dimensions = useWindowSize();
  let [data] = useContext(ShotChartContext);
  const width =
    dimensions.width > 600 ? 0.6 * dimensions.width : dimensions.width;
  const height = (470 / 500) * width;
  return (
    <div id={"shot-chart-container"}>
      <div
        id={"shot-chart"}
        style={{
          height: `${height}px`,
          width: `${width}px`,
        }}
      >
        <ResponsiveScatterPlotCanvas
          data={data ? data : []}
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
          // motionStiffness={90}
          // motionDamping={40}
          legends={[]}
          tooltip={({ node }) => {
            const xM = node.data.formattedX.meters;
            const xFt = node.data.formattedX.feet;
            const yM = node.data.formattedY.meters;
            const yFt = node.data.formattedY.feet;
            const distM = Math.sqrt(Math.pow(xM, 2) + Math.pow(yM, 2)).toFixed(2); //prettier-ignore
            const distFt = Math.sqrt(Math.pow(xFt, 2) + Math.pow(yFt, 2)).toFixed(2)
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
                {`Distance to Basket: ${distM} m (${distFt} ft)`}
                <br />
                {`Shot zone: ${node.data.SHOT_ZONE_BASIC}`}
                <br />
                {`Action type: ${node.data.ACTION_TYPE}`}
              </div>
            );
          }}
        />
      </div>
    </div>
  );
}

function displayLength(e) {
  const meters = ((e / 10) * 0.3048).toFixed(1);
  const feet = e / 10;
  return { meters, feet };
}
