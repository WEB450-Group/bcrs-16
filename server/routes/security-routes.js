/*
============================================
; Title:  security-routes
; Author: Professor Krasso
; Date: 29. June, 2024
; Modified by: Joanna Brumfield and Zadkiel Rodriguez Alvarado
; Description: Security Routes
;===========================================
*/

// Imports
const express = require('express');
const router = express.Router();
const { mongo } = require('../utils/mongo');
const createError = require('http-errors');
const bcrypt = require('bcrypt');
const saltRounds = 10;
let counter = 0;

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
router.post('/', (req, res, next) => {
    try {
        console.log('Creating a new employee...');

        // Increase the counter
        counter++;

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

            // Generate a random employeeId
            const employeeId = 1000 + counter;

            // Create the new employee object
            const newEmployee = {
                employeeId: employeeId,
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
            res.status(201).send('Employee created successfully!');

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
 *               - emailAddress
 *               - password
 *             properties:
 *               emailAddress:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Employee Sign In Successfully
 *       '400':
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
        const { emailAddress, password } = req.body;

        // Call mongo and log in employeee
        mongo(async db => {
            console.log("Looking up the employee...");
            // Find the employee
            const employee = await db.collection("employees").findOne({ emailAddress: emailAddress });

            console.log("Employee found!");

            // If the employee is found; Then compare password passed in from the body with the password in the database
            if(employee) {
                console.log("Comparing passwords...");
                // Compare the password
                let passwordIsValid = bcrypt.compareSync(password, employee.password);

                // If the password matches; then return status code 200 with message "Employee sign in"
                if(passwordIsValid) {
                    console.log("Password matches!");
                    res.status(200).json('Employee Signed in!');
                }
                // Else if the password doesn't match; then return status code 400 with message "Invalid credentials"
                else {
                    console.log("Password doesn't match!");
                    return next(createError(400, "Invalid Credentials!"));
                }
            }
            // Else if employee is not found; then return status code 400 with message "Invalid credentials"
            else {
                console.log("Employee not found!");
                return next(createError(400, "Invalid Credentials!"));
            }
        }, next);
    
        // Catch any Database errors
    } catch (err) {
        console.error("Error: ", err);
        next(err);
    }
});

// Export the router
module.exports = router;