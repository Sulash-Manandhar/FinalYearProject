import { Flex, IconButton, Switch, Td, Tooltip, Tr } from "@chakra-ui/react";
import { UserDetail } from "@src/schema/user/UserSchema";
import { NavLink } from "react-router-dom";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { Binary } from "@src/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser, toggleUserBan, toggleUserVerification } from "@src/api";

interface Props {
  userData: UserDetail;
  index: number;
}

interface UpdateVerificationType {
  id: number;
  value: Binary;
}

const UserListItem: React.FC<Props> = (props) => {
  const { userData, index } = props;
  const queryClient = useQueryClient();

  const verificationMutation = useMutation({
    mutationKey: ["update-user-verification-status"],
    mutationFn: (data: UpdateVerificationType) => toggleUserVerification(data),
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ["get-user-list"] }),
  });

  const banMutation = useMutation({
    mutationKey: ["update-user-ban-status"],
    mutationFn: (data: UpdateVerificationType) => toggleUserBan(data),
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ["get-user-list"] }),
  });

  const { mutate } = useMutation({
    mutationKey: ["delete-user"],
    mutationFn: () => deleteUser(userData.id),
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ["get-user-list"] }),
  });

  const handleVerificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const data: UpdateVerificationType = {
      id: userData?.id,
      value: e.currentTarget.checked ? 1 : 0,
    };

    if (e.currentTarget.name === "ban") {
      banMutation.mutate(data);
      return;
    }
    verificationMutation.mutate(data);
    return;
  };

  return (
    <Tr>
      <Td>{index}</Td>
      <Td>
        {userData.fname}
        {userData.lname}
      </Td>
      <Td>{userData.email}</Td>
      <Td>{userData.phone}</Td>
      <Td>
        {userData.location},{userData.district} ({userData.province})
      </Td>
      <Td>
        <Switch
          name="ban"
          size="sm"
          colorScheme="green"
          isChecked={Boolean(userData.ban)}
          onChange={handleVerificationChange}
        />
      </Td>
      <Td>
        <Switch
          name="verified"
          size="sm"
          colorScheme="green"
          isChecked={Boolean(userData.verified)}
          onChange={handleVerificationChange}
        />
      </Td>
      <Td>
        <Flex alignItems="center" gap={1}>
          <Tooltip label="Edit User" hasArrow>
            <IconButton
              aria-label="Edit user"
              icon={<AiFillEdit />}
              variant="link"
              as={NavLink}
              to={`/users/edit/${userData.id}`}
              _hover={{
                color: "blue.400",
              }}
            />
          </Tooltip>
          <Tooltip label="Delete User" hasArrow>
            <IconButton
              aria-label="Delete user"
              icon={<AiFillDelete />}
              variant="link"
              _hover={{
                color: "red",
              }}
              onClick={() => mutate()}
            />
          </Tooltip>
        </Flex>
      </Td>
    </Tr>
  );
};

export default UserListItem;
