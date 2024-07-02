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


// Export the router
module.exports = router;