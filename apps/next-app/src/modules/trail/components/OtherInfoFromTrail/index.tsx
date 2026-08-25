import { Box, useBreakpointValue } from "@chakra-ui/react";

import { DiscordComunityInfo } from "../DiscordComunityInfo";
import { DividerLine } from "../../../../components/DividerLine";
import { OtherInfoFromTrailHeader } from "./Header";
import { TrailData } from "@/services/kaguya/types";
import { TrailStudentsCount } from "./TrailStudensCount";

export interface OtherTrailInfoProps {
  trail?: TrailData;
}

export function OtherInfoFromTrail({ trail }: OtherTrailInfoProps) {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <>
      <Box
        bg="blackAlpha.800"
        p={["4", "6", "8"]}
        borderRadius="md"
        mt={["0", "8"]}
        mb={isWideVersion ? "12" : "0"}
        maxW="max"
        h="max"
      >
        <OtherInfoFromTrailHeader trail={trail} />
        <TrailStudentsCount trail={trail} />

        <DividerLine />

        <DiscordComunityInfo />
      </Box>
    </>
  );
}
