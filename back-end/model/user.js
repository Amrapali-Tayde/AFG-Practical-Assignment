const mongoose = require("mongoose");
const userSchemaFields = {
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    dob: {
        type: Date,
        required: true,
    },
    countryCode: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
       // select: false
    },

};

const userSchema = new mongoose.Schema(userSchemaFields, { timestamps: true } );
//const newSchema = userSchema.omit(['password']);

// Middleware to capitalize first and last names before saving
userSchema.pre('save', function(next) {
    this.firstName = this.firstName.charAt(0).toUpperCase() + this.firstName.slice(1).toLowerCase();
    this.lastName = this.lastName.charAt(0).toUpperCase() + this.lastName.slice(1).toLowerCase();
    next();
  });
  

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;