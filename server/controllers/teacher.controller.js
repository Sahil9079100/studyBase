import bcrypt from "bcrypt";
import CryptoJS from "crypto-js";
import { Teacher } from "../models/teacher.module.js";
import { Classes } from "../models/class.module.js";
import { R } from "../utilits/res.helper.js";
import { generateStudentToken } from "../utilits/tokenGen.helper.js";

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

// const mark_attendance = async (req, res) => {
//     try {
//         const { classId, attendanceData } = req.body; // attendanceData should be an array of objects with studentId and status
//         const teacherId = req.teacherId;

//         if (!classId || !attendanceData || !Array.isArray(attendanceData)) {
//             return R.c(res, 400, "Invalid request data");
//         }

//         const classDoc = await Classes.findById(classId);
//         if (!classDoc) {
//             return R.c(res, 404, "Class not found");
//         }

//         // Check if the teacher is authorized to mark attendance for this class
//         if (!classDoc.subjects.some(subj => subj.teacherId === teacherId) &&
//             !classDoc.labs.some(lab => lab.teacherId === teacherId)) {
//             return R.c(res, 403, "You are not authorized to mark attendance for this class");
//         }

//         // Update attendance for each student
//         for (const entry of attendanceData) {
//             const { studentId, status } = entry;
//             if (!studentId || !status) continue; // Skip invalid entries

//             const studentIndex = classDoc.students.findIndex(s => s._id.toString() === studentId);
//             if (studentIndex !== -1) {
//                 classDoc.students[studentIndex].attendance.push({
//                     date: new Date(),
//                     status: status // 'present' or 'absent'
//                 });
//             }
//         }

//         await classDoc.save();

//         return R.s(res, "Attendance marked successfully", classDoc);
//     } catch (error) {
//         console.error("mark_attendance error:", error);
//         return R.c(res, 500, "Internal Server Error");
//     }
// }

//#################################### IMPORTANT STUFF START ####################################

const mark_attendance = async (req, res) => {
    try {
        const { classid, subjectName, attendance } = req.body;

        // Logging the incoming data for debug
        console.log("Class ID:", classid);
        console.log("Subject Name:", subjectName);
        console.log("Attendance Array:", attendance);

        // Just respond back for now to verify
        return res.status(200).json({
            message: "Data received successfully",
            classid,
            subjectName,
            attendance,
        });
    } catch (error) {
        console.error("Error in markAttendance:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

//##################################### IMPORTANT STUFF END #####################################

export { register_teacher, login_teacher, get_teacher_profile, mark_attendance };



/*
1. make the -mark attendance- feature in the frontend, take refrence form the AI generated UI
2. make the timetable schema and also try timetable in-code object, ask gpt -- load timetable in whichever you prefer at last
3. first generate 20 students with different branch and class DONE
4. generate around 10 classes DONE
5. genarete around 15 teachers - each will have at least 3 classes in under DONE
6. for [3,4,5] generate demo data from gpt, with GIT names - familier DONE
7. ***IMP*** make the mark attendance backend - first with on-each-click, then bulk submit
8. initiate socket.io code - basic setup and user connection only.
*/