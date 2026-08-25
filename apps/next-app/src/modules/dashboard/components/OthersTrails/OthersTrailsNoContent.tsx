import { Flex, Text, useMediaQuery } from '@chakra-ui/react';
import Lordicon from '../../../../components/ReactLordicon';

export function OthersTrailsNoContent() {
  const [isLargerThan1536] = useMediaQuery('(min-width: 1536px)');

  return (
    <>
      <Flex
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        my="6"
        h={!isLargerThan1536 ? "auto" : "100vh"}
      >
        <Lordicon
          size={80}
          icon='clock'
          delay={3000}
          colors={{
            primary: "#9a9ea3",
            secondary: "#9a9ea3",
          }}
        />
        <Text
          color="gray.300"
          mt="4"
        >
          Aguarde a criação de novas trilhas
        </Text>
      </Flex>
    </>
  );
}