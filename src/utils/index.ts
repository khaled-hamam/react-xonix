export const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const getHighScore = () => {
  return Number(localStorage.getItem('HIGH_SCORE'));
}

export const setHighScore = (value: number) => {
  const prevHighScore = getHighScore();
  localStorage.setItem('HIGH_SCORE', String(Math.max(value, prevHighScore)));
}

export const resetHighScore = (version: string) => {
  const lastReset = localStorage.getItem('LAST_RESET');

  if (lastReset !== version) {
    localStorage.removeItem('HIGH_SCORE');
    localStorage.setItem('LAST_RESET', version);
  }
}