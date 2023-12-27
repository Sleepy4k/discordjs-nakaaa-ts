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
import { print } from "@utils";
import { EPrintType } from "@enums";

class CatchError {
  /**
   * Constructor
   */
  constructor() {
    throw new Error("This class is not meant to be instantiated");
  }

  /**
   * Print error
   *
   * @param {unknown} error
   *
   * @returns {void}
   */
  public static print(error: unknown): void {
    if (error instanceof Error) print(error.message, EPrintType.ERROR);
    else if (typeof error === "string") print(error, EPrintType.ERROR);
    else print("Unknown error", EPrintType.ERROR);
  }
}

export default CatchError;
