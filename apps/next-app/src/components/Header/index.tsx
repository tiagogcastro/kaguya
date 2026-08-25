import {
  Flex,
  useBreakpointValue,
  useToken
} from '@chakra-ui/react';
import { useMemo } from 'react';
import { AppLogo } from '../AppLogo';
import { SignLogButtons } from './SignLogButtons';
import { UserProfile } from './UserProfile';

type HeaderTypes = 'has-user-profile' | 'has-sign-log-buttons'

export interface HeaderProps {
  headerType?: HeaderTypes | HeaderTypes[];
}

export function Header({
  headerType,
}: HeaderProps) {
  const isWideVersion = useBreakpointValue({
    base: false,
    md: true,
  });
  const [blackAlpha900, blackAlpha700] = useToken('colors', ['blackAlpha.900','blackAlpha.700'])

  const selectedElements = useMemo(() => {
    const types = (typeof headerType === 'string' ? [headerType] : headerType) || []
    
    const elements: Record<HeaderTypes, JSX.Element> = {
      'has-sign-log-buttons': <SignLogButtons key={1} />,
      'has-user-profile': <UserProfile key={2} isWideVersion={isWideVersion} />
    }

    const entries = Object.entries(elements) as [HeaderTypes, JSX.Element][];

    const filteredElements = entries.reduce((previous, entry, index) => {
      const [type, element] = entry

      const isSelectedElement = types.find(findType => findType === type)

      if(isSelectedElement) {
        return [...previous, element]
      }

      return [...previous]
    }, [] as JSX.Element[])

    return filteredElements
  }, [headerType, isWideVersion])

  return (
    <>
      <Flex
        as="header"
        background={`-webkit-gradient(
          linear, 0 0, 100% 0, 
          from(${blackAlpha900}), 
          to(${blackAlpha900}), 
          color-stop(0.5, ${blackAlpha700})
        )`}
        mx="auto"
        maxW={1480}
        w="100%"
      >
        <Flex
          alignItems="center"
          maxWidth={1480}
          flexWrap="wrap"
          gap="4"
          width="100%"
          px={["4", "6", "8"]}
          py="4"
          mx="auto"
        >
          <AppLogo />
          {selectedElements}
        </Flex>        
      </Flex>
    </>
  );
}