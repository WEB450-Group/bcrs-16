/*
============================================
; Title:  employee-routes.js
; Author: Professor Krasso
; Date: 29. June, 2024
; Modified by: Joanna Brumfield and Zadkiel Rodriguez Alvarado
; Description: Employee Routes
;===========================================
*/
"use strict";

// Imports
const express = require("express");
const router = express.Router();
const { mongo } = require("../utils/mongo");
const createError = require('http-errors');
const { firstValueFrom } = require("rxjs");


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
 *         description: Bad Request (?? How and where to impliment since it is a get request with no req.body?)
 *       '504':
 *         description: Not Found
 *       '500':
 *         description: Internal Server Error
 */
router.get('/', (req, res, next) => {
  try {
    //connect to database 
    mongo(async (db) => {
      //find employee list and create an array of employee objects
      const employees = await db.collection('employees').find({}, {
        //What to return from database NOTE: assuming we pull it all than depending on the role deal with that on the from end for the employee list? 
        projection: {
          firstName: 1,
          lastName: 1,
          employeeId: 1,
          emailAddress: 1,
          phoneNumber: 1,
          isDisabled: 1,
          role: 1,
        }
      //Turn into an array
      }).toArray();
      console.log('Employee list', employees);
      //If employee list is emplty, return 404
      if (!employees || employees.length === 0) {
        return res.status(404).json({
          error: 'No Employees Found'
        });
      }
      //return array of employee objects 
      res.json(employees);
    });
    //Database error handling 
  } catch (err) {
    console.error('Error: ', err);
    next(err);
  }
});

