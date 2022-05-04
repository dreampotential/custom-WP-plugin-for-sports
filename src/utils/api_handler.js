import $ from './http';

const getLeagues = force_read => {
  return $.get(`/all?force_read=${force_read}`);
};

const getGameById = id => {
  return $.get(`/api/Games/${id}`);
};

const getTeamById = id => {
  return $.get(`/api/Teams/${id}`);
};

const getSettings = () => {
  return $.get(`/getSettings`);
};

const getTeams = () => {
  return $.get(`/getTeams`);
};

const getOdds = () => {
  return $.get(`/getOdds`);
};

export const api = {
  getLeagues,
  getGameById,
  getTeamById,
  getTeams,
  getSettings,
  getOdds,
};
