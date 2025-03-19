const { Sequelize } = require('sequelize');
require('dotenv').config();

const URL = process.env.DATABASE_URL ?? 'postgres://postgres:postgres@localhost:5432/blogDb';

const sequelize = new Sequelize(URL, {
  dialect: 'postgres',
  logging: false,
});

module.exports = sequelize;
