import express from 'express';
// import { addUserToSheet } from './curd.js';
import { make_new_class , add_subject , add_lab } from "../controllers/class.controller.js"

const router = express.Router();

router.post('/make_new_class', make_new_class);
router.post('/add_subject', add_subject);
router.post('/add_lab', add_lab);

export default router;