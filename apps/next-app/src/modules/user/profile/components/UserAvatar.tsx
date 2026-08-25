import { Avatar, Box, useDisclosure, useToken } from '@chakra-ui/react';
import { MdPhotoCamera } from 'react-icons/md';

import { useAuth } from '@/hooks/useAuth';

import { UserAvatarModal } from './UserAvatarModal';

export function UserAvatar() {
  const { user } = useAuth();
  const userAvatarModal = useDisclosure();
  
  const [blackAlpha700]= useToken("colors", [
    'blackAlpha.700'
  ]);

  return (
    <>
      <Box
        as="button"
        onClick={userAvatarModal.onOpen}
        cursor="pointer"
        position="relative"
        border="3px solid"
        borderColor="pink.500"
        borderRadius="50%"
        p="2"
      >
        <Box
          h={180}
          w={180}
        >
          <Avatar
            w="100%"
            h="100%"
            bg="blackAlpha.600"
            src={user?.avatar_url || '/assets/gifs/defaultAvatar.gif'}
          />
        </Box>
        <MdPhotoCamera
          size="40"
          style={{
            position: 'absolute',
            right: '4px',
            bottom: '4px',
            background: blackAlpha700,
            borderRadius: "50%",
            padding: '4px',
          }}
        />
      </Box>
      <UserAvatarModal modal={userAvatarModal} />
    </>
  )
}