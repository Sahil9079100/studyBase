import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from "react-redux";

const SubjectStudent = () => {
    const { id, classnum } = useParams();
    const navi = useNavigate()
    const teacherData = useSelector((state) => state.teacher.teacherData);
    const ClassStudentData = useSelector((state) => state.teacher.teacherData.classes[classnum]);

    console.log("teacherid redux OK ", teacherData)
    console.log("class redux OK", ClassStudentData)
    console.log("id OK", id)
    console.log("classnum OK", classnum)

    return (<>

        <div className="p-4">
            <h1 className="text-2xl font-bold">Teacher ID: {teacherData.name}</h1>
            <h2 className="text-xl mt-2">Class: {ClassStudentData.branch}</h2>
            <br />
            <div className='flex flex-col gap-2 justify-center items-center p-2'>
                {ClassStudentData.students.map((elem, idx) => (
                    <div
                        onClick={() => { console.log(elem) }}
                        // onClick={() => { { navi(`/teacher/${teacherData._id}/classes/${idx}/${elem.name}`) } }}
                        key={idx} className='bg-blue-800/50 p-3 rounded-lg flex items-center justify-between  w-full'>
                        <div className="text-white text-lg font-semibold flex gap-2 ">
                            {elem._id.name}
                            {/* hello  */}
                            {/* <h1 className={`${(elem.teacherId == teacherData.name) ? "cursor-auto" : "cursor-not-allowed"} texl-md font-light`}>{(elem.teacherId == teacherData.name) ? "ok" : "not-allowed"}</h1> */}
                        </div>
                        {/* <h1 className="font-semibold text-xl text-white">{elem.name}</h1> */}
                    </div>
                ))}
            </div>

        </div >


    </>)
}

export default SubjectStudent