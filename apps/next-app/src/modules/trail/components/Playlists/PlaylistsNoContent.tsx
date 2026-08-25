import { Flex, Text } from '@chakra-ui/react';
import Lordicon from '../../../../components/ReactLordicon';

export function PlaylistsNoContent() {
  return (
    <>
      <Flex
        my="16"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Lordicon
          size={120}
          icon='spaFlower'
          delay={3000}
          colors={{
            primary: "#fff",
            secondary: "#fff",
          }}
        />
        <Text
          textAlign="center"
          color="gray.300"
          mt="4"
        >
          Aguarde a criação de novas playlists
        </Text>
      </Flex>
    </>
  );
}
