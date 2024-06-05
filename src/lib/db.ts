import Dexie, { type Table } from "dexie";

export interface GameResult {
  win: boolean;
}

export class Database extends Dexie {
  history!: Table<GameResult>;

  constructor() {
    super("database");
    this.version(1).stores({
      history: "++, win",
    });
  }
}

export const db = new Database();
