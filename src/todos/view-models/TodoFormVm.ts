import { makeAutoObservable } from "mobx"
import { IViewModel } from "../../shared/IViewModel"
import { ITodosRepository } from "../interfaces/ITodosRepository"
import { Todo } from "../entities/Todo"
import { TodoStatus } from "../entities/TodoStatus"

export class TodoFormVm implements IViewModel {
  private readonly _todosRepository: ITodosRepository

  private _value = ""

  public get value(): Readonly<string> {
    return this._value
  }

  public constructor(todosRepository: ITodosRepository) {
    this._todosRepository = todosRepository
    makeAutoObservable(this)
  }

  public async onAdd(): Promise<void> {
    const todo = Todo.create(
      Math.random().toString(),
      this._value,
      TodoStatus.Idle
    ).unwrap()
    this.clear()
    await this._todosRepository.add(todo)
  }

  public clear() {
    this._value = ""
  }

  public setValue(value: string): void {
    this._value = value
  }
}
