import express from 'express'
import { authStudent } from "../middlewares/auth.student.middleware.js";
import {
    register_student,
    login_student,
    get_student_profile,
    fixAttendanceRecords,
    get_student_attendance
} from "../controllers/student.controller.js"

const router = express.Router()

router.post('/register_student', register_student);
router.post('/login_student', login_student);
router.get("/get_student_profile", authStudent, get_student_profile)
router.get("/fixAttendanceRecords", fixAttendanceRecords);
router.get("/get_student_attendance", get_student_attendance);



export default router