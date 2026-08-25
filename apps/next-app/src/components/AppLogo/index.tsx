import {
  Box,
  ChakraProps,
  Link as ChakraLink, Text, useToken
} from '@chakra-ui/react';
import NextLink from 'next/link';
import Lordicon from '../ReactLordicon';

interface AppLogoProps {
  iconprops?: ChakraProps;
  textProps?: ChakraProps;
}

export function AppLogo({
  iconprops,
  textProps
}: AppLogoProps) {
  const [pink800, white]= useToken("colors", ['pink.800', 'white'])
  
  return (
    <>
       <NextLink href="/dashboard">
        <ChakraLink
          cursor="pointer"
          display="flex"
          alignItems="center"
          gap="2"
          _hover={{
            textDecoration: "none"
          }}
        >
          <Box
            w={["8", "12"]}
            {...iconprops}
          >
            <Lordicon
              size={"100%"}
              icon='nightSky'
              colors={{
                primary: white,
                secondary: pink800
              }}
              trigger='loop'
              delay={3000}
            />
          </Box>
          <Text
            fontWeight="bold"
            fontSize={["md", "2xl"]}
            {...textProps}
          >
            Kaguya
          </Text>
        </ChakraLink>
      </NextLink>
    </>
  )
}