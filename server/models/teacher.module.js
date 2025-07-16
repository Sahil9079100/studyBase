import mongoose, { Schema } from "mongoose";

const teacherSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phoneno: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    teacherid: {
        type: String,
        required: true,
        unique: true,
    },
    subject: [{
        type: String,
        required: true
    }],
    mentor: {
        type: Boolean,
        default: true
    },
    classes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Classes"
    }],
    accessToken: {
        type: String,
        default: null
    },
    labs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Classes"
        }
    ]
}, { timestamps: true });

export const Teacher = mongoose.model("Teacher", teacherSchema);