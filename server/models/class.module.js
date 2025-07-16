import mongoose, { Schema } from "mongoose";

const ClassSchema = new Schema({
    sem: {
        type: String,
        required: true
    },
    branch: {
        type: String,
        required: true
    },
    section: [{
        type: String,
        require: true
    }],
    notes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Note",
    }],
    subjects: [
        {
            name: String,
            teacherId: {type: String}
        }
    ],
    labs: [{
            name: String,
            teacherId: {type: String}
        }],
    students: [{
            studentid: {type: mongoose.Schema.Types.ObjectId, ref: "Student"}
        }]
}, {
    timestamps: true
});
export const Classes = mongoose.model("Classes", ClassSchema);

/*
sem
branch
section
notes
subjects
labs
students
 */