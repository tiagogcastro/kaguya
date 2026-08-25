import { Box, Skeleton, useMediaQuery } from '@chakra-ui/react';

export function TrailSkeletonLoading() {
  const [isLargerThan1480] = useMediaQuery('(min-width: 1480px)');

  return (
    <>
      <Box
        w="100%"
        maxW={1480}
        mx="auto"
        px="6"
      >
        <Skeleton  
          height= "70px"

          endColor="blackAlpha.700" 
          startColor="blackAlpha.600" 
        />
      </Box>
      <Box
        maxW={1480}
        w="100%"
        flexDirection={"column"}

        mt="16"
        pb="16"
        mx={["auto"]}
      >
        <Box
          mx={["6"]}
        >
          <Skeleton  
            borderRadius="md"                    
            height= "16px"
            w="100%"
            maxW="xs"
            endColor="blackAlpha.700" 
            startColor="blackAlpha.600" 
          />
          
          <Box
            mt="12"
          >
            <Skeleton  
              borderRadius="md"                    
              height= "280px"
              maxW="100%"
              endColor="blackAlpha.700" 
              startColor="blackAlpha.600" 
            />
            <Skeleton  
              borderRadius="md"                    
              height= "84px"
              maxW="lg"
              mt="6"
              endColor="blackAlpha.700" 
              startColor="blackAlpha.600" 
            />
          </Box>

          <Box
            display="flex"
            flexDirection={isLargerThan1480 ? "row" : "column-reverse"}
            gap="16"
            justifyContent="space-between"
            mt="16"
          >
            <Box
              w="100%"
              maxW="3xl"
            >
              <Skeleton  
                borderRadius="md"                    
                height= "32px"
                maxW="xs"
                mb="6"
                endColor="blackAlpha.700" 
                startColor="blackAlpha.600" 
              />

              <Box>
                <Skeleton  
                  borderRadius="md"                    
                  height= "220px"
                  maxW="5xl"
                  endColor="blackAlpha.700" 
                  startColor="blackAlpha.600" 
                />
                <Skeleton  
                  borderRadius="md"                    
                  height= "220px"
                  maxW="5xl"
                  mt="6"
                  endColor="blackAlpha.700" 
                  startColor="blackAlpha.600" 
                />
              </Box>
            </Box>
            
            <Skeleton  
              borderRadius="md"                    
              height= "380px"
              w="100%"
              maxW={!isLargerThan1480 ? "lg" : "lg"}
              endColor="blackAlpha.700" 
              startColor="blackAlpha.600" 
            />
          </Box>
        </Box>
      </Box>
    </>
  )
}