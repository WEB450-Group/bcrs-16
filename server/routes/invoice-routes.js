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
const moment = require('moment-timezone');

const router = express.Router();
const ajvInstance = new Ajv();

// Schemas
const lineItemSchema = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      itemName: { type: 'string' },
      price: { type: 'number' }
    },
  },
  required: [ 'itemName' , 'price' ],
  additionalProperties: false
};

const invoiceSchema = {
  type: 'object',
  properties: {
    employeeId: { type: 'number' },
    customerEmail: { type: 'string' },
    phoneNumber: { type: 'number' },
    fullName: { type: 'string' },
    lineItems: lineItemSchema,
    partsAmount: { type: 'number' },
    laborAmount: { type: 'number' },
    lineItemTotal: { type: 'number' },
    invoiceTotal: { type: 'number' }
  },
  required: [ 'employeeId', 'customerEmail', 'phoneNumber', 'fullName', 'lineItems', 'partsAmount', 'laborAmount', 'lineItemTotal', 'invoiceTotal' ],
  additionalProperties: false
};

// Routes
router.post('/invoices/:employeeId', (req, res, next) => {
  try {
    // Get the data from the request body
    const { employeeId, customerEmail, phoneNumber, fullName, lineItems, partsAmount, laborAmount, lineItemTotal, invoiceTotal } = req.body;

    // Parse the number variables
    phoneNumber = parseInt(phoneNumber, 10);
    partsAmount = parseInt(partsAmount, 10);
    laborAmount = parseInt(laborAmount, 10);
    lineItemTotal = parseInt(lineItemTotal, 10);
    invoiceTotal = parseInt(invoiceTotal, 10);

    // Check if the phoneNumber, partsAmount, laborAmount, lineItemTotal and/or invoiceTotal are numbers; if not then return status code 400 with message 'Bad request'
    if(isNaN(phoneNumber) || isNaN(partsAmount) || isNaN(laborAmount) || isNaN(lineItemTotal) || isNaN(invoiceTotal)) {
      console.error('Make sure phoneNumber, partsAmount, laborAmount, lineItemTotal and/or invoiceTotal and all number type.');
      return next(createError(400, 'Bad request: Inputs must be numbers.'));
    }

    // Validate the lineItems against the schema
    const validate = ajvInstance.compile(lineItemSchema);
    const valid = validate(lineItems);

    // If the lineItems object doesn't match the lineItemSchema; then return status code 400 with message 'Bad request'
    if(!valid) {
      console.error('Error validating lineItems object against the schema', validate.errors);
      return next(createError(400, `Bad request: ${validate.errors}`));
    }

    // Call mongo and do the operations needed to create an invoice
    mongo(async db => {

      // Get all the invoices and sort them by their id
      const invoices = await db.collection('invoices').find().sort({ invoiceId: 1 }).toArray();

      // Check the employee exists
      const employee = await db.collection('employees').findOne({ employeeId: employeeId });

      // If the employee doesn't exist; then return status code 404 with message 'Not found'
      if(!employee) {
        console.error('Employee not found with that employeeId:', employeeId);
        return next(createError(404, `Not found: ${employeeId}`));
      }

      // Get the last invoice
      const lastInvoice = invoices[invoices.length - 1];
      console.log(`Last invoice ID: ${lastInvoice.invoiceId}`);

      // Create the new invoice ID
      const newInvoiceId = lastInvoice.invoiceId + 1;
      console.log(`New invoice id: ${newInvoiceId}`);

      // Create the new invoice object
      const newInvoice = {
        invoiceId: newInvoiceId,
        employeeId: employeeId,
        customerEmail: customerEmail,
        phoneNumber: phoneNumber,
        fullName: fullName,
        lineItems: lineItems,
        partsAmount: partsAmount,
        laborAmount: laborAmount,
        lineItemTotal: lineItemTotal,
        invoiceTotal: invoiceTotal,
        orderDate: moment().tz('America/Chicago').format('dddd MM-DD-YYYY') // CST
      };

      // Insert the new invoice into the invoices collection
      const result = await db.collection('invoices').insertOne(newInvoice);
      res.status(201).send(newInvoice);
    }, next)

    // Catch any database errors
  } catch (err) {
    console.error(err);
    next(err);
  }
});


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