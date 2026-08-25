import { GetServerSidePropsContext } from 'next';
import axios from 'axios';
import { parseCookies } from 'nookies';

export const tokenCookieKey = 'kaguyaApp.token';

export function setupAPIClient(ctx: GetServerSidePropsContext | undefined = undefined) {
  let cookies = parseCookies(ctx);
  
  const baseURL = 
    process.env.NODE_ENV === 'production' ? (
      process.env.KAGUYA_API_BASE_URL ? 
      process.env.KAGUYA_API_BASE_URL :
      'https://api.kaguya.com.br'
    ) : 'http://localhost:3333';
  
  const kaguyaApi = axios.create({
    baseURL,
  });
  
  kaguyaApi.defaults.headers.common.Authorization = `Bearer ${cookies[tokenCookieKey]}`;

  return kaguyaApi;
}