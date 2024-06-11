import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, VStack, Heading, Button, useToast } from "@chakra-ui/react";

const DeleteEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    // Fetch event data by id if needed for confirmation
    // This is a placeholder for actual fetch logic
  }, [id]);

  const handleDelete = async () => {
    // Delete event logic here
    toast({
      title: "Event deleted.",
      description: "Your event has been deleted successfully.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    navigate("/");
  };

  return (
    <Container centerContent maxW="container.md" py={8}>
      <VStack spacing={4}>
        <Heading as="h2" size="xl">Delete Event</Heading>
        <Button colorScheme="red" size="lg" onClick={handleDelete}>Confirm Delete</Button>
      </VStack>
    </Container>
  );
};

export default DeleteEvent;