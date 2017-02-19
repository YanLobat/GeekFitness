"use strict";

const fs        = require('fs');
const path      = require('path');
const Sequelize = require('sequelize');

const env       = process.env.NODE_ENV || "development";
//TODO config
const sequelize = new Sequelize('postgres://postgres:@localhost:5432/postgres');

let db        = {};
let modelsPath = path.resolve(__dirname,'../', 'models');
fs
  .readdirSync(modelsPath)
  .forEach((file) => {
    let model = sequelize.import(path.join(modelsPath , file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
