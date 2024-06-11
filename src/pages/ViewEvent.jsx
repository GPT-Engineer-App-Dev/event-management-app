import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, VStack, Heading, Text, Spinner, Box } from "@chakra-ui/react";

const ViewEvent = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch event data by id
    const fetchEvent = async () => {
      // Placeholder for actual fetch logic
      const fetchedEvent = {
        id,
        name: "Sample Event",
        date: "2023-10-10",
        description: "This is a sample event description."
      };
      setEvent(fetchedEvent);
      setLoading(false);
    };

    fetchEvent();
  }, [id]);

  if (loading) {
    return (
      <Container centerContent maxW="container.md" py={8}>
        <Spinner size="xl" />
      </Container>
    );
  }

  return (
    <Container centerContent maxW="container.md" py={8}>
      <VStack spacing={4}>
        <Heading as="h2" size="xl">{event.name}</Heading>
        <Text fontSize="lg">{event.date}</Text>
        <Box p={4} borderWidth="1px" borderRadius="lg" w="100%">
          <Text>{event.description}</Text>
        </Box>
      </VStack>
    </Container>
  );
};

export default ViewEvent;