import { Flex, IconButton, Td, Tooltip, Tr } from "@chakra-ui/react";
import { deleteAccessorie } from "@src/api";
import { AccessoriesDetails } from "@src/schema/accessories";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { NavLink } from "react-router-dom";

interface Props {
  accessoriesData: AccessoriesDetails;
  index: number;
}

const AccessoriesListItem: React.FC<Props> = (props) => {
  const { accessoriesData, index } = props;
  const queryClient = useQueryClient();

  const { mutate: deleteMutation } = useMutation({
    mutationKey: ["delete-accessories"],
    mutationFn: () => deleteAccessorie(accessoriesData.id),
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ["get-accessories-list"] }),
  });

  return (
    <Tr>
      <Td>{index}</Td>
      <Td>{accessoriesData.name}</Td>
      <Td>{accessoriesData.category}</Td>
      <Td>{accessoriesData.price}</Td>
      <Td>{accessoriesData.color}</Td>
      <Td>
        <Flex alignItems="center" gap={1}>
          <Tooltip label="Edit User" hasArrow>
            <IconButton
              aria-label="Edit user"
              icon={<AiFillEdit />}
              variant="link"
              as={NavLink}
              to={`/product/accessories/edit/${accessoriesData.id}`}
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
              onClick={() => deleteMutation()}
            />
          </Tooltip>
        </Flex>
      </Td>
    </Tr>
  );
};

export default AccessoriesListItem;
