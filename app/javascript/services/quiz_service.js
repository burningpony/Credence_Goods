import { API_URL, getToken } from '../service';

export const saveQuiz = (user_id, responses) => fetch(`${API_URL}/quizes`, {
  method: 'POST',
  body: JSON.stringify({ responses, user_id }),
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'X-CSRF-Token': getToken(),
  },
});
