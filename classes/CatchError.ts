/**
 * Coding service by Sleepy4k <sarahpalastring@gmail.com>
 *
 * Reselling this file, via any medium is strictly prohibited
 * Proprietary and confidential
 *
 * Written by:
 * Apri Pandu Wicaksono
 *
 * Link: https://github.com/sleepy4k
 *
 * March 12, 2023
 */
import print from "@utils/print";
import { EPrintType } from "@enums";

class CatchError {
  #errorMessage: any;

  constructor(error: unknown) {
    this.validate(error);
    this.print();
  }

  private validate(error: unknown) {
    if (error instanceof Error) this.#errorMessage = error.message;
    else if (typeof error === "string") this.#errorMessage = error;
    else this.#errorMessage = "Unknown error";
  }

  private print() {
    print(this.#errorMessage, EPrintType.ERROR);
  }
}

export default CatchError;
