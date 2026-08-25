import { ChakraProps, Flex } from "@chakra-ui/react"
import Head from "next/head"
import { SquareLoading } from "./SquareLoading"

export const Loading: React.FC<ChakraProps> = (props) => {
  return (
    <>
      <Head>
        <title>Kaguya | Carregando...</title>
      </Head>

      <Flex
        h="100vh"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        <SquareLoading w="60px" h="60px" {...props} />
      </Flex>
    </>
  )
}