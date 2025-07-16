import mongoose, { Schema } from "mongoose";

const StudentSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    contacts: {
        type: {
            phone: { type: String, required: true },
            father: { type: String, required: true },
            mother: { type: String, required: true }
        },
        required: true
    },
    rollno: { type: String, required: true },
    hostelInfo: {
        type: {
            isHosteller: { type: Boolean, required: true },
            hostelNo: { type: Number, default: 0 },
            roomNo: { type: Number, default: 0 }
        },
        default: { isHosteller: false }
    },
    academicInfo: {
        type: {
            branch: { type: String, required: true },
            section: { type: String, required: true },
            sem: { type: String, required: true }
        },
        required: true
    },
    attendance: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AttendanceHistory"
    },
    classid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Classes"
    },
    // attendanceid:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Attendance"
    // },
    accessToken: {
        type: String,
        default: null
    }
}, { timestamps: true })

export const Student = mongoose.model("Student", StudentSchema)
