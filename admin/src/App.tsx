import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ChakraProvider } from "@chakra-ui/react";
import RouterList from "./routerList/RouterList";

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
