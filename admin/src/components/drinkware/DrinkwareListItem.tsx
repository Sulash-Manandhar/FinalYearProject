import { Flex, IconButton, Td, Tooltip, Tr } from "@chakra-ui/react";
import { deleteDrinkware } from "@src/api";
import { DrinkwareDetail } from "@src/schema/drinkware";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { NavLink } from "react-router-dom";

interface Props {
  drinkwareData: DrinkwareDetail;
  index: number;
}

const DrinkwareListItem: React.FC<Props> = (props) => {
  const { drinkwareData, index } = props;
  const queryClient = useQueryClient();

  const { mutate: deleteMutate } = useMutation({
    mutationKey: ["delete-drinkware"],
    mutationFn: () => deleteDrinkware(drinkwareData.id),
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ["get-drinkware-list"] }),
  });

  return (
    <Tr>
      <Td>{index}</Td>
      <Td>{drinkwareData.name}</Td>
      <Td>{drinkwareData.price}</Td>
      <Td>{drinkwareData.color}</Td>
      <Td>
        <Flex alignItems="center" gap={1}>
          <Tooltip label="Edit User" hasArrow>
            <IconButton
              aria-label="Edit user"
              icon={<AiFillEdit />}
              variant="link"
              as={NavLink}
              to={`/product/drinkware/edit/${drinkwareData.id}`}
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
              onClick={() => deleteMutate()}
            />
          </Tooltip>
        </Flex>
      </Td>
    </Tr>
  );
};

export default DrinkwareListItem;
