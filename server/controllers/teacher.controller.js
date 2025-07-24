import bcrypt from "bcrypt";
import CryptoJS from "crypto-js";
import { Teacher } from "../models/teacher.module.js";
import { Classes } from "../models/class.module.js";
import { R } from "../utilits/res.helper.js";
import { generateStudentToken } from "../utilits/tokenGen.helper.js";
import { Attendance } from "../models/Attendance.module.js";
import client from "../utilits/redis.helper.js";

const register_teacher = async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            phoneno,
            teacherid,
            subject,
            mentor
        } = req.body;

        if (!name || !email || !password || !phoneno || !teacherid || !subject || subject.length === 0) {
            return R.e(res, "Missing required fields", 400);
        }

        const existing = await Teacher.findOne({
            $or: [
                { email },
                { phoneno },
                { teacherid }
            ]
        });

        if (existing) {
            return R.c(res, 409, "Teacher already exists with given email, phone, or ID");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // step1: Find classes where teacher teaches
        const allClasses = await Classes.find({});
        const classIds = [];
        const labIds = [];

        allClasses.forEach((cls) => {
            let matched = false;

            // Check subjects
            if (Array.isArray(cls.subjects)) {
                for (const subj of cls.subjects) {
                    if (subj.teacherId === teacherid) {
                        classIds.push(cls._id);
                        matched = true;
                        break;
                    }
                }
            }

            // Check labs
            if (Array.isArray(cls.labs)) {
                for (const lab of cls.labs) {
                    if (lab.teacherId === teacherid) {
                        if (!matched) classIds.push(cls._id); // only push to classes if not already done
                        labIds.push(cls._id);
                        break;
                    }
                }
            }
        });

        const newTeacher = new Teacher({
            name,
            email,
            password: hashedPassword,
            phoneno,
            teacherid,
            subject,
            mentor,
            classes: classIds,
            labs: labIds
        });

        const token = generateStudentToken(newTeacher._id);
        newTeacher.accessToken = token;

        await newTeacher.save();

        return R.s(res, "Teacher registered successfully", {
            teacherId: newTeacher._id
        });

    } catch (error) {
        console.error("register_teacher error:", error);
        return R.e(res);
    }
};

