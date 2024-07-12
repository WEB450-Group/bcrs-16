/*
============================================
; Title:  employee-routes.js
; Author: Professor Krasso
; Date: 29. June, 2024
; Modified by: Joanna Brumfield and Zadkiel Rodriguez Alvarado
; Description: Employee Routes
;===========================================
*/
"use strict"; // Imports

var express = require("express");

var _require = require("../utils/mongo"),
    mongo = _require.mongo;

var createError = require('http-errors');

var bcrypt = require('bcrypt');

var Ajv = require('ajv');

var router = express.Router();
var ajvInstance = new Ajv();
var saltRounds = 10; // Schemas

var createEmployeeSchema = {
  type: 'object',
  properties: {
    firstName: {
      type: 'string'
    },
    lastName: {
      type: 'string'
    },
    email: {
      type: 'string'
    },
    phoneNumber: {
      type: 'number'
    },
    address: {
      type: 'string'
    },
    role: {
      type: 'string'
    }
  },
  required: ['firstName', 'lastName', 'email', 'phoneNumber', 'address', 'role'],
  additionalProperties: false
};
var updateEmployeeSchema = {
  type: 'object',
  properties: {
    role: {
      type: 'string'
    },
    isDisabled: {
      type: 'boolean'
    }
  },
  required: ['role', 'isDisabled'],
  additionalProperties: false
};
var emailSchema = {
  type: 'object',
  properties: {
    email: {
      type: 'string'
    }
  },
  required: ['email'],
  additionalProperties: false
}; //Routes

/**
 * findAll
 * @openapi
 * /api/employees:
 *   get:
 *     tags:
 *       - Employees
 *     description: API for returning a list of employee documents from MongoODB
 *     summary: return list of employee documents
 *     responses:
 *       '200':
 *         description: OK - Array of employee documents
 *       '400':
 *         description: Bad Request (?? How and where to implement since it is a get request with no req.body?)
 *       '504':
 *         description: Not Found
 *       '500':
 *         description: Internal Server Error
 */

router.get('/', function (req, res, next) {
  try {
    //connect to database
    mongo(function _callee(db) {
      var employees;
      return regeneratorRuntime.async(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(db.collection('employees').find({}, {
                //What to return from database NOTE: assuming we pull it all than depending on the role deal with that on the from end for the employee list?
                projection: {
                  firstName: 1,
                  lastName: 1,
                  employeeId: 1,
                  email: 1,
                  phoneNumber: 1,
                  isDisabled: 1,
                  role: 1
                } //Turn into an array

              }).toArray());

            case 2:
              employees = _context.sent;
              console.log('Employee list', employees); //If employee list is empty, return 404

              if (!(!employees || employees.length === 0)) {
                _context.next = 6;
                break;
              }

              return _context.abrupt("return", res.status(404).json({
                error: 'No Employees Found'
              }));

            case 6:
              //return array of employee objects
              res.json(employees);

            case 7:
            case "end":
              return _context.stop();
          }
        }
      });
    }); //Database error handling
  } catch (err) {
    console.error('Error: ', err);
    next(err);
  }
}); // employee-routes.js
// ▪ Verb: GET
// ▪ Route: localhost:3000/api/users/:userId
// ▪ Status: 200 – OK
// ▪ Error Handling:
// 400 – Bad Request
// 404 – Not Found
// 500 – Internal Server Error

/**
 * findById
 * @openapi
 * /api/employees/{id}:
 *   get:
 *     tags:
 *       - Employees
 *     description: Returns employee by id
 *     summary: Returns an employee document
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Employee ID
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Employee document requested by user
 *       '404':
 *         description: Employee not found
 *       '500':
 *         description: Server exception
 */

