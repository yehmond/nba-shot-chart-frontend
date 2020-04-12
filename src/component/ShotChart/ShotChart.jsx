import { ResponsiveScatterPlot } from "@nivo/scatterplot";
import React, { useContext } from "react";
import "./ShotChart.css";
import { ShotChartContext } from "../../ShotChartContext";
const imgUrl = require("../../images/halfcourt.png");

export default function ShotChart() {
  let [data] = useContext(ShotChartContext);
  console.log(data);
  // const factor = 1.5;
  // const height = 1182 / factor;
  // const width = 1249 / factor;
  const factor = 1.5;
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
        xFormat={function (e) {
          console.log(e);
          return e;
        }}
        yScale={{ type: "linear", min: -50, max: 420 }}
        yFormat={function (e) {
          return e;
        }}
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
        animate={true}
        motionStiffness={300}
        // motionDamping={40}
        useMesh={false}
        legends={[]}
        tooltip={({ node }) => (
          <div
            style={{
              color: node.style.color,
              background: "#333",
              padding: "12px 16px",
            }}
          >
            <strong>
              {node.id} ({node.serieId})
            </strong>
            <br />
            {`x: ${node.data.formattedX}`}
            <br />
            {`y: ${node.data.formattedY}`}
          </div>
        )}
      />
    </div>
  );
}
