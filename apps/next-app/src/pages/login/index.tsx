import { 
  Flex, 
  ScaleFade, 
  useMediaQuery,
} from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';

import { withSSRGuest } from 'utils/withSSRGuest';

import { FormContainer, PageHeading } from '@/modules/login/components';

export default function UserLogin() {
  const [ isLargerThan880 ] = useMediaQuery('(min-width: 880px)');

  return (
    <>
      <Head>
        <title>Kaguya | Logar na plataforma</title>
      </Head>

      <Flex
        h="100vh"
        flexDirection="column"
      >
        <Flex
          as="main"
          alignItems="center"
          justifyContent="center"
          flex="1 1 0%"
          px="4"
          my="16"
          mx="4"
        >
          <Flex
            alignItems={!isLargerThan880 ? "center" : "flex-start"}
            justifyContent="center"
            gap={!isLargerThan880 ? "4" : "2"}
            flexDirection={!isLargerThan880 ? "column" : "row"}
            width="100%"
            maxW="1280px"
          >
            <PageHeading />
            <ScaleFade 
              style={{
                maxWidth: 460,
                width: "100%",
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                height: '100%',
              }}
              initialScale={0.9} 
              in
            >
              <FormContainer />
            </ScaleFade>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = withSSRGuest(async () => {
  return {
    props: {}
  }
})