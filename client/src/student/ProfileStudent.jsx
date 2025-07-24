import React from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import API from '../../axios.config.js'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { setStudentData } from "../redux/studentSlice.js";

import riseICON from '../assets/icons_assets/Component 2.svg'

import { GoBell } from "react-icons/go";
import { LuSettings } from "react-icons/lu";
import { FaCircle } from "react-icons/fa6";



const ProfileStudent = () => {
    const [profile, setprofile] = useState()
    // const { id } = useParams()
    const navi = useNavigate()
    const dispatch = useDispatch();
    const studentData = useSelector((state) => state.student.studentData);


    const fetch_profile = async () => {
        try {
            const responce = await API.get('/api/student/get_student_profile')
            //            const responce = await API.post('/api/student/login_student', formData)
            dispatch(setStudentData(responce.data.data));
            setprofile(responce.data.data)
            console.log(responce.data.data)
        } catch (er) {
            console.log("erroris: ", er)
        }
    }

    const go_class = () => {
        const data = profile

        // console.log("hehe", data)
        dispatch(setStudentData(data));
        navi(`/student/${data._id}/class`);
    }

    const go_attendance = () => {
        const data = profile

        // console.log("hehe", data)
        dispatch(setStudentData(data));
        navi(`/student/${data._id}/attendance`);
    }


    // useEffect(() => {
    //     fetch_profile()
    // }, [navi])

    useEffect(() => {
        console.log(studentData)
    }, [navi])


    return (<>
        {true ? <>
            <div>
                <div className='this_is_header bg-[#1451F0] w-full h-fit flex justify-start items-center'>

                    <div className='flex justify-center items-center gap-4 p-4 text-white'>
                        <div className='bg-cover w-14'>
                            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                alt="Profile" className='rounded-full border-2 border-white shadow-lg' />
                        </div>
                        <div>
                            <h1 className='text-white font-bold text-xl'>Good Afternoon, {studentData.name}</h1>
                            <h1 className='text-xs'>Computer Science Engineering</h1>
                            <h1 className='text-xs'>1234GIT • 6th Semester</h1>
                        </div>
                    </div>
                    <div className='text-white text-xl flex justify-center items-center gap-2 ml-auto p-4'>
                        <div className='bg-blue-500 p-2 rounded-full'><GoBell /></div>
                        <div className='bg-blue-500 p-2 rounded-full'><LuSettings /></div>
                    </div>
                </div>

                <div className='bg-[#F9FAFB] w-full h-fit flex flex-col justify-center items-center p-4 border-2 border-gray-200 gap-4'>
                    <div className='flex flex-col gap-3 justify-center items-center bg-yllow-200 w-full'>

                        <div className='flex gap-3 flex-wrap-row bg-rd-200 w-full'>
                            <div className='bg-white w-full flex flex-col items-start justify-center p-5 border-2 rounded-xl relative active:scale-[99%] transition-all ease-in-out pr-20'
                                style={{ boxShadow: "2px 3px 2px rgba(0, 0, 0, 0.1)" }}>
                                <h6 className='text-xs text-black/70 font-medium'>Overall<br />Attendance</h6>
                                <h1 className='text-2xl font-bold'>84%</h1>
                                {/* <div className='absolute top-5 right-6 bg-[#F3E8FF] p-3 rounded-full'></div> */}
                                <div className='absolute top-6 right-6 bg-[#DBFCE7] p-2 rounded-[10px]'><img src={riseICON} alt="" /></div>
                            </div>

                            <div className='bg-white w-full flex flex-col items-start justify-center p-5 border-2 rounded-xl relative active:scale-[99%] transition-all ease-in-out pr-20'
                                style={{ boxShadow: "2px 3px 2px rgba(0, 0, 0, 0.1)" }}>
                                <h6 className='text-xs text-black/70 font-medium'>Classes Today</h6>
                                <h1 className='text-2xl font-bold'>4</h1>
                                {/* <div className='absolute top-5 right-6 bg-[#F3E8FF] p-3 rounded-full'></div> */}
                                <div className='absolute top-6 right-6 bg-[#DBFCE7] p-2 rounded-[10px]'><img src={riseICON} alt="" /></div>
                            </div>
                        </div>

                        <div className='flex gap-3 flex-wrap-row bg-rd-200 w-full'>
                            <div className='bg-white w-full flex flex-col items-start justify-center p-5 border-2 rounded-xl relative active:scale-[99%] transition-all ease-in-out pr-20'
                                style={{ boxShadow: "2px 3px 2px rgba(0, 0, 0, 0.1)" }}>
                                <h6 className='text-xs text-black/70 font-medium'>Target Met</h6>
                                <h1 className='text-2xl font-bold'>3/5</h1>
                                {/* <div className='absolute top-5 right-6 bg-[#F3E8FF] p-3 rounded-full'></div> */}
                                <div className='absolute top-6 right-6 bg-[#DBFCE7] p-2 rounded-[10px]'><img src={riseICON} alt="" /></div>
                            </div>

                            <div className='bg-white w-full flex flex-col items-start justify-center p-5 border-2 rounded-xl relative active:scale-[99%] transition-all ease-in-out pr-20'
                                style={{ boxShadow: "2px 3px 2px rgba(0, 0, 0, 0.1)" }}>
                                <h6 className='text-xs text-black/70 font-medium'>Class Today</h6>
                                <h1 className='text-2xl font-bold'>84%</h1>
                                {/* <div className='absolute top-5 right-6 bg-[#F3E8FF] p-3 rounded-full'></div> */}
                                <div className='absolute top-6 right-6 bg-[#DBFCE7] p-2 rounded-[10px]'><img src={riseICON} alt="" /></div>
                            </div>
                        </div>

                    </div>

                    {/* <div onClick={go_class} className='w-28 h-28 bg-red-400 flex flex-col justify-center items-center'>
                            Class
                            <p>{studentData.classid.branch}</p>
                        </div>

                        <div onClick={go_attendance} className='w-28 h-28 bg-red-400 flex flex-col justify-center items-center'>
                            Attendance
                            <p className='text-xs'>click to view more...</p>
                        </div> */}

                    <div className='bg-white w-full flex flex-col items-start justify-center border-2 rounded-xl relative active:scale-[99%] transition-all ease-in-out '
                        style={{ boxShadow: "2px 3px 2px rgba(0, 0, 0, 0.1)" }}>
                        <div className='border-b-2 w-full mt-5 px-5 pb-5 flex items-center justify-between'>
                            <div>
                                <h1 className='text-xl font-semibold'>Today's Schedule</h1>
                                <h6 className='text-xs text-black/70 font-medium'>Class Today</h6>
                            </div>
                            <div className='text-blue-600 font-medium text-xs bg-rd-200 p-1'>
                                View Details
                            </div>
                        </div>

                        <div className='w-full border-2 flex flex-col gap-3 p-3 rounded-bl-xl rounded-br-xl'>
                            <div className='bg-[#F9FAFB] rounded-md px-4 py-3 flex items-center justify-between'>

                                <div className='flex items-center gap-4'>
                                    <div className='text-green-600 text-sm'><FaCircle /></div>

                                    <div>
                                        <div className='font-semibold'>Mathematics</div>
                                        <div className='text-sm text-black/80 font-light'>Room 101</div>
                                    </div>
                                </div>
                                <div>
                                    <div className='font-semibold'>09:00 AM</div>
                                    <div>Attended</div>
                                </div>

                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </> : <>
            <div>Loading</div>

        </>}

    </>)
}

export default ProfileStudent