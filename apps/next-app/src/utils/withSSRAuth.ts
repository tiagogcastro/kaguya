import { destroyCookie, parseCookies } from 'nookies';
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

import { tokenCookieKey } from '@/services/kaguya/api';
import { setupAPIClient } from '@/services/kaguya/api';

export function withSSRAuth<P extends { [key: string]: any; }>(fn: GetServerSideProps<P>) {
  return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx);
    const kaguyaApi = setupAPIClient(ctx);
 
    const response = await kaguyaApi.post('/users/tokens/validate-token');

    if(!response.data.validated) {
      destroyCookie(ctx, tokenCookieKey);
      
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      }
    }

    const token = cookies[tokenCookieKey];

    if(!token) {
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