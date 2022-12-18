import { HttpResponse } from "../../shared/HttpResponse"
import { ITodosRepository } from "../interfaces/ITodosRepository"
import { Todo } from "../entities/Todo"
import { makeAutoObservable } from "mobx"
import { None, Option, Some } from "ts-results"

export class ApiTodosRepositoryImpl implements ITodosRepository {
  private _todos!: Todo[]
  private _snapshot?: Todo[] = []

  public constructor() {
    makeAutoObservable(this)
  }

  public get todos(): readonly Todo[] {
    return this._todos
  }

  public async loadAsync(): Promise<Todo[]> {
    if (!this._todos) {
      const todos = await fetch("http://localhost:5000/api/todos")
        .then((res) => res.json())
        .then((json: TodosHttpResponse) =>
          TodoDto.toDomainMany(json.data.todos)
        )

      this._todos = todos
    }

    return this._todos
  }

  public add(todo: Todo): Promise<Todo["id"]> {
    this.createSnapshot()

    this._todos.push(todo)

    return fetch("http://localhost:5000/api/todos", {
      method: "POST",
      body: JSON.stringify(todo),
    })
      .then((res) => res.json())
      .then((json) => {
        this._todos = this._todos.map((x) =>
          x.id === todo.id
            ? Todo.create(json.id, x.title, x.status).unwrap()
            : x
        )

        return json.id
      })
      .catch(() => {
        this.restoreSnapshot()
      })
  }

  public async findById(id: string): Promise<Option<Todo>> {
    if (!this._todos) {
      await this.loadAsync()
    }

    const todo = this._todos.find((todo) => todo.id === id)

    if (!todo) {
      return None
    }

    return Some(todo)
  }

  public async updateAsync(todo: Todo): Promise<void> {
    const snapshot = [...this._todos]

    // Optimistic update
    this._todos = this._todos.map((x) =>
      x.id === todo.id
        ? Todo.create(todo.id, todo.title, todo.status).unwrap()
        : x
    )

    const response = await fetch("http://localhost:5000/api/todos/" + todo.id, {
      method: "PUT",
      body: JSON.stringify(Todo.toJSON(todo)),
    })

    if (response.status !== 204) {
      this._todos = snapshot
      return
    }
  }

  private createSnapshot(): void {
    this._snapshot = [...this._todos]
  }

  private restoreSnapshot(): void {
    if (!this._snapshot) {
      throw new Error("You cannot restore todos without a snapshot")
    }

    this._todos = this._snapshot
    this._snapshot = undefined
  }
}

class TodosHttpResponse extends HttpResponse<{ todos: TodoDto[] }> {}

class TodoDto {
  public readonly id: string
  public readonly title: string
  public readonly status: number

  constructor(id: string, title: string, status: number) {
    this.id = id
    this.title = title
    this.status = status
  }

  public static toDomain(json: TodoDto): Todo {
    return Todo.create(json.id, json.title, json.status).unwrap()
  }

  public static toDomainMany(json: TodoDto[]): Todo[] {
    return json.map(this.toDomain.bind(this))
  }
}
