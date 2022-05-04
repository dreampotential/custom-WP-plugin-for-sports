import Home from './pages/home';
import { useState, useEffect } from 'react';
import { api } from './utils/api_handler';
import { set_teams, set_Odds } from './_actions/team_actions';
import { save_style } from './_actions/ui_actions';
import { useDispatch } from 'react-redux';
function App() {
  console.log('hi');
  const dispatch = useDispatch();
  useEffect(() => {
    getCustomVal();
  }, []);
  const getCustomVal = async () => {
    const teams_res = await api.getTeams();
    const styles = await api.getSettings();
    const odds_res = await api.getOdds();
    console.log('odds', odds_res.data);
    var teams = {};
    teams_res.data.forEach(team => (teams = { ...teams, [team.old_name]: team }));
    dispatch(set_Odds(odds_res.data));
    dispatch(set_teams(teams));
    styles.data && dispatch(save_style(styles.data));
  };

  return (
    <div className='App'>
      <Home />
    </div>
  );
}

export default App;
