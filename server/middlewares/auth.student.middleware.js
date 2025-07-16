import jwt from "jsonwebtoken";
import CryptoJS from "crypto-js";
import { Student } from "../models/student.module.js";
import { R } from "../utilits/res.helper.js";

const authStudent = async (req, res, next) => {
    try {
        const { ACT, STID } = req.cookies;

        if (!ACT || !STID) {
            return R.c(res, 401, "Unauthorized: Missing token or ID");
        }

        const decryptedBytes = CryptoJS.AES.decrypt(STID, process.env.SECRET_KEY);
        const decryptedId = decryptedBytes.toString(CryptoJS.enc.Utf8);

        if (!decryptedId) {
            return R.c(res, 401, "Unauthorized: Invalid student ID");
        }

        const decoded = jwt.verify(ACT, process.env.SECRET_KEY);
        if (decoded.id !== decryptedId) {
            return R.c(res, 401, "Unauthorized: Token mismatch");
        }

        const student = await Student.findById(decryptedId).select("accessToken");

        if (!student || student.accessToken != ACT) {
            return R.c(res, 401, "Unauthorized: Token invalid or expired");
        }

        req.studentId = student._id;
        next();
    } catch (error) {
        console.error("authStudent error:", error);
        return R.e(res)
    }
};

export { authStudent };
