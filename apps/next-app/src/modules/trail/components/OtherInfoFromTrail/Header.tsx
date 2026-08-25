import { Flex, Heading, Image } from "@chakra-ui/react";

import { TrailData } from "@/services/kaguya/types";

export interface OtherInfoFromTrailHeaderProps {
  trail?: TrailData;
}

export function OtherInfoFromTrailHeader({
  trail,
}: OtherInfoFromTrailHeaderProps) {
  return (
    <>
      <Flex alignItems="center" gap="4">
        <Image
          src={trail?.avatar_url || "/assets/gifs/defaultAvatar.gif"}
          alt={`Avatar da trilha de ${trail?.name}`}
          w={["16", "20", "24"]}
          h={["16", "20", "24"]}
        />
        <Heading fontSize={["md", "lg", "2xl"]} letterSpacing="wider">
          Informações da trilha
        </Heading>
      </Flex>
    </>
  );
}
