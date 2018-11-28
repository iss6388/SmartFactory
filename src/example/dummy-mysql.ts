import { injectable } from "../lib";
import { Modules } from './modules';
import { MysqlConfig } from './types';

injectable(Modules.MysqlDriver,
  [Modules.MysqlConfig],
  async (cfg: MysqlConfig): Promise<Connection> => {
    const connection = connector(cfg);
    return await connection();
  });

type Connection = {
  query: (sql: string, params?: any[]) => Promise<any>;
};

const connector = (cfg: MysqlConfig) =>
  async (): Promise<Connection> => {
    await delay(0.5);
    return {
      async query(sql: string, params?: any[]) {
        return [
          { test: 'test-data' },
          { test: 'test-data-2' }
        ];
      }
    }
  };

const delay = (sec: number): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, sec * 1000);
  });
};