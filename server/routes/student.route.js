import express from 'express'
import { authStudent } from "../middlewares/auth.student.middleware.js";
import {
    register_student,
    login_student,
    get_student_profile
} from "../controllers/student.controller.js"

const router = express.Router()

router.post('/register_student', register_student);
router.post('/login_student', login_student);
router.get("/get_student_profile", authStudent, get_student_profile)


export default router