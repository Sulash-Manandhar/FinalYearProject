import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Flex,
  Icon,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { NavLinkData } from "@src/data/NavLinkData";
import { NavLink } from "react-router-dom";
import { BsArrowReturnRight } from "react-icons/bs";

const Sidebar = () => {
  return (
    <Flex
      flexDir="column"
      backgroundColor="blackAlpha.800"
      color="white"
      padding={5}
      gap={5}
    >
      {NavLinkData.map((item) => {
        if (item.children?.length) {
          return (
            <Accordion allowToggle key={item.id}>
              <AccordionItem border="none">
                <AccordionButton p={0}>
                  <Flex alignItems="center" gap={3}>
                    <Icon as={item.icon} fontSize="1.2rem" />
                    <Text>{item.label}</Text>
                  </Flex>
                </AccordionButton>
                <AccordionPanel p={0}>
                  <Flex flexDir="column" gap={3} mt={5}>
                    {item.children.map((child) => (
                      <Tooltip
                        label={child.label}
                        key={child.id}
                        placement="right"
                      >
                        <NavLink to={child.link} key={child.id}>
                          <Flex alignItems="center" gap={3}>
                            <Icon as={BsArrowReturnRight} fontSize="1.2rem" />
                            <Icon as={child.icon} fontSize="1.2rem" />
                            <Text>{child.label}</Text>
                          </Flex>
                        </NavLink>
                      </Tooltip>
                    ))}
                  </Flex>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          );
        }
        return (
          <Tooltip label={item.label} hasArrow placement="right" key={item.id}>
            <NavLink to={item.link}>
              <Flex alignItems="center" gap={3}>
                <Icon as={item.icon} fontSize="1.2rem" />
                <Text>{item.label}</Text>
              </Flex>
            </NavLink>
          </Tooltip>
        );
      })}
    </Flex>
  );
};

export default Sidebar;
