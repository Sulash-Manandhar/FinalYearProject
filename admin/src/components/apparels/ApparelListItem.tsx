import { Flex, IconButton, Td, Tooltip, Tr } from "@chakra-ui/react";
import { deleteApparel } from "@src/api";
import { ApparelDetail } from "@src/schema/apparels";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { NavLink } from "react-router-dom";

interface Props {
  apparelData: ApparelDetail;
  index: number;
}

const ApparelListItem: React.FC<Props> = (props) => {
  const { apparelData, index } = props;
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationKey: ["delete-apparel"],
    mutationFn: () => deleteApparel(apparelData.id),
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ["get-apparel-list"] }),
  });

  return (
    <Tr>
      <Td>{index}</Td>
      <Td>{apparelData.name}</Td>
      <Td>{apparelData.category}</Td>
      <Td>{apparelData.price}</Td>
      <Td>{apparelData.color}</Td>
      <Td>{apparelData.small_size}</Td>
      <Td>{apparelData.medium_size}</Td>
      <Td>{apparelData.large_size}</Td>
      <Td>
        <Flex alignItems="center" gap={1}>
          <Tooltip label="Edit User" hasArrow>
            <IconButton
              aria-label="Edit user"
              icon={<AiFillEdit />}
              variant="link"
              as={NavLink}
              to={`/product/apparels/edit/${apparelData.id}`}
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
              onClick={() => deleteMutation.mutate()}
            />
          </Tooltip>
        </Flex>
      </Td>
    </Tr>
  );
};

export default ApparelListItem;
