import { GetServerSidePropsContext } from 'next';
import axios from 'axios';
import { parseCookies } from 'nookies';

export const tokenCookieKey = 'kaguyaApp.token';

export function setupAPIClient(ctx: GetServerSidePropsContext | undefined = undefined) {
  let cookies = parseCookies(ctx);

  const baseURL =
    process.env.NEXT_PUBLIC_KAGUYA_API_BASE_URL || 'http://localhost:3333';

  const kaguyaApi = axios.create({
    baseURL,
  });

  kaguyaApi.defaults.headers.common.Authorization = `Bearer ${cookies[tokenCookieKey]}`;

  return kaguyaApi;
}
