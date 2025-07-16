import express from "express"
import { Classes } from "../models/class.module.js"

const make_new_class = async (req, res) => {
    try {
        const { sem, branch, section } = req.body
        if (!sem || !branch || !section) {
            return res.status(400).json({ status: 400, message: "Missing sem, branch or section" })
        }
        /*
            sem-
            branch-
            section-
            notes-later
            subjects-
            labs
            students
        */

        /*
        {
            "sem": "2",
            "branch": "IT",
            "section": ["a1", "a2"]
        }
        */

        const new_class = new Classes({
            sem,
            branch,
            section
        })
        await new_class.save()

        console.log("Class created successfully")
        res.status(200).json({ status: 200, message: "Class created" })

    } catch (error) {
        console.log("make_new_class error: ", error)
        res.status(500).json({ status: 500, message: "make_new_class internal server error", error: error.message })
    }
}

const add_subject = async (req, res) => {

    /*{
        "class_id": "685fbe1bf89499f7bb6ccb6b",
        "sub_teacher": [
            {"name":"math","teacherId":"rashmi"},
            {"name":"chemistry","teacherId":"gotval"}
        ]
    }*/

    try {
        const { class_id, sub_teacher } = req.body

        if (!class_id || !Array.isArray(sub_teacher) || sub_teacher.length === 0) {
            return res.status(400).json({
                status: 400,
                message: "Missing class_id or invalid/empty sub_teacher array"
            })
        }

        const found_class = await Classes.findById(class_id)
        if (!found_class) {
            return res.status(404).json({ status: 404, message: "Class not found" })
        }
        found_class.subjects = sub_teacher
        await found_class.save()

        res.status(200).json({
            status: 200,
            message: "Subjects added successfully",
            updatedSubjects: found_class.subjects
        })
    } catch (error) {
        console.log("add_subject error: ", error)
        res.status(500).json({ status: 500, message: "add_subject internal server error", error: error.message })
    }
}


const add_lab = async (req, res) => {

    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // REMEMBER THAT THIS REWRITE THE WHOLE LAB ARRAY, SO SEND THE WHOLE ARRAY FROM FRONTEND
    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    /*{
        "class_id": "685fbe1bf89499f7bb6ccb6b",
        "sub_teacher": [
            {"name":"math","teacherId":"rashmi"},
            {"name":"chemistry","teacherId":"gotval"}
        ]
    }*/

    try {
        const { class_id, labs_teacher } = req.body

        if (!class_id || !Array.isArray(labs_teacher) || labs_teacher.length === 0) {
            return res.status(400).json({
                status: 400,
                message: "Missing class_id or invalid/empty labs_teacher array"
            })
        }

        const found_class = await Classes.findById(class_id)
        if (!found_class) {
            return res.status(404).json({ status: 404, message: "Class not found" })
        }
        found_class.labs = labs_teacher
        await found_class.save()

        res.status(200).json({
            status: 200,
            message: "Labs added successfully",
            updatedSubjects: found_class.labs
        })
    } catch (error) {
        console.log("add_lab error: ", error)
        res.status(500).json({ status: 500, message: "add_lab internal server error", error: error.message })
    }
}

export { make_new_class, add_subject, add_lab }