import { Container, VStack, Heading, Text, Button, HStack } from "@chakra-ui/react";
import { FaCalendarPlus, FaCalendarAlt, FaEdit, FaTrash, FaEye } from "react-icons/fa"; // Import the FaTrash icon and FaEye icon
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={8}>
        <Heading as="h1" size="2xl" textAlign="center">Events Management App</Heading>
        <Text fontSize="lg" textAlign="center">Manage your events efficiently and effortlessly.</Text>
        <HStack spacing={4}>
          <Button as={Link} to="/create-event" leftIcon={<FaCalendarPlus />} colorScheme="teal" size="lg">
            Create Event
          </Button>
          <Button leftIcon={<FaCalendarAlt />} colorScheme="blue" size="lg">
            View Events
          </Button>
          <Button as={Link} to="/update-event/1" leftIcon={<FaEdit />} colorScheme="yellow" size="lg">
            Update Event
          </Button>
        <Button as={Link} to="/delete-event/1" leftIcon={<FaTrash />} colorScheme="red" size="lg">
            Delete Event
          </Button>
        <Button as={Link} to="/view-event/1" leftIcon={<FaEye />} colorScheme="green" size="lg">
            View Event
          </Button>
        </HStack>
      </VStack>
    </Container>
  );
};

export default Index;