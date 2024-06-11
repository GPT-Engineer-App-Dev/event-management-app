import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, VStack, Heading, Input, Textarea, Button, useToast } from "@chakra-ui/react";

const UpdateEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const toast = useToast();

  useEffect(() => {
    // Fetch event data by id and populate the state
    // This is a placeholder for actual fetch logic
    const fetchEvent = async () => {
      const event = {
        name: "Sample Event",
        date: "2023-10-10",
        description: "This is a sample event description."
      };
      setName(event.name);
      setDate(event.date);
      setDescription(event.description);
    };

    fetchEvent();
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update event logic here
    toast({
      title: "Event updated.",
      description: "Your event has been updated successfully.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    navigate("/");
  };

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