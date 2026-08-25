import NextLink from 'next/link';
import { 
  BreadcrumbItem,
  BreadcrumbItemProps as ChakraBreadCrumbItemProps, 
  BreadcrumbLink,
  Box, 
} from '@chakra-ui/react';

interface BreadCrumbItemProps extends ChakraBreadCrumbItemProps {
  link: string | undefined;
  title?: string;
  isBlocked?: boolean
}

export function BreadCrumbItem({
  link,
  title,
  isBlocked,
  ...rest
}: BreadCrumbItemProps) {
  return (
    <>
      <BreadcrumbItem

      color="gray.300"
      fontSize={["sm", "md"]}
      {...(isBlocked ? {
        cursor: 'not-allowed',
      } : {})}
      {...rest}
      >
        <Box  
          {...(isBlocked ? {
            pointerEvents: "none"
          } : {})}
        >
          <NextLink href={link || '#'} passHref>
            <BreadcrumbLink>{title}</BreadcrumbLink>
          </NextLink>
        </Box>
      </BreadcrumbItem>
    </>
  );
}