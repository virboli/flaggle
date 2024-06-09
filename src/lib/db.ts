import Dexie, { type Table } from "dexie";

interface Stat {
  name: string;
  value: number;
}

interface DailyResult {
  date: string;
  guesses: number;
}

export interface Result {
  win: boolean;
}

interface ClassicResult extends Result {
  guesses: number;
}

interface LightningResult extends Result {
  guesses: number;
}

export class Database extends Dexie {
  stats!: Table<Stat>;
  daily!: Table<DailyResult>;
  classic!: Table<ClassicResult>;
  lightning!: Table<LightningResult>;

  constructor() {
    super("database");
    this.version(1).stores({
      stats: "name, value",
      daily: "date, guesses",
      classic: "++, win, guesses",
      lightning: "++, win, guesses",
    });
  }
}

export const db = new Database();
