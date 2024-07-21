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

var moment = require('moment-timezone');

var router = express.Router();
var ajvInstance = new Ajv(); // Schemas

var lineItemSchema = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      itemId: {
        type: 'number'
      },
      itemName: {
        type: 'string'
      },
      price: {
        type: 'number'
      }
    }
  },
  required: ['itemId', 'itemName', 'price'],
  additionalProperties: false
};
var invoiceSchema = {
  type: 'object',
  properties: {
    employeeId: {
      type: 'number'
    },
    customerEmail: {
      type: 'string'
    },
    phoneNumber: {
      type: 'number'
    },
    fullName: {
      type: 'string'
    },
    lineItems: lineItemSchema,
    partsAmount: {
      type: 'number'
    },
    laborAmount: {
      type: 'number'
    },
    lineItemTotal: {
      type: 'number'
    },
    invoiceTotal: {
      type: 'number'
    },
    orderDate: {
      type: 'string'
    },
    customOrderDescription: {
      type: 'string',
      nullable: true
    }
  },
  required: ['employeeId', 'customerEmail', 'phoneNumber', 'fullName', 'lineItems', 'partsAmount', 'laborAmount', 'lineItemTotal', 'invoiceTotal'],
  additionalProperties: false
}; // Routes

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

router.post('/:employeeId', function (req, res, next) {
  try {
    // Get the employee ID from the request parameters
    var employeeId = req.params.employeeId; // ParseInt the employee ID

    employeeId = parseInt(employeeId, 10); // If employeeId is NaN; then return status code 400 with message 'Bad request'

    if (isNaN(employeeId)) {
      console.error('Employee Id needs to be a number:', employeeId);
      return next(createError(400, "Bad request: ".concat(employeeId)));
    } // Get the data from the request body


    var invoice = req.body; // Parse the number variables

    invoice.phoneNumber = parseInt(invoice.phoneNumber, 10);
    invoice.partsAmount = parseFloat(invoice.partsAmount, 10);
    invoice.laborAmount = parseFloat(invoice.laborAmount, 10);
    invoice.lineItemTotal = parseFloat(invoice.lineItemTotal, 10);
    invoice.invoiceTotal = parseFloat(invoice.invoiceTotal, 10); // Check if the phoneNumber, partsAmount, laborAmount, lineItemTotal and/or invoiceTotal are numbers; if not then return status code 400 with message 'Bad request'

    if (isNaN(invoice.phoneNumber) || isNaN(invoice.partsAmount) || isNaN(invoice.laborAmount) || isNaN(invoice.lineItemTotal) || isNaN(invoice.invoiceTotal)) {
      console.error('Make sure phoneNumber, partsAmount, laborAmount, lineItemTotal and/or invoiceTotal and all number type.');
      return next(createError(400, 'Bad request: Inputs must be numbers.'));
    } // Validate the invoice against the schema


    var validate = ajvInstance.compile(invoiceSchema);
    var valid = validate(invoice); // If the invoice object doesn't match the invoiceSchema; then return status code 400 with message 'Bad request'

    if (!valid) {
      console.error('Error validating invoice object against the schema', validate.errors);
      return next(createError(400, "Bad request: ".concat(validate.errors)));
    } // Call mongo and do the operations needed to create an invoice


    mongo(function _callee(db) {
      var invoices, employee, lastInvoice, newInvoiceId, newInvoice, result;
      return regeneratorRuntime.async(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(db.collection('invoices').find().sort({
                invoiceId: 1
              }).toArray());

            case 2:
              invoices = _context.sent;
              _context.next = 5;
              return regeneratorRuntime.awrap(db.collection('employees').findOne({
                employeeId: employeeId
              }));

            case 5:
              employee = _context.sent;

              if (employee) {
                _context.next = 9;
                break;
              }

              console.error('Employee not found with that employeeId:', employeeId);
              return _context.abrupt("return", next(createError(404, "Not found: ".concat(employeeId))));

            case 9:
              // Get the last invoice
              lastInvoice = invoices[invoices.length - 1];
              console.log("Last invoice ID: ".concat(lastInvoice.invoiceId)); // Create the new invoice ID

              newInvoiceId = lastInvoice.invoiceId + 1;
              console.log("New invoice id: ".concat(newInvoiceId)); // Create the new invoice object.

              newInvoice = {
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
                orderDate: moment().tz('America/Chicago').format('dddd MM-DD-YYYY'),
                // CST
                customOrderDescription: invoice.customOrderDescription
              }; // Insert the new invoice into the invoices collection

              _context.next = 16;
              return regeneratorRuntime.awrap(db.collection('invoices').insertOne(newInvoice));

            case 16:
              result = _context.sent;
              res.status(201).send(newInvoice);

            case 18:
            case "end":
              return _context.stop();
          }
        }
      });
    }, next); // Catch any database errors
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
 *     summary: Retrieves all service requests from all invoices and retruns an array of with itemName and count for each service
 *     description: Returns an array of services requests and amount from all invoices
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal server error
 */

router.get('/service-graph', function _callee3(req, res, next) {
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          try {
            //connect to database and look up all invoices
            mongo(function _callee2(db) {
              var services;
              return regeneratorRuntime.async(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      _context2.next = 2;
                      return regeneratorRuntime.awrap(db.collection('invoices').aggregate([//use mongodb aggregates to filter and collect itemNames and how many there are of each item in all invoices 
                      //$unwind deconstructs an array field from the input documents to output a document for each element
                      {
                        $unwind: "$lineItems"
                      }, //$group stage separates documents into groups according to a "group key" ie itemName
                      {
                        $group: {
                          //Get items names from line items 
                          _id: "$lineItems.itemName",
                          //count and return the amount of items in each group by name
                          itemCount: {
                            $sum: 1
                          } // //push items into an array 
                          // details: { $push: "$lineItems"}

                        }
                      } // return an array of the grouped items for graphing   
                      ]).toArray());

                    case 2:
                      services = _context2.sent;

                      //If there is no service data send 404, no services found
                      if (services.length <= 0) {
                        res.status(404).json({
                          error: 'No services found in invoices'
                        });
                      } //send array to client 


                      res.status(200).json(services);

                    case 5:
                    case "end":
                      return _context2.stop();
                  }
                }
              });
            }); // Catch any database errors
          } catch (err) {
            console.error(err);
            next(err);
          }

        case 1:
        case "end":
          return _context3.stop();
      }
    }
  });
}); // Export the router

module.exports = router;