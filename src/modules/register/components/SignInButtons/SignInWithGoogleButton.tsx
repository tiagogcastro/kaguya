import { Button } from '@/components/Button';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from "@chakra-ui/react";
import { firebaseAuth, getProvider } from 'config/firebase';
import { signInWithPopup } from 'firebase/auth';
import { FcGoogle } from 'react-icons/fc';
export function SignInWithGoogleButton() {
  const { signIn } = useAuth()
  const toast = useToast()
  const handleGoogleLogin = async  () => {
    try {
      const result = await signInWithPopup(firebaseAuth, getProvider('google'))
  
      const user = result.user;
      
      signIn({
        access_token: await user.getIdToken()
      })
    } catch {
      toast({
        title: "Falha no processo de autenticação",
        description: 'Tente novamente mais tarde!',
        status: "error",
        duration: 6000,
        isClosable: true,
        position: "top-right",
      });
    }
  }
  return (
    <>
      <Button w="100%" type="button" onClick={handleGoogleLogin}>
        <FcGoogle />
        Entrar com a Google
      </Button>
    </>
  )
}