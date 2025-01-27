import EPrintType from "@enums/EPrintType.js";
import print from "@utils/print.js";

class CatchError {
  constructor() {
    throw new Error("This class cannot be instantiated.");
  }

  public static print(error: any): void {
    if (error instanceof Error) print(EPrintType.ERROR, error.message);
    else if (typeof error === "string") print(EPrintType.ERROR, error);
    else print(EPrintType.ERROR, "Unknown error");
  }
}

export default CatchError;
