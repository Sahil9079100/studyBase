import React, { useState } from 'react'
import { useSelector } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom';


const ClassesTeacher = () => {
    const teacherData = useSelector((state) => state.teacher.teacherData);
    console.log("ok ", teacherData.classes)

    const navi = useNavigate()
    const { id } = useParams()

    const [subpage, setsubpage] = useState(true)
    const [labpage, setlabpage] = useState(false)

    return (<>

        <div>{teacherData.name}</div>
        {/* <div className='felx flex-col gap-3 justify-center items-cente p-3r'>
            {teacherData.classes.map(function (elem, idx) {
                return <div key={idx} className='bg-blue-800/50 p-3 rounded-lg flex items-center justify-between m-3'>
                    <div className="font-semi-bold text-xl">{  elem.sections.map(function (hehe,idx) { return <div>{hehe}</div> })  }</div>
                    <h1 className="font-semi-bold text-xl">{elem.branch}</h1>
                </div>
            })}
        </div> */}

        {/* <div className='flex justify-center items-center w-full gap-6 my-3'>
            <div onClick={() => { setsubpage(true); setlabpage(false) }} className='bg-red-400/30'>Subject</div>
            <div onClick={() => { setsubpage(false); setlabpage(true) }} className='bg-red-400/30'>Labs</div>
        </div> */}

        <div className='flex flex-col gap-2 justify-center items-center p-2'>
            {teacherData.classes.map((elem, idx) => (
                <div onClick={() => { navi(`/teacher/${id}/classes/${idx}`) }} key={idx} className='bg-blue-800/50 p-3 rounded-lg flex items-center justify-between  w-full'>
                    <div className="text-white text-lg font-semibold flex gap-2">
                        {elem.section.map((sec, i) => (
                            <div key={i}>{sec}</div>
                        ))}
                    </div>
                    <h1 className="font-semibold text-xl text-white">{elem.branch}</h1>
                </div>
            ))}
        </div>

        

    </>)
}

export default ClassesTeacher