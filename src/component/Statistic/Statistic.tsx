import React from "react";
import "./Statistic.css";

interface Props {
  title: string;
  value: string | number;
  box: string;
  align: string;
}

export default function Statistic({ title, value: stat, box, align}: Props) {
  return (
    <div className={`box-container ${box} ${stat === "" ? "hidden" : ""} ${align === "left" ? "align-left" : "align-right"}`}>
      <p>
        <span className="title">{title}</span>
      </p>
      <p>
        <span className="big-text">{stat}</span>
      </p>
    </div>
  );
}