const login_teacher = async (req, res) => {
    try {
        const { phoneno, password } = req.body;
        if (!phoneno || !password) {
            return R.c(res, 400, "Phone number and password are required");
        }

        const teacher = await Teacher.findOne({ phoneno });
        if (!teacher) {
            return R.c(res, 404, "Teacher not found");
        }

        const isMatch = await bcrypt.compare(password, teacher.password);
        if (!isMatch) {
            return R.c(res, 401, "Invalid credentials");
        }

        const token = generateStudentToken(teacher._id);
        teacher.accessToken = token;
        await teacher.save();

        const encryptedId = CryptoJS.AES.encrypt(teacher._id.toString(), process.env.SECRET_KEY).toString();

        res.cookie("TACT", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        res.cookie("TID", encryptedId, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return R.s(res, "Login successful", {
            teacherId: teacher._id,
            name: teacher.name,
            accessToken: token,
            teacherURL: encryptedId
        });
    } catch (error) {
        console.error("login_teacher error:", error);
        return R.c(res, 500, "Internal Server Error");
    }
};

const get_teacher_profile = async (req, res) => {
    try {
        const teacherId = req.teacherId;

        const teacher = await Teacher.findById(teacherId)
            .select("-password -__v -accessToken")
            .populate({
                path: "classes",
                populate: {
                    path: "students._id",
                    model: "Student",
                }
            })
            .populate("labs");

        if (!teacher) {
            return R.c(res, 404, "Teacher not found");
        }

        return R.s(res, "Teacher profile fetched successfully", teacher);
    } catch (error) {
        console.error("get_teacher_profile error:", error);
        return R.c(res, 500, "Internal Server Error");
    }
};
/*
const mark_attendance = async (req, res) => {
    try {
        const { classId, attendanceData } = req.body; // attendanceData should be an array of objects with studentId and status
        const teacherId = req.teacherId;

        if (!classId || !attendanceData || !Array.isArray(attendanceData)) {
            return R.c(res, 400, "Invalid request data");
        }

        const classDoc = await Classes.findById(classId);
        if (!classDoc) {
            return R.c(res, 404, "Class not found");
        }

        // Check if the teacher is authorized to mark attendance for this class
        if (!classDoc.subjects.some(subj => subj.teacherId === teacherId) &&
            !classDoc.labs.some(lab => lab.teacherId === teacherId)) {
            return R.c(res, 403, "You are not authorized to mark attendance for this class");
        }

        // Update attendance for each student
        for (const entry of attendanceData) {
            const { studentId, status } = entry;
            if (!studentId || !status) continue; // Skip invalid entries

            const studentIndex = classDoc.students.findIndex(s => s._id.toString() === studentId);
            if (studentIndex !== -1) {
                classDoc.students[studentIndex].attendance.push({
                    date: new Date(),
                    status: status // 'present' or 'absent'
                });
            }
        }

        await classDoc.save();

        return R.s(res, "Attendance marked successfully", classDoc);
    } catch (error) {
        console.error("mark_attendance error:", error);
        return R.c(res, 500, "Internal Server Error");
    }
}
*/


//#################################### IMPORTANT STUFF START ####################################

// const mark_attendance = async (req, res) => {             // this one is slow and first prototype, took 3-4 seconds for 6 students, so not good.
//     try {
//         const { classid, subjectName, attendance, type } = req.body;

//         if (!Array.isArray(attendance) || !subjectName || !classid || !type) {
//             return res.status(400).json({ message: "Missing fields" });
//         }

//         const today = new Date();
//         const month = String(today.getMonth() + 1); // "1" to "12"
//         const dayIndex = today.getDate() - 1; // 0-based index
//         let count = 0;

//         const target = type === "lab" ? "labs" : "subjects";


//         for (const { studentId, status } of attendance) {
//             const studentAttendance = await Attendance.findOne({ studentId, classId: classid });

//             if (!studentAttendance[target].has(subjectName)) {
//                 studentAttendance[target].set(subjectName, {});
//             }

//             // if (!studentAttendance.subjects.has(subjectName)) {
//             //     studentAttendance.subjects.set(subjectName, {});
//             // }

//             const targetItem = studentAttendance[target].get(subjectName);

//             if (!targetItem[month]) {
//                 targetItem[month] = [];
//             }

//             // const subject = studentAttendance.subjects.get(subjectName);

//             // if (!subject[month]) {
//             //     subject[month] = [];
//             // }

//             // while (subject[month].length <= dayIndex) {
//             //     subject[month].push(null);
//             // }
//             while (targetItem[month].length <= dayIndex) {
//                 targetItem[month].push(null);
//             }

//             // subject[month][dayIndex] = status === 'present' ? 1 : 0;
//             targetItem[month][dayIndex] = status === 'present' ? 1 : 0;


//             // studentAttendance.subjects.set(subjectName, subject);
//             studentAttendance[target].set(subjectName, targetItem);


//             await studentAttendance.save();
//             count++
//         }

//         return R.s(res, "Attendance marked successfully", count)

//     } catch (error) {
//         console.error("Error in markAttendance:", error);
//         return res.status(500).json({ error: "Internal Server Error" });
//     }
// }


// const mark_attendance = async (req, res) => {                    // tHIS IS for Bulk attendance with bulkWrite() optimization.
//     try {
//         const { classid, subjectName, attendance, type } = req.body;

//         if (!Array.isArray(attendance) || !subjectName || !classid || !type) {
//             return res.status(400).json({ message: "Missing fields" });
//         }

//         const today = new Date();
//         const month = String(today.getMonth() + 1); // "1" to "12"
//         const dayIndex = today.getDate() - 1;

//         const target = type === "lab" ? "labs" : "subjects";

//         const studentIds = attendance.map(a => a.studentId);
//         const allDocs = await Attendance.find({
//             studentId: { $in: studentIds },
//             classId: classid
//         });

//         const docMap = new Map();
//         for (const doc of allDocs) {
//             docMap.set(doc.studentId.toString(), doc);
//         }

//         const bulkOps = [];

//         for (const { studentId, status } of attendance) {
//             const doc = docMap.get(studentId);
//             if (!doc) continue;

//             const targetMap = doc[target] || new Map();

//             if (!targetMap.has(subjectName)) {
//                 targetMap.set(subjectName, {});
//             }

//             const sub = targetMap.get(subjectName);

//             if (!sub[month]) {
//                 sub[month] = [];
//             }

//             while (sub[month].length <= dayIndex) {
//                 sub[month].push(null);
//             }

//             sub[month][dayIndex] = status === 'present' ? 1 : 0;
//             targetMap.set(subjectName, sub);

//             doc[target] = targetMap;

//             bulkOps.push({
//                 updateOne: {
//                     filter: { _id: doc._id },
//                     update: {
//                         $set: {
//                             [target]: doc[target]
//                         }
//                     }
//                 }
//             });
//         }

//         if (bulkOps.length > 0) {
//             await Attendance.bulkWrite(bulkOps);
//         }

//         return R.s(res, "Attendance marked successfully", bulkOps.length);

//     } catch (error) {
//         console.error("Error in markAttendance:", error);
//         return res.status(500).json({ error: "Internal Server Error" });
//     }
// };

const mark_attendance = async (req, res) => {   // TRYING final version, it has "retry" logic if some studentId got failed, will keep this one for production and will improve it also if needed
    try {
        const { classid, subjectName, attendance, type } = req.body;
        if (!Array.isArray(attendance) || !subjectName || !classid || !type) { return res.status(400).json({ message: "Missing fields" }) }
        const today = new Date();
        const month = String(today.getMonth() + 1)              // "1" 2 "12"
        const dayIndex = today.getDate() - 1; // 0 -based
        const target = type === "lab" ? "labs" : "subjects";

        const studentIds = attendance.map(a => a.studentId);
        const records = await Attendance.find({
            studentId: { $in: studentIds },
            classId: classid
        });

        const recordMap = new Map();
        for (const doc of records) { recordMap.set(doc.studentId.toString(), doc) }

        const bulkOps = [];

        for (const { studentId, status } of attendance) {
            const doc = recordMap.get(studentId);
            if (!doc) continue;

            const subMap = doc[target] || new Map();

            if (!subMap.has(subjectName)) { subMap.set(subjectName, {}) }

            const subjectRecord = subMap.get(subjectName);

            if (!subjectRecord[month]) { subjectRecord[month] = [] }

            while (subjectRecord[month].length <= dayIndex) {
                subjectRecord[month].push(null);
            }
            subjectRecord[month][dayIndex] = status === 'present' ? 1 : 0;
            subMap.set(subjectName, subjectRecord);

            bulkOps.push({
                updateOne: {
                    filter: { _id: doc._id },
                    update: { $set: { [`${target}`]: subMap } }
                }
            });
        }
        //it caused me error 8 TIMES... , stay alert while using bulkWrite, it get messed uo real quickkkk.
        const result = await Attendance.bulkWrite(bulkOps, { ordered: false })
        // retry logic starts here, will improve it later if needed, For now it works just fine.
        const failedIndexes = result.getWriteErrors?.()?.map(e => e.index) || []
        if (failedIndexes.length > 0) {
            const failedOps = failedIndexes.map(i => bulkOps[i]);
            const retryResult = await Attendance.bulkWrite(failedOps, { ordered: false })
            if (retryResult.getWriteErrors?.()?.length > 0) {
                console.warn("Some attendance updates still failed after retry.")
            }
        }
        return R.s(res, "Attendance marked successfully", bulkOps.length)
    } catch (error) {
        console.error("Error in markAttendance:", error)
        return res.status(500).json({ error: "Internal Server Error" })
    }
};

//##################################### IMPORTANT STUFF END #####################################

const marked_attendance_redis = async (req, res) => {
    try {
        const { classid, subjectName, attendance, type } = req.attendanceData;
        const teacherId = req.teacherId || req.body.teacherId; // coming from auth js for attendance

        if (!Array.isArray(attendance) || !subjectName || !classid || !type || !teacherId) {
            return R.c(res, 400, "Missing fields")
        }
        // console.log(req.attendanceData);
        // console.log(teacherId)

        const dataToStore = {
            classId: classid,
            subjectName,
            attendance,
            type,
            teacherId,
            submittedAt: new Date().toISOString(),
            retryCount: 0
        }
        const fetch_attendance_data = {
            classId: classid,
            subjectName,
            attendance,
            type,
            teacherId,
        }
        // *NOTE* :-  i am using FIFO order
        await client.rpush("attendance:pending_attendance", JSON.stringify(dataToStore))
        await client.lpush("attendance:search_attendance", JSON.stringify(fetch_attendance_data));
        // const pending = await client.lrange("attendance:pending_attendance", 0, -1)
        // console.log(JSON.stringify(pending.map(JSON.parse), null, 2))

        return R.c(res, 200, "Attendance saved to Redis queue")
    } catch (error) {
        console.error("marked_attendance_redis error:", error)
        return R.c(res, 500, "Internal Server Error")
    }
}

export { register_teacher, login_teacher, get_teacher_profile, mark_attendance, marked_attendance_redis };



/*
1. make the -mark attendance- feature in the frontend, take refrence form the AI generated UI
2. make the timetable schema and also try timetable in-code object, ask gpt -- load timetable in whichever you prefer at last
3. first generate 20 students with different branch and class DONE
4. generate around 10 classes DONE
5. genarete around 15 teachers - each will have at least 3 classes in under DONE
6. for [3,4,5] generate demo data from gpt, with GIT names - familier DONE
7. ***IMP*** make the mark attendance backend - first with on-each-click, then bulk submit DONE
8. initiate socket.io code - basic setup and user connection only.
*/