import { destroyCookie, parseCookies } from 'nookies';
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

import { tokenCookieKey, setupAPIClient } from '@/services/kaguya/api';

export function withSSRAuth<P extends { [key: string]: any; }>(fn: GetServerSideProps<P>) {
  return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx);
    const token = cookies[tokenCookieKey];

    if(!token) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      }
    }

    const kaguyaApi = setupAPIClient(ctx);

    try {
      await kaguyaApi.post('/users/tokens/validate-token');
    } catch {
      destroyCookie(ctx, tokenCookieKey);

      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      }
    }

    try {
      return await fn(ctx);
    } catch (error) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        }
      }
    }
  }
}
