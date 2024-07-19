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
      itemId: { type: 'number' },
      itemName: { type: 'string' },
      price: { type: 'number' }
    },
  },
  required: [ 'itemId', 'itemName' , 'price' ],
  additionalProperties: false
};

const invoiceSchema = {
  type: 'object',
  properties: {
    customerEmail: { type: 'string' },
    phoneNumber: { type: 'number' },
    fullName: { type: 'string' },
    lineItems: lineItemSchema,
    partsAmount: { type: 'number' },
    laborAmount: { type: 'number' },
    lineItemTotal: { type: 'number' },
    invoiceTotal: { type: 'number' }
  },
  required: [ 'customerEmail', 'phoneNumber', 'fullName', 'lineItems', 'partsAmount', 'laborAmount', 'lineItemTotal', 'invoiceTotal' ],
  additionalProperties: false
};

// Routes

/**
 * create Invoices
 * @openapi
 * /api/invoices/{employeeId}:
 *   post:
 *     tags:
 *      - Invoices
 *     description: API for creating new Invoices
 *     summary: Customer Invoices
 *     parameters:
 *       - name: employeeId
 *         in: path
 *         required: true
 *         description: Employee Id
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Invoice Information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - customerEmail
 *               - phoneNumber
 *               - fullName
 *               - lineItems
 *               - partsAmount
 *               - laborAmount
 *               - lineItemTotal
 *               - invoiceTotal
 *             properties:
 *               customerEmail:
 *                 type: string
 *               phoneNumber:
 *                 type: number
 *               fullName:
 *                 type: string
 *               lineItems:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     itemId:
 *                       type: number
 *                     itemName:
 *                       type: string
 *                     price:
 *                       type: number
 *               partsAmount:
 *                 type: number
 *               laborAmount:
 *                 type: number
 *               lineItemTotal:
 *                 type: number
 *               invoiceTotal:
 *                 type: number
 *     responses:
 *       '201':
 *         description: Invoice created
 *       '400':
 *         description: Bad request
 *       '404':
 *         description: Employee not found
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.post('/:employeeId', (req, res, next) => {
  try {
    // Get the employee ID from the request parameters
    let { employeeId } = req.params.employeeId;

    // ParseInt the employee ID
    employeeId = parseInt(employeeId, 10);

    // If employeeId is NaN; then return status code 400 with message 'Bad request'
    if(isNaN(employeeId)) {
      console.error('Employee Id needs to be a number:', employeeId);
      return next(createError(400, `Bad request: ${employeeId}`));
    }

    // Get the data from the request body
    const invoice = req.body;

    // Parse the number variables
    invoice.phoneNumber = parseInt(invoice.phoneNumber, 10);
    invoice.partsAmount = parseFloat(invoice.partsAmount, 10);
    invoice.laborAmount = parseFloat(invoice.laborAmount, 10);
    invoice.lineItemTotal = parseFloat(invoice.lineItemTotal, 10);
    invoice.invoiceTotal = parseFloat(invoice.invoiceTotal, 10);

    // Check if the phoneNumber, partsAmount, laborAmount, lineItemTotal and/or invoiceTotal are numbers; if not then return status code 400 with message 'Bad request'
    if(isNaN(invoice.phoneNumber)
    || isNaN(invoice.partsAmount)
    || isNaN(invoice.laborAmount)
    || isNaN(invoice.lineItemTotal)
    || isNaN(invoice.invoiceTotal)) {
      console.error('Make sure phoneNumber, partsAmount, laborAmount, lineItemTotal and/or invoiceTotal and all number type.');
      return next(createError(400, 'Bad request: Inputs must be numbers.'));
    }

    // Validate the invoice against the schema
    const validate = ajvInstance.compile(invoiceSchema);
    const valid = validate(invoice);

    // If the invoice object doesn't match the invoiceSchema; then return status code 400 with message 'Bad request'
    if(!valid) {
      console.error('Error validating invoice object against the schema', validate.errors);
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

      // Create the new invoice object.
      const newInvoice = {
        invoiceId: newInvoiceId,
        employeeId: employeeId,
        customerEmail: invoice.customerEmail,
        phoneNumber: invoice.phoneNumber,
        fullName: invoice.fullName,
        lineItems: invoice.lineItems,
        partsAmount: invoice.partsAmount,
        laborAmount: invoice.laborAmount,
        lineItemTotal: invoice.lineItemTotal,
        invoiceTotal: invoice.invoiceTotal,
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

/**
 * @openapi
 * /api/invoices/service-graph:
 *   get:
 *     tags:
 *       - Invoices
 *     summary: Retrieves all service requests from all invoices and returns an array of with itemName and count for each service
 *     description: Returns an array of services requests and amount from all invoices
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal server error
 */
router.get('/service-graph', async (req, res, next) => {
  try {
      //connect to database and look up all invoices
      mongo(async (db) => {
          const services = await db.collection('invoices').aggregate([
              //use mongodb aggregates to filter and collect itemNames and how many there are of each item in all invoices
              //$unwind deconstructs an array field from the input documents to output a document for each element
              { $unwind: "$lineItems" },
              //$group stage separates documents into groups according to a "group key" ie itemName
              { $group: {
                  //Get items names from line items
                  '_id': {
                    title: "$lineItems.itemName"
                  },
                  //count and return the amount of items in each group by name
                  'itemCount': { $sum: 1 },
                  // //push items into an array
                  // details: { $push: "$lineItems"}
              }},
              {
                $sort: { '_id.title': 1 }
              }
          // return an array of the grouped items for graphing
          ]).toArray();

          //If there is no service data send 404, no services found
          if(services.length <= 0) {
            res.status(404).json({
              error:'No services found in invoices'
            });
          }
          //send array to client
          res.status(200).json(services);
      });
  // Catch any database errors
  } catch (err) {
    console.error(err);
    next(err);
  }
});



// Export the router
module.exports = router;