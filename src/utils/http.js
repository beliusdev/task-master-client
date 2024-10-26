import axios from 'axios';
export const BASE_URL = 'https://api.render.com/deploy/srv-cf6g6k1a6gdjkk4d2jl0?key=OeZJFq6khaY';

export default function http(withToken) {
  const token = localStorage.getItem('tm-token');

  const options = withToken
    ? {
        baseURL: BASE_URL,
        headers: {
          Authorization: token && `Bearer ${token}`,
        },
      }
    : {
        baseURL: BASE_URL,
      };

  return axios.create(options);
}
