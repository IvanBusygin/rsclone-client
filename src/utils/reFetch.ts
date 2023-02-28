import { LS_ACCESS_TOKEN } from './constants';

export default async (url: string, method: string, data?: object) => {
  const accessToken = JSON.parse(localStorage.getItem(LS_ACCESS_TOKEN) ?? '');
  return fetch(url, {
    method,
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` },
    credentials: 'include',
  });
};
