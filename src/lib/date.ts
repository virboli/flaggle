export function getDeltaDay(date: string): number {
  const DAY: number = 86_400_000;
  const TIMEZONE_OFFSET: number = new Date().getTimezoneOffset() * 60_000;
  const a = new Date().getTime() - TIMEZONE_OFFSET;
  const b = new Date(date).getTime();
  return Math.floor(b / DAY) - Math.floor(a / DAY);
}
