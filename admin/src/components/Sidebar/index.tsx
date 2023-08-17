import { Flex, Icon, Text, Tooltip } from "@chakra-ui/react";
import { NavLinkData } from "@src/data/NavLinkData";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <Flex
      flexDir="column"
      backgroundColor="blackAlpha.800"
      color="white"
      padding={5}
      gap={5}
    >
      {NavLinkData.map((item) => (
        <Tooltip label={item.label} hasArrow placement="right" key={item.id}>
          <NavLink to={item.link}>
            <Flex alignItems="center" gap={3}>
              <Icon as={item.icon} fontSize="1.2rem" />
              <Text>{item.label}</Text>
            </Flex>
          </NavLink>
        </Tooltip>
      ))}
    </Flex>
  );
};

export default Sidebar;
