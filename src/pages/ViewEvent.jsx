import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, VStack, Heading, Text, Spinner, Box } from "@chakra-ui/react";
import { useEvent } from "../integrations/supabase/index.js";

const ViewEvent = () => {
  const { id } = useParams();
  const { data: event, isLoading } = useEvent(id);

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