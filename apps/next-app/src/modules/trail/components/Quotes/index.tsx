import { Quote } from '@/services/quotes';
import { Flex, useBreakpointValue } from '@chakra-ui/react';
import { useMemo } from 'react';

import Lordicon from '@/components/ReactLordicon';

import { Author } from '@/modules/trail/components/Quotes/Author';
import { Description } from '@/modules/trail/components/Quotes/Description';


type QuotesProps = {
  quote: Quote
}

export function Quotes({ quote }: QuotesProps) {
  const isWideVersion = useBreakpointValue({ 
    base: false,
    "lg": true
  });

  return (
    <>
      <Flex
        alignItems="flex-end"
        mx={["4"]}
        mb="8"
        gap="4"
      >
        <Lordicon 
          size={isWideVersion ? 70 : 48} 
          icon='book' 
          colors={{
            primary: '#a90f64',
            secondary: '#fff'
          }} 
          trigger='loop' 
          delay={3000} 
        />
        <Flex
          flexDirection="column"
          mt="8"
        >
          <Description description={quote.quote} />
          <Author
            referenceLink={quote.wikipedia}
            authorName={quote.philosopher}
            isWideVersion={isWideVersion}
          />
        </Flex>
      </Flex>
    </>
  );
}
