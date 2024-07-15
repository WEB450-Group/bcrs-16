/*
============================================
; Title:  employee-routes.js
; Author: Professor Krasso
; Date: 15. Jule, 2024
; Modified by: Joanna Brumfield and Zadkiel Rodriguez Alvarado
; Description: Employee Routes
;===========================================
*/
"use strict"; // Imports

var express = require("express");

var _require = require("../utils/mongo"),
    mongo = _require.mongo;

var createError = require('http-errors');

var Ajv = require('ajv');

var router = express.Router();
var ajvInstance = new Ajv();
router.put('/profile/:employeeId', function (req, res, next) {
  try {//find all invoices
    //get result projections (ID's and quanity of each item)
    //go through all invoices and check for itemId and quantity
    //add total for each line item and save results for each in array
    //send results 
    // Mongo DB error handling 
  } catch (err) {
    console.error("Database Error:", err);
    next(err);
  }
}); // Export the router

module.exports = router;