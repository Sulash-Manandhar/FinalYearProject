import { ChakraProvider } from "@chakra-ui/react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import RouterList from "@src/router/RouterList";

const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <RouterList />
      </ChakraProvider>
    </QueryClientProvider>
  );
};

export default App;
