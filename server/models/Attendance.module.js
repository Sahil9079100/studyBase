import mongoose, { Schema } from "mongoose";

const AttendanceSchema = new Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true,
    },
    classId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Class",
        required: true,
    },
    subjects: {
        type: Map,
        of: new Schema({
            "1": { type: [Schema.Types.Mixed], default: [] }, // [1,0,S,H,0,....] 1-prsent 0-absent A-saturday, S sunday, H - holiday
            "2": { type: [Schema.Types.Mixed], default: [] },
            "3": { type: [Schema.Types.Mixed], default: [] },
            "4": { type: [Schema.Types.Mixed], default: [] },
            "5": { type: [Schema.Types.Mixed], default: [] },
            "6": { type: [Schema.Types.Mixed], default: [] },
            "7": { type: [Schema.Types.Mixed], default: [] },
            "8": { type: [Schema.Types.Mixed], default: [] },
            "9": { type: [Schema.Types.Mixed], default: [] },
            "10": { type: [Schema.Types.Mixed], default: [] },
            "11": { type: [Schema.Types.Mixed], default: [] },
            "12": { type: [Schema.Types.Mixed], default: [] },

        }),
        default: {},
    },

    labs: {
        type: Map,
        of: new Schema({
            "1": { type: [Schema.Types.Mixed], default: [] },
            "2": { type: [Schema.Types.Mixed], default: [] },
            "3": { type: [Schema.Types.Mixed], default: [] },
            "4": { type: [Schema.Types.Mixed], default: [] },
            "5": { type: [Schema.Types.Mixed], default: [] },
            "6": { type: [Schema.Types.Mixed], default: [] },
            "7": { type: [Schema.Types.Mixed], default: [] },
            "8": { type: [Schema.Types.Mixed], default: [] },
            "9": { type: [Schema.Types.Mixed], default: [] },
            "10": { type: [Schema.Types.Mixed], default: [] },
            "11": { type: [Schema.Types.Mixed], default: [] },
            "12": { type: [Schema.Types.Mixed], default: [] },

        }),
        default: {},
    },
}, { timestamps: true })

export const Attendance = mongoose.model("Attendance", AttendanceSchema);
