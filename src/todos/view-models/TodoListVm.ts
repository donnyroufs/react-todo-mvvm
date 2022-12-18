import { makeAutoObservable } from "mobx"
import { IViewModel } from "../../shared/IViewModel"
import { ITodosRepository } from "../interfaces/ITodosRepository"
import { Todo } from "../entities/Todo"

enum TodoListVmStatus {
  Loading,
  Ready,
}

export class TodoListVm implements IViewModel {
  private readonly _todosRepository: ITodosRepository
  private _status: TodoListVmStatus = TodoListVmStatus.Loading

  public get todos(): readonly Todo[] {
    return this._todosRepository.todos
  }

  public get isLoading(): boolean {
    return this._status === TodoListVmStatus.Loading
  }

  public constructor(todosRepository: ITodosRepository) {
    this._todosRepository = todosRepository

    makeAutoObservable(this)
  }

  public async loadAsync(): Promise<void> {
    await this._todosRepository.loadAsync()
    this.setReady()
  }

  public async toggleComplete(id: string): Promise<void> {
    const option = await this._todosRepository.findById(id)
    const todo = option.unwrap()
    todo.toggleComplete()

    await this._todosRepository.updateAsync(todo)
  }

  private setReady(): void {
    this._status = TodoListVmStatus.Ready
  }
}