// employee-routes.js
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
router.get('/:employeeId', (req, res, next) => {
  try {
    //Employee ID params 
    let employeeId = req.params.employeeId;
    //pasrse to integer
    employeeId = parseInt(employeeId, 10);
    //if input not numerical,return 400 
    if (isNaN(employeeId)) {
      const err = new Error('Input must be a number');
      err.status = 400;
      return next(err);
    }
    //connect to database 
    mongo(async (db) => {
      //Match email param to a valid email in employee collection
      const employee = await db.collection('employees').findOne({
        employeeId
      }, {
        //What to return from database 
        projection: {
          firstName: 1,
          lastName: 1,
          employeeId: 1,
          emailAddress: 1,
          phoneNumber: 1,
          isDisabled: 1,
          role: 1,
        }
      });
      // If no emails match param send 404 employee not found error 
      if (!employee) {
        return res.status(404).json({
          error: 'Employee Not Found'
        });
      }
      //return employee document 
      res.json(employee);
    })
  }
  //Mong error handling 
  catch (err) {
    console.error('Error: ', err);
    next(err);
  }
})

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
 *               - employeeId
 *               - firstName
 *               - lastName
 *               - emailAddress
 *               - phoneNumber
 *               - address
 *               - role
 *             properties:
 *               employeeId:
 *                 type: number
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               emailAddress:
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
router.post('/', (req, res, next) => {
  try {

    console.log("Starting the create employee API...");

    // Get the data for the new employee from the request body
    const {
      employeeId,
      firstName,
      lastName,
      emailAddress,
      phoneNumber,
      address,
      role
    } = req.body;

    // Call mongo and create the new user
    mongo(async db => {

      console.log("Checking the employee ID is valid...");

      // Check that the employeeId is a number with the parseInt function; If the checkEmployeeId is not a number it will return NaN
      const checkEmployeeId = parseInt(employeeId, 10);

      // If the checkEmployeeId is NaN; then return a status code 400 with a message "Employee ID must be a number."
      if (isNaN(checkEmployeeId)) {
        console.error("Employee Id must be a number!");
        return next(createError(400, "Employee Id must be a number!"));
      }

      // Check the employee ID is 4 digits
      // If the employee ID length is not equal to 4; then return a status code 400 with a message "Invalid employee ID!"
      if (checkEmployeeId.toString().length !== 4) {
        console.error("Invalid employee ID!");
        return next(createError(400, "Invalid employee ID!"));
      }

      console.log("Employee ID is valid!");

      console.log("Checking the employee ID is not being used...");

      // Check if the employeeId is not register already with another employee
      const existingEmployee = await db.collection("employees").findOne({
        employeeId: employeeId
      });

      // If the employee Id is being used already; then return a status code 400 with a message "Employee ID already in use!"
      if (existingEmployee) {
        console.error("Employee ID already in use!");
        return next(createError(400, "Employee ID already in use!"));
      }

      console.log("Employee ID is not being used!");

      console.log("Checking the phone number is valid...");

      // Check that the checkPhoneNumber is consists of numbers only with the parseInt function; If the checkPhoneNumber is is not a number it will return NaN
      const checkPhoneNumber = parseInt(phoneNumber, 10);

      // If the checkPhoneNumber is NaN; then return a status code 400 with a message "Invalid phone number!"
      if (isNaN(checkPhoneNumber)) {
        console.error("Invalid phone number!");
        return next(createError(400, "Invalid phone number!"));
      }

      // Check if the phone number is the correct length of number (US ONLY)
      if (checkPhoneNumber.toString().length !== 10) {
        console.log("Invalid phone number!");
        return next(createError(400, "Invalid phone number!"));
      }

      console.log("Phone number is valid!");

      console.log("Creating the employee...");

      // Create the new employee
      const newEmployee = {
        employeeId: employeeId,
        firstName: firstName,
        lastName: lastName,
        emailAddress: emailAddress,
        password: '',
        phoneNumber: phoneNumber,
        address: address,
        isDisabled: false,
        role: role,
        selectedSecurityQuestions: []
      };

      console.log("Inserting new employee to the employees collection...");

      // Insert the new employee into the employees collection
      const result = await db.collection("employees").insertOne(newEmployee);
      res.status(201).send("Employee created successfully!");
      console.log("New employee inserted successfully!");

    }, next);

    // Catch any database errors  
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
router.put('/:employeeId', (req, res, next) =>{
    try {

        console.log('Updating the employee ID...');

        // Get the employee ID from the request paramaters
        let { employeeId } = req.params;

        console.log('Checking if the employee ID is a valid...');

        // Check if the employee ID is a number with the parseInt function; if is not a number it will return NaN
        employeeId = parseInt(employeeId, 10);

        // If the employee ID is NaN; then return status code 400 with message "Employee ID must be a number"
        if(isNaN(employeeId)) {
            console.error("Employee ID must be a number!");
            return next(createError(400, `Employee ID must be a number: ${employeeId}`));
        }

        console.log('The employee ID is valid!');
        
        // Call mongo and update the employee
        mongo(async db => {

            console.log('Getting the employee from the collection with the employee ID...');

            // Get the employee from the employees collection with the employee ID
            const employee = await db.collection('employees').findOne({ employeeId: employeeId });

            console.log('Employee is found!');

            // If the employee is not found with given employee ID; then return status code 404 with message "Employee not found with employee ID"
            if(!employee) {
                console.error('Employee not found with employee ID: ', employeeId);
                return next(createError(404, `Employee not found with employee ID: ${employeeId}`));
            }

            console.log('Getting the data that will update from the employee from the request body...');

            // Get the role and isDisabled from the request
            const { role, isDisabled } = req.body;

            // Update the employee role and isDisable
            const result = await db.collection('employees').updateOne(
                { employeeId: employeeId },
                { $set: { role: role, isDisabled: isDisabled }}
            );

            console.log('Employee is updated successfully!');

            // Send successful response to the client
            res.status(204).send();

        }, next);
    
        // Catch any databse errors
    } catch (err) {
        console.error("Database Error:", err);
        next(err);
    }
})

//Add email pattern when creating an account as well? 
// const regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
// //Test valid email pattern against email param, if not a valid email format send 404 
// if (!regEx.test(emailAddress)) {
//     return res.status(400).json({error: 'Incorrect Email Format'});
// }


// Note: The deleteUser API does not actually remove a document from the collection. Instead, you are setting a property named “isDisabled” to true.
/**
 * deleteUser
 * @openapi
 * /api/employees/{employeeId}/disable:
 *   put:
 *     tags:
 *       - employees
 *     description: Disables an employee by id
 *     summary: Disables an employee document so they don't show up in contact list for currect employees (?)
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
 *         description: Bad Requet
 *       '404':
 *         description: Not Found 
 *       '200':
 *         description:  Internal Server Error
 */
router.put('/:employeeId/disable', (req, res, next) => {
  try {
    //Employee ID params 
    let employeeId = req.params.employeeId;
    //pasrse to integer
    employeeId = parseInt(employeeId, 10);
    //if input not numerical,return 400 
    if (isNaN(employeeId)) {
      const err = new Error('Input must be a number');
      err.status = 400;
      return next(err);
    }
    //connect to database 
    mongo(async (db) => {
      //Match email param to a valid email in employee collection
      const employee = await db.collection('employees').findOne({
        employeeId
      });
      // If no emails match param send 404 employee not found error 
      if (!employee) {
        return res.status(404).json({
          error: 'Employee Not Found'
        });
      }
      //update employee document
      const result = await db.collection('employees').updateOne({
        employeeId
      }, {
        $set: {
          isDisabled: true
        }
      });
      //If nothing was modified return error 500, unable to disable employee
      if (!result.modifiedCount) {
        return next(createError(400, 'Unable to disable employee - note they may already be disabled'));
      }
        res.status(204).send();
    });
  }
  //Mongo error handling 
  catch (err) {
    console.error('Error: ', err);
    next(err);
  }
});

// Export the router
module.exports = router;