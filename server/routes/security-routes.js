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


// Routes
/**
 * employee Sign in
 * @openapi
 * /api/security/signin:
 *   post:
 *     tags:
 *      - security
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
                    res.status(200).send({
                        "message": "Employee signed in"
                    });
                }
                // Else if the password doesn't match; then return status code 400 with message "Invalid credentials"
                else {
                    console.log("Password doesn't match!");
                    res.status(400).send({
                        "message": "Invalid credentials"
                    });
                }
            }
            // Else if employee is not found; then return status code 400 with message "Invalid credentials"
            else {
                console.log("Employee not found!");
                res.status(400).send({
                    "messsage": "Invalid credentials"
                })
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