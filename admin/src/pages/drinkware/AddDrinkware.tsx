import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Input,
  useToast,
} from "@chakra-ui/react";
import { addDrinkware, addFile } from "@src/api";
import { DrinkwareFormDetail } from "@src/schema/drinkware";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { AiFillCaretRight } from "react-icons/ai";
import { NavLink } from "react-router-dom";

const DEFAULT_FORM_DATA = {
  name: "",
  color: "",
  price: 0,
  description: "",
  imagePath: "",
};

const AddDrinkware = () => {
  const toast = useToast();

  const [drinkwareFormData, setDrinkwareFromData] =
    useState<DrinkwareFormDetail>(DEFAULT_FORM_DATA);
  const [fileData, setFileData] = useState<File | null>(null);

  const addDrinkwareMutation = useMutation({
    mutationKey: ["add-new-apparel"],
    mutationFn: (data: DrinkwareFormDetail) => addDrinkware(data),
    onSuccess: () => {
      toast({
        status: "success",
        title: "Successfully added new apparel",
        position: "bottom",
      });
      setDrinkwareFromData(DEFAULT_FORM_DATA);
    },
    onError: () => {
      toast({
        status: "error",
        title: "Something went wrong",
        position: "bottom",
      });
    },
  });

  const addFileMutation = useMutation({
    mutationKey: ["add-file"],
    mutationFn: (file: FormData) => addFile(file),
    onSuccess: () => {
      addDrinkwareMutation.mutate(drinkwareFormData);
    },
    onError: () => {
      toast({
        status: "error",
        title: "Something went wrong",
        position: "bottom",
      });
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileData = e.currentTarget.files?.[0];
    if (!fileData) return;
    setFileData(fileData);
    setDrinkwareFromData((prev) => ({
      ...prev,
      imagePath: fileData?.name,
    }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.currentTarget;
    if (name === "price") {
      setDrinkwareFromData((prev) => ({
        ...prev,
        [name]: Number(value),
      }));
      return;
    }
    setDrinkwareFromData((prev) => ({
      ...prev,
      [name]: value,
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
      <Breadcrumb
        spacing="8px"
        separator={<AiFillCaretRight color="gray.500" />}
      >
        <BreadcrumbItem>
          <BreadcrumbLink as={NavLink} to="/">
            Dashboard
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink as={NavLink} to="/product/drinkware">
            DrinkwareList
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href="/product/drinkware/add">
            Add New Drinkware
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <Heading as="h2" size="lg">
        Add new Drinkware
      </Heading>
      <form onSubmit={handleSubmit}>
        <Grid templateColumns={["repeat(2,1fr)"]} gap={5} p={2}>
          <GridItem>
            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                name="name"
                isRequired
                value={drinkwareFormData.name}
                onChange={handleInputChange}
              />
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl isRequired>
              <FormLabel>Color</FormLabel>
              <Input
                type="text"
                name="color"
                isRequired
                value={drinkwareFormData.color}
                onChange={handleInputChange}
              />
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl isRequired>
              <FormLabel>Price</FormLabel>
              <Input
                type="number"
                name="price"
                isRequired
                value={drinkwareFormData.price}
                onChange={handleInputChange}
              />
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl isRequired>
              <FormLabel>Description</FormLabel>
              <Input
                type="text"
                name="description"
                isRequired
                value={drinkwareFormData.description}
                onChange={handleInputChange}
              />
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl isRequired>
              <FormLabel>Image</FormLabel>
              <Input
                type="file"
                name="imagePath"
                variant="flushed"
                accept="image/jpg image/png image/jpeg"
                onChange={handleFileChange}
                isRequired
              />
              <FormHelperText>JPG, PNG, JPEG are only supported</FormHelperText>
            </FormControl>
          </GridItem>
        </Grid>
        <Box mt={5}>
          <Button type="submit" colorScheme="facebook">
            Add Drinkware
          </Button>
        </Box>
      </form>
    </Flex>
  );
};

export default AddDrinkware;
