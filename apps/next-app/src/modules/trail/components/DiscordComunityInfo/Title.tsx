import { Heading } from '@chakra-ui/react';
import Lordicon from '../../../../components/ReactLordicon';

export function DiscordComunityTitle() {
  return (
    <>
      <Heading
        fontSize={["lg", "2xl"]}
        letterSpacing="wider"
        display="flex"
        gap="2"
        alignItems="center"
      >
        Comunidade
        <Lordicon
          size={40}
          icon='confetti'
          trigger='loop'
          delay={3000}
        />
      </Heading>
    </>
  )
}