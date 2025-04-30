const {Sequelize} = require('sequelize');
const dotenv = require('dotenv'); 
dotenv.config();
let sequelize;
console.log(process.env.DATABASE_URL);

sequelize = new Sequelize(process.env.DATABASE_URL);

module.exports= sequelize;