import {
  AiFillDislike,
  AiFillLike,
  AiOutlineDislike,
  AiOutlineLike,
} from "react-icons/ai";
import { ChakraProps, Flex, Text, useToast, useToken } from "@chakra-ui/react";
import {
  LikeDislikeState,
  changeLikeDislikeState,
} from "@/utils/changeLikeDislikeState";

import { Button } from "@/components/Button";
import { LessonData } from "@/services/kaguya/types";
import { apiError } from "@/utils/apiFormatError";
import { kaguyaApi } from "@/services/kaguya/apiClient";
import { queryClient } from "@/services/reactQueryClient";

type LessonVideoLikesDislikesProps = {
  lesson?: LessonData;
};

export function LessonVideoLikesDislikes({
  lesson,
}: LessonVideoLikesDislikesProps) {
  const toast = useToast();
  const [pink500] = useToken("colors", ["pink.500"]);

  const commonButtonStyle: ChakraProps = {
    bg: "none",
    _hover: {
      bg: "none",
    },
    fontSize: ["md"],
    fontWeight: "normal",
    py: ["0"],
    _active: {
      bg: "blackAlpha.600",
    },
  };

  async function changeLikeDislikeStateLesson(
    state: "none" | "like" | "dislike"
  ) {
    const states: Record<string, LikeDislikeState> = {
      like: "liked",
      dislike: "disliked",
      none: "none",
    };

    try {
      queryClient.setQueryData<LessonData | undefined>(
        ["showLesson", lesson?.slug],
        (data) => {
          if (data) {
            const newCountValues = changeLikeDislikeState({
              prevState: data.state,
              nextState: states[state],
              dislikes: data?._count?.dislikes || 0,
              likes: data?._count?.likes || 0,
            });

            return {
              ...data,
              state: states[state],
              ...(data._count
                ? {
                    _count: {
                      ...data._count,
                      ...newCountValues,
                    },
                  }
                : {}),
            };
          }
        }
      );

      await kaguyaApi.post("/likes", {
        lesson_id: lesson?.id,
        state,
      });
    } catch (error: any) {
      const errors = apiError(error);

      errors.messages.forEach((messageError) => {
        toast({
          title: "Erro ao reagir à aula",
          description: messageError,
          status: "error",
          duration: 6000,
          isClosable: true,
          position: "top-right",
        });
      });
    }
  }

  return (
    <>
      <Flex>
        {lesson?.state === "liked" ? (
          <Button
            {...commonButtonStyle}
            onClick={() => changeLikeDislikeStateLesson("none")}
          >
            <AiFillLike size={20} color={pink500} />
            <Text>{lesson?._count?.likes || 0}</Text>
          </Button>
        ) : (
          <Button
            {...commonButtonStyle}
            onClick={() => changeLikeDislikeStateLesson("like")}
          >
            <AiOutlineLike size={20} />
            <Text>{lesson?._count?.likes || 0}</Text>
          </Button>
        )}

        {lesson?.state === "disliked" ? (
          <Button
            {...commonButtonStyle}
            onClick={() => changeLikeDislikeStateLesson("none")}
          >
            <AiFillDislike size={20} color={pink500} />
            <Text>{lesson?._count?.dislikes || 0}</Text>
          </Button>
        ) : (
          <Button
            {...commonButtonStyle}
            onClick={() => changeLikeDislikeStateLesson("dislike")}
          >
            <AiOutlineDislike size={20} />
            <Text>{lesson?._count?.dislikes || 0}</Text>
          </Button>
        )}
      </Flex>
    </>
  );
}
