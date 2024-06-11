import { useState } from "react";
import { useAddEvent } from "../integrations/supabase/index.js";
import { Container, VStack, Heading, Input, Textarea, Button, useToast } from "@chakra-ui/react";

const CreateEvent = () => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const toast = useToast();

  const { mutate: addEvent } = useAddEvent();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEvent = { name, date, description };
    addEvent(newEvent, {
      onSuccess: () => {
        toast({
          title: "Event created.",
          description: "Your event has been created successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      },
      onError: (error) => {
        toast({
          title: "Error creating event.",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      },
    });
  };

  return (
    <Container centerContent maxW="container.md" py={8}>
      <VStack spacing={4} as="form" onSubmit={handleSubmit}>
        <Heading as="h2" size="xl">Create Event</Heading>
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
        <Button type="submit" colorScheme="teal" size="lg">Create Event</Button>
      </VStack>
    </Container>
  );
};

export default CreateEvent;