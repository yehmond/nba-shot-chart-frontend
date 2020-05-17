import React from "react";
import "./Statistic.css";
import { useWindowSize } from "../../Util";
const Fade = require('react-reveal/Fade');

interface Props {
  title: string;
  value: string | number;
  box: string;
  align: string;
}

export default function Statistic({ title, value: stat, box, align}: Props) {
  const isMobile = useWindowSize().width < 1000;

  return (
    <div className={`box-container ${box} ${align === "left" ? "align-left" : "align-right"}`}>
      <Fade bottom={isMobile} left={!isMobile && align === "right"} right={!isMobile && align === "left"} duration={600}  when={stat}>
      <p>
        <span className="title">{title}</span>
      </p>
      <p>
        <span className="big-text">{stat}</span>
      </p>
      </Fade>
    </div>
  );
}
