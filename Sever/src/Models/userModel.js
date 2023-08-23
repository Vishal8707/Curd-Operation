const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
    {
        userName: {
            type: String,
            required: true,
            trim: true,
        },
        emailId: {
            type: String,
            required: true,
        },
        mobileNumber:{
            type:Number,
            require:true,
        },
        password: {
            type: String,
            required: true,
        }
        ,
        isDeleted: {
            type: Boolean,
            default: false
        },
    }, { timestamps: true });

module.exports = mongoose.model("Users", userSchema);


