/*
============================================
; Title:  security-routes
; Author: Professor Krasso
; Date: 29. June, 2024
; Modified by: Joanna Brumfield and Zadkiel Rodriguez Alvarado
; Description: Security Routes
;===========================================
*/
'use strict'; // Imports

var express = require('express');

var _require = require('../utils/mongo'),
    mongo = _require.mongo;

var createError = require('http-errors');

var bcrypt = require('bcrypt');

var Ajv = require('ajv');

var router = express.Router();
var saltRounds = 10;
var ajvInstance = new Ajv(); // Schemas

var securityQuestionSchema = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      question: {
        type: 'string'
      },
      answer: {
        type: 'string'
      }
    },
    required: ['question', 'answer'],
    additionalProperties: false
  },
  minItems: 3
};
var registerSchema = {
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
    password: {
      type: 'string'
    },
    address: {
      type: 'string'
    },
    phoneNumber: {
      type: 'string'
    },
    role: {
      type: 'string'
    },
    isDisabled: {
      type: 'boolean'
    },
    selectedSecurityQuestions: securityQuestionSchema
  },
  required: ['firstName', 'lastName', 'email', 'password', 'address', 'phoneNumber', 'selectedSecurityQuestions'],
  additionalProperties: false
};
var signInSchema = {
  type: 'object',
  properties: {
    email: {
      type: 'string'
    },
    password: {
      type: 'string'
    }
  },
  required: ['email', 'password'],
  additionalProperties: false
};
var resetPasswordSchema = {
  type: 'object',
  properties: {
    password: {
      type: 'string'
    }
  },
  required: ['password'],
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
}; // Routes

