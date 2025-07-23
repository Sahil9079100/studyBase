import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useState } from 'react';


const ClassStudentTeacher = () => {
    const { id, classnum } = useParams();
    const navi = useNavigate()
    let hehe = classnum
    const teacherData = useSelector((state) => state.teacher.teacherData);
    const ClassStudentData = useSelector((state) => state.teacher.teacherData.classes[hehe]);
    console.log("teacherid redux ", teacherData)
    console.log("class redux", ClassStudentData)
    console.log("id ", id)
    console.log("classnum ", classnum)

    const [subpage, setsubpage] = useState(true)
    const [labpage, setlabpage] = useState(false)
    const lab = "lab"
    const sub = "sub"


    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Teacher ID: {teacherData.name}</h1>
            <h2 className="text-xl mt-2">Class number: {classnum}</h2>
            <div className='flex justify-center items-center w-full gap-6 my-3'>
                <div onClick={() => { setsubpage(true); setlabpage(false) }} className='bg-red-400/30'>Subject</div>
                <div onClick={() => { setsubpage(false); setlabpage(true) }} className='bg-red-400/30'>Labsss</div>
            </div>
            <br />

            {subpage ?
                <div className='flex flex-col gap-2 justify-center items-center p-2'>
                    {ClassStudentData.subjects.map((elem, idx) => (
                        <div onClick={() => { if (elem.teacherId == teacherData.name) { navi(`/teacher/${teacherData._id}/classes/${classnum}/${sub}/${elem.name}`) } }} key={idx} className='bg-blue-800/50 p-3 rounded-lg flex items-center justify-between  w-full'>
                            <div className="text-white text-lg font-semibold flex gap-2 ">
                                {/* {elem.section.map((sec, i) => (
                            <div key={i}>{sec}</div>
                        ))} */}
                                {elem.teachsubpageerId}
                                <h1 className={`${(elem.teacherId == teacherData.name) ? "cursor-auto" : "cursor-not-allowed"} text-sm flex items-center font-light`}>{(elem.teacherId == teacherData.name) ? "ok" : "not-allowed"}</h1>
                            </div>
                            <h1 className="font-semibold text-xl text-white">{elem.name}</h1>
                        </div>
                    ))}
                </div> : null
            }

            {labpage ?
                <div className='flex flex-col gap-2 justify-center items-center p-2'>
                    {ClassStudentData.labs.map((elem, idx) => (
                        <div onClick={() => { if (elem.teacherId == teacherData.name) { navi(`/teacher/${teacherData._id}/classes/${classnum}/${lab}/${elem.name}`) } }} key={idx} className='bg-blue-800/50 p-3 rounded-lg flex items-center justify-between  w-full'>
                            <div className="text-white text-lg font-semibold flex gap-2 ">
                                {/* {elem.section.map((sec, i) => (
                            <div key={i}>{sec}</div>
                        ))} */}
                                {elem.teacherId}
                                <h1 className={`${(elem.teacherId == teacherData.name) ? "cursor-auto" : "cursor-not-allowed"} text-sm flex items-center font-light`}>{(elem.teacherId == teacherData.name) ? "ok" : "not-allowed"}</h1>
                            </div>
                            <h1 className="font-semibold text-xl text-white">{elem.name}</h1>
                        </div>
                    ))}
                </div> : null
            }

        </div >
    );
};

export default ClassStudentTeacher;
