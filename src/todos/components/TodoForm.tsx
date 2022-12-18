import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react"
import { useViewModel } from "../../shared/Hooks"
import { observer } from "mobx-react-lite"
import { TodoFormVm } from "../view-models/TodoFormVm"
import { FormEvent } from "react"

const TodoForm = () => {
  const vm = useViewModel(TodoFormVm)

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    await vm.onAdd()
  }

  function onInput(e: FormEvent<HTMLInputElement>): void {
    vm.setValue(e.currentTarget.value)
  }

  return (
    <form onSubmit={onSubmit}>
      <FormControl>
        <FormLabel>Description:</FormLabel>
        <Input
          type="text"
          placeholder="Your todo..."
          value={vm.value}
          onInput={onInput}
        />
      </FormControl>
      <Button variant="outline" mt={4} onClick={vm.onAdd.bind(vm)}>
        Create
      </Button>
    </form>
  )
}

export default observer(TodoForm)
