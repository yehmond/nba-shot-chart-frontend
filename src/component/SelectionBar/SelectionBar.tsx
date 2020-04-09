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

export default function SelectionBar() {
  const [year, setYear] = useState("2018-19");
  const [seasonType, setSeasonType] = useState("Playoffs");
  const [team, setTeam] = useState("Toronto Raptors");
  const [players, setPlayers] = useState([
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
  const [player, setPlayer] = useState("");

  const { data: years } = useQuery(FETCH_YEARS_QUERY);
  const { data: teams } = useQuery(FETCH_TEAMS_QUERY);
  const [getPlayers, { data: fetchedPlayers }] = useLazyQuery(
    FETCH_PLAYERS_QUERY,
    {
      variables: { year, seasonType, team },
    }
  );

  return (
    <div>
      <Form
        id={"selection-bar"}
        onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
        }}
      >
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
            <option>Pre Season</option>
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
          <Form.Control as="select" defaultValue={"All"}>
            <option>All</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
          </Form.Control>
        </Form.Group>
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  );
}
