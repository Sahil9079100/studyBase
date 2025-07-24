import { Attendance } from "../models/Attendance.module.js";

export async function writeAttendanceToDB({ classId, subjectName, attendance, type }) {
    if (!Array.isArray(attendance) || !subjectName || !classId || !type) {
        throw new Error("Missing required fields");
    }

    const today = new Date();
    const month = String(today.getMonth() + 1); // "1" to "12"
    const dayIndex = today.getDate() - 1; // 0-based index
    const target = type === "lab" ? "labs" : "subjects";

    const studentIds = attendance.map(a => a.studentId);
    const records = await Attendance.find({
        studentId: { $in: studentIds },
        classId: classId
    });

    const recordMap = new Map();
    for (const doc of records) {
        recordMap.set(doc.studentId.toString(), doc);
    }

    const bulkOps = [];

    for (const { studentId, status } of attendance) {
        const doc = recordMap.get(studentId);
        if (!doc) continue;

        const subMap = doc[target] || new Map();

        // if (!subMap.has(subjectName)) {
        //     subMap.set(subjectName, {});
        // }

        const subjectRecord = subMap.get(subjectName);

        if (!subjectRecord[month]) {
            subjectRecord[month] = [];
        }

        while (subjectRecord[month].length <= dayIndex) {
            subjectRecord[month].push(null);
        }

        subjectRecord[month][dayIndex] = status === 'present' ? 1 : 0;
        subMap.set(subjectName, subjectRecord);

        bulkOps.push({
            updateOne: {
                filter: { _id: doc._id },
                update: { $set: { [target]: subMap } }
            }
        });
    }

    const result = await Attendance.bulkWrite(bulkOps, { ordered: false });

    const failedIndexes = result.getWriteErrors?.()?.map(e => e.index) || [];
    if (failedIndexes.length > 0) {
        const failedOps = failedIndexes.map(i => bulkOps[i]);
        const retryResult = await Attendance.bulkWrite(failedOps, { ordered: false });

        if (retryResult.getWriteErrors?.()?.length > 0) {
            console.warn("Some attendance updates still failed after retry.");
        }
    }

    return bulkOps.length;
}
