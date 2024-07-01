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
const bcrypt = require('bcrypt');
const saltRounds = 10;

/**
 * employee Register
 * @openapi
 * /api/employees/register:
 *   post:
 *     tags:
 *      - employees
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
 *               emailAddress:
 *                 type: string
 *               password:
 *                 type: string
 *               phoneNumber:
 *                 type: number
 *               address:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Employee created successfully
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
        const { firstName, lastName, emailAddress, password, phoneNumber, address } = req.body;

        // Call mongo and create the new employee
        mongo(async db => {

            console.log("Checking if the employee emailAddress exists in the database...");
            // Check if the employee already exist in the database
            const existingEmployee = await db.collection("employees").findOne({ emailAddress: emailAddress });
            
            // If the employee exist; then throw an error status code 409 with message 'Employee already exists!'
            if(existingEmployee) {
                console.log("Employee exists");
                console.error('Employee already exists!');
                return next(createError(409, `Employee already exists with the email address ${emailAddress}.`));
            }

            // Create the new employee object
            const newEmployee = {
                firstName: firstName,
                lastName: lastName,
                emailAddress: emailAddress,
                password: bcrypt.hashSync(password, saltRounds),
                phoneNumber: phoneNumber,
                address: address,
                isDisabled: false,
                role: 'standard',
                selectedSecurityQuestions: []
            }

            // Insert new employee to the employee collection
            const result = await db.collection("employees").insertOne(newEmployee);
            console.log('New employee created successfully!');
            res.status(201).send({
                'message': 'Employee created successfully!',
                json: result
            });

        }, next);

    } catch (err) {
        console.error('Error: ', err);
        next(err);
    }
});

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
                    emailAddress: 1,
                    phoneNumber: 1,
                    isDisabled: 1,
                    role: 1,
                }
            //Turn into an array, was giving { "_events": {}, "_eventsCount": 0 } before adding this 
            }).toArray();
            console.log('Employee list', employees);
            //If employee list is emplty, return 404
            if (!employees || employees.length === 0) {
                return res.status(404).json({ error: 'No Employees Found' });
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
 * /api/employees/{email}:
 *   get:
 *     tags:
 *       - employees
 *     description: Returns employee by email
 *     summary: Returns an employee document
 *     parameters:
 *       - name: email
 *         in: path
 *         required: true
 *         description: Employee email
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
router.get('/:email',(req, res, next) => {
    try {
        //Email params 
        const emailAddress = (req.params.email);
        //regex to varify email pattern 
        const regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        //Test valid email pattern against email param, if not a valid email format send 404 
        if (!regEx.test(emailAddress)) {
            return res.status(400).json({error: 'Incorrect Email Format'});
        }
        //connect to database 
        mongo(async (db) => {
            //Match email param to a valid email in employee collection
            const employee = await db.collection('employees').findOne({emailAddress}, {
                //What to return from database 
                projection: {
                    firstName: 1,
                    lastName: 1,
                    emailAddress: 1,
                    phoneNumber: 1,
                    isDisabled: 1,
                    role: 1,
                }
            }); 
            // If no emails match param send 404 employee not found error 
            if (!employee) {
                return res.status(404).json({ error: 'Employee Not Found' });
            } 
            //return employee document 
            res.json(employee);     
    })}
    //Mong error handling 
    catch (err) {
        console.error('Error: ', err);
        next(err);
    }
})

// Export the router
module.exports = router;