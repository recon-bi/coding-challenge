import { history } from 'config/history'; // Import the history helper

export function handleFailure() {
  if(history.navigate) {
    localStorage.clear();
    history.navigate('/auth', {replace: true, state: { message: 'Session Timed Out, Please Login Again'}});

  }
}