/**
 * sequelize.js - creates and exports a configured Sequelize client instance (DB client)
 * 
 * This file will specifically do the following:
 * - load environment variables
 * - read the database url
 * - creates a Sequelize object that knows how to talk to the DB
 * - exports it so other files can use it
 */

const {Sequelize} = require('sequelize');
const dotenv = require('dotenv'); 
dotenv.config();

const isTest = process.env.NODE_ENV === 'test';
let sequelize;
console.log(process.env.DATABASE_URL);

sequelize = isTest 
  ? new Sequelize('sqlite::memory:', {logging: false})
  : new Sequelize(process.env.DATABASE_URL)

module.exports= sequelize;