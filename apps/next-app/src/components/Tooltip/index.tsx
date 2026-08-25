import { ChakraProps, Tooltip as ChakraTooltip, TooltipProps as ChakraTooltipProps } from "@chakra-ui/react"
import { FC, PropsWithChildren, useRef } from "react"
import { TooltipTrigger } from "./TooltipTrigger"

type TooltipProps = ChakraProps & PropsWithChildren  & ChakraTooltipProps

export const Tooltip: FC<TooltipProps> = ({ children, ...rest }) => {
  const tooltipTriggerRef = useRef(null)

  return (
    <ChakraTooltip
      borderRadius="md"
      hasArrow
      px="4"
      backgroundColor="blackAlpha.600"
      py="2"
      {...rest}
    >
      <TooltipTrigger ref={tooltipTriggerRef}>
        {children}
      </TooltipTrigger>
    </ChakraTooltip>
  )
}