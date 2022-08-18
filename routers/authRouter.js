const express = require('express')
const User = require('../models/userModel')
const authRouter = express.Router()

function filterObject(obj, ...keys) {
    let filtered = {};
    keys.forEach(k => {
        if (obj[k]) filtered[k] = obj[k];
    });
    return filtered;
}

authRouter.post('/signup', async (req, res) => {
    try {
        const filtered = filterObject(
            req.body,
            'name',
            'password',
            'birthDate',
            'email',
            'confirmPassword'
        );
        const user = await User.create(filtered);
        delete user.password
        res.status(201).json({
            status: 'success',
            statusCode: 201,
            data: user,
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            statusCode: 400,
            error: err.message,
        });
    }
})


module.exports = authRouter;