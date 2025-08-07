import { Sequelize } from 'sequelize';
import UrlModel from './url.js'
import 'dotenv/config';


const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  String(process.env.DB_PASS),
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false,
    port: Number(process.env.DB_PORT) || 5432
  }
);

const db = {
  Sequelize,
  sequelize,
  Url: UrlModel(sequelize)
};

export default db;