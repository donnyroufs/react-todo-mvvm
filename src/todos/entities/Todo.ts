import { Err, Ok, Result } from "ts-results"
import { TodoStatus } from "./TodoStatus"

export class Todo {
  private readonly _id: string
  private readonly _title: string
  private _status: TodoStatus

  public get id(): Readonly<string> {
    return this._id
  }

  public get title(): Readonly<string> {
    return this._title
  }

  public get status(): TodoStatus {
    return this._status
  }

  public get isDone(): Readonly<boolean> {
    return this._status === TodoStatus.Done
  }

  private constructor(id: string, title: string, status: TodoStatus) {
    this._id = id
    this._title = title
    this._status = status
  }

  public toggleComplete(): void {
    if (this.isDone) {
      this._status = TodoStatus.Idle
      return
    }

    this._status = TodoStatus.Done
  }

  public static toJSON(todo: Todo): Record<string, unknown> {
    return {
      id: todo.id,
      title: todo.title,
      status: todo.status,
    }
  }

  public static create(
    id: string,
    title: string,
    status: TodoStatus
  ): Result<Todo, string> {
    if (title.trim().length === 0) {
      return Err("title requires atleast 1 character")
    }

    return Ok(new Todo(id, title, status))
  }
}
