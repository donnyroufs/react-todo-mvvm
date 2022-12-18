import { IReactionDisposer, reaction } from "mobx";

/**
 * @description
 * It's intent is to subscribe to another module's vm. For internal subscriptions I would
 * like to think that their own view-models should implement those subscriptions.
 */
export abstract class Subscriber<
  TViewModel,
  TProperty extends keyof TViewModel
> {
  public abstract vm: TViewModel;
  public abstract prop: keyof TViewModel;
  public abstract onNotified(
    current: TViewModel[TProperty],
    previous: TViewModel[TProperty]
  ): void;

  public setup(): IReactionDisposer {
    return reaction(
      () => this.vm[this.prop],
      (recent, prev) => this.onNotified(recent as any, prev as any)
    );
  }
}
