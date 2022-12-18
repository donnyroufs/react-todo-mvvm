import { Container, Box } from "@chakra-ui/react";
import { TodoPage } from "./todos/components/TodoPage";

function App() {
  return (
    <Box bgColor="gray.800" minH="100vh" color="gray.200">
      <Container maxW="container.lg">
        <TodoPage />
      </Container>
    </Box>
  );
}

export default App;
