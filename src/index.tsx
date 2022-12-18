import { ChakraProvider } from "@chakra-ui/react"
import React from "react"
import ReactDOM from "react-dom/client"

import App from "./App"
import { ServiceLocator } from "./shared/ServiceLocator"
import { ApiTodosRepositoryImpl } from "./todos/infra/ApiTodosRepositoryImpl"
import { TodoListVm } from "./todos/view-models/TodoListVm"
import { ChakraToastServiceImpl } from "./shared/ChakraToastServiceImpl"
import { IToastService } from "./shared/IToastService"
import { TodoFormVm } from "./todos/view-models/TodoFormVm"
import { TodosLoadingStateChangedSubscription } from "./notifications/TodosLoadingStateChangedSubscription"

function bootstrap(): void {
  const toastService: IToastService = new ChakraToastServiceImpl()
  const todosRepo = new ApiTodosRepositoryImpl()
  const todoListVm = new TodoListVm(todosRepo)
  const todoFormVm = new TodoFormVm(todosRepo)

  ServiceLocator.getInstance()
    .register(TodoListVm.toString(), todoListVm)
    .register(TodoFormVm.toString(), todoFormVm)

  const subscription = new TodosLoadingStateChangedSubscription(toastService)
  subscription.setup()

  const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
  )

  root.render(
    <React.StrictMode>
      <ChakraProvider resetCSS={true}>
        <App />
      </ChakraProvider>
    </React.StrictMode>
  )
}

bootstrap()