router.get('/:employeeId', function (req, res, next) {
  try {
    //Employee ID params
    var employeeId = req.params.employeeId; //parse to integer

    employeeId = parseInt(employeeId, 10); //if input not numerical,return 400

    if (isNaN(employeeId)) {
      var err = new Error('Input must be a number');
      err.status = 400;
      return next(err);
    } //connect to database


    mongo(function _callee2(db) {
      var employee;
      return regeneratorRuntime.async(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return regeneratorRuntime.awrap(db.collection('employees').findOne({
                employeeId: employeeId
              }, {
                //What to return from database
                projection: {
                  firstName: 1,
                  lastName: 1,
                  employeeId: 1,
                  email: 1,
                  phoneNumber: 1,
                  isDisabled: 1,
                  role: 1
                }
              }));

            case 2:
              employee = _context2.sent;

              if (employee) {
                _context2.next = 5;
                break;
              }

              return _context2.abrupt("return", res.status(404).json({
                error: 'Employee Not Found'
              }));

            case 5:
              //return employee document
              res.json(employee);

            case 6:
            case "end":
              return _context2.stop();
          }
        }
      });
    });
  } //Mong error handling
  catch (err) {
    console.error('Error: ', err);
    next(err);
  }
});
/**
 * createEmployee
 * @openapi
 * /api/employees:
 *   post:
 *     tags:
 *       - Employees
 *     description: API for creating an employee
 *     summary: Creates a new employee
 *     requestBody:
 *       description: Employee Information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - phoneNumber
 *               - address
 *               - role
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               phoneNumber:
 *                 type: number
 *               address:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Employee created successfully
 *       '400':
 *         description: Bad Request
 *       '500':
 *         description: Internal Server Error
 *       '501':
 *         description: Database Error
 */

router.post('/', function (req, res, next) {
  try {
    console.log("Starting the create employee API..."); // Get the data for the new employee from the request body

    var employee = req.body; // Validate the employee object against the createEmployeeSchema

    var validate = ajvInstance.compile(createEmployeeSchema);
    var valid = validate(employee); // If the employee object is not valid; then return status code 400 with message 'Bad request'

    if (!valid) {
      console.error('Error validating employee object against schema', validate.errors);
      return next(createError(400, "Bad request: ".concat(validate.errors)));
    } // Call mongo and create the new user


    mongo(function _callee3(db) {
      var employees, existingEmployee, lastEmployee, newEmployeeId, checkPhoneNumber, newEmployee, result;
      return regeneratorRuntime.async(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return regeneratorRuntime.awrap(db.collection('employees').find().sort({
                employeeId: 1
              }).toArray());

            case 2:
              employees = _context3.sent;
              // Check if the employee exists already in the database
              existingEmployee = employees.find(function (emp) {
                return emp.email === employee.email;
              }); // If the employee exists; then throw an error status code 409 with message 'Employee already exists!'

              if (!existingEmployee) {
                _context3.next = 7;
                break;
              }

              console.error('Employee already exists!');
              return _context3.abrupt("return", next(createError(409, 'Employee already exists')));

            case 7:
              // Create the new employeeId for the registering user by getting the lastEmployee's employeeId and adding 1 to it
              lastEmployee = employees[employees.length - 1];
              newEmployeeId = lastEmployee.employeeId + 1; // Check that the checkPhoneNumber is consists of numbers only with the parseInt function; If the checkPhoneNumber is is not a number it will return NaN

              checkPhoneNumber = parseInt(employee.phoneNumber, 10); // If the checkPhoneNumber is NaN; then return a status code 400 with a message "Invalid phone number!"

              if (!isNaN(checkPhoneNumber)) {
                _context3.next = 13;
                break;
              }

              console.error("Invalid phone number!");
              return _context3.abrupt("return", next(createError(400, "Invalid phone number!")));

            case 13:
              if (!(checkPhoneNumber.toString().length !== 10)) {
                _context3.next = 16;
                break;
              }

              console.log("Invalid phone number!");
              return _context3.abrupt("return", next(createError(400, "Invalid phone number!")));

            case 16:
              console.log("Phone number is valid!");
              console.log("Creating the employee..."); // Create the new employee

              newEmployee = {
                employeeId: newEmployeeId,
                firstName: employee.firstName,
                lastName: employee.lastName,
                email: employee.email,
                password: '',
                phoneNumber: employee.phoneNumber,
                address: employee.address,
                isDisabled: false,
                role: employee.role,
                selectedSecurityQuestion: []
              };
              console.log("Inserting new employee to the employees collection..."); // Insert the new employee into the employees collection

              _context3.next = 22;
              return regeneratorRuntime.awrap(db.collection("employees").insertOne(newEmployee));

            case 22:
              result = _context3.sent;
              res.status(201).send({
                message: "Employee created successfully!",
                json: newEmployee
              });
              console.log("New employee inserted successfully!");

            case 25:
            case "end":
              return _context3.stop();
          }
        }
      });
    }, next); // Catch any database errors
  } catch (err) {
    console.error('Database Error:', err);
    next(err);
  }
});
/**
 * updateEmployee
 * @openapi
 * /api/employees/{employeeId}:
 *   put:
 *     tags:
 *       - Employees
 *     description: API for update an employee data
 *     summary: Update an employee
 *     parameters:
 *       - name: employeeId
 *         in: path
 *         description: The Employee ID requested by the user.
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Updating data request
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - role
 *               - isDisabled
 *             properties:
 *               role:
 *                 type: string
 *               isDisabled:
 *                 type: boolean
 *     responses:
 *       '204':
 *         description: Employee updated successfully
 *       '400':
 *         description: Bad Request
 *       '404':
 *         description: Employee not found
 *       '500':
 *         description: Internal Server Error
 *       '501':
 *         description: Database Error
 */

