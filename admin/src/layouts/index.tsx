import { Box, Flex } from "@chakra-ui/react";
import Sidebar from "@src/components/Sidebar";
import { Outlet } from "react-router";

const Layout = () => {
  return (
    <Flex gap={4} width="100dvw" height="100dvh">
      <Sidebar />
      <Box w="100%" padding={2} overflowX="auto">
        <Outlet />
      </Box>
    </Flex>
  );
};

export default Layout;
