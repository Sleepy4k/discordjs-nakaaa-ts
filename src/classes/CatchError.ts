import EPrintType from "@enums/EPrintType.js";
import print from "@utils/print.js";

class CatchError {
  private constructor() {
    // Prevent instantiation
  }

  /**
   * Print error message
   * @param {unknown} error
   * @returns {void}
   * @example
   * ```
   * CatchError.print(new Error("Something went wrong"));
   * ```
   */
  public static print(error: unknown): void {
    const errorMessage = error instanceof Error ? error.message : typeof error === "string" ? error : "Unknown error";
    print(EPrintType.ERROR, errorMessage);
  }
}

export default CatchError;
