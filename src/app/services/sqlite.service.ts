import { Injectable } from '@angular/core';
import initSqlJs from 'sql.js';

@Injectable({
  providedIn: 'root'
})
export class SQLiteService {
  private db: any;

  constructor() {}

  async getDB(): Promise<any> {
    if (!this.db) {
      const SQL = await initSqlJs();
      this.db = new SQL.Database();
      // Create tables 
      this.initializeDB();
    }
    return this.db;
  }

  private initializeDB() {
    const createTableSQL = `
      CREATE TABLE IF NOT EXISTS publications (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        subtitle TEXT,
        description TEXT,
        photo TEXT
      )
    `;
    this.db.run(createTableSQL);
  }
}
