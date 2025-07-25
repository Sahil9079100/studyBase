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
import { FiHome } from "react-icons/fi";
import { AiOutlineFileDone } from "react-icons/ai";
import { SiGoogleclassroom } from "react-icons/si";
import { HiOutlineUserGroup } from "react-icons/hi";
import { RiUser3Line } from "react-icons/ri";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import PropagateLoader from "react-spinners/PropagateLoader";





const ProfileStudent = () => {
    const [profile, setprofile] = useState()
    // const { id } = useParams()
    const navi = useNavigate()
    const dispatch = useDispatch();
    // const studentData = useSelector((state) => state.student.studentData);

    // ALL VALUE STATES HERE
    const [overallAttendance, setOverallAttendance] = useState(0);
    const [highestStreakSubject, setHighestStreakSubject] = useState("");
    const [highestStreak, setHighestStreak] = useState(0);
    const [classesToday, setClassesToday] = useState(0);


    const fetch_profile = async () => {
        try {
            const responce = await API.get('/api/student/get_student_profile')
            //            const responce = await API.post('/api/student/login_student', formData)
            dispatch(setStudentData(responce.data.data.student));
            setprofile(responce.data.data)
            console.log(responce.data.data.student)
        } catch (er) {
            console.log("erroris: ", er)
        }
    }

    const finding_overall_attendance = () => {
        let total_present = 0
        let total_absent = 0
        let total_classes = 0
        const hmm = profile.attendanceRecords[0].subjects
        // hmm = Math: {…}, Physics: {…}, English: {…}, Chemistry: {…}, C Programming: {…}

        Object.keys(hmm).forEach((name) => {
            //name contains allth subjecta names one by one
            const subArr = profile.attendanceRecords[0].subjects[name]
            // subArr contains the object inside of each subject name
            // console.log("\n", name)
            for (let i = 1; i <= 12; i++) {
                const month = subArr[i.toString()]
                // console.log(month)
                if (Array.isArray(month)) {
                    // console.log("yes")
                    month.forEach((record, index) => {
                        if (record == 1) {
                            total_present++
                            total_classes++
                        }
                        if (record == 0) {
                            total_absent++
                            total_classes++
                        }

                    });
                }
            }
        })

        console.log("total_present", total_present)
        console.log("total_absent", total_absent)
        console.log("total_classes", total_classes)

        const overallAttendance = ((total_present / total_classes) * 100).toFixed(2);
        setOverallAttendance(overallAttendance)
    }

    const findHighestStreakSubject = () => {
        const subjects = profile.attendanceRecords[0].subjects
        let highestStreak = 0
        let highestStreakSubject = ""
        Object.keys(subjects).forEach((subjectName) => {
            const subjectData = subjects[subjectName];
            let currentStreak = 0
            let maxStreak = 0
            const allDays = []
            for (let i = 1; i <= 12; i++) {
                const monthArray = subjectData[i.toString()]
                if (Array.isArray(monthArray)) {
                    allDays.push(...monthArray)
                }
            }
            for (const day of allDays) {
                if (day === 1) {
                    currentStreak++
                    maxStreak = Math.max(maxStreak, currentStreak)
                } else if (day === 0) {
                    currentStreak = 0
                }
            }

            if (maxStreak > highestStreak) {
                highestStreak = maxStreak
                highestStreakSubject = subjectName
            }
        })

        console.log("Highest Streak:", highestStreak)
        console.log("Subject with Highest Streak:", highestStreakSubject)
        setHighestStreakSubject(highestStreakSubject)
        setHighestStreak(highestStreak)
    }

    const getTodaysClassCount = () => {
        const subjects = profile.attendanceRecords[0].subjects
        const today = new Date()
        const currentMonth = (today.getMonth() + 1).toString()   // month as "1" to "12"
        const currentDate = today.getDate()      // day number like 1–31
        let classesToday = 0
        Object.keys(subjects).forEach((subjectName) => {
            const subjectData = subjects[subjectName]
            const monthArray = subjectData[currentMonth]
            if (Array.isArray(monthArray) && monthArray.length >= currentDate) {
                const todayStatus = monthArray[currentDate - 1]  // index is date - 1
                if (todayStatus === 1 || todayStatus === 0) {
                    classesToday++
                }
            }
        })
        console.log("Total classes happened today:", classesToday);
        setClassesToday(classesToday);
    };



    const go_class = () => {
        // dispatch(setStudentData(profile));
        navi(`/student/${profile.student._id}/class`);
    }

    const go_attendance = () => {

        // dispatch(setStudentData(profile));
        navi(`/student/${profile.student._id}/attendance`);
    }


    useEffect(() => {
        fetch_profile()
        // finding_overall_attendance()
    }, [navi])

    useEffect(() => {
        if (profile) {
            finding_overall_attendance();
            findHighestStreakSubject();
            getTodaysClassCount();
        }
    }, [profile])


    // useEffect(() => {
    //     console.log(studentData)
    // }, [navi])


    return (<>
        {profile ? <>
            <div>
                <div className='this_is_header bg-[#1451F0] w-full h-fit flex justify-start items-center'>

                    <div className='flex justify-center items-center gap-4 p-4 text-white'>
                        <div className='bg-cover w-14'>
                            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                alt="Profile" className='rounded-full border-2 border-white shadow-lg' />
                        </div>
                        <div>
                            <h1 className='text-white font-bold text-xl'>Good Afternoon, {profile.student.name}</h1>
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
                            <div onClick={go_attendance} className='bg-white w-[50%] flex flex-col items-start justify-center p-5 border-2 rounded-xl relative active:scale-[99%] transition-all ease-in-out'
                                style={{ boxShadow: "2px 3px 2px rgba(0, 0, 0, 0.1)" }}>
                                <h6 className='text-xs text-black/70 font-medium'>Overall<br />Attendance</h6>
                                <h1 className='text-xl font-bold'>{overallAttendance}%</h1>
                                <div className='absolute top-4 right-3 bg-[#DBFCE7] p-2 rounded-[10px]'><img src={riseICON} alt="" /></div>
                            </div>

                            <div className='bg-white w-[50%] flex flex-col items-start justify-center p-5 border-2 rounded-xl relative active:scale-[99%] transition-all ease-in-out'
                                style={{ boxShadow: "2px 3px 2px rgba(0, 0, 0, 0.1)" }}>
                                <h6 className='text-xs text-black/70 font-medium'>Classes Today</h6>
                                <h1 className='text-2xl font-bold'>{classesToday}</h1>
                                <div className='absolute top-4 right-3 bg-[#DBFCE7] p-2 rounded-[10px]'><img src={riseICON} alt="" /></div>
                            </div>
                        </div>

                        <div className='flex gap-3 flex-wrap-row bg-rd-200 w-full'>
                            <div className='bg-white w-[50%] flex flex-col items-start justify-center p-5 border-2 rounded-xl relative active:scale-[99%] transition-all ease-in-out pr-20'
                                style={{ boxShadow: "2px 3px 2px rgba(0, 0, 0, 0.1)" }}>
                                <h6 className='text-xs text-black/70 font-medium'>Target Met</h6>
                                <h1 className='text-2xl font-bold'>3/5</h1>
                                <div className='absolute top-4 right-3 bg-[#DBFCE7] p-2 rounded-[10px]'><img src={riseICON} alt="" /></div>
                            </div>

                            <div className='bg-white w-[50%] flex flex-col items-start justify-center p-5 border-2 rounded-xl relative active:scale-[99%] transition-all ease-in-out'
                                style={{ boxShadow: "2px 3px 2px rgba(0, 0, 0, 0.1)" }}>
                                <h6 className='text-xs text-black/70 font-medium'>Streak <br /> Days : Subject</h6>
                                <h1 className='text-2xl font-bold flex items-center gap-2'>{highestStreak} : <span className='text-lg '>{highestStreakSubject}</span></h1>
                                <div className='absolute top-4 right-3 bg-[#DBFCE7] p-2 rounded-[10px]'><img src={riseICON} alt="" /></div>
                            </div>
                        </div>

                    </div>

                    {/* <div onClick={go_class} className='w-28 h-28 bg-red-400 flex flex-col justify-center items-center'>
                        Class
                        <p>{profile.student.classid.branch}</p>
                    </div> */}

                    {/* <div onClick={go_attendance} className='w-28 h-28 bg-red-400 flex flex-col justify-center items-center'>
                        Attendance
                        <p className='text-xs'>click to view more...</p>
                    </div> */}

                    {/* <div className='bg-white w-full flex flex-col items-start justify-center border-2 rounded-xl relative transition-all ease-in-out '
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

                        <div className='w-full flex flex-col gap-3 p-3 rounded-bl-xl rounded-br-xl'>

                            <div className='bg-[#F9FAFB] rounded-md px-4 py-3 flex items-center justify-between'>
                                <div className='flex items-center gap-4'>
                                    <div className='text-green-400 text-sm'><FaCircle /></div>
                                    <div>
                                        <div className='font-semibold'>Mathematics</div>
                                        <div className='text-sm text-black/80 font-light'>Room 101</div>
                                    </div>
                                </div>
                                <div className='text-center'>
                                    <div className='font-semibold'>09:00 AM</div>
                                    <div className='text-[12px] bg-[#DBFCE7] text-[#248c29] rounded-full px-1 py-[2px]'>Attended</div>
                                </div>
                            </div>

                            <div className='bg-[#F9FAFB] rounded-md px-4 py-3 flex items-center justify-between'>
                                <div className='flex items-center gap-4'>
                                    <div className='text-red-400 text-sm'><FaCircle /></div>
                                    <div>
                                        <div className='font-semibold'>Chemistry</div>
                                        <div className='text-sm text-black/80 font-light'>Room 305</div>
                                    </div>
                                </div>
                                <div className='text-center'>
                                    <div className='font-semibold'>10:00 AM</div>
                                    <div className='text-[12px] bg-[#fcdfdb] text-[#8c2424] rounded-full px-1 py-[2px]'>Missed</div>
                                </div>
                            </div>

                            <div className='bg-[#F9FAFB] rounded-md px-4 py-3 flex items-center justify-between'>
                                <div className='flex items-center gap-4'>
                                    <div className='text-yellow-400 text-sm'><FaCircle /></div>
                                    <div>
                                        <div className='font-semibold'>Civil</div>
                                        <div className='text-sm text-black/80 font-light'>Room 103</div>
                                    </div>
                                </div>
                                <div className='text-center'>
                                    <div className='font-semibold'>11:00 AM</div>
                                    <div className='text-[12px] bg-[#fbfcdb] text-[#8a8c24] rounded-full px-1 py-[2px]'>Ongoing</div>
                                </div>
                            </div>

                            <div className='bg-[#F9FAFB] rounded-md px-4 py-3 flex items-center justify-between'>
                                <div className='flex items-center gap-4'>
                                    <div className='text-blue-400 text-sm'><FaCircle /></div>
                                    <div>
                                        <div className='font-semibold'>Mechanical</div>
                                        <div className='text-sm text-black/80 font-light'>Room 204</div>
                                    </div>
                                </div>
                                <div className='text-center'>
                                    <div className='font-semibold'>12:00 PM</div>
                                    <div className='text-[12px] bg-[#dbdbfc] text-[#24408c] rounded-full px-1 py-[2px]'>Upcoming</div>
                                </div>
                            </div>

                        </div>

                    </div> */}
                    <div className='w-full h-11'></div>
                </div>



                {/* <div className="fixed bottom-0 left-0 w-full h-16 bg-white border-t border-gray-300 flex justify-around items-center shadow-md">
                    <div className="bg-[#E3ECFF] px-3 py-1 pt-2 rounded-lg flex flex-col items-center justify-center text-center">
                        <FiHome className="text-xl text-gray-600" />
                        <span className="text-[10px] text-gray-600 font-medium mt-1">Home</span>
                    </div>
                    <div onClick={go_attendance} className=" pt-2 rounded-lg flex flex-col items-center justify-center text-center">
                        <AiOutlineFileDone className="text-xl text-gray-600" />
                        <span className="text-[10px] text-gray-600 font-medium mt-1">Attendance</span>
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
                </div> */}

                {/* BOTTOM BAR STARTS here.... */}
                <div className="fixed bottom-0 left-0 w-full h-16 bg-white border-t border-gray-300 flex justify-around items-center shadow-md">
                    <div className="flex flex-col items-center justify-center text-center">
                        <FiHome className="text-xl text-[#627ef8]" />
                        <span className="text-[10px] text-[#627ef8] font-medium mt-1">Home</span>
                    </div>
                    <div onClick={go_attendance} className="flex flex-col items-center justify-center text-center">
                        <AiOutlineFileDone className="text-xl text-gray-600" />
                        <span className="text-[10px] text-gray-600 font-medium mt-1">Attendance</span>
                    </div>
                    <div onClick={() => { navi(`/student/${profile.student._id}/class`); }} className="flex flex-col items-center justify-center text-center">
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
        </> : <>
            <div className='h-[100vh] w-full flex justify-center items-center'><PropagateLoader size={10} color='#3b82f6' /></div>

        </>}

    </>)
}

export default ProfileStudent







/*
#BOTTOM NAVIGATION BAR#
1. Home - already done
2. Attendance
        -Attendance Dashboard
                -calanderview
        -Analytics Dashboard
                -shows how much attendance is there in each subject
                -shows how many classes are attended and missed
                -shows how much attendance needed to clear cutoff
                -shows how much attendance needed to clear each subject cutoff
                -show a small report of the whole attendance, with critical info for low attendance subjects
3. Class
        -Subjects and Labs of the class Dashboard
                -subject / labs list of the class, with search feature
                        -can select each subject and view its details
                -Timetable section of that class (weekly)
                        - show each day in week with classes on each day, with time and teacher and room
4.Group
        -Group Dashboard
                -shows the messages sent by teachers
                -shows a notes section to only view notes
                -shows the list of teachers of student class
5.Profile - already done
*/