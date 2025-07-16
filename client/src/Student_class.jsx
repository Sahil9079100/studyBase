import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";

const Student_class = () => {
    const studentData = useSelector((state) => state.student.studentData);

    const [subpage, setsubpage] = useState(true)
    const [labpage, setlabpage] = useState(false)

    useEffect(() => {
        console.log(studentData.classid)
    }, [studentData])

    return (
        <div className='text-center'>

            {studentData.classid._id}
            <div className='flex justify-center items-center w-full gap-6'>
                <div onClick={() => { setsubpage(true); setlabpage(false) }} className='bg-red-400/50'>Subject</div>
                <div onClick={() => { setsubpage(false); setlabpage(true) }} className='bg-red-400/50'>Labs</div>
            </div>

            {subpage ?
                <div className='felx flex-col gap-3 justify-center items-cente p-3r'>
                    {studentData.classid.subjects.map(function (elem, idx) {
                        return <div key={idx} className='bg-gray-900/30 p-3 rounded-lg flex items-center justify-between m-3'>
                            <h1 className="font-semi-bold text-xl">{elem.name}</h1>
                            <h1 className="font-semi-bold text-xl">{elem.teacherId}</h1>
                        </div>
                    })}
                </div> : null
            }


            {labpage ?
                <div className='felx flex-col gap-3 justify-center items-cente p-3r'>
                    {studentData.classid.labs.map(function (elem, idx) {
                        return <div key={idx} className='bg-blue-800/50 p-3 rounded-lg flex items-center justify-between m-3'>
                            <h1 className="font-semi-bold text-xl">{elem.name}</h1>
                            <h1 className="font-semi-bold text-xl">{elem.teacherId}</h1>
                        </div>
                    })}
                </div> : null
            }

        </div>
    )
}

export default Student_class