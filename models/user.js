import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
    cnic: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: "",
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    myTeam:[{type:Schema.Types.ObjectId, ref: 'Team' }]
});

export const User = mongoose.model("User", userSchema);
