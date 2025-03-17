interface UsagePercentOptions {
  coreIndex?: number;
  sampleMs?: number;
}

type UsagePercentCallback = (
  error: Error | null,
  usage: number | undefined,
  sampleDurationSeconds: number | undefined
) => void;

declare module 'cpu-stat' {
  function usagePercent(cb: UsagePercentCallback): void;
  function usagePercent(opts: UsagePercentOptions, cb: UsagePercentCallback): void;
  function totalCores(): number;
  function clockMHz(coreIndex: number): number | string;
  function avgClockMHz(): number;
}