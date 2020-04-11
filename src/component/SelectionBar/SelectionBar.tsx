import React, { useState, useContext, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import "./SelectionBar.css"
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
  const [players] = useState(defaultPlayerOptions);
  const [player, setPlayer] = useState(defaultPlayer);
  const [period, setPeriod] = useState(defaultPeriod);

  const { data: years } = useQuery(FETCH_YEARS_QUERY);
  const { data: teams } = useQuery(FETCH_TEAMS_QUERY);

  // prettier-ignore
  const [getPlayers, { data: fetchedPlayers }] = useLazyQuery(
    FETCH_PLAYERS_QUERY, { variables: { year, seasonType, team } }
  );
  const [getShotCharts, { data: shotCharts }] = useLazyQuery(
    FETCH_SHOTCHARTS_QUERY
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    getShotCharts({
      variables: { year, seasonType, team, player, period },
    });
  };

  useEffect(() => {
    if (shotCharts) {
      setShotCharts(shotCharts);
    }
  }, [setShotCharts, shotCharts]);

  return (
    <div>
      <Form id={"selection-bar"} onSubmit={handleSubmit}>
        <Form.Group controlId="exampleForm.SelectCustom">
          <Form.Label>Year</Form.Label>
          <Form.Control
            as="select"
            onChange={(event: React.FormEvent<HTMLInputElement>) => {
              setYear(event.currentTarget.value);
            }}
            value={year}
          >
            {years &&
              years.getYears.map((elem: string) => {
                return <option key={elem}>{elem}</option>;
              })}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="exampleForm.SelectCustom">
          <Form.Label>Season Type</Form.Label>
          <Form.Control
            as="select"
            onChange={(event: React.FormEvent<HTMLInputElement>) =>
              setSeasonType(event.currentTarget.value)
            }
            value={seasonType}
          >
            <option>All Season Types</option>
            <option value={"Pre Season"}>Pre-season</option>
            <option>Regular Season</option>
            <option>Playoffs</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="exampleForm.SelectCustom">
          <Form.Label>Team</Form.Label>
          <Form.Control
            as="select"
            onChange={(event: React.FormEvent<HTMLInputElement>) => {
              setTeam(event.currentTarget.value);
              getPlayers();
            }}
            value={team}
          >
            <option>All Teams</option>
            {teams &&
              teams.getTeams.map(({ name }: { name: string }) => {
                return <option key={name}>{name}</option>;
              })}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="exampleForm.SelectCustom">
          <Form.Label>Player</Form.Label>
          <Form.Control
            as="select"
            onChange={(event: React.FormEvent<HTMLInputElement>) => {
              setPlayer(event.currentTarget.value);
            }}
            value={player}
          >
            <option>All Team Players</option>
            {!fetchedPlayers &&
              players.map((name: string) => {
                return <option key={name}>{name}</option>;
              })}
            {fetchedPlayers &&
              fetchedPlayers.getPlayers.map((name: string) => {
                return <option key={name}>{name}</option>;
              })}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="exampleForm.SelectCustom">
          <Form.Label>Period</Form.Label>
          <Form.Control
            as="select"
            onChange={(event: React.FormEvent<HTMLInputElement>) => {
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
    </div>
  );
}
