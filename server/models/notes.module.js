import mongoose, { Schema } from "mongoose"
const notesSchema = new Schema({

    classid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Class",
        required: true
    },
    teacherid: {
        type: String,
        required: true
    },
    pdfurl: {
        type: String
    },
    message: {
        type: String
    },
}, { timestamps: true })

export const Note = mongoose.model("Note", notesSchema);