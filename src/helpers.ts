import path from "node:path";
import { fileURLToPath } from "node:url";

/**
 * Get the directory path name based on the file URL
 * @type {string}
 */
const __dirname: string = path.resolve(fileURLToPath(import.meta.url));

/**
 * Get the file name based on the file URL
 * @type {string}
 */
const __filename: string = path.basename(fileURLToPath(import.meta.url));

/**
 * Get the file extension based on the file name
 * @type {string|undefined}
 */
const fileExtension: string | undefined = __filename.split(".").pop();

/**
 * Get the source path based on the directory name
 * @type {string}
 */
const sourcePath: string = __dirname.replace(__filename, "");

/**
 * Get the file path based on the file name
 * @type {string}
 */
const relativeSourcePath: string = path.relative(process.cwd(), sourcePath);

/**
 * Check if the file extension is production
 * @type {boolean}
 */
const isProduction: boolean = fileExtension === "js";

export { fileExtension, sourcePath, relativeSourcePath, isProduction };
