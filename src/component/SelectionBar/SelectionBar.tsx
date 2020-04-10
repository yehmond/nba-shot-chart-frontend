import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import gql from "graphql-tag";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";

const FETCH_YEARS_QUERY = gql`
  {
    getYears
  }
`;

const FETCH_TEAMS_QUERY = gql`
  {
    getTeams {
      name
    }
  }
`;

const FETCH_PLAYERS_QUERY = gql`
  query getPlayers($year: String!, $seasonType: String!, $team: String!) {
    getPlayers(year: $year, seasonType: $seasonType, team: $team)
  }
`;

const FETCH_SHOTCHART_QUERY = gql`
  query getShotCharts(
    $year: String!
    $seasonType: String!
    $team: String!
    $player: String!
    $period: String!
  ) {
    getShotCharts(
      year: $year
      seasonType: $seasonType
      team: $team
      player: $player
      period: $period
    ) {
      LOC_X
      LOC_Y
    }
  }
`;

export default function SelectionBar() {
  const [year, setYear] = useState("2018-19");
  const [seasonType, setSeasonType] = useState("Playoffs");
  const [team, setTeam] = useState("Toronto Raptors");
  const [players] = useState([
    "Kyle Lowry",
    "Marc Gasol",
    "Serge Ibaka",
    "Jodie Meeks",
    "Danny Green",
    "Jeremy Lin",
    "Kawhi Leonard",
    "Eric Moreland",
    "Norman Powell",
    "Malcolm Miller",
    "Patrick McCaw",
    "Pascal Siakam",
    "Fred VanVleet",
    "Chris Boucher",
  ]);
  const [player, setPlayer] = useState("All Team Players");
  const [period, setPeriod] = useState("All Periods");

  const { data: years } = useQuery(FETCH_YEARS_QUERY);
  const { data: teams } = useQuery(FETCH_TEAMS_QUERY);
  const [getPlayers, { data: fetchedPlayers }] = useLazyQuery(
    FETCH_PLAYERS_QUERY,
    {
      variables: { year, seasonType, team },
    }
  );
  const [getShotChart, { data: shotChart }] = useLazyQuery(
    FETCH_SHOTCHART_QUERY
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    getShotChart({
      variables: { year, seasonType, team, player, period },
    });
  };

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
            <option value= {"Pre Season"}>Pre-season</option>
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
            vale={period}
          >
            <option>All Periods</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option value={"5"}>OT1</option>
            <option value={"6"}>OT2</option>
            <option value={"7"}>OT3</option>
            <option value={"8"}>OT4</option>
          </Form.Control>
        </Form.Group>
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  );
}
