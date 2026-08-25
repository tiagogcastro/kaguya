import type { AppProps } from "next/app";
import { AuthProvider } from "@/contexts/AuthContext";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { TrailProvider } from "@/contexts/TrailContext";
import { queryClient } from "@/services/reactQueryClient";
import { theme } from "@/styles/theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TrailProvider>
            <ChakraProvider theme={theme}>
              <Component {...pageProps} />
            </ChakraProvider>
          </TrailProvider>
        </AuthProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
