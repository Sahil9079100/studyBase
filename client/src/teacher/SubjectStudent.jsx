import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const SubjectStudent = () => {
    const { id, classnum } = useParams();
    const navigate = useNavigate();

    const teacherData = useSelector((state) => state.teacher.teacherData);
    const classData = teacherData.classes[classnum];

    const [attendanceList, setAttendanceList] = useState([]);

    // Load saved attendance from localStorage on component mount
    useEffect(() => {
        const cachedAttendance = localStorage.getItem("attendanceCache");
        if (cachedAttendance) {
            setAttendanceList(JSON.parse(cachedAttendance));
        }
    }, []);

    // Save to localStorage every time attendanceList changes
    useEffect(() => {
        localStorage.setItem("attendanceCache", JSON.stringify(attendanceList));
    }, [attendanceList]);

    const markAttendance = (studentId, status) => {
        setAttendanceList((prev) => {
            const filtered = prev.filter((entry) => entry.studentId !== studentId);
            return [...filtered, { studentId, status }];
        });
    };

    const getStatus = (studentId) => {
        const entry = attendanceList.find((entry) => entry.studentId === studentId);
        return entry?.status || null;
    };

    const submitAttendance = () => {
        const data = { classid: classData._id, subjectId: id, attendance: attendanceList };
        console.log(data);
        // console.log("Submitting bulk attendance:", attendanceList);
        // TODO: Send to backend here

        // Clear localStorage after successful submission
        localStorage.removeItem("attendanceCache");
        setAttendanceList([]); // Optional: Clear local UI too
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Teacher: {teacherData.name}</h1>
            <h2 className="text-xl mt-2">Class: {classData.branch}</h2>

            <div className="flex flex-col gap-2 mt-4 p-4 border-2 rounded-xl">
                {classData.students.map((student) => {
                    const isPresent = getStatus(student._id._id) === "present";
                    const isAbsent = getStatus(student._id._id) === "absent";

                    return (
                        <div
                            key={student._id._id}
                            className="flex justify-between items-center border-2 border-blue-400 rounded-lg p-3 bg-blue-800/5"
                        >
                            <div className="text-lg font-semibold text-black">{student._id.name} <br /><span className='text-sm font-light'>{student._id.rollno}</span></div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => markAttendance(student._id._id, "present")}
                                    className={`px-3 py-2 rounded font-semibold border-2 ${isPresent
                                        ? "bg-green-500 text-white border-green-500"
                                        : "bg-green-400/20 text-green-400 border-green-400"
                                        }`}
                                >
                                    Present
                                </button>
                                <button
                                    onClick={() => markAttendance(student._id._id, "absent")}
                                    className={`px-3 py-2 rounded font-semibold border-2 ${isAbsent
                                        ? "bg-red-500 text-white border-red-500"
                                        : "bg-red-400/20 text-red-400 border-red-400"
                                        }`}
                                >
                                    Absent
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-6 flex justify-between">
                <button
                    onClick={() => navigate(`/teacher/${teacherData._id}/classes/${classnum}`)}
                    className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
                >
                    Back to Class
                </button>
                <button
                    onClick={submitAttendance}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Submit Attendance
                </button>
            </div>
        </div>
    );
};

export default SubjectStudent;


// Example:
// axios.post('/api/attendance/bulk', {
//     classId: classnum,
//     subjectId: id,
//     attendanceData: attendanceList,
// }).then(res => {
//     console.log("Submitted:", res.data);
// }).catch(err => {
//     console.error("Submission error:", err);
// });