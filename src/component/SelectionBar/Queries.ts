import gql from "graphql-tag";
export const FETCH_YEARS_QUERY = gql`
  {
    getYears
  }
`;
export const FETCH_TEAMS_QUERY = gql`
  {
    getTeams {
      name
    }
  }
`;
export const FETCH_PLAYERS_QUERY = gql`
  query getPlayers($year: String!, $seasonType: String!, $team: String!) {
    getPlayers(year: $year, seasonType: $seasonType, team: $team)
  }
`;
export const FETCH_SHOTCHARTS_QUERY = gql`
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
