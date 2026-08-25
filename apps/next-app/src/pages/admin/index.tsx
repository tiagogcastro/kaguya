import {
  Box,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import Head from 'next/head';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { Header } from '@/components/Header';
import { CreateContentForms } from '@/modules/admin/components/CreateContentForms';
import { TrailsManagerList } from '@/modules/admin/components/TrailsManagerList';
import { UsersTable } from '@/modules/admin/components/UsersTable';
import { useAuth } from '@/hooks/useAuth';
import { withSSRAuth } from '@/utils/withSSRAuth';

export default function AdminPage() {
  const { isStaff, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && !isStaff) {
      router.push('/dashboard');
    }
  }, [isStaff, user, router]);

  return (
    <>
      <Head>
        <title>Kaguya | Painel administrativo</title>
      </Head>
      <Header />
      <Box as="main" p={['4', '6', '8']}>
        <Heading fontSize={['xl', '2xl']} color="gray.100" mb="6">
          Painel administrativo
        </Heading>

        <Tabs colorScheme="pink" variant="enclosed">
          <TabList>
            <Tab>Conteúdo</Tab>
            <Tab>Usuários</Tab>
          </TabList>
          <TabPanels>
            <TabPanel px="0">
              <Box
                display="grid"
                gridTemplateColumns={['1fr', null, '420px 1fr']}
                gap="8"
                alignItems="start"
              >
                <CreateContentForms />
                <TrailsManagerList />
              </Box>
            </TabPanel>
            <TabPanel px="0">
              <UsersTable />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
}

export const getServerSideProps = withSSRAuth(async () => {
  return {
    props: {},
  };
});
