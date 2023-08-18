import {
  Flex,
  Heading,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Spinner,
  Button,
} from "@chakra-ui/react";
import { getApparelList } from "@src/api";
import ApparelListItem from "@src/components/apparels/ApparelListItem";
import NoData from "@src/components/noData";
import { ApparelDetail } from "@src/schema/apparels";
import { useQuery } from "@tanstack/react-query";
import { NavLink } from "react-router-dom";

const ApparelList = () => {
  const {
    data: apparelList,
    isLoading,
    isError,
  } = useQuery<ApparelDetail[]>({
    queryKey: ["get-apparel-list"],
    queryFn: () => getApparelList(),
  });

  if (isLoading) {
    return <Spinner />;
  }
  if (!apparelList?.length || isError) {
    return <NoData />;
  }

  return (
    <Flex flexDir="column" gap={5}>
      <Flex justifyContent="space-between">
        <Heading as="h2" size="lg">
          Apparel List
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
              <Th>Small Size</Th>
              <Th>Medium Size</Th>
              <Th>Large Size</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {apparelList.map((item, index: number) => (
              <ApparelListItem
                key={item.id}
                apparelData={item}
                index={++index}
              />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
};

export default ApparelList;
