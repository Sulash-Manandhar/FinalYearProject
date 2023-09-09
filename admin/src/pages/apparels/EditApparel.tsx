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
  Spinner,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { addFile, editApparel, getApparelDetail } from "@src/api";
import NoData from "@src/components/noData";
import { ApparelDetail } from "@src/schema/apparels";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";

const DEFAULT_VALUES: ApparelDetail = {
  id: 0,
  name: "",
  category: "",
  color: "",
  price: 0,
  description: "",
  imagePath: "",
  small_size: 1,
  medium_size: 1,
  large_size: 1,
  is_featured: 0,
};

const EditApparel = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [apparelData, setApparelData] = useState<ApparelDetail>(DEFAULT_VALUES);
  const [fileData, setFileData] = useState<File | null>(null);

  const { data: apparelDetail, isLoading } = useQuery<ApparelDetail>({
    queryKey: ["get-apparel-details", id],
    queryFn: () => getApparelDetail(Number(id)),
    onSettled: (data) => {
      if (data) {
        setApparelData(data);
      }
    },
    enabled: !!id,
    staleTime: Infinity,
  });

  const editApparelMutation = useMutation({
    mutationKey: ["add-new-apparel"],
    mutationFn: (data: ApparelDetail) => editApparel(data),
    onSuccess: () => {
      toast({
        status: "success",
        title: "Successfully edit a apparel",
        position: "bottom",
      });
      navigate("/product/apparels");
      setApparelData(DEFAULT_VALUES);
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
      editApparelMutation.mutate(apparelData);
    },
    onError: () => {
      toast({
        status: "error",
        title: "Something went wrong",
        position: "bottom",
      });
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

  if (!id || !apparelDetail) {
    return <NoData />;
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Flex flexDir="column" gap={4}>
      <Heading as="h2" size="lg">
        Edit Apparel
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
            isLoading={editApparelMutation.isLoading}
          >
            Add Apparel
          </Button>
        </Box>
      </form>
    </Flex>
  );
};

export default EditApparel;
