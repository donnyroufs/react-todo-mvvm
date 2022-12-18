import { useRef } from "react";

import { IViewModel } from "./IViewModel";
import { Newable } from "./Types";
import { ServiceLocator } from "./ServiceLocator";

export function useViewModel<TViewModel extends IViewModel>(
  newableViewModel: Newable<TViewModel>
): TViewModel {
  const ref = useRef<TViewModel>();

  if (!ref.current) {
    const vm = ServiceLocator
      .getInstance()
      .get<TViewModel>(newableViewModel.toString());

    ref.current = vm;
  }

  return ref.current;
}
