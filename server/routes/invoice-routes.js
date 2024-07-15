/*
============================================
; Title:  employee-routes.js
; Author: Professor Krasso
; Date: 15. Jule, 2024
; Modified by: Joanna Brumfield and Zadkiel Rodriguez Alvarado
; Description: Employee Routes
;===========================================
*/
"use strict";

// Imports
const express = require("express");
const { mongo } = require("../utils/mongo");
const createError = require('http-errors');
const Ajv = require('ajv');

const router = express.Router();
const ajvInstance = new Ajv();

router.put('/profile/:employeeId', (req, res, next) =>{ 
  try {
    //find all invoices

    //get result projections (ID's and quanity of each item)

    //go through all invoices and check for itemId and quantity
    
    //add total for each line item and save results for each in array
    
    //send results 

  // Mongo DB error handling 
  } catch (err) {
    console.error("Database Error:", err);
    next(err);
  }
})

// Export the router
module.exports = router;