import { Box, Flex, Skeleton } from '@chakra-ui/react';

export function BlocksSkeletonLoading() {
  return (
    <>
      <Flex
        flexDirection="column"
        w="100%"
        gap="4"
        maxH="600px"
      >
        <Box>
          <Skeleton  
            borderRadius="md"                    
            width="100%"
            height= "80px" 
            endColor="blackAlpha.700" 
            startColor="blackAlpha.600" 
          />
          <Flex
            mt="2"
            flexDirection="column"
            gap="2"
          >
            <Skeleton  
              borderRadius="md"                    
              height= "16px"
              ml="8"
              mr="24"
              endColor="blackAlpha.700" 
              startColor="blackAlpha.600" 
            />
            <Skeleton  
              borderRadius="md"                    
              height= "16px"
              ml="8"
              mr="8"
              endColor="blackAlpha.700" 
              startColor="blackAlpha.600" 
            />
            <Skeleton  
              borderRadius="md"                    
              height= "16px"
              ml="8"
              mr="16"
              endColor="blackAlpha.700" 
              startColor="blackAlpha.600" 
            />
            <Skeleton  
              borderRadius="md"                    
              height= "16px"
              ml="8"
              mr="32"
              endColor="blackAlpha.700" 
              startColor="blackAlpha.600" 
            />
          </Flex>
        </Box>

        <Box>
          <Skeleton  
            borderRadius="md"                    
            width="100%"
            height= "80px" 
            endColor="blackAlpha.700" 
            startColor="blackAlpha.600" 
          />
          <Flex
            mt="2"
            flexDirection="column"
            gap="2"
          >
            <Skeleton  
              borderRadius="md"                    
              height= "16px"
              ml="8"
              mr="56"
              endColor="blackAlpha.700" 
              startColor="blackAlpha.600" 
            />
            <Skeleton  
              borderRadius="md"                    
              height= "16px"
              ml="8"
              mr="32"
              endColor="blackAlpha.700" 
              startColor="blackAlpha.600" 
            />
            <Skeleton  
              borderRadius="md"                    
              height= "16px"
              ml="8"
              mr="12"
              endColor="blackAlpha.700" 
              startColor="blackAlpha.600" 
            />
            <Skeleton  
              borderRadius="md"                    
              height= "16px"
              ml="8"
              mr="28"
              endColor="blackAlpha.700" 
              startColor="blackAlpha.600" 
            />
          </Flex>
        </Box>
      </Flex>
    </>
  )
}