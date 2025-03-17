import type {
  THandlerFunc,
  IHandlerParams
} from "@interfaces/handlerFile.js";

class Handler {
  /**
   * Handler name
   *
   * @type {string}
   */
  name: string

  /**
   * Handler function
   *
   * @type {THandlerFunc}
   */
  run: THandlerFunc

  /**
   * Init Handler
   *
   * @param {IHandlerParams} params
   */
  constructor(params: IHandlerParams) {
    this.name = params.name;
    this.run = params.run;
  }
}

export default Handler;