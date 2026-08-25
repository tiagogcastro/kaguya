import { Box, ChakraProps, keyframes, Text, useToken } from "@chakra-ui/react"

export type SquareLoadingProps = {} & ChakraProps

const animate1 = keyframes`
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
`

const animate2 = keyframes`
  0% {
    top: -100%;
  }
  100% {
    top: 100%;
  }
`

const animate3 = keyframes`
  0% {
    left: 100%;
  }
  100% {
    left: -100%;
  }
`
const animate4 = keyframes`
  0% {
    top: 100%;
  }
  100% {
    top: -100%;
  }
`

export const SquareLoading: React.FC<ChakraProps> = (props) => {
  const [pink800] = useToken('colors', ['pink.800'])
  return (
    <Box overflow="hidden" position="relative" w="50px" h="50px"  {...props}>
      <Text
        position="absolute"
        as="span"
        animation={`${animate1}
        0.5s
        linear
        infinite`}
        background={`linear-gradient(to right, transparent, ${pink800})`}
        zIndex={1} 
        top="0"
        left="-100%"
        height="30%"
        width="100%"
      />
      <Text
        position="absolute"
        as="span"
        animation={`${animate2}
        0.5s
        linear
        infinite
        0.25s`}
        background={`linear-gradient(to bottom, transparent, ${pink800})`}
        zIndex={2} 
        top="-100%"
        right="0"
        height="100%"
        width="30%"
      />
      <Text
        position="absolute"
        as="span"
        animation={`${animate3}
        0.5s
        linear
        infinite
        .5s`}
        background={`linear-gradient(to left, transparent, ${pink800})`}
        zIndex={3} 
        bottom="0"
        left="100%"
        height="30%"
        width="100%"
      />
      <Text
        position="absolute"
        as="span"
        animation={`${animate4}
        0.5s
        linear
        infinite
        .75s`}
        background={`linear-gradient(to top, transparent, ${pink800})`}
        zIndex={4} 
        top="100%"
        left="0"
        height="100%"
        width="30%"
      />
    </Box>
  )
}