import { List, Text } from "@chakra-ui/react"
import { observer } from "mobx-react-lite"

import { useViewModel } from "../../shared/Hooks"
import { TodoListVm } from "../view-models/TodoListVm"
import { TodoListItem } from "./TodoListItem"

export const TodosList = observer(() => {
  const vm = useViewModel(TodoListVm, (x) => {
    x.loadAsync()
  })

  if (vm.isLoading) {
    return <Text>Loading...</Text>
  }

  return (
    <List>
      {vm.todos.map((todo) => (
        <TodoListItem
          key={todo.id}
          title={todo.title}
          isDone={todo.isDone}
          onToggleComplete={() => vm.toggleComplete(todo.id)}
        />
      ))}
    </List>
  )
})
