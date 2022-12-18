import { ServiceLocator } from "../shared/ServiceLocator"
import { Subscriber } from "../shared/Subscriber"
import { TodoListVm } from "../todos/view-models/TodoListVm"
import { IToastService } from "../shared/IToastService"

export class TodosLoadingStateChangedSubscription extends Subscriber<
  TodoListVm,
  "isLoading"
> {
  public vm: TodoListVm = ServiceLocator.getInstance().get(
    TodoListVm.toString()
  )
  public prop: keyof TodoListVm = "isLoading"

  private readonly _toastService: IToastService

  public constructor(toastService: IToastService) {
    super()

    this._toastService = toastService
  }

  public onNotified(current: boolean, previous: boolean): void {
    this._toastService.show(
      `Loading state changed from ${previous} to ${current}.`
    )
  }
}
