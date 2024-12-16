import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
    firstName: { type: String,
         require: true
        },
    lastName: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
        unique: true,
    },
    image: {
        type: String,
        default: null,
    },
});

export const User = mongoose.model("User", userSchema);
