import { useEffect, useRef } from "react"

import { IViewModel } from "./IViewModel"
import { Newable } from "./Types"
import { ServiceLocator } from "./ServiceLocator"

type ViewModelInitFunction<TViewModel> = (vm: TViewModel) => void

export function useViewModel<TViewModel extends IViewModel>(
  newableViewModel: Newable<TViewModel>,
  init?: ViewModelInitFunction<TViewModel>
): TViewModel {
  const ref = useRef<TViewModel>()
  const initialized = useRef(false)

  useEffect(() => {
    if (!init || !ref.current) return
    if (initialized.current) return

    init(ref.current)
    initialized.current = true
  }, [ref.current])

  if (!ref.current) {
    const vm = ServiceLocator.getInstance().get<TViewModel>(
      newableViewModel.toString()
    )

    ref.current = vm
  }

  return ref.current
}
