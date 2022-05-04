export function isToday(inputDate) {
  const today = new Date();
  inputDate = new Date(inputDate);
  return inputDate.setHours(0, 0, 0, 0) === today.setHours(0, 0, 0, 0);
}

export function isComing(inputDate) {
  const today = new Date();
  inputDate = new Date(inputDate);
  return inputDate.setHours(0, 0, 0, 0) >= today.setHours(0, 0, 0, 0);
}

export function filterByObj(array, val, key) {
  /* eslint eqeqeq: 0 */
  return array.filter(innerArray => innerArray[0][key] == val);
}

export function isValid(game) {
  return isComing(game.GameDateTime) && game.GameStatus === 'Open' && game.Format === 'Game';
}

export function convert_time(utcDateString) {
  var d = new Date(utcDateString);
  var today = new Date();

  var date = new Date(d.toString());
  var day = date.getDate();
  var month = date.getMonth();
  var y = month === today.getUTCMonth() && day === today.getUTCDate() ? 'Today /' : utcDateString.split('T')[0];
  month === today.getUTCMonth() && day === today.getUTCDate() + 1 && (y = 'Tomorrow /');
  var h = date.getHours();
  var m = date.getMinutes();
  if (m === 0) m = '00';
  h = parseInt(h);
  var hmt = h > 12 ? h - 12 + ':' + m + ' PM' : h + ':' + m + ' AM';
  return y + ' ' + hmt;
}