router.put('/:employeeId', function (req, res, next) {
  try {
    console.log('Updating the employee ID...'); // Get the employee ID from the request parameters

    var employeeId = req.params.employeeId;
    console.log('Checking if the employee ID is a valid...'); // Check if the employee ID is a number with the parseInt function; if is not a number it will return NaN

    employeeId = parseInt(employeeId, 10); // If the employee ID is NaN; then return status code 400 with message "Employee ID must be a number"

    if (isNaN(employeeId)) {
      console.error("Employee ID must be a number!");
      return next(createError(400, "Employee ID must be a number: ".concat(employeeId)));
    }

    console.log('The employee ID is valid!'); // Call mongo and update the employee

    mongo(function _callee4(db) {
      var employee, updateEmployee, validate, valid, result;
      return regeneratorRuntime.async(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              console.log('Getting the employee from the collection with the employee ID...'); // Get the employee from the employees collection with the employee ID

              _context4.next = 3;
              return regeneratorRuntime.awrap(db.collection('employees').findOne({
                employeeId: employeeId
              }));

            case 3:
              employee = _context4.sent;
              console.log('Employee is found!'); // If the employee is not found with given employee ID; then return status code 404 with message "Employee not found with employee ID"

              if (employee) {
                _context4.next = 8;
                break;
              }

              console.error('Employee not found with employee ID: ', employeeId);
              return _context4.abrupt("return", next(createError(404, "Employee not found with employee ID: ".concat(employeeId))));

            case 8:
              console.log('Getting the data that will update from the employee from the request body...'); // Get the role and isDisabled from the request

              updateEmployee = req.body; // Validate the updateEmployee object against the updateEmployeeSchema

              validate = ajvInstance.compile(updateEmployeeSchema);
              valid = validate(updateEmployee); // If the updateEmployee object is not valid; then return a status code 400 with a message 'Bad Request'

              if (valid) {
                _context4.next = 15;
                break;
              }

              console.error('Error validating the updateEmployee against the schema');
              return _context4.abrupt("return", next(createError(400, "Bad request: ".concat(validate.errors))));

            case 15:
              _context4.next = 17;
              return regeneratorRuntime.awrap(db.collection('employees').updateOne({
                employeeId: employeeId
              }, {
                $set: {
                  role: updateEmployee.role,
                  isDisabled: updateEmployee.isDisabled
                }
              }));

            case 17:
              result = _context4.sent;
              console.log('Employee is updated successfully!'); // Send successful response to the client

              res.status(204).send();

            case 20:
            case "end":
              return _context4.stop();
          }
        }
      });
    }, next); // Catch any database errors
  } catch (err) {
    console.error("Database Error:", err);
    next(err);
  }
}); // Note: The deleteUser API does not actually remove a document from the collection. Instead, you are setting a property named “isDisabled” to true.

