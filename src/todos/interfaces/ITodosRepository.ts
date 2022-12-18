import { Todo } from "../entities/Todo"
import { Option } from "ts-results"

export interface ITodosRepository {
  todos: readonly Todo[]
  add(todo: Todo): Promise<Todo["id"]>
  loadAsync(): Promise<Todo[]>
  updateAsync(todo: Todo): Promise<void>
  findById(id: string): Promise<Option<Todo>>
}
