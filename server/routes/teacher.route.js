import express from 'express'
import { authTeacher } from "../middlewares/auth.teacher.middleware.js";
import {
    register_teacher,
    login_teacher,
    get_teacher_profile
} from "../controllers/teacher.controller.js"

const router = express.Router()

router.post('/register_teacher', register_teacher);
router.post('/login_teacher', login_teacher);
router.get("/get_teacher_profile", authTeacher, get_teacher_profile)


export default router