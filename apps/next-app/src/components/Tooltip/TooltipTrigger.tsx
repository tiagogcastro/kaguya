import { Box, ChakraProps } from "@chakra-ui/react"
import { forwardRef } from "react"
import { ForwardRefRenderFunction, PropsWithChildren } from "react"

type TooltipTriggerProps = ChakraProps & PropsWithChildren 

const TooltipTriggerFRRF: ForwardRefRenderFunction<HTMLDivElement, TooltipTriggerProps> = ({ children, ...rest }, ref) => (  
  <Box as="div" ref={ref} {...rest}>    
    {children}
  </Box>
)

const TooltipTrigger = forwardRef(TooltipTriggerFRRF)

export { TooltipTrigger }