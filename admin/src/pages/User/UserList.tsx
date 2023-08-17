import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Flex,
  Heading,
  Button,
  Spinner,
} from "@chakra-ui/react";
import { getUserList } from "@src/api";
import NoData from "@src/components/NoData";
import UserListItem from "@src/components/User/UserListItem";
import { UserDetail } from "@src/schema/user/UserSchema";
import { useQuery } from "@tanstack/react-query";

import { NavLink } from "react-router-dom";

const UserList = () => {
  const {
    data: userList,
    isError,
    isLoading,
  } = useQuery<UserDetail[]>({
    queryKey: ["get-user-list"],
    queryFn: () => getUserList(),
  });

  if (isLoading) {
    return <Spinner />;
  }
  if (!userList || isError) {
    return <NoData />;
  }

  return (
    <Flex flexDir="column" gap={5}>
      <Flex w="100%" justifyContent="space-between">
        <Heading as="h2" size="lg">
          User List
        </Heading>
        <Button as={NavLink} size="sm" colorScheme="green" to="/users/add">
          Add User
        </Button>
      </Flex>
      <TableContainer>
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>SN</Th>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Phone</Th>
              <Th>Location</Th>
              <Th>Ban</Th>
              <Th>Verified</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {userList?.map((item, index: number) => (
              <UserListItem key={item.id} userData={item} index={index} />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
};

export default UserList;
