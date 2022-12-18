import { createStandaloneToast } from "@chakra-ui/react";
import { IToastService } from "./IToastService";

export class ChakraToastServiceImpl implements IToastService {
  private readonly _toast = createStandaloneToast().toast;

  public show(text: string): void {
    this._toast({
      description: text,
    });
  }
}
