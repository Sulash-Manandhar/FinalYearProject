import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Input,
  Select,
  Textarea,
} from "@chakra-ui/react";
import { addApparel, addFile } from "@src/api";
import { ApparelFormSchema } from "@src/schema/apparels";
import { useMutation } from "@tanstack/react-query";
import { addAbortListener } from "events";
import { useState } from "react";

const DEFAULT_VALUES: ApparelFormSchema = {
  name: "",
  category: "",
  color: "",
  price: 0,
  description: "",
  imagePath: "",
  small_size: 1,
  medium_size: 1,
  large_size: 1,
};

const AddApparel = () => {
  const [apparelData, setApparelData] =
    useState<ApparelFormSchema>(DEFAULT_VALUES);
  const [fileData, setFileData] = useState<File | null>(null);

  const addApparelMutation = useMutation({
    mutationKey: ["add-new-apparel"],
    mutationFn: (data: ApparelFormSchema) => addApparel(data),
  });

  const addFileMutation = useMutation({
    mutationKey: ["add-file"],
    mutationFn: (file: FormData) => addFile(file),
    onSuccess: () => {
      addApparelMutation.mutate(apparelData);
    },
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.currentTarget;
    if (name === "price") {
      setApparelData((prev) => ({
        ...prev,
        [name]: Number(value),
      }));
      return;
    }
    setApparelData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileData = e.currentTarget.files?.[0];
    if (!fileData) return;
    setFileData(fileData);
    setApparelData((prev) => ({
      ...prev,
      imagePath: fileData?.name,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!fileData) return;
    const formData = new FormData();
    formData.append("file", fileData);
    addFileMutation.mutate(formData);
  };

  return (
    <Flex flexDir="column" gap={4}>
      <Heading as="h2" size="lg">
        Add New Apparel
      </Heading>

      <form onSubmit={handleSubmit}>
        <Grid templateColumns={["repeat(2,1fr)"]} gap={5} p={2}>
          <GridItem>
            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                name="name"
                value={apparelData.name}
                onChange={handleInputChange}
                isRequired
              />
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl isRequired>
              <FormLabel>Category</FormLabel>
              <Select
                name="category"
                value={apparelData.category}
                onChange={handleInputChange}
              >
                <option value="t-shirt">T-Shirt</option>
                <option value="hoodie">Hoodie</option>
                <option value="sweatshirt">Sweatshirt</option>
              </Select>
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl isRequired>
              <FormLabel>Color</FormLabel>
              <Input
                type="text"
                name="color"
                value={apparelData.color}
                onChange={handleInputChange}
                isRequired
              />
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl isRequired>
              <FormLabel>Price</FormLabel>
              <Input
                type="number"
                name="price"
                value={apparelData.price}
                onChange={handleInputChange}
                isRequired
              />
            </FormControl>
          </GridItem>
          <GridItem colSpan={2}>
            <FormLabel>Number of Products</FormLabel>
            <Flex gap={4}>
              <Box>
                <FormControl isRequired>
                  <FormLabel>Small Size</FormLabel>
                  <Input
                    type="number"
                    name="small_size"
                    value={apparelData.small_size}
                    onChange={handleInputChange}
                  />
                </FormControl>
              </Box>
              <Box>
                <FormControl isRequired>
                  <FormLabel>Medium Size</FormLabel>
                  <Input
                    type="number"
                    name="medium_size"
                    value={apparelData.medium_size}
                    onChange={handleInputChange}
                  />
                </FormControl>
              </Box>
              <Box>
                <FormControl isRequired>
                  <FormLabel>Large Size</FormLabel>
                  <Input
                    type="number"
                    name="large_size"
                    value={apparelData.large_size}
                    onChange={handleInputChange}
                  />
                </FormControl>
              </Box>
            </Flex>
          </GridItem>

          <GridItem>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea
                placeholder="Description of the product"
                name="description"
                value={apparelData.description}
                onChange={handleInputChange}
                size="sm"
                isRequired
              />
            </FormControl>
          </GridItem>

          <GridItem>
            <FormControl>
              <FormLabel>Image</FormLabel>
              <Input
                variant="flushed"
                type="file"
                name="imagePath"
                accept="image/jpg image/png image/jpeg"
                onChange={handleFileChange}
                isRequired
              />
              <FormHelperText>JPG, PNG, JPEG are only supported</FormHelperText>
            </FormControl>
          </GridItem>
        </Grid>
        <Box mt={5}>
          <Button
            type="submit"
            colorScheme="facebook"
            isLoading={addApparelMutation.isLoading}
          >
            Add Apparel
          </Button>
        </Box>
      </form>
    </Flex>
  );
};

export default AddApparel;
