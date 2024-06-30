/*
============================================
; Title:  mongo.js
; Author: Professor Krasso
; Date: 29. June, 2024
; Modified by: Joanna Brumfield and Zadkiel Rodriguez Alvarado
; Description: MongoDB set up 
;===========================================
*/
"use strict";

const {
  MongoClient
} = require("mongodb");

const MONGO_URL = 'mongodb+srv://BCRS_User:s3cret@bcrs-cluster.djwllrd.mongodb.net/?retryWrites=true&w=majority&appName=BCRS-Cluster';

const mongo = async (operations, next) => {

  try {
    console.log("Connecting to database");
  
    const client = await MongoClient.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    const db = client.db("BCRS_DB");
    console.log("Connected to the database!");

    await operations(db);
    console.log("Operations was successful");

    client.close();
    console.log("Disconnected from the database");
  
  } catch (err) {
    const error = new Error("Error Connecting to database", err);
    error.status = 500;
    console.error("Error connecting to the database", err);
    next(error);
  }
}

module.exports = {
  mongo
};