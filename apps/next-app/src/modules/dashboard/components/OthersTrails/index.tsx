import {
  CircularProgress,
  Flex,
  Heading,
  keyframes,
  useToken,
} from "@chakra-ui/react";

import { DividerLine } from "@/components/DividerLine";
import { OthersTrailsNoContent } from "./OthersTrailsNoContent";
import { Trail } from "./Trail";
import { TrailData } from "@/services/kaguya/types";
import { kaguyaApi } from "@/services/kaguya/apiClient";
import { useQuery } from "react-query";

const animate = keyframes`
  from {  
    opacity: 0;
    transform: translateX(100px);
  }
  to {  
    opacity: 1;
    transform: translateX(0);
  }
`;

export function OthersTrails() {
  const [blackAlpha900, blackAlpha850] = useToken("colors", [
    "blackAlpha.900",
    "blackAlpha.850",
  ]);

  const { data, isFetching } = useQuery<TrailData[]>(
    "othersTrails",
    async () => {
      const response = await kaguyaApi.get<TrailData[]>("/trails/list-all", {
        params: {
          take: 10,
          exclude_my_trails: true,
        },
      });

      return response.data;
    },
    {}
  );

  return (
    <>
      <Flex
        animation={`${animate} 0.6s ease`}
        borderRadius={"lg"}
        bg={`linear-gradient(to right, ${blackAlpha850}, ${blackAlpha900})`}
        flexDirection="column"
        flex="1"
        // calc(tela - tamanho do header)
        h="calc(100vh - 80px)"
        p={["4", "6", "8"]}
      >
        <Heading
          fontSize={["md", "lg", "2xl"]}
          mb="4"
          gap="2"
          display="flex"
          alignItems="center"
        >
          Outras trilhas
          {isFetching && (
            <CircularProgress isIndeterminate color="pink.800" size={6} />
          )}
        </Heading>

        <DividerLine />
        {!data?.length ? (
          <OthersTrailsNoContent />
        ) : (
          <Flex
            flexDirection="column"
            gap="4"
            w="100%"
            mt="8"
            overflowY="auto"
            px="2"
            pb="8"
          >
            {data &&
              data.map((trail) => <Trail key={trail.id} trail={trail} />)}
          </Flex>
        )}
      </Flex>
    </>
  );
}
