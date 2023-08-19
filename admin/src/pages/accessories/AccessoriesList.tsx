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
import { getAccessoriesList } from "@src/api";
import AccessoriesListItem from "@src/components/accessories/AccessoriesListItem";
import NoData from "@src/components/noData";
import { AccessoriesDetails } from "@src/schema/accessories";
import { useQuery } from "@tanstack/react-query";
import { NavLink } from "react-router-dom";

const AccessoriesList = () => {
  const {
    data: accessoriesList,
    isLoading,
    isError,
  } = useQuery<AccessoriesDetails[]>({
    queryKey: ["get-accessories-list"],
    queryFn: () => getAccessoriesList(),
  });

  if (isLoading) {
    return <Spinner />;
  }
  if (!accessoriesList?.length || isError) {
    return <NoData />;
  }

  return (
    <Flex flexDir="column" gap={5}>
      <Flex justifyContent="space-between">
        <Heading as="h2" size="lg">
          Accessories List
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
              <Th>Category</Th>
              <Th>Price</Th>
              <Th>Color</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {accessoriesList.map((item, index: number) => (
              <AccessoriesListItem
                key={item.id}
                accessoriesData={item}
                index={++index}
              />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
};

export default AccessoriesList;