/**
 * deleteUser
 * @openapi
 * /api/employees/{employeeId}/disable:
 *   put:
 *     tags:
 *       - Employees
 *     description: Disables an employee by id
 *     summary: Disables an employee document so they don't show up in contact list for correct employees (?)
 *     parameters:
 *       - name: employeeId
 *         in: path
 *         required: true
 *         description: EmployeeId
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Employee document disabled
 *       '400':
 *         description: Bad Request
 *       '404':
 *         description: Not Found
 *       '500':
 *         description:  Internal Server Error
 */

router.put('/:employeeId/disable', function (req, res, next) {
  try {
    //Employee ID params
    var employeeId = req.params.employeeId; //parse to integer

    employeeId = parseInt(employeeId, 10); //if input not numerical,return 400

    if (isNaN(employeeId)) {
      var err = new Error('Input must be a number');
      err.status = 400;
      return next(err);
    } //connect to database


    mongo(function _callee5(db) {
      var employee, result;
      return regeneratorRuntime.async(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return regeneratorRuntime.awrap(db.collection('employees').findOne({
                employeeId: employeeId
              }));

            case 2:
              employee = _context5.sent;

              if (employee) {
                _context5.next = 5;
                break;
              }

              return _context5.abrupt("return", res.status(404).json({
                error: 'Employee Not Found'
              }));

            case 5:
              _context5.next = 7;
              return regeneratorRuntime.awrap(db.collection('employees').updateOne({
                employeeId: employeeId
              }, {
                $set: {
                  isDisabled: true
                }
              }));

            case 7:
              result = _context5.sent;

              if (result.modifiedCount) {
                _context5.next = 10;
                break;
              }

              return _context5.abrupt("return", next(createError(400, 'Unable to disable employee - note they may already be disabled')));

            case 10:
              res.status(204).send();

            case 11:
            case "end":
              return _context5.stop();
          }
        }
      });
    });
  } //Mongo error handling
  catch (err) {
    console.error('Error: ', err);
    next(err);
  }
}); // findSelectedSecurityQuestions:
// ▪ Verb: POST
// ▪ Route: localhost:3000/api/users/:email/security-questions
// ▪ Status: 200 – OK
// ▪ Error Handling:
// • 400 – Bad Request
// • 404 – Not Found
// • 500 – Server Error

/**
 * findSelectedSecurityQuestions
 * @openapi
 * /api/employees/{email}/security-questions:
 *   get:
 *     tags:
 *       - Employees
 *     description: Returns employees selected security questions based on user's email
 *     summary: Returns an employee's selected security questions
 *     parameters:
 *       - name: email
 *         in: path
 *         required: true
 *         description: Employee email
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Employee's selected security questions
 *       '404':
 *         description: Employee not found
 *       '500':
 *         description: Server exception
 */

router.get('/:email/security-questions', function (req, res, next) {
  try {
    //email parameter 
    var email = req.params.email; //log email 

    console.log('Employee email', email); // Validate the email against email schema

    var validate = ajvInstance.compile(emailSchema);
    var valid = validate({
      email: email
    }); // If the email is not valid; return 400 bad request

    if (!valid) {
      console.error('Error validating email against schema', validate.errors);
      return next(createError(400, "Bad request: ".concat(validate.errors)));
    } //connect to databse 


    mongo(function _callee6(db) {
      var employee, err;
      return regeneratorRuntime.async(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return regeneratorRuntime.awrap(db.collection('employees').findOne({
                email: email
              }, {
                projection: {
                  email: 1,
                  employeeId: 1,
                  selectedSecurityQuestions: 1
                }
              }));

            case 2:
              employee = _context6.sent;

              if (employee) {
                _context6.next = 9;
                break;
              }

              err = new Error('Email does not exist');
              err.status = 404;
              console.log('Employee not found with email', email);
              next(err);
              return _context6.abrupt("return");

            case 9:
              //send status 200 with email
              res.send(employee.selectedSecurityQuestions);

            case 10:
            case "end":
              return _context6.stop();
          }
        }
      });
    }, next);
  } catch (err) {
    console.error("Error:", err);
    next(err);
  }
}); // Export the router

module.exports = router;