/*
============================================
; Title:  security-routes
; Author: Professor Krasso
; Date: 29. June, 2024
; Modified by: Joanna Brumfield and Zadkiel Rodriguez Alvarado
; Description: Security Routes
;===========================================
*/
'use strict';

// Imports
const express = require('express');
const { mongo } = require('../utils/mongo');
const createError = require('http-errors');
const bcrypt = require('bcrypt');
const Ajv  = require('ajv');

const router = express.Router();
const saltRounds = 10;
const ajvInstance = new Ajv();


// Schemas
const securityQuestionSchema = {
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
    required: [ 'question', 'answer' ],
    additionalProperties: false
  },
  minItems: 3
};

const registerSchema = {
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



const signInSchema = {
  type: 'object',
  properties: {
    email: {
      type: 'string'
    },
    password: {
      type: 'string'
    }
  },
  required: [ 'email', 'password'],
  additionalProperties: false
}

const resetPasswordSchema = {
  type: 'object',
  properties: {
    password: {
      type: 'string'
    }
  },
  required: [ 'password' ],
  additionalProperties: false
}

const emailSchema = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
    }
  },
  required: [ 'email' ],
  additionalProperties: false
}

// Routes
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
 *                 type: string
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
router.post('/register', (req, res, next) => {
  try {
    console.log('Creating a new employee...');

    // Get the user information from the request body
    const employee = req.body;

    console.log(employee);

    // Validate the employee data against the registerSchema
    const validate = ajvInstance.compile(registerSchema);
    const valid = validate(employee);

    // If the employee object is not valid; then return a status code 400 with message 'Bad request'
    if(!valid) {
      console.error('Employee object does not match the registerSchema: ', validate.errors);
      return next(createError(400, `Bad request: ${validate.errors}`));
    }

    // Encrypt the employee's password using bcrypt
    employee.password = bcrypt.hashSync(employee.password, saltRounds);

    // Make phoneNumber number input into a number
    employee.phoneNumber = Number(employee.phoneNumber);

    // Call mongo and create the new employee
    mongo(async db => {

      console.log("Checking if the employee email exists in the database...");
      // Get all the employees from the database and sort them by the employeeId
      const employees = await db.collection('employees')
      .find()
      .sort({ employeeId: 1 }).
      toArray();

      // Check if the employee exists already in the database
      const existingEmployee = employees.find(emp => emp.email === employee.email);

      // If the employee exists; then throw an error status code 409 with message 'Employee already exists!'
      if (existingEmployee) {
        console.error('Employee already exists!');
        return next(createError(409, 'Employee already exists'));
      }

      // Create the new employeeId for the registering user by getting the lastEmployee's employeeId and adding 1 to it
      const lastEmployee = employees[employees.length - 1];
      console.log(`lastEmployeeId: ${lastEmployee.employeeId}\n First name: ${lastEmployee.firstName}\n Last name: ${lastEmployee.lastName}`);

      const newEmployeeId = lastEmployee.employeeId + 1;
      console.log('new employeeId:' + newEmployeeId);


      // Create the new employee object
      const newEmployee = {
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
      };

      // Insert new employee to the employee collection
      const result = await db.collection("employees").insertOne(newEmployee);
      console.log('New employee created successfully!');
      res.status(201).send(employee);

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
router.post('/signin', (req, res, next) => {
  try {

    console.log("Employee singing in...");
    // Get the email address and password from the request body
    const signIn = req.body;

    // Validate the sign in data against the singInSchema
    const validate = ajvInstance.compile(signInSchema);
    const valid = validate(signIn);

    // If the singIn object is not valid; then return a 400 status code with message 'Bad request'
    if(!valid) {
      console.error('Error validating the singIn data with the signInSchema!');
      console.log('signin validation error: ', validate.errors);
      return next(createError(400, `Bad request: ${validate.errors}`));
    }

    // Call mongo and log in employee
    mongo(async db => {
      console.log("Looking up the employee...");
      // Find the employee
      const employee = await db.collection("employees").findOne({
        email: signIn.email
      });
      // If the employee is not found; Return 401
      if (!employee) {
        console.log("No employee with that email");
        return next(createError(401, "Unauthorized"));
      }
      // If the employee is found; Then compare password passed in from the body with the password in the database
      if (employee) {
        console.log("Employee found!");
        console.log("Comparing passwords...");
        // Compare the password
        let passwordIsValid = bcrypt.compareSync(signIn.password, employee.password);

        // Else if the password doesn't match; then return status code 400 with message "Invalid credentials"
        if (!passwordIsValid) {
          console.error('Invalid password!');
          return next(createError(401, "Unauthorized"));
        }
        // If the password matches; then return status code 200 with message "Employee sign in"
        console.log("Password matches!");
        res.send(employee);
      }
    }, next);

    // Catch any Database errors
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
router.post('/employees/:email/reset-password', (req, res, next) => {
  try {

    // Get the employee email from the parameters
    const email = req.params.email;

    // Get the employee data from the body
    const employee = req.body;

    // Validate the employee object against the resetPasswordSchema
    const validate = ajvInstance.compile(resetPasswordSchema);
    const valid = validate(employee);

    // If the employee object is not valid; return a status code 400 with message 'Bad request'
    if(!valid) {
      console.error('Error validating employee object against schema', validate.errors);
      return next(createError(400, `Bad request: ${validate.errors}`));
    }

    // Call mongo and update the employee's password
    mongo(async db => {
      // Find the employee with the email
      const updateEmployee = db.collection('employees').findOne({ email: email });

      // If the employee does not exist; then return a status code 404 with message 'Not found'
      if(!updateEmployee) {
        console.error('Cannot find employee with that email: ', email);
        return next(createError(404, `Not found employee with that email: ${email}` ))
      }

      // Encrypt the new password using bcrypt
      const hashedPassword = bcrypt.hashSync(employee.password, saltRounds);

      // Update employee's password
      const result = await db.collection('employees').updateOne(
        { email: email },
        { $set: { password: hashedPassword }}
      );

      // Return status code 204
      res.status(204).send();
    }, next);

    // Catch any database errors
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
router.post('/verify/employees/:email', (req, res, next) => {
  try {
    //email parameter
    const email = req.params.email
    //log email
    console.log('Employee email', email);

    // Validate the email against email schema with regex
    const validate = ajvInstance.compile(emailSchema);
    const valid = validate({email});

    // If the email is not valid; return 400 bad request
    if(!valid) {
      console.error('Error validating email against schema', validate.errors);
      return next(createError(400, `Bad request: ${validate.errors}`));
    }

    //connect to database
    mongo(async db => {
      //find employee by saved email
      const employee = await db.collection('employees').findOne({ email: email });
      console.log(employee);
      //If no employees have matching email send 404 not found
      if (!employee) {
        const err = new Error('Email does not exist');
        err.status = 404;
        console.log('Employee not found with email', email);
        next(err);
        return;
      }
      //send status 200 with email
      res.status(200).json({ email: employee.email });
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
router.post('/verify/employees/:email/security-questions', (req, res, next) => {
  try {
    //email parameter
    const email = req.params.email;
    //capture request body
    const securityQuestions = req.body;

    //log email
    console.log('Employee email', email);
    //log security questions
    console.log('Employee security questions', securityQuestions);

    // Validate security questions against schema
    const validate = ajvInstance.compile(securityQuestionSchema);
    const valid = validate(securityQuestions);

    //If the email is not valid; return 400 bad request
    if(!valid) {
      console.error('Error validating security questions/answers against schema', validate.errors);
      return next(createError(400, `Bad request: ${validate.errors}`));
    }

    //connect to database
    mongo(async db => {
      // Find employee by employee email
      const employee = await db.collection('employees').findOne({ email });

      //if no employees have matching email, send 404 not found
      if (!employee) {
        console.log('Employee not found with email', email);
        return next(createError(404, 'Email does not exist'));
      }
      console.log("Employee", employee);

      //check entered security questions against user's stored security questions
      if (securityQuestions[0].answer !== employee.selectedSecurityQuestions[0].answer ||
          securityQuestions[1].answer !== employee.selectedSecurityQuestions[1].answer ||
          securityQuestions[2].answer !== employee.selectedSecurityQuestions[2].answer) {

        //Error handling for unauthorized/non-matching answers
        const err = new Error("Unauthorized");
        err.status = 401;
        err.message = "Unauthorized: One or more of your security answers do not match our records";
        console.log("Security answers do not match");
        next(err);
        return;
      }

      //send status 200 and employee security questions
      res.send(employee.selectedSecurityQuestions);
    }, next);

  //Mongo DB error handling
  } catch (err) {
    console.error("Error:", err);
    next(err);
  }
});

// Export the router
module.exports = router;