/**
 * employee Register
 * @openapi
 * /api/security/register:
 *   post:
 *     tags:
 *      - Security
 *     description: API for creating new employees
 *     summary: Employee Registration
 *     requestBody:
 *       description: Employee Information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - firstName
 *               - lastName
 *               - emailAddress
 *               - password
 *               - phoneNumber
 *               - address
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               phoneNumber:
 *                 type: number
 *               address:
 *                 type: string
 *               selectedSecurityQuestions:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     question:
 *                       type: string
 *                     answer:
 *                       type: string
 *     responses:
 *       '201':
 *         description: Employee created successfully
 *       '400':
 *         description: Bad request
 *       '409':
 *         description: Employee already exists
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

router.post('/register', function (req, res, next) {
  try {
    console.log('Creating a new employee...'); // Get the user information from the request body

    var employee = req.body;
    console.log(employee); // Validate the employee data against the registerSchema

    var validate = ajvInstance.compile(registerSchema);
    var valid = validate(employee); // If the employee object is not valid; then return a status code 400 with message 'Bad request'

    if (!valid) {
      console.error('Employee object does not match the registerSchema: ', validate.errors);
      return next(createError(400, "Bad request: ".concat(validate.errors)));
    } // Encrypt the employee's password using bcrypt


    employee.password = bcrypt.hashSync(employee.password, saltRounds); // Make phoneNumber number input into a number

    employee.phoneNumber = Number(employee.phoneNumber); // Call mongo and create the new employee

    mongo(function _callee(db) {
      var employees, existingEmployee, lastEmployee, newEmployeeId, newEmployee, result;
      return regeneratorRuntime.async(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              console.log("Checking if the employee email exists in the database..."); // Get all the employees from the database and sort them by the employeeId

              _context.next = 3;
              return regeneratorRuntime.awrap(db.collection('employees').find().sort({
                employeeId: 1
              }).toArray());

            case 3:
              employees = _context.sent;
              // Check if the employee exists already in the database
              existingEmployee = employees.find(function (emp) {
                return emp.email === employee.email;
              }); // If the employee exists; then throw an error status code 409 with message 'Employee already exists!'

              if (!existingEmployee) {
                _context.next = 8;
                break;
              }

              console.error('Employee already exists!');
              return _context.abrupt("return", next(createError(409, 'Employee already exists')));

            case 8:
              // Create the new employeeId for the registering user by getting the lastEmployee's employeeId and adding 1 to it
              lastEmployee = employees[employees.length - 1];
              console.log("lastEmployeeId: ".concat(lastEmployee.employeeId, "\n First name: ").concat(lastEmployee.firstName, "\n Last name: ").concat(lastEmployee.lastName));
              newEmployeeId = lastEmployee.employeeId + 1;
              console.log('new employeeId:' + newEmployeeId); // Create the new employee object

              newEmployee = {
                employeeId: newEmployeeId,
                firstName: employee.firstName,
                lastName: employee.lastName,
                email: employee.email,
                password: employee.password,
                phoneNumber: employee.phoneNumber,
                address: employee.address,
                isDisabled: false,
                role: 'standard',
                selectedSecurityQuestions: employee.selectedSecurityQuestions
              }; // Insert new employee to the employee collection

              _context.next = 15;
              return regeneratorRuntime.awrap(db.collection("employees").insertOne(newEmployee));

            case 15:
              result = _context.sent;
              console.log('New employee created successfully!');
              res.status(201).send(employee);

            case 18:
            case "end":
              return _context.stop();
          }
        }
      });
    }, next);
  } catch (err) {
    console.error('Error: ', err);
    next(err);
  }
});
/**
 * employee Sign in
 * @openapi
 * /api/security/signin:
 *   post:
 *     tags:
 *      - Security
 *     description: API for signing in employees
 *     summary: Employee Sign in
 *     requestBody:
 *       description: Employee Information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Employee Sign In Successfully
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Invalid Credentials
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

router.post('/signin', function (req, res, next) {
  try {
    console.log("Employee singing in..."); // Get the email address and password from the request body

    var signIn = req.body; // Validate the sign in data against the singInSchema

    var validate = ajvInstance.compile(signInSchema);
    var valid = validate(signIn); // If the singIn object is not valid; then return a 400 status code with message 'Bad request'

    if (!valid) {
      console.error('Error validating the singIn data with the signInSchema!');
      console.log('signin validation error: ', validate.errors);
      return next(createError(400, "Bad request: ".concat(validate.errors)));
    } // Call mongo and log in employee


    mongo(function _callee2(db) {
      var employee, passwordIsValid;
      return regeneratorRuntime.async(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              console.log("Looking up the employee..."); // Find the employee

              _context2.next = 3;
              return regeneratorRuntime.awrap(db.collection("employees").findOne({
                email: signIn.email
              }));

            case 3:
              employee = _context2.sent;

              if (!employee) {
                _context2.next = 13;
                break;
              }

              console.log("Employee found!");
              console.log("Comparing passwords..."); // Compare the password

              passwordIsValid = bcrypt.compareSync(signIn.password, employee.password); // Else if the password doesn't match; then return status code 400 with message "Invalid credentials"

              if (passwordIsValid) {
                _context2.next = 11;
                break;
              }

              console.error('Invalid password!');
              return _context2.abrupt("return", next(createError(401, "Unauthorized")));

            case 11:
              // If the password matches; then return status code 200 with message "Employee sign in"
              console.log("Password matches!");
              res.send(employee);

            case 13:
            case "end":
              return _context2.stop();
          }
        }
      });
    }, next); // Catch any Database errors
  } catch (err) {
    console.error("Error: ", err);
    next(err);
  }
});
/**
 * employee reset password
 * @openapi
 * /api/security/employees/{email}/reset-password:
 *   post:
 *     tags:
 *      - Security
 *     description: API for resetting employee's password
 *     summary: Employee Reset Password
 *     parameters:
 *       - name: email
 *         in: path
 *         required: true
 *         description: Employee email
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Employee Information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - password
 *             properties:
 *               password:
 *                 type: string
 *     responses:
 *       '204':
 *         description: Employee's password reset successful
 *       '400':
 *         description: Bad request
 *       '404':
 *         description: Not found
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

router.post('/employees/:email/reset-password', function (req, res, next) {
  try {
    // Get the employee email from the parameters
    var email = req.params.email; // Get the employee data from the body

    var employee = req.body; // Validate the employee object against the resetPasswordSchema

    var validate = ajvInstance.compile(resetPasswordSchema);
    var valid = validate(employee); // If the employee object is not valid; return a status code 400 with message 'Bad request'

    if (!valid) {
      console.error('Error validating employee object against schema', validate.errors);
      return next(createError(400, "Bad request: ".concat(validate.errors)));
    } // Call mongo and update the employee's password


    mongo(function _callee3(db) {
      var updateEmployee, hashedPassword, result;
      return regeneratorRuntime.async(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              // Find the employee with the email
              updateEmployee = db.collection('employees').findOne({
                email: email
              }); // If the employee does not exist; then return a status code 404 with message 'Not found'

              if (updateEmployee) {
                _context3.next = 4;
                break;
              }

              console.error('Cannot find employee with that email: ', email);
              return _context3.abrupt("return", next(createError(404, "Not found employee with that email: ".concat(email))));

            case 4:
              // Encrypt the new password using bcrypt
              hashedPassword = bcrypt.hashSync(employee.password, saltRounds); // Update employee's password

              _context3.next = 7;
              return regeneratorRuntime.awrap(db.collection('employees').updateOne({
                email: email
              }, {
                $set: {
                  password: hashedPassword
                }
              }));

            case 7:
              result = _context3.sent;
              // Return status code 204
              res.status(204).send();

            case 9:
            case "end":
              return _context3.stop();
          }
        }
      });
    }, next); // Catch any database errors
  } catch (err) {
    console.error("Error", err);
    next(err);
  }
});
/**
 * verify employee email
 * @openapi
 * /api/security/verify/employees/{email}:
 *   post:
 *     tags:
 *      - Security
 *     description: API for verifying employee's email
 *     summary: Verify Employee Email
 *     parameters:
 *       - name: email
 *         in: path
 *         required: true
 *         description: Employee email
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Employee Email found
 *       '400':
 *         description: Bad request
 *       '404':
 *         description: Not found
 *       '500':
 *         description: Internal Server Exception
 */

