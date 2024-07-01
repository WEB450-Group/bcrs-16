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

// Export the router
module.exports = router;