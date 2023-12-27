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
import { EPrintType } from "@enums";

/**
 * Parse current date and time to human readable for console log with message
 *
 * @param {string} message
 * @param {EPrintType} type
 *
 * @returns {void}
 */
type TPrint = (message: string, type?: EPrintType) => void;

export default TPrint;
