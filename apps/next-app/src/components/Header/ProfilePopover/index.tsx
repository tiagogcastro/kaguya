import {
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
} from "@chakra-ui/react";
import { FiLogOut } from "react-icons/fi";
import { MdDashboard } from "react-icons/md";

import { ItemLink } from "./ItemLink";
import { DividerLine } from "@/components/DividerLine";
import { ConfirmSignOutModal } from "./ConfirmSignOutModal";
import { ButtonItem } from "./ButtonItem";
import { IoNewspaperOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa";

export interface ProfilePopover {
  children?: React.ReactNode;
  isWideVersion?: boolean;
}

export function ProfilePopover({ children, isWideVersion }: ProfilePopover) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Popover placement="bottom-end">
        <PopoverTrigger>{children}</PopoverTrigger>
        <PopoverContent
          bg="blackAlpha.700"
          border="none"
          maxW="max"
          mr={!isWideVersion ? "4" : "0"}
        >
          <PopoverBody
            p="0"
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            outline="0"
          >
            <ItemLink
              nextLink={{
                href: "/dashboard",
                passHref: true,
              }}
            >
              <MdDashboard size={18} />
              Dashboard
            </ItemLink>
            <ItemLink
              nextLink={{
                href: "/suggestions",
                passHref: true,
              }}
            >
              <IoNewspaperOutline size={18} />
              Sugestões
            </ItemLink>

            <DividerLine my="1" />

            <ItemLink
              nextLink={{
                href: "/user/profile",
                passHref: true,
              }}
            >
              <FaUser size={18} />
              Meu Perfil
            </ItemLink>

            <ButtonItem onClick={onOpen}>
              <FiLogOut size={18} />
              Sair da conta
            </ButtonItem>
          </PopoverBody>
        </PopoverContent>
      </Popover>
      <ConfirmSignOutModal
        modal={{
          isOpen,
          onClose,
        }}
      />
    </>
  );
}
