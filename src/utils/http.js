import axios from 'axios';
export const BASE_URL = 'https://task-master-server-task-master-server.up.railway.app';

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
