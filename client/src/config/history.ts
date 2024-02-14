import { NavigateFunction, Location } from 'react-router-dom';

interface History {
  navigate: NavigateFunction | null;
  location: Location | null;
}

const history: History = {
  navigate: null,
  location: null,
};

export { history };