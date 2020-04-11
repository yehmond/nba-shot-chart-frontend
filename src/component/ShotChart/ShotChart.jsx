import { ResponsiveScatterPlot } from "@nivo/scatterplot";
import React, { useContext } from "react";
import "./ShotChart.css";
import { ShotChartContext } from "../../ShotChartContext";
const imgUrl = require("../../images/halfcourt.png");

export default function ShotChart() {
  let [data] = useContext(ShotChartContext);
  console.log(data);
  data = [];
  const factor = 1.5;
  const height = 1182 / factor;
  const width = 1249 / factor;
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
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        xScale={{ type: "linear", min: 0, max: "auto" }}
        xFormat={function (e) {
          return e + " kg";
        }}
        yScale={{ type: "linear", min: 0, max: "auto" }}
        yFormat={function (e) {
          return e + " cm";
        }}
        colors={{ scheme: "dark2" }}
        enableGridX={false}
        enableGridY={false}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: "bottom",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "weight",
          legendPosition: "middle",
          legendOffset: 46,
        }}
        axisLeft={{
          orient: "left",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "size",
          legendPosition: "middle",
          legendOffset: -60,
        }}
        animate={false}
        motionStiffness={200}
        legends={[
          {
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 130,
            translateY: 0,
            itemWidth: 100,
            itemHeight: 12,
            itemsSpacing: 5,
            itemDirection: "left-to-right",
            symbolSize: 12,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
}
