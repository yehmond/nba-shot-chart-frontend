import { useEffect, useState } from "react";

export function useWindowSize() {
    const [dimensions, setDimensions] = useState({
        height: window.innerHeight,
        width: window.innerWidth,
    });
    useEffect(() => {
        function handleResize() {
            setDimensions({
                height: window.innerHeight,
                width: window.innerWidth,
            });
        }
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    });
    return dimensions;
}

export function parseShotChart(shotCharts: any) {
    const copy = [...shotCharts.getShotCharts];
    if (copy.length === 0) {
        return ["none"];
    }

    const res: any[] = [
        { id: "Made shot", data: [] },
        { id: "Missed shot", data: [] },
    ];
    copy.forEach((sc) => {
        // Renames keys "LOC_X" and "LOC_Y" to "x" and "y"
        delete Object.assign(sc, { x: sc["LOC_X"] })["LOC_X"];
        delete Object.assign(sc, { y: sc["LOC_Y"] })["LOC_Y"];

        if (sc.SHOT_MADE_FLAG === 1) {
            res[0].data.push(sc);
        } else {
            res[1].data.push(sc);
        }
    });
    return res;
}

export function removeBrackets(text: string) {
    return text.replace(/\s*\(.*\)\s*/g, "");
}

export function getAccuracy(shotcharts: any) {
    if (!isShotchartLoaded(shotcharts)) {
        return "";
    }

    const made = shotcharts[0].data.length;
    const missed = shotcharts[1].data.length;
    const fgp = (100 * made) / (made + missed);

    if (isNaN(Number(fgp))) {
        return "";
    }
    return fgp.toFixed(1) + "%";
}

export function getAvgShotDist(shotcharts: any) {
    if (!isShotchartLoaded(shotcharts)) {
        return "";
    }

    const madeDist = getTotalDistance(shotcharts[0].data);
    const missedDist = getTotalDistance(shotcharts[1].data);
    const made = shotcharts[0].data.length;
    const missed = shotcharts[1].data.length;
    const avg = (madeDist + missedDist) / (made + missed);
    if (isNaN(Number(avg))) {
        return "";
    }
    return avg.toFixed(2) + " m";
}

export function getTotalDistance(arr: any) {
    const totalDist = arr.reduce((acc: number, curr: any) => {
        const currDist = getDistance(curr.x, curr.y);
        const meters = (currDist / 10) * 0.3048;
        return acc + meters;
    }, 0);

    return totalDist;
}

export function getDistance(x: number, y: number) {
    return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
}

export function isShotchartLoaded(shotcharts: any) {
    return shotcharts[1];
}

export function isLoading(shotcharts: any) {
    return shotcharts[0] === "loading";
}

export function isError(shotcharts: any[]) {
    return shotcharts[0] === "error";
}

export function isEmpty(shotcharts: any[]) {
    return shotcharts[0] === "none";
}

export function getMostFrequentShots(shotcharts: any) {
    if (!isShotchartLoaded(shotcharts)) {
        return {
            action: "",
            zone: "",
            area: ""
        };
    }
    const actionFreqMap: any = {};
    const zoneFreqMap: any = {};
    let maxAction = "";
    let maxActionFreq = 0;
    let maxZone = "";
    let maxZoneFreq = 0;
    let maxArea = "";
    let maxAreaFreq = 0;
    shotcharts[0].data.forEach((shot: any) => {
        if (actionFreqMap[shot.ACTION_TYPE]) {
            actionFreqMap[shot.ACTION_TYPE]++;
        } else {
            actionFreqMap[shot.ACTION_TYPE] = 1;
        }
        if (zoneFreqMap[shot.SHOT_ZONE_BASIC]) {
            zoneFreqMap[shot.SHOT_ZONE_BASIC]++;
        } else {
            zoneFreqMap[shot.SHOT_ZONE_BASIC] = 1;
        }
        if (zoneFreqMap[shot.SHOT_ZONE_AREA]) {
            zoneFreqMap[shot.SHOT_ZONE_AREA]++;
        } else {
            zoneFreqMap[shot.SHOT_ZONE_AREA] = 1;
        }

        if (maxActionFreq < actionFreqMap[shot.ACTION_TYPE]) {
            maxAction = shot.ACTION_TYPE;
            maxActionFreq = actionFreqMap[shot.ACTION_TYPE];
        }
        if (maxZoneFreq < zoneFreqMap[shot.SHOT_ZONE_BASIC]) {
            maxZone = shot.SHOT_ZONE_BASIC;
            maxZoneFreq = zoneFreqMap[shot.SHOT_ZONE_BASIC];
        }
        if (maxAreaFreq < zoneFreqMap[shot.SHOT_ZONE_AREA]) {
            maxArea = shot.SHOT_ZONE_AREA;
            maxAreaFreq = zoneFreqMap[shot.SHOT_ZONE_AREA];
        }
    });

    return {
        action: maxAction,
        zone: maxZone,
        area: removeBrackets(maxArea),
    };
}

