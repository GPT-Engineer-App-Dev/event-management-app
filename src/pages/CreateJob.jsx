import { useState } from "react";
import { useAddJob } from "../integrations/supabase/index.js";
import { Container, VStack, Heading, Input, Button, useToast } from "@chakra-ui/react";
import { useSupabaseAuth } from "../integrations/supabase/auth.jsx";
import { useNavigate } from "react-router-dom";

const CreateJob = () => {
  const [jobsTitle, setJobsTitle] = useState("");
  const [jobType, setJobType] = useState("");
  const [jobArea, setJobArea] = useState("");
  const toast = useToast();
  const navigate = useNavigate();
  const { session } = useSupabaseAuth();

  const { mutate: addJob } = useAddJob();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newJob = { jobs_title: jobsTitle, job_type: jobType, job_area: jobArea };
    addJob(newJob, {
      onSuccess: () => {
        toast({
          title: "Job created.",
          description: "The job has been created successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        navigate("/");
      },
      onError: (error) => {
        toast({
          title: "Error creating job.",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      },
    });
  };

  if (!session || !session.user || !session.user.role === 'admin') {
    return (
      <Container centerContent maxW="container.md" py={8}>
        <Heading as="h2" size="xl">Access Denied</Heading>
        <Text fontSize="lg">You do not have permission to access this page.</Text>
      </Container>
    );
  }

  return (
    <Container centerContent maxW="container.md" py={8}>
      <VStack spacing={4} as="form" onSubmit={handleSubmit}>
        <Heading as="h2" size="xl">Create Job</Heading>
        <Input
          placeholder="Job Title"
          value={jobsTitle}
          onChange={(e) => setJobsTitle(e.target.value)}
          isRequired
        />
        <Input
          placeholder="Job Type"
          value={jobType}
          onChange={(e) => setJobType(e.target.value)}
          isRequired
        />
        <Input
          placeholder="Job Area"
          value={jobArea}
          onChange={(e) => setJobArea(e.target.value)}
          isRequired
        />
        <Button type="submit" colorScheme="teal" size="lg">Create Job</Button>
      </VStack>
    </Container>
  );
};

export default CreateJob;