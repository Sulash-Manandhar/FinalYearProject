import {
  Flex,
  Heading,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Button,
  Spinner,
} from "@chakra-ui/react";
import { getDrinkwareList } from "@src/api";
import DrinkwareListItem from "@src/components/drinkware/DrinkwareListItem";
import NoData from "@src/components/noData";
import { DrinkwareDetail } from "@src/schema/drinkware";
import { useQuery } from "@tanstack/react-query";
import { NavLink } from "react-router-dom";

const DrinkwareList = () => {
  const {
    data: drinkwareList,
    isLoading,
    isError,
  } = useQuery<DrinkwareDetail[]>({
    queryKey: ["get-drinkware-list"],
    queryFn: () => getDrinkwareList(),
  });

  if (isLoading) {
    return <Spinner />;
  }
  if (!drinkwareList?.length || isError) {
    return <NoData />;
  }

  return (
    <Flex flexDir="column" gap={5}>
      <Flex justifyContent="space-between">
        <Heading as="h2" size="lg">
          Drinkware List
        </Heading>
        <Button colorScheme="green" as={NavLink} to="/product/apparels/add">
          Add
        </Button>
      </Flex>
      <TableContainer>
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>SN</Th>
              <Th>Name</Th>
              <Th>Price</Th>
              <Th>Color</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {drinkwareList.map((item, index) => (
              <DrinkwareListItem
                key={item.id}
                drinkwareData={item}
                index={++index}
              />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
};

export default DrinkwareList;