router.post('/verify/employees/:email', function (req, res, next) {
  try {
    //email parameter 
    var email = req.params.email; //log email 

    console.log('Employee email', email); // Validate the email against email schema with regex

    var validate = ajvInstance.compile(emailSchema);
    var valid = validate({
      email: email
    }); // If the email is not valid; return 400 bad request

    if (!valid) {
      console.error('Error validating email against schema', validate.errors);
      return next(createError(400, "Bad request: ".concat(validate.errors)));
    } //connect to databse 


    mongo(function _callee4(db) {
      var employee, err;
      return regeneratorRuntime.async(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return regeneratorRuntime.awrap(db.collection('employees').findOne({
                email: email
              }));

            case 2:
              employee = _context4.sent;
              console.log(employee); //If no employees have matching email send 404 not found 

              if (employee) {
                _context4.next = 10;
                break;
              }

              err = new Error('Email does not exist');
              err.status = 404;
              console.log('Employee not found with email', email);
              next(err);
              return _context4.abrupt("return");

            case 10:
              //send status 200 with email
              res.status(200).json({
                email: employee.email
              });

            case 11:
            case "end":
              return _context4.stop();
          }
        }
      });
    }, next);
  } catch (err) {
    console.error("Error:", err);
    next(err);
  }
});
/**
 * verifySecurityQuestions
 * @openapi
 * /api/security/verify/employees/{email}/security-questions:
 *   post:
 *     tags:
 *       - Security
 *     description: Used for verifying employee email address and retrieving their selected security questions
 *     summary: Verify Employee Email and Get Security Questions
 *     parameters:
 *       - name: email
 *         in: path
 *         required: true
 *         description: Employee email
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Security questions to be verified
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             minItems: 3
 *             items:
 *               type: object
 *               properties:
 *                 question:
 *                   type: string
 *                 answer:
 *                   type: string
 *     responses:
 *       '200':
 *         description: Employee email verified and security questions verified
 *       '400':
 *         description: Bad request
 *       '404':
 *         description: Not found
 *       '401':
 *         description: Unauthorized, security answers do not match records
 *       '500':
 *         description: Internal Server Exception
 */

router.post('/verify/employees/:email/security-questions', function (req, res, next) {
  try {
    //email parameter
    var email = req.params.email; //capture request body

    var securityQuestions = req.body; //log email

    console.log('Employee email', email); //log security questions

    console.log('Employee security questions', securityQuestions); // Validate security questions against schema

    var validate = ajvInstance.compile(securityQuestionSchema);
    var valid = validate(securityQuestions); //If the email is not valid; return 400 bad request

    if (!valid) {
      console.error('Error validating security questions/answers against schema', validate.errors);
      return next(createError(400, "Bad request: ".concat(validate.errors)));
    } //connect to database


    mongo(function _callee5(db) {
      var employee, err;
      return regeneratorRuntime.async(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return regeneratorRuntime.awrap(db.collection('employees').findOne({
                email: email
              }));

            case 2:
              employee = _context5.sent;

              if (employee) {
                _context5.next = 6;
                break;
              }

              console.log('Employee not found with email', email);
              return _context5.abrupt("return", next(createError(404, 'Email does not exist')));

            case 6:
              console.log("Employee", employee); //check entered security questions against user's stored security questions

              if (!(securityQuestions[0].answer !== employee.selectedSecurityQuestions[0].answer || securityQuestions[1].answer !== employee.selectedSecurityQuestions[1].answer || securityQuestions[2].answer !== employee.selectedSecurityQuestions[2].answer)) {
                _context5.next = 14;
                break;
              }

              //Error handling for unauthorized/non-matching answers
              err = new Error("Unauthorized");
              err.status = 401;
              err.message = "Unauthorized: One or more of your security answers do not match our records";
              console.log("Security answers do not match");
              next(err);
              return _context5.abrupt("return");

            case 14:
              //send status 200 and employee security qustions
              res.send(employee.selectedSecurityQuestions);

            case 15:
            case "end":
              return _context5.stop();
          }
        }
      });
    }, next); //Mongo DB error handling
  } catch (err) {
    console.error("Error:", err);
    next(err);
  }
}); // Export the router

module.exports = router;