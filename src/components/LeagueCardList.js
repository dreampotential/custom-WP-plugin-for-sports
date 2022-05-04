import LeagueCard from "./LeagueCard";

export default function LeagueCardList({ eventLeagues, leagues }) {
  return eventLeagues.map((league, index) => (
    <LeagueCard key={index} league={league} leagues={leagues} />
  ));
}
