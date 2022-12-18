import { Divider, Flex } from "@chakra-ui/react";
import TodoForm from "./TodoForm";
import { TodosList } from "./TodosList";

export const TodoPage = () => {
  return (
    <Flex gap={4} flexDir="column">
      <TodoForm />
      <Divider />
      <TodosList />
    </Flex>
  );
};
