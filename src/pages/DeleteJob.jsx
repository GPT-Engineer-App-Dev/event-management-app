import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, VStack, Heading, Button, useToast, Spinner } from "@chakra-ui/react";
import { useJob, useDeleteJob } from "../integrations/supabase/index.js";
import { useSupabaseAuth } from "../integrations/supabase/auth.jsx";

const DeleteJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const { data: job, isLoading } = useJob(id);
  const { mutate: deleteJob } = useDeleteJob();
  const { session } = useSupabaseAuth();

  const handleDelete = () => {
    deleteJob(id, {
      onSuccess: () => {
        toast({
          title: "Job deleted.",
          description: "The job has been deleted successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        navigate("/");
      },
      onError: (error) => {
        toast({
          title: "Error deleting job.",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      },
    });
  };

  if (!session || !session.user || session.user.role !== 'admin') {
    return (
      <Container centerContent maxW="container.md" py={8}>
        <Heading as="h2" size="xl">Access Denied</Heading>
        <Text fontSize="lg">You do not have permission to access this page.</Text>
      </Container>
    );
  }

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
        <Heading as="h2" size="xl">Delete Job</Heading>
        <Button colorScheme="red" size="lg" onClick={handleDelete}>Confirm Delete</Button>
      </VStack>
    </Container>
  );
};

export default DeleteJob;