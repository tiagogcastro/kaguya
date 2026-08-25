import { Button } from '@/components/Button';
import { AiFillGithub } from 'react-icons/ai';

export function SignInWithGithubButton() {
  return (
    <>
      <Button w="100%" type="button" disabled>
        <AiFillGithub />
        Entrar com o Github
      </Button>
    </>
  )
}