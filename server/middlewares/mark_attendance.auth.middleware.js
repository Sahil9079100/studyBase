import jwt from "jsonwebtoken";
import CryptoJS from "crypto-js";
import { Teacher } from "../models/teacher.module.js";
import { R } from "../utilits/res.helper.js";

const auth_mark_attendance = async (req, res, next) => {
    try {
        const { TACT, TID } = req.cookies; // ACT = access token, TID = encrypted teacher ID

        if (!TACT || !TID) {
            return R.c(res, 401, "Unauthorized: Missing token or ID");
        }

        const decryptedBytes = CryptoJS.AES.decrypt(TID, process.env.SECRET_KEY);
        const decryptedId = decryptedBytes.toString(CryptoJS.enc.Utf8);

        if (!decryptedId) {
            return R.c(res, 401, "Unauthorized: Invalid teacher ID");
        }

        const decoded = jwt.verify(TACT, process.env.SECRET_KEY);
        if (decoded.id !== decryptedId) {
            return R.c(res, 401, "Unauthorized: Token mismatch");
        }

        const teacher = await Teacher.findById(decryptedId).select("accessToken");

        if (!teacher || teacher.accessToken !== TACT) {
            return R.c(res, 401, "Unauthorized: Token invalid or expired");
        }
        

        req.attendanceData = req.body;
        req.teacherId = teacher._id;
        next();
    } catch (error) {
        console.error("authTeacher error:", error);
        return R.e(res);
    }
};

export { auth_mark_attendance };
