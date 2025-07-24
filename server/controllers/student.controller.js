import { R } from "../utilits/res.helper.js";
import { generateStudentToken } from "../utilits/tokenGen.helper.js";
import client from "../utilits/redis.helper.js";
import { Student } from "../models/student.module.js";
import { Classes } from "../models/class.module.js";
// import { Class } from "../models/class.model.js";
import bcrypt from "bcrypt";
import CryptoJS from "crypto-js";
import { Attendance } from "../models/Attendance.module.js";

const register_student = async (req, res) => {
    try {
        const {
            name,
            phoneno,
            password,
            email,
            fatherno,
            motherno,
            rollno,
            ishosteller,
            hostel_number,
            room_number,
            branchname,
            section,
            sem
        } = req.body;

        // console.log(req.body)
        if (!name || !phoneno || !password || !email || !fatherno || !motherno || !rollno || !branchname || !section || !sem) {
            return R.e(res, "Missing required fields");
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const target_class = await Classes.findOne({
            sem,
            section: { $in: [section] }
        });
        if (!target_class) {
            return R.c(res, 400, "No class found for the provided batchname/section/sem");
        }
        const newStudent = new Student({
            name,
            email,
            password: hashedPassword,
            contacts: {
                phone: phoneno,
                father: fatherno,
                mother: motherno
            },
            rollno,
            hostelInfo: {
                isHosteller: ishosteller,
                hostelNo: hostel_number,
                roomNo: room_number
            },
            academicInfo: {
                branch: branchname,
                section,
                sem
            },
            classid: target_class._id
        });
        await newStudent.save();

        const token = generateStudentToken(newStudent._id);
        newStudent.accessToken = token;
        await newStudent.save();

        target_class.students.push(newStudent._id);
        await target_class.save();

        // const allSubjects = [...target_class.subjects, ...target_class.labs];

        const months = {};
        for (let i = 1; i <= 12; i++) {
            months[i.toString()] = [];
        }

        const subjectMap = {};
        target_class.subjects.forEach(sub => {
            subjectMap[sub.name] = { ...months };
        });

        const labMap = {};
        target_class.labs.forEach(lab => {
            labMap[lab.name] = { ...months };
        });

        await Attendance.create({
            studentId: newStudent._id,
            classId: target_class._id,
            subjects: subjectMap,
            labs: labMap
        });

        return R.s(res, "Student Registered", { studentId: newStudent });
    } catch (error) {
        console.error("register_student error:", error);
        return R.c(res, 500, "Internal Server Error");
    }
}

const login_student = async (req, res) => {
    try {
        const { phoneno, password } = req.body;
        if (!phoneno || !password) {
            return R.c(res, 400, "Phone number and password are required")
        }
        console.log(phoneno)
        const student = await Student.findOne({ "contacts.phone": phoneno })
        if (!student) {
            return R.c(res, 404, "Student not found")
        }
        const isMatch = await bcrypt.compare(password, student.password)
        if (!isMatch) {
            return R.c(res, 401, "Invalid credentials")
        }
        const token = generateStudentToken(student._id)
        student.accessToken = token;
        await student.save()
        const encryptedId = CryptoJS.AES.encrypt(student._id.toString(), process.env.SECRET_KEY).toString()
        res.cookie("ACT", token, {
            httpOnly: true,
            secure: true, // Only send over HTTPS
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        })
        res.cookie("STID", encryptedId, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        return R.s(res, "Login successful", {
            studentId: student._id,
            name: student.name,
            accessToken: token,
            studentURL: encryptedId
        })
    } catch (error) {
        console.error("login_student error:", error)
        return R.c(res, 500, "Internal Server Error")
    }
}
// await client.lpush(`${student._id}`, `${student.name}`)
// await client.lpush(`${student._id}`, `${student.rollno}`)

const get_student_profile = async (req, res) => {
    try {
        const studentId = req.studentId // its comingfrom the student auth middleware, REMEMBER THE FUCKING NAME "studentId"

        // console.log("it is: ",req.studentId)
        const student = await Student.findById(studentId).select("-password -__v -accessToken").populate("classid")

        if (!student) {
            return R.c(res, 404, "Student not found");
        }

        // console.log("ok : ",student)

        // await client.set("s", "hello")
        // await client.expire("s",5)


        // const result = await client.get("ok")
        // const result = await client.lrange(`${student._id}`, 0, -1);
        // console.log("student name is:", result)
        // console.log(result[0])
        // console.log(result[1])

        const attendanceRecords = await Attendance.find({ studentId });

        return R.s(res, "Student profile fetched successfully", { student, attendanceRecords });
    } catch (error) {
        console.error("get_student_profile error:", error);
        return R.c(res, 500, "Internal Server Error");
    }
}

const fixAttendanceRecords = async (req, res) => {
    try {

        const students = await Student.find({});

        let createdCount = 0;
        const months = {};
        for (let i = 1; i <= 12; i++) {
            months[i.toString()] = [];
        }

        for (const student of students) {
            const existingAttendance = await Attendance.findOne({ studentId: student._id });
            if (existingAttendance) continue;

            // Fetch the class document
            const classDoc = await Classes.findById(student.classid);
            if (!classDoc) {
                console.warn(`Class not found for student ${student._id}`);
                continue;
            }

            // Create subject map
            const subjectMap = {};
            classDoc.subjects.forEach(sub => {
                subjectMap[sub.name] = { ...months };
            });

            // Create lab map
            const labMap = {};
            classDoc.labs.forEach(lab => {
                labMap[lab.name] = { ...months };
            });

            await Attendance.create({
                studentId: student._id,
                classId: classDoc._id,
                subjects: subjectMap,
                labs: labMap
            });

            createdCount++;
        }

        return res.status(200).json({
            message: `${createdCount} attendance records created for students without them.`,
        });


    } catch (error) {
        console.error("fixAttendanceRecords error:", error);
        return R.c(res, 500, "Internal Server Error");
    }
}

const get_student_attendance = async (req, res) => {
    try {
        const { studentId } = req.params;
        const attendanceRecords = await Attendance.find({ studentId });

        return R.s(res, "Attendance records fetched successfully", attendanceRecords);
    } catch (error) {
        console.error("get_student_attendance error:", error);
        return R.c(res, 500, "Internal Server Error");
    }
}

export { register_student, login_student, get_student_profile, fixAttendanceRecords, get_student_attendance }