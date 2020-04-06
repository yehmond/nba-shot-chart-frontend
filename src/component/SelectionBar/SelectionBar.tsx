import React from "react";
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
  {
    getPlayers {
      name
    }
  }
`;

export default function SelectionBar() {
  const { data: years } = useQuery(FETCH_YEARS_QUERY);
  const { data: teams } = useQuery(FETCH_TEAMS_QUERY);
  const [getPlayers, { data: players }] = useLazyQuery(FETCH_PLAYERS_QUERY);
  return (
    <div>
      <Form id={"selection-bar"}>
        <Form.Group controlId="exampleForm.SelectCustom">
          <Form.Label>Year</Form.Label>
          <Form.Control as="select" defaultValue={"2011-12"}>
            {years &&
              years.getYears.map((elem: string) => {
                return <option key={elem}>{elem}</option>;
              })}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="exampleForm.SelectCustom">
          <Form.Label>Season Type</Form.Label>
          <Form.Control as="select" defaultValue={"Regular Season"}>
            <option>Pre Season</option>
            <option>Regular Season</option>
            <option>Playoffs</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="exampleForm.SelectCustom">
          <Form.Label>Team</Form.Label>
          <Form.Control as="select" onChange={() => getPlayers()}>
            {teams &&
              teams.getTeams.map(({ name }: { name: string }) => {
                return <option key={name}>{name}</option>;
              })}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="exampleForm.SelectCustom">
          <Form.Label>Player</Form.Label>
          <Form.Control as="select">
            <option>All Team Players</option>
            {players &&
              players.getPlayers.map(({ name }: { name: string }) => {
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
        <Button>Submit</Button>
      </Form>
    </div>
  );
}
