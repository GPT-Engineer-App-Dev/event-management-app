import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, VStack, Heading, Button, useToast, Spinner } from "@chakra-ui/react";
import { useEvent, useDeleteEvent } from "../integrations/supabase/index.js";

const DeleteEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const { data: event, isLoading } = useEvent(id);
  const { mutate: deleteEvent } = useDeleteEvent();

  const handleDelete = () => {
    deleteEvent(id, {
      onSuccess: () => {
        toast({
          title: "Event deleted.",
          description: "Your event has been deleted successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        navigate("/");
      },
      onError: (error) => {
        toast({
          title: "Error deleting event.",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      },
    });
  };

  if (isLoading) {
    return (
      <Container centerContent maxW="container.md" py={8}>
        <Spinner size="xl" />
      </Container>
    );
  }

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