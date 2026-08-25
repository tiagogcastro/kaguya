import Head from 'next/head';
import { 
  Flex,
} from '@chakra-ui/react';
import { GetServerSideProps } from 'next';

import { UserAvatar, UpdateUserForm, DisableOrRemoveAccount } from '@/modules/user/profile/components';

import { Header } from '@/components/Header';

import { useAuth } from '@/hooks/useAuth';

import { withSSRAuth } from '@/utils/withSSRAuth';
import { DividerLine } from '@/components/DividerLine';
import { Loading } from '@/components/Loading';

export default function UserProfile() {
  const { user } = useAuth();

  if(!user || !user.enabled) {
    return (
      <>
        <Loading />
      </>
    )
  }

  return (
    <>
      <Head>
        <title>Kaguya - Perfil</title>
      </Head>

      <Header
        headerType={'has-user-profile'}
      />

      <Flex
        flexDirection="column"
        h="calc(100vh - 80px)"
        alignItems="center"
        justifyContent="center"
        mx="4"
      >
        <Flex
          as="main"
          alignItems="center"
          justifyContent="center"
          mx="auto"
          maxW={480}
          w="100%"
          py="4"
          borderRadius="md"
          bg="blackAlpha.700"
        >
          <Flex
            alignItems="center"
            flexDir="column"
            borderRadius="md"
            w="100%"
            mx="auto"
            px="4"
          >
            <UserAvatar />
            <UpdateUserForm />

            <DividerLine />

           <DisableOrRemoveAccount />
          </Flex>
        </Flex>
      </Flex>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(async () => {
  return {
    props: {}
  }
})