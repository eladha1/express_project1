const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs')
const { default: isEmail } = require('validator/lib/isEmail');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'you must enter a name'],
        trim: true,
        minlength: [1, 'please provide non empty name'],
        maxlength: [20, "name can't be longer than 20 characters"],
    },
    password: {
        type: String,
        required: [true, 'you must enter a password'],
        trim: true,
        select: false
    },
    birthDate: Date,
    email: {
        type: String,
        required: [true, 'you must enter an email'],
        unique: [true, 'email already in use'],
        min: [6, 'please provide non empty email'],
        max: [50, 'too long email address'],
        validate: [isEmail, 'Please provide a valid email']
    },
    confirmPassword: {
        type: String,
        require: [true, 'password confirm passwords match'],
        validate:  {
            validator: function(confirmPassword) {
                return confirmPassword === this.password; 
            }, 
            message: "pawords does not match"
        }
    }

},
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password, 14)
    this.confirmPassword = undefined


    next()
})



const User = mongoose.model('Users', userSchema);
module.exports = User;
