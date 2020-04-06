import React from "react";
import "./MadeWithLove.css"

export default function MadeWithLove() {
  return (
    <footer className={"page-footer"} id={"made-with-love"}>
      Made after washing hands{" "}
      <span role="img" aria-label="Soap">
        🧼
      </span>
      &nbsp;
      <span role="img" aria-label="Hands">
        🤲
      </span>
      &nbsp;by <a href="https://www.github.com/yehmond">Raymond Yeh</a>
    </footer>
  );
}
