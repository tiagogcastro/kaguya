import { AppLogo } from '@/components/AppLogo';
import { 
  Flex, 
  Heading, 
  useMediaQuery
} from '@chakra-ui/react';

export function PageHeading() {
  const [ isLargerThan880 ] = useMediaQuery('(min-width: 880px)');

  return (
    <>
      <Flex
        flexDirection="column"
        justifyContent="center"
        alignItems={!isLargerThan880 ? "center" : "flex-start"}
        width="100%"
        maxW={!isLargerThan880 ? 460 : 'max'}
      >
        <AppLogo 
          iconprops={{
            w: ["8", "12", "16"]
          }}
          textProps={{
            fontSize: ["2xl", "3xl", "4xl"],
            color:"gray.300",
          }}
        />
        <Heading
          fontSize={["3xl", "4xl", "4xl", "6xl"]}
          maxW="xs"
          mt={!isLargerThan880 ? "4" : "8"}
          color="gray.300"
          textAlign={!isLargerThan880 ? "center" : "left"}
        >
          Logar na plataforma
        </Heading>
      </Flex>
    </>
  )
}