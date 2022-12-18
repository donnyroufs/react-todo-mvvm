type Token = string | Symbol;

export class ServiceLocator {
  private static _instance: ServiceLocator;
  private readonly _map: Map<Token, unknown> = new Map();

  private constructor() {}

  public get<TInstance>(token: Token): TInstance {
    const service = this._map.get(token);

    if (!service) {
      throw new Error("Unable to locate service");
    }

    return service as TInstance;
  }

  public register<TInstance>(
    token: Token,
    instance: TInstance
  ): ServiceLocator {
    this._map.set(token, instance);

    return this;
  }

  public static getInstance() {
    if (!this._instance) {
      this._instance = new ServiceLocator();
    }

    return this._instance;
  }
}
