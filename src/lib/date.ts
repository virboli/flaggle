export function getDeltaDay(date: string): number {
  const DAY: number = 86_400_000;
  const TIMEZONE_OFFSET: number = new Date().getTimezoneOffset() * 60_000;
  const target: number = Math.floor((new Date(date).getTime() - TIMEZONE_OFFSET) / DAY);
  const now: number = Math.floor((Date.now() - TIMEZONE_OFFSET) / DAY);
  return target - now;
}
