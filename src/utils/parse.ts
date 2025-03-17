/**
 * Get the current date in the format 'YYYY-MM-DD'.
 * @returns {string} The current date.
 * @example
 * ```
 * const date = getCurrentDate();
 * console.log(date);
 * ```
 */
const getCurrentDate = (): string => {
  const now = new Date();
  return now.toISOString().split("T")[0] || "";
};

/**
 * Get the current date with time in the format 'YYYY-MM-DD HH:MM:SS'.
 * @returns {string} The current date with time.
 * @example
 * ```
 * const date = getCurrentDateWithTime();
 * console.log(date);
 * ```
 */
const getCurrentDateWithTime = (): string => {
  const now = new Date();
  return now.toISOString().replace("T", " ").split(".")[0] || "";
};

/**
 * Get a human-readable date from milliseconds.
 * @param {number} ms The milliseconds to convert.
 * @returns {string} The human-readable date.
 * @example
 * ```
 * const date = getHumanReadableDate(100000);
 * console.log(date);
 * ```
 */
const getHumanReadableDate = (ms: number): string => {
  const seconds = Math.floor(ms / 1000);
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const parts = [
    { value: days, label: "day" },
    { value: hours, label: "hour" },
    { value: minutes, label: "minute" },
    { value: remainingSeconds, label: "second" },
  ];

  return parts
    .filter((part) => part.value > 0)
    .map((part) => `${part.value} ${part.label}${part.value > 1 ? "s" : ""}`)
    .join(", ");
};

export { getCurrentDate, getCurrentDateWithTime, getHumanReadableDate };
