import Dexie, { type Table } from "dexie";

export interface Result {
  win: boolean;
}

export interface ClassicResult extends Result {
  guesses: number;
}

export class Database extends Dexie {
  classic!: Table<ClassicResult>;

  constructor() {
    super("database");
    this.version(1).stores({
      classic: "++, win, guesses",
    });
  }
}

export const db = new Database();
