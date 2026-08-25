import { Link } from '@chakra-ui/react';
import Lordicon from '../../../../components/ReactLordicon';

export interface AuthorProps {
  authorName: string;
  referenceLink?: string;
  isWideVersion?: boolean;
}

export function Author({
  authorName,
  referenceLink,
  isWideVersion
}: AuthorProps) {
  return (
    <>
      <Link
        href={referenceLink}
        fontSize={["xs", "sm", "md"]}
        fontWeight="bold"
        letterSpacing="wider"
        display="flex"
        alignItems="center"
        isExternal
        gap="1"
        _hover={{
          textDecoration:"none"
        }}
      >
        - {authorName}
        <Lordicon
          size={!isWideVersion ? 32 : 40}
          icon='share'
          trigger='loop'
          colors={{
            primary: "#9a9ea3",
            secondary: "#9a9ea3",
          }}
          delay={3000}
        />
      </Link>
    </>
  )
}