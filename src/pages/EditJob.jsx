import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, VStack, Heading, Input, Button, useToast, Spinner } from "@chakra-ui/react";
import { useJob, useUpdateJob } from "../integrations/supabase/index.js";
import { useSupabaseAuth } from "../integrations/supabase/auth.jsx";

const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const { data: job, isLoading } = useJob(id);
  const { mutate: updateJob } = useUpdateJob();
  const { session } = useSupabaseAuth();

  const [jobsTitle, setJobsTitle] = useState("");
  const [jobType, setJobType] = useState("");
  const [jobArea, setJobArea] = useState("");

  useEffect(() => {
    if (job) {
      setJobsTitle(job.jobs_title);
      setJobType(job.job_type);
      setJobArea(job.job_area);
    }
  }, [job]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedJob = { id, jobs_title: jobsTitle, job_type: jobType, job_area: jobArea };
    updateJob(updatedJob, {
      onSuccess: () => {
        toast({
          title: "Job updated.",
          description: "The job has been updated successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        navigate("/");
      },
      onError: (error) => {
        toast({
          title: "Error updating job.",
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
      <VStack spacing={4} as="form" onSubmit={handleSubmit}>
        <Heading as="h2" size="xl">Edit Job</Heading>
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
        <Button type="submit" colorScheme="teal" size="lg">Update Job</Button>
      </VStack>
    </Container>
  );
};

export default EditJob;