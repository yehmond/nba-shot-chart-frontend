import React, { useState } from "react";

export const ShotChartContext = React.createContext<any>(null);

export function ShotChartProvider(props: { children: React.ReactNode }) {
  const [shotchart, setShotchart] = useState([]);

  return (
    <ShotChartContext.Provider value={[shotchart, setShotchart]}>
      {props.children}
    </ShotChartContext.Provider>
  );
}
