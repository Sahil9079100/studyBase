import React from 'react'
import { FiCalendar } from "react-icons/fi";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { FaRegCircle } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";



import riseICON from '../assets/icons_assets/Component 2 (1).svg'
import bookICON from '../assets/icons_assets/Group 15.svg'
import crossICON from '../assets/icons_assets/xmark-svgrepo-com (1).svg'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AttendancePanel = () => {
    const navi = useNavigate()
    const studentData = useSelector((state) => state.student.studentData);

    const [totalPercentage, setTotalPercentage] = useState(82);
    const [totalSubjects, setTotalSubjects] = useState(5);
    const [totallabs, setTotallabs] = useState(5);
    const [classesAttended, setClassesAttended] = useState(71);
    const [classesMissed, setClassesMissed] = useState(38);
    // bg-[#F9FAFB]

    useEffect(() => {
        console.log("attendacne page", studentData._id)
    }, [navi])


    return (
        <div className='w-full h-[100vh] flex flex-col items-start justify-start'>
            <div className='bg-white w-full  flex items-center gap-4 py-5 px-2 border-2 border-b text-2xl font-semibold'>
                <IoIosArrowBack onClick={()=>{navi(`/student/${studentData._id}`)}}/>
                <div className='bg-[#155DFC] flex justify-center items-center p-2 rounded-md text-2xl text-white font-bold'><FiCalendar /></div>
                Attendance Tracker
            </div>

            <div className='bg-[#F9FAFB] w-full flex flex-col items-center justify-start p-5 gap-4'>

                <div className='bg-white w-full flex flex-col items-start justify-center p-6 border-2 rounded-xl relative active:scale-[99%] transition-all ease-in-out'
                    style={{ boxShadow: "2px 3px 2px rgba(0, 0, 0, 0.1)" }}>
                    <h6 className='text-xs text-black/70 font-medium'>Overall attendance</h6>
                    <h1 className='text-3xl font-bold'>{totalPercentage}%</h1>
                    <div className='bg-[#DBEAFE] px-2 py-1 rounded-full text-xs font-normal text-blue-600 mt-2'>Good</div>
                    <div className='absolute top-6 right-6 bg-[#DBEAFE] p-3 rounded-full'><img src={riseICON} alt="" /></div>
                    <div className='absolute top-24 right-7 text-xl text-black/50'><MdOutlineKeyboardArrowRight /></div>
                </div>

                <div className='bg-white w-full flex flex-col items-start justify-center p-6 border-2 rounded-xl relative active:scale-[99%] transition-all ease-in-out'
                    style={{ boxShadow: "2px 3px 2px rgba(0, 0, 0, 0.1)" }}>
                    <h6 className='text-xs text-black/70 font-medium'>Total subjects and labs</h6>
                    <h1 className='text-3xl font-bold'>{totalSubjects} <span className=' text-black/70 font-medium'>/</span> {totallabs}</h1>
                    <div className='absolute top-5 right-6 bg-[#F3E8FF] p-3 rounded-full'><img src={bookICON} alt="" /></div>
                    <div className='absolute top-[70px] right-7 text-xl text-black/50'><MdOutlineKeyboardArrowRight /></div>
                </div>

                <div className='bg-white w-full flex flex-col items-start justify-center p-6 border-2 rounded-xl relative active:scale-[99%] transition-all ease-in-out'
                    style={{ boxShadow: "2px 3px 2px rgba(0, 0, 0, 0.1)" }}>
                    <h6 className='text-xs text-black/70 font-medium'>Classes Attended</h6>
                    <h1 className='text-3xl font-bold'>{classesAttended}</h1>
                    <div className='absolute top-5 right-6 bg-[#DBFCE7] p-3 rounded-full text-xl text-green-500'><IoMdCheckmarkCircleOutline /></div>
                    <div className='absolute top-[70px] right-7 text-xl text-black/50'><MdOutlineKeyboardArrowRight /></div>
                </div>

                <div className='bg-white w-full flex flex-col items-start justify-center p-6 border-2 rounded-xl relative active:scale-[99%] transition-all ease-in-out'
                    style={{ boxShadow: "2px 3px 2px rgba(0, 0, 0, 0.1)" }}>
                    <h6 className='text-xs text-black/70 font-medium'>Classes Missed</h6>
                    <h1 className='text-3xl font-bold'>{classesMissed}</h1>
                    <div className='absolute top-5 right-6 bg-[#FFE2E2] p-3 rounded-full text-xl text-[#ff0000]'>
                        <img width='18px' src={crossICON} alt="" />
                        <div className='absolute top-[11px] right-[11px]'><FaRegCircle /></div>
                    </div>
                    <div className='absolute top-[70px] right-7 text-xl text-black/50'><MdOutlineKeyboardArrowRight /></div>
                </div>

                <div className='bg-white w-full flex flex-col items-start justify-center p-5 border-2 rounded-xl relative mt-6'
                    style={{ boxShadow: "2px 3px 2px rgba(0, 0, 0, 0.1)" }}>
                    <h1 className='text-xl font-semibold'>Quick Actions</h1>
                    <hr className='border-b-[1px] w-full absolute left-0 top-14' />
                    <h6 className='text-xs text-black/70 font-medium mt-4'></h6>
                    {/* <h1 className='text-3xl font-bold'>71</h1> */}
                    <div className='w-full flex flex-col gap-3 mt-4'>
                        <button className='w-full bg-gray-200/70 py-3 text-black/90 font-medium rounded-md active:scale-[99%] transition-all ease-in-out'>View Calendar</button>
                        <button className='w-full bg-gray-200/70  py-3 text-black/90 font-medium rounded-md active:scale-[99%] transition-all ease-in-out'>Generate Report</button>
                    </div>
                    {/* <div className='absolute top-5 right-6 bg-[#DBFCE7] p-3 rounded-full text-xl text-green-500'><IoMdCheckmarkCircleOutline /></div> */}
                    {/* <div className='absolute top-[70px] right-7 text-xl text-black/50'><MdOutlineKeyboardArrowRight /></div> */}
                </div>

            </div>
        </div>
    )
}

export default AttendancePanel