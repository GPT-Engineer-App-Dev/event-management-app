import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, VStack, Heading, Input, Textarea, Button, useToast, Spinner } from "@chakra-ui/react";
import { useEvent, useUpdateEvent } from "../integrations/supabase/index.js";

const UpdateEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const toast = useToast();

  const { data: event, isLoading } = useEvent(id);

  useEffect(() => {
    if (event) {
      setName(event.name);
      setDate(event.date);
      setDescription(event.description);
    }
  }, [event]);

  const { mutate: updateEvent } = useUpdateEvent();

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedEvent = { id, name, date, description };
    updateEvent(updatedEvent, {
      onSuccess: () => {
        toast({
          title: "Event updated.",
          description: "Your event has been updated successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        navigate("/");
      },
      onError: (error) => {
        toast({
          title: "Error updating event.",
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
      <VStack spacing={4} as="form" onSubmit={handleSubmit}>
        <Heading as="h2" size="xl">Update Event</Heading>
        <Input
          placeholder="Event Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          isRequired
        />
        <Input
          type="date"
          placeholder="Event Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          isRequired
        />
        <Textarea
          placeholder="Event Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          isRequired
        />
        <Button type="submit" colorScheme="teal" size="lg">Update Event</Button>
      </VStack>
    </Container>
  );
};

export default UpdateEvent;