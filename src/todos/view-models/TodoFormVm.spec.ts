import { mock } from "jest-mock-extended"
import { Todo } from "../entities/Todo"
import { TodoStatus } from "../entities/TodoStatus"
import { ITodosRepository } from "../interfaces/ITodosRepository"
import { TodoFormVm } from "./TodoFormVm"

describe("TodoFormVm", () => {
  let sut: TodoFormVm
  const mockedTodosRepository = mock<ITodosRepository>()

  beforeEach(() => {
    sut = new TodoFormVm(mockedTodosRepository)
  })

  test("updates its value", () => {
    expect(sut.value).toBe("")
    sut.setValue("hi")
    expect(sut.value).toBe("hi")
  })

  test("invokes the add method of the repository in order to save the todo", async () => {
    sut.setValue("my first todo")
    const expectedTodo = Todo.create(
      expect.any(String),
      "my first todo",
      TodoStatus.Idle
    )
    await sut.onAdd()

    expect(mockedTodosRepository.add).toHaveBeenCalledWith(
      expectedTodo.unwrap()
    )
  })

  test("clears the value after adding", async () => {
    sut.setValue("my first todo")
    await sut.onAdd()

    expect(sut.value).toBe("")
  })
})
