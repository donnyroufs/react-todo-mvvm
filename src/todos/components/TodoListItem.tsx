import { ListItem } from "@chakra-ui/react";

type Props = {
  title: string;
  isDone: boolean;
  onToggleComplete(): void;
};

export const TodoListItem = ({ title, isDone, onToggleComplete }: Props) => (
  <ListItem
    onClick={onToggleComplete}
    textDecor={isDone ? "line-through" : "inherit"}
  >
    {title}
  </ListItem>
);
