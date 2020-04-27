import React from "react";
import "./MadeWithLove.css";

export default function MadeWithLove() {
  return (
    <footer className={"page-footer"} id={"made-with-love"}>
      <p>
        Made after washing hands&nbsp;
        <span role="img" aria-label="Soap">
          🧼
        </span>
        &nbsp;
        <span role="img" aria-label="Hands">
          🤲
        </span>
        &nbsp;by&nbsp;
        <a href="https://www.github.com/yehmond">Raymond&nbsp;Yeh</a>
      </p>
    </footer>
  );
}
