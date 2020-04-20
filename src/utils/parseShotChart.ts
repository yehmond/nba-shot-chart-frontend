export function parseShotChart(shotCharts: any) {
    const res: any[] = [
        { id: "Made shot", data: [] },
        { id: "Missed shot", data: [] },
    ];
    const copy = [...shotCharts.getShotCharts];
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
};