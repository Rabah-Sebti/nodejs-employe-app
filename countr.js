//pour ajouter les produits a la base de données
const express = require("express");
require("dotenv").config();
const connectDB = require("./db/connect");
const Country = require("./models/country");
const jsonCount = require("./country.json");
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Country.deleteMany(); //supprimer les données a la bd
    await Country.create(jsonCount);
    console.log("success data ajouter a BD !!!!!!!");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
start();
