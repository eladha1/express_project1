const express = require('express');

const User = require('../models/userModel');

const userRouter = express.Router();

// const filterObject = (obj, ...keys) => {
//     //['name', 'age'];
//     let filtered = {};
//     Object.keys(obj).forEach(key => {
//         //["name","age","height"]
//         if (keys.find(k => k === key)) filtered[key] = obj[key];
//     });
//     return filtered;
// };

function filterObject(obj, ...keys) {
    let filtered = {};
    keys.forEach(k => {
        if (obj[k]) filtered[k] = obj[k];
    });
    return filtered;
}

userRouter.post('/', async (req, res) => {

});

module.exports = userRouter;
