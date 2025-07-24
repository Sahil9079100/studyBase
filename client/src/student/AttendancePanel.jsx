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
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { FiHome } from "react-icons/fi";
import { AiOutlineFileDone } from "react-icons/ai";
import { SiGoogleclassroom } from "react-icons/si";
import { HiOutlineUserGroup } from "react-icons/hi";
import { RiUser3Line } from "react-icons/ri";
import { IoMdMore } from "react-icons/io";


const AttendancePanel = () => {
    const navi = useNavigate()
    const { id } = useParams();
    const studentData = useSelector((state) => state.student.studentData);

    const [navbarOpen, setNavbarOpen] = useState(false);

    const [totalPercentage, setTotalPercentage] = useState(82);
    const [totalSubjects, setTotalSubjects] = useState(5);
    const [totallabs, setTotallabs] = useState(5);
    const [classesAttended, setClassesAttended] = useState(71);
    const [classesMissed, setClassesMissed] = useState(38);
    // bg-[#F9FAFB]

    useEffect(() => {
        console.log("attendacne page", studentData._id)
    }, [navi])

    function go_Home() {
        navi(`/student/${studentData._id}`)
    }


    return (
        <div className='w-full h-[100vh] flex flex-col items-start justify-between'>
            <div className='bg-white w-full  flex items-center gap-4 py-5 px-2 border-2 border-b text-2xl font-semibold'>
                {/* <IoIosArrowBack onClick={() => { navi(`/student/${studentData._id}`) }} /> */}
                <div className='bg-[#155DFC] flex justify-center items-center p-2 rounded-md text-2xl text-white font-bold'><FiCalendar /></div>
                Attendance Tracker
                <div onClick={() => { setNavbarOpen(!navbarOpen) }} className='absolute top-6 right-4 bg-blue-300/20 rounded-lg p-2'><IoMdMore /></div>

                {navbarOpen ?
                    <div className="w-48 h-fit absolute border border-gray-300 bg-white z-30 top-20 right-4 flex flex-col items-center justify-start rounded-lg shadow-lg">
                        <button onClick={()=>{navi("calendar")}} className="w-full py-3 text-sm text-gray-700 font-medium hover:bg-blue-100 hover:text-blue-600 rounded-t-lg transition-all ease-in-out">
                            View Calendar
                        </button>
                        <button onClick={()=>{navi("analysis")}} className="w-full py-3 text-sm text-gray-700 font-medium hover:bg-blue-100 hover:text-blue-600 rounded-b-lg transition-all ease-in-out">
                            Detailed Analytics
                        </button>
                    </div> : null}
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
                    <h1 className='text-xl font-semibold'>Report</h1>
                    <hr className='border-b-[1px] w-full absolute left-0 top-14' />
                    <h6 className='text-xs text-black/70 font-medium mt-4'></h6>
                    {/* <h1 className='text-3xl font-bold'>71</h1> */}
                    <div className='w-full flex flex-col gap-3 mt-4'>
                        {/* <button className='w-full bg-gray-200/70 py-3 text-black/90 font-medium rounded-md active:scale-[99%] transition-all ease-in-out'>View Calendar</button> */}
                        <button className='w-full bg-gray-200/70  py-3 text-black/90 font-medium rounded-md active:scale-[99%] transition-all ease-in-out'>Download PDF Report</button>
                        {/* <button className='w-full bg-gray-200/70  py-3 text-black/90 font-medium rounded-md active:scale-[99%] transition-all ease-in-out'>Detailed Analytics</button> */}
                    </div>
                    {/* <div className='absolute top-5 right-6 bg-[#DBFCE7] p-3 rounded-full text-xl text-green-500'><IoMdCheckmarkCircleOutline /></div> */}
                    {/* <div className='absolute top-[70px] right-7 text-xl text-black/50'><MdOutlineKeyboardArrowRight /></div> */}
                </div>

                <div className='w-full h-11'></div>

            </div>

            <div className="fixed bottom-0 left-0 w-full h-16 bg-white border-t border-gray-300 flex justify-around items-center shadow-md">
                <div onClick={() => { go_Home() }} className="flex flex-col items-center justify-center text-center">
                    <FiHome className="text-xl text-gray-600" />
                    <span className="text-[10px] text-gray-600 font-medium mt-1">Home</span>
                </div>
                <div className="flex flex-col items-center justify-center text-center">
                    <AiOutlineFileDone className="text-xl text-[#627ef8]" />
                    <span className="text-[10px] text-[#627ef8] font-medium mt-1">Attendance</span>
                </div>
                <div className="flex flex-col items-center justify-center text-center">
                    <SiGoogleclassroom className="text-xl text-gray-600" />
                    <span className="text-[10px] text-gray-600 font-medium mt-1">Classroom</span>
                </div>
                <div className="flex flex-col items-center justify-center text-center">
                    <HiOutlineUserGroup className="text-xl text-gray-600" />
                    <span className="text-[10px] text-gray-600 font-medium mt-1">Group</span>
                </div>
                <div className="flex flex-col items-center justify-center text-center">
                    <RiUser3Line className="text-xl text-gray-600" />
                    <span className="text-[10px] text-gray-600 font-medium mt-1">Profile</span>
                </div>
            </div>



        </div>
    )
}

export default AttendancePanel