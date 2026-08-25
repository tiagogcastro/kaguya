import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { useAuth } from '@/hooks/useAuth';
import { 
  Box, 
  Flex, 
  Heading, 
  Highlight, 
  Link as ChakraLink, 
  Text
} from '@chakra-ui/react';
import Head from 'next/head';
import NextLink from 'next/link';

export default function TermsPage() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <Head>
        <title>Kaguya - Home</title>
      </Head>

      <Header
        headerType={isAuthenticated ? 'has-user-profile' : 'has-sign-log-buttons'}
      />

      <Flex
        maxW={780}
        mx="auto"
        mt="16"
        pb="16"
        px={["6", "8"]}
        flexDirection="column"
      >
        <Heading
          fontSize={["3xl", "5xl"]}
          maxW={480}
          mb={["12", "16"]}
        >
          <Highlight
            query={["Kaguya"]}
            styles={{
              color: "pink.500"
            }}
          >
            Termos e condições de uso da Kaguya
          </Highlight>
        </Heading>

        <Box
          mt={["8"]}
        >
          <Heading
            fontSize={["md", "lg", "2xl"]}
          >
            Como exercer seus direitos de titular de dados
          </Heading>
          <Text
            color="gray.300"
            fontSize={["xs", "sm", "md"]}
            mt="2"
          >
            Este artigo fornece algumas informações gerais sobre como entrar em contato com a Kaguya para exercer seus direitos de titular de dados de acordo com a lei aplicável. Se tiver alguma dúvida geral sobre privacidade ou proteção de dados na Kaguya, envie-nos um email.
          </Text>
        </Box>

        <Box
          mt={["8", "16"]}
        >
          <Heading
            fontSize={["md", "lg", "2xl"]}
          >
            Como desativar sua conta
          </Heading>
          <Text
            color="gray.300"
            fontSize={["xs", "sm", "md"]}
            mt="2"
          >
            <Highlight
              query={["entrar em contato conosco", "(me@kaguya.com.br)", "clicando aqui"]}
              styles={{
                color: "pink.500"
              }}
            >
              Ao desativar sua conta, seu perfil de usuário não será mais exibido na plataforma. Se, no futuro, você quiser reabrir uma conta desativada, precisará entrar em contato conosco via e-mail(me@kaguya.com.br).
            </Highlight>
          </Text>
          <Text
            color="gray.300"
            fontSize={["xs", "sm", "md"]}
            mt="2"
          >
            Você poderá desativar seu perfil seguindo algumas etapas a seguir: <br />
              1- Acessar a tela de <ChakraLink href="/login" color="pink.500">login</ChakraLink> e entrar em sua conta. <br />
              2- Acessar a aba de perfil. <br />
              3- Clicar no botão de desativar conta e confirmar a desativação. <br />
          </Text>
        </Box>

        <Box
          mt={["8", "16"]}
        >
          <Heading
            fontSize={["md", "lg", "2xl"]}
          >
            Exclusão da conta
          </Heading>
          <Text
            color="gray.300"
            fontSize={["xs", "sm", "md"]}
            mt="2"
          >
            <Highlight
              query={["Política de Privacidade"]}
              styles={{
                color: "pink.500"
              }}
            >
              Ao excluir sua conta, o encerramento permanente da sua conta da Kaguya não poderá ser revertido. Quando seu pedido de exclusão de conta for processado, suas informações pessoais serão excluídas permanentemente, exceto por algumas informações que podemos reter, conforme descrito na nossa Política de Privacidade. Isso significa que não poderemos mais fornecer nossos serviços a você e, se você decidir usar a Kaguya novamente no futuro, precisará criar uma conta nova.
            </Highlight>
          </Text>
        </Box>

        <Box
          mt={["8", "16"]}
        >
          <Heading
            fontSize={["md", "lg", "2xl"]}
          >
            Como excluir sua conta
          </Heading>
          <Text
            color="gray.300"
            fontSize={["xs", "sm", "md"]}
            mt="2"
          >
            Você poderá excluir seu perfil seguindo algumas etapas a seguir: <br />
            1- Acessar a tela de <ChakraLink href="/login" color="pink.500">login</ChakraLink> e entrar em sua conta. <br />
            2- Acessar a aba de perfil. <br />
            3- Clicar no botão de excluir conta e confirmar a exclusão. <br />
          </Text>
        </Box>

        <Box
          mt={["8", "16"]}
        >
          <Heading
            fontSize={["md", "lg", "2xl"]}
          >
            Acesso aos dados
          </Heading>
          <Text
            color="gray.300"
            fontSize={["xs", "sm", "md"]}
            mt="2"
          >
            Você sempre pode consultar as informações no seu perfil dentro da plataforma Kaguya.
          </Text>
        </Box>

        <Box
          mt={["8", "16"]}
        >
          <Heading
            fontSize={["md", "lg", "2xl"]}
          >
            Como solicitar uma cópia dos dados da conta que a Kaguya retém sobre você
          </Heading>
          <Text
            color="gray.300"
            fontSize={["xs", "sm", "md"]}
            mt="2"
          >
            Para baixar uma cópia de seus dados pessoais [em breve].
          </Text>
        </Box>

        <Box
          mt={["8", "16"]}
        >
          <Heading
            fontSize={["md", "lg", "2xl"]}
          >
            Direito à portabilidade
          </Heading>
          <Text
            color="gray.300"
            fontSize={["xs", "sm", "md"]}
            mt="2"
          >
            Em certas localidades, a lei aplicável pode permitir que você receba uma cópia das informações pessoais que forneceu a Kaguya. Se tiver permissão para exercer esse direito, você poderá solicitar certas informações pessoais em um formato estruturado, comumente usado e legível em máquina. Além disso, você pode solicitar que enviemos essas informações a outro provedor de serviços, quando viável tecnicamente.
          </Text>
        </Box>

        <Box
          mt={["8", "16"]}
        >
          <Heading
            fontSize={["md", "lg", "2xl"]}
          >
            Como exercer seu direito à portabilidade
          </Heading>
          <Text
            color="gray.300"
            fontSize={["xs", "sm", "md"]}
            mt="2"
          >
            Para baixar um arquivo com a cópia completa dos seus dados [em breve].
          </Text>
        </Box>

        <Box
          mt={["8", "16"]}
        >
          <Heading
            fontSize={["md", "lg", "2xl"]}
          >
            Como se opor ao processamento de alguns dos seus dados pessoais por parte da Kaguya para fins específicos
          </Heading>
          <Text
            color="gray.300"
            fontSize={["xs", "sm", "md"]}
            mt="2"
          >
            Caso seja permitido pelas leis da sua localidade, você pode solicitar que a Kaguya não processe suas informações pessoais para determinados fins específicos (incluindo análise de perfil) se esses processamentos se basearem em interesses legítimos. Se você se opuser a esse processamento, a Kaguya não processará mais suas informações pessoais para esses fins, a menos que possamos demonstrar motivos legítimos convincentes para tal processamento ou que esse processamento seja necessário para apresentar, exercer ou defender reinvindicações legais. <br />
            <Highlight
              query={["e-mail", "me@kaguya.com.br"]}
              styles={{
                color: "pink.500"
              }}
            >
              Você pode exercer seus direitos de se opor ao processamento enviando um e-mail para me@kaguya.com.br.
            </Highlight>
          </Text>
        </Box>
      </Flex>

      <Footer />
    </>
  )
}