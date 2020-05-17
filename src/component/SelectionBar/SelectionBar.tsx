import React, { useState, useContext, ChangeEvent } from "react";
import { Form, Button } from "react-bootstrap";
import { scroller } from "react-scroll";
import "./SelectionBar.css";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";
import {
  FETCH_YEARS_QUERY,
  FETCH_TEAMS_QUERY,
  FETCH_PLAYERS_QUERY,
  FETCH_SHOTCHARTS_QUERY,
} from "./Queries";
import { ShotChartContext } from "../../ShotChartContext";
import {
  defaultYear,
  defaultSeasonType,
  defaultTeam,
  defaultPlayerOptions,
  defaultPeriod,
  defaultPlayer,
} from "./DefaultValues";

export default function SelectionBar() {
  const [, setShotCharts] = useContext(ShotChartContext);
  const [year, setYear] = useState(defaultYear);
  const [seasonType, setSeasonType] = useState(defaultSeasonType);
  const [team, setTeam] = useState(defaultTeam);
  const [players, setPlayers] = useState(defaultPlayerOptions);
  const [player, setPlayer] = useState(defaultPlayer);
  const [period, setPeriod] = useState(defaultPeriod);

  const { data: years } = useQuery(FETCH_YEARS_QUERY);
  const { data: teams } = useQuery(FETCH_TEAMS_QUERY);

  const [getPlayers, { data: fetchedPlayers }] = useLazyQuery(
    FETCH_PLAYERS_QUERY,
    {
      variables: { year, seasonType, team },
      onCompleted: () => {
        setPlayers(fetchedPlayers.getPlayers);
      },
    }
  );

  const [getShotCharts, { data: shotCharts }] = useLazyQuery(
    FETCH_SHOTCHARTS_QUERY,
    {
      onCompleted: () => {
        setShotCharts(parseShotChart(shotCharts));
      },
      fetchPolicy: "no-cache",
    }
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    scroller.scrollTo("dashboard", {
      smooth: true,
      duration: 600,
    });
    setShotCharts(["loading"]);
    getShotCharts({
      variables: { year, seasonType, team, player, period },
    });
  };

  return (
    <div>
      <Form id={"selection-bar"} onSubmit={handleSubmit}>
        <Form.Group controlId="select-year">
          <Form.Label>Year</Form.Label>
          <Form.Control
            as="select"
            onChange={(event: ChangeEvent<HTMLSelectElement>) => {
              setYear(event.currentTarget.value);
              setPlayer("All Team Players");
            }}
            value={year}
          >
            {years ? (
              years.getYears.map((elem: string) => {
                return <option key={elem}>{elem}</option>;
              })
            ) : (
              <option>2018-19</option>
            )}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="select-seasonType">
          <Form.Label>Season Type</Form.Label>
          <Form.Control
            as="select"
            onChange={(event: ChangeEvent<HTMLSelectElement>) => {
              setSeasonType(event.currentTarget.value);
              getPlayers();
            }}
            value={seasonType}
          >
            <option>All Season Types</option>
            <option value={"Pre Season"}>Pre-season</option>
            <option>Regular Season</option>
            <option>Playoffs</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="select-team">
          <Form.Label>Team</Form.Label>
          <Form.Control
            as="select"
            onChange={(event: ChangeEvent<HTMLSelectElement>) => {
              setTeam(event.currentTarget.value);
              setPlayer("All Team Players");
              getPlayers();
            }}
            value={team}
          >
            <option>All Teams</option>
            {teams ? (
              teams.getTeams.map(({ name }: { name: string }) => {
                if (name === "Los Angeles Clippers") {
                  return (
                    <option key={name} value={"LA Clippers"}>
                      {name}
                    </option>
                  );
                }
                return <option key={name}>{name}</option>;
              })
            ) : (
              <option>Toronto Raptors</option>
            )}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="select-player">
          <Form.Label>Player</Form.Label>
          <Form.Control
            as="select"
            onChange={(event: ChangeEvent<HTMLSelectElement>) => {
              setPlayer(event.currentTarget.value);
            }}
            value={player}
          >
            <option>All Team Players</option>
            {players &&
              players.map((name: string) => {
                return <option key={name}>{name}</option>;
              })}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="select-period">
          <Form.Label>Period</Form.Label>
          <Form.Control
            as="select"
            onChange={(event: ChangeEvent<HTMLSelectElement>) => {
              setPeriod(event.currentTarget.value);
            }}
            value={period}
          >
            <option>All Periods</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option value={"5"}>OT 1</option>
            <option value={"6"}>OT 2</option>
            <option value={"7"}>OT 3</option>
            <option value={"8"}>OT 4</option>
          </Form.Control>
        </Form.Group>
        <Button type="submit">Submit</Button>
      </Form>
      <p id={"lag-note"}>
        <span role="img" aria-label="Warning">
          ⚠️
        </span>
        &nbsp; Note: The chart may become unresponsive if the selected dataset
        is too large.
      </p>
    </div>
  );
}

function parseShotChart(shotCharts: any) {
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
}
