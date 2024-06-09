import Dexie, { type Table } from "dexie";

export interface Result {
  win: boolean;
}

export interface ClassicResult extends Result {
  guesses: number;
}

interface DailyResult {
  date: string;
  guesses: number;
}

interface Stat {
  name: string;
  value: number;
}

export class Database extends Dexie {
  classic!: Table<ClassicResult>;
  daily!: Table<DailyResult>;
  stats!: Table<Stat>;

  constructor() {
    super("database");
    this.version(1).stores({
      stats: "name, value",
      classic: "++, win, guesses",
      daily: "date, guesses",
    });
  }
}

export const db = new Database();
