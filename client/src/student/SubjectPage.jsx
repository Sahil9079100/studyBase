import React, { useState } from 'react';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

import { IoIosArrowBack } from "react-icons/io";
import { FiHome } from "react-icons/fi";
import { AiOutlineFileDone } from "react-icons/ai";
import { SiGoogleclassroom } from "react-icons/si";
import { HiOutlineUserGroup } from "react-icons/hi";
import { RiUser3Line } from "react-icons/ri";
import { GrSchedules } from "react-icons/gr";

const SubjectPage = () => {
    const studentData = useSelector((state) => state.student.studentData);
    const navi = useNavigate();

    const [activeTab, setActiveTab] = useState("Subjects");

    return (
        <div className='w-full h-[100vh] flex flex-col items-start justify-start'>
            <div className='bg-white w-full flex items-center justify-between gap-4 py1 px-2 border-2 border-b text-2xl font-semibold'>
                <div className='flex items-center gap-4 px-1 '>
                    <IoIosArrowBack onClick={() => { navi(-1) }} />
                    My Classroom
                </div>
                <div className='bg-gray- flex flex-col justify-center items-center px-1 pt-2 rounded-md text-xl text-black font-bold'>
                    <GrSchedules className='' />
                    <h1 className='text-[10px] text-black/60'>Timetable</h1>
                </div>
            </div>


            {/* Toggle Tabs */}
            <div className='w-full flex items-center justify-between px-3 bg-white border-b-[1px] z-50 sticky top-0'>
                <div onClick={() => setActiveTab("Subjects")} className={`w-full text-center py-2 transition-all duration-500 cursor-pointer ${activeTab === "Subjects" ? "border-b-[2px] border-blue-500 bg-blue-400/10 text-blue-500" : "border-b-[2px] border-transparent text-gray-500"}`}>
                    Subjects / Labs
                </div>
                <div onClick={() => setActiveTab("Timetable")} className={`w-full text-center py-2 transition-all duration-500 cursor-pointer ${activeTab === "Timetable" ? "border-b-[2px] border-blue-500 bg-blue-400/10 text-blue-500" : "border-b-[2px] border-transparent text-gray-500"}`}>
                    Timetable
                </div>
            </div>




            <div className='bg-[rgb(249,250,251)] w-full h-full flex flex-col items-center justify-start p-5 gap-4'>
                {activeTab === "Subjects" && (
                    <div className='w-full flex flex-col items-center justify-start gap-4'>

                        <div className='w-full flex items-center justify-around gap-4'>
                            <div className='bg-white w-[30%] flex flex-col items-center justify-center p-4 border rounded-lg shadow-md'>
                                <h1 className='text-2xl font-bold text-blue-500'>82%</h1>
                                <h6 className='text-sm text-black/70 font-medium'>Overall</h6>
                            </div>

                            <div className='bg-white w-[30%] flex flex-col items-center justify-center p-4 border rounded-lg shadow-md'>
                                <h1 className='text-2xl font-bold text-black'>5</h1>
                                <h6 className='text-sm text-black/70 font-medium'>Subjects</h6>
                            </div>

                            <div className='bg-white w-[30%] flex flex-col items-center justify-center p-4 border rounded-lg shadow-md'>
                                <h1 className='text-2xl font-bold text-purple-500'>18</h1>
                                <h6 className='text-sm text-black/70 font-medium'>Credits</h6>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "Timetable" && (
                    <div>
                        <h1 className='text-lg font-semibold'>Timetable Content</h1>
                    </div>
                )}
            </div>




            <div className="fixed bottom-0 left-0 w-full h-16 bg-white border-t border-gray-300 flex justify-around items-center shadow-md">
                <div onClick={() => { navi(`/student/${studentData._id}`); }} className="flex flex-col items-center justify-center text-center">
                    <FiHome className="text-xl text-gray-600" />
                    <span className="text-[10px] text-gray-600 font-medium mt-1">Home</span>
                </div>
                <div onClick={() => { navi(`/student/${studentData._id}/attendance`); }} className="flex flex-col items-center justify-center text-center">
                    <AiOutlineFileDone className="text-xl text-gray-600" />
                    <span className="text-[10px] text-gray-600 font-medium mt-1">Attendance</span>
                </div>
                <div className="flex flex-col items-center justify-center text-center">
                    <SiGoogleclassroom className="text-xl text-[#627ef8]" />
                    <span className="text-[10px] text-[#627ef8] font-medium mt-1">Classroom</span>
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
    );
};

export default SubjectPage;