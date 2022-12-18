import { TodoListVm } from "./TodoListVm"
import { mock } from "jest-mock-extended"
import { ITodosRepository } from "../interfaces/ITodosRepository"
import { Todo } from "../entities/Todo"
import { TodoStatus } from "../entities/TodoStatus"

describe("TodoListVm", () => {
  let sut: TodoListVm
  const mockedTodosRepository = mock<ITodosRepository>()

  beforeAll(() => {
    sut = new TodoListVm(mockedTodosRepository)
  })

  test("After loading todos, isLoading becomes false", async () => {
    expect(sut.isLoading).toBe(true)
    await sut.loadAsync()
    expect(sut.isLoading).toBe(false)
  })

  test("asks for the todo with the given id", async () => {
    const todoId = "myId"
    const todo = Todo.create(todoId, "title", TodoStatus.Done)
    mockedTodosRepository.findById.mockResolvedValue(todo.toOption())
    await sut.toggleComplete(todoId)

    expect(mockedTodosRepository.findById).toHaveBeenCalledWith(todoId)
  })

  test("updates the todo", async () => {
    const todoId = "myId"
    const todo = Todo.create(todoId, "title", TodoStatus.Idle)
    mockedTodosRepository.findById.mockResolvedValue(todo.toOption())
    await sut.toggleComplete(todoId)

    expect(todo.unwrap().status).toBe(TodoStatus.Done)
    expect(mockedTodosRepository.updateAsync).toHaveBeenCalledWith(
      todo.unwrap()
    )
  })

  test("after updating the todo, the todos are also updated", async () => {
    const todoId = "myId"
    const todo = Todo.create(todoId, "title", TodoStatus.Idle)
    mockedTodosRepository.findById.mockResolvedValue(todo.toOption())
    mockedTodosRepository.todos = [todo.unwrap()]

    expect(sut.todos.at(0)!.isDone).toBe(false)
    await sut.toggleComplete(todoId)

    expect(sut.todos.at(0)!.isDone).toBe(true)
  })
})
