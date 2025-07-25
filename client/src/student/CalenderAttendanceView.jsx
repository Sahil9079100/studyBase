import React, { useState } from 'react';
import { IoIosArrowBack, IoIosArrowDown } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import riseICON from '../assets/icons_assets/Component 2.svg'
import { FiCalendar } from "react-icons/fi";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { LuChartColumn } from "react-icons/lu";
import { FaCircle } from "react-icons/fa6";
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';






const CalenderAttendanceView = () => {
    const navi = useNavigate()
    const [selected, setSelected] = useState();
    const [isExpanded, setIsExpanded] = useState(false)

    const toggleCalendar = () => {
        setIsExpanded((prevState) => !prevState)
    };

    return (
        <div className='w-full h-[100vh] flex flex-col items-center justify-start relative'>
            {/* Header */}
            <div className='w-full bg-rd-200 flex items-center justify-start py-2 gap-2 border-b-2 border-gray-300'>
                <IoIosArrowBack className='text-4xl bg-rd-200 m-2 p-2' onClick={() => { navi(-1) }} />
                <div className='text-black font-bold text-xl my-2'>
                    <div>Attendance Calendar</div>
                    <div className='font-light text-sm'>Visual attendance tracking</div>
                </div>
            </div>

            <div className={`absolute z-50  top-20 left-1/2 transform -translate-x-1/2 transition-all border-b border-black/30 duration-[800ms] bg-rd-300 p-2 shadow-lg rounded-lg overflow-hidden ${isExpanded ? 'max-h-[500px] w-[95%] bg-white' : 'max-h-[55px] w-[95%]'}`}>
                <div className='flex items-center justify-between text-black bg-white'>
                    <DayPicker
                        animate
                        mode="single"
                        selected={selected}
                        onSelect={setSelected}
                        footer={
                            selected ? `Selected: ${selected.toLocaleDateString()}` : "Pick a day."
                        }
                    />
                </div>

                {isExpanded && (
                    <div className='flex items-center justify-between text-black bg-white mr-3'>
                    </div>
                )}

                <div onClick={toggleCalendar} className='absolute top-8 right-0 transform -translate-y-1/2 bg-gray-200/20 flex items-center justify-center cursor-pointer p-2 rounded-full'>
                    <IoIosArrowDown className={`text-2xl transition-transform duration-[800ms] ${isExpanded ? 'rotate-180' : ''}`} />
                </div>
            </div>

            <div className='bg-red-200/0 flex flex-col items-center justify-center gap-4 p-5 m-16 w-full'>
                <div className='bg-white w-full flex flex-col items-start justify-center p-5 border-2 rounded-xl relative active:scale-[99%] transition-all ease-in-out'
                    style={{ boxShadow: "2px 3px 2px rgba(0, 0, 0, 0.1)" }}>
                    <h6 className='text-sm text-black/70 font-medium'>Classes This Month</h6>
                    <h1 className='text-2xl font-bold'>42</h1>
                    {/* <div className='bg-[#DBEAFE] px-2 py-1 rounded-full text-xs font-normal text-blue-600 mt-2'>Good</div> */}
                    <div className='absolute top-6 right-6 bg-[#DBEAFE] p-3 rounded-full text-blue-500 text-lg'><FiCalendar /></div>
                    {/* <div className='absolute top-24 right-7 text-xl text-black/50'><MdOutlineKeyboardArrowRight /></div> */}
                </div>

                <div className='bg-white w-full flex flex-col items-start justify-center p-5 border-2 rounded-xl relative active:scale-[99%] transition-all ease-in-out'
                    style={{ boxShadow: "2px 3px 2px rgba(0, 0, 0, 0.1)" }}>
                    <h6 className='text-sm text-black/70 font-medium'>Present Days</h6>
                    <h1 className='text-2xl font-bold text-green-600'>35</h1>
                    {/* <div className='bg-[#DBEAFE] px-2 py-1 rounded-full text-xs font-normal text-blue-600 mt-2'>Good</div> */}
                    <div className='absolute top-6 right-6 bg-[#e2fedb] p-3 rounded-full text-green-500 text-[20px]'><MdOutlineRemoveRedEye /></div>
                    {/* <div className='absolute top-24 right-7 text-xl text-black/50'><MdOutlineKeyboardArrowRight /></div> */}
                </div>

                <div className='bg-white w-full flex flex-col items-start justify-center p-5 border-2 rounded-xl relative active:scale-[99%] transition-all ease-in-out'
                    style={{ boxShadow: "2px 3px 2px rgba(0, 0, 0, 0.1)" }}>
                    <h6 className='text-sm text-black/70 font-medium'>Absent Days</h6>
                    <h1 className='text-2xl font-bold text-red-600'>7</h1>
                    {/* <div className='bg-[#DBEAFE] px-2 py-1 rounded-full text-xs font-normal text-blue-600 mt-2'>Good</div> */}
                    <div className='absolute top-6 right-6 bg-[#fedbdb] p-3 rounded-full text-red-500 text-[18px]'><FiCalendar /></div>
                    {/* <div className='absolute top-24 right-7 text-xl text-black/50'><MdOutlineKeyboardArrowRight /></div> */}
                </div>

                <div className='bg-white w-full flex flex-col items-start justify-center p-5 border-2 rounded-xl relative active:scale-[99%] transition-all ease-in-out'
                    style={{ boxShadow: "2px 3px 2px rgba(0, 0, 0, 0.1)" }}>
                    <h6 className='text-sm text-black/70 font-medium'>Attendance Rate</h6>
                    <h1 className='text-2xl font-bold text-blue-600'>80.00%</h1>
                    {/* <div className='bg-[#DBEAFE] px-2 py-1 rounded-full text-xs font-normal text-blue-600 mt-2'>Good</div> */}
                    <div className='absolute top-6 right-6 bg-[#dbedfe] p-3 rounded-full text-blue-500 text-[18px]'><LuChartColumn /></div>
                    {/* <div className='absolute top-24 right-7 text-xl text-black/50'><MdOutlineKeyboardArrowRight /></div> */}
                </div>


                <div className='bg-white w-full flex flex-col items-start justify-center p-5 border-2 rounded-xl relative mt-6'
                    style={{ boxShadow: "2px 3px 2px rgba(0, 0, 0, 0.1)" }}>
                    <h1 className='text-1xl font-semibold items-center'>Monthly Subject Performance</h1>
                    <h6 className='text-sm text-black/70 font-medium'>Attendance Rate</h6>
                    <hr className='border-b-[1px] w-full absolute left-0 top-[80px]' />
                    <h6 className='text-xs text-black/70 font-medium mt-4'></h6>
                    {/* <h1 className='text-3xl font-bold'>71</h1> */}
                    <div className='w-full flex flex-col gap-3 mt-4'>

                        <div className='bg-white w-full flex flex-col items-start justify-center px-4 py-4 border-2 rounded-xl relative active:scale-[99%] transition-all ease-in-out'>
                            <div className='flex gap-3 items-center'><FaCircle className='text-xs text-[#2B7FFF]' />Mathematics</div>
                            <div className='text-xs text-black/70 font-medium mt-2 w-full flex justify-between items-center'>
                                <div>This Month</div>
                                <div className='text-base text-black'>70%</div>
                            </div>
                            <CustomProgressBar value={70} color={"#2B7FFF"} />
                            <div className='text-xs text-black/60 font-medium w-full flex justify-between items-center mt-2'>35/42 classes</div>
                            <div></div>
                        </div>

                        <div className='bg-white w-full flex flex-col items-start justify-center px-4 py-4 border-2 rounded-xl relative active:scale-[99%] transition-all ease-in-out'>
                            <div className='flex gap-3 items-center'><FaCircle className='text-xs text-[#00C950]' />Physics</div>
                            <div className='text-xs text-black/70 font-medium mt-2 w-full flex justify-between items-center'>
                                <div>This Month</div>
                                <div className='text-base text-black'>84%</div>
                            </div>
                            <CustomProgressBar value={84} color={"#00C950"} />
                            <div className='text-xs text-black/60 font-medium w-full flex justify-between items-center mt-2'>35/42 classes</div>
                            <div></div>
                        </div>

                        <div className='bg-white w-full flex flex-col items-start justify-center px-4 py-4 border-2 rounded-xl relative active:scale-[99%] transition-all ease-in-out'>
                            <div className='flex gap-3 items-center'><FaCircle className='text-xs text-[#AD46FF]' />Chemistry</div>
                            <div className='text-xs text-black/70 font-medium mt-2 w-full flex justify-between items-center'>
                                <div>This Month</div>
                                <div className='text-base text-black'>72%</div>
                            </div>
                            <CustomProgressBar value={72} color={"#AD46FF"} />
                            <div className='text-xs text-black/60 font-medium w-full flex justify-between items-center mt-2'>35/42 classes</div>
                            <div></div>
                        </div>

                        <div className='bg-white w-full flex flex-col items-start justify-center px-4 py-4 border-2 rounded-xl relative active:scale-[99%] transition-all ease-in-out'>
                            <div className='flex gap-3 items-center'><FaCircle className='text-xs text-[#FF6900]' />Computer Science</div>
                            <div className='text-xs text-black/70 font-medium mt-2 w-full flex justify-between items-center'>
                                <div>This Month</div>
                                <div className='text-base text-black'>91%</div>
                            </div>
                            <CustomProgressBar value={91} color={"#FF6900"} />
                            <div className='text-xs text-black/60 font-medium w-full flex justify-between items-center mt-2'>35/42 classes</div>
                            <div></div>
                        </div>

                        <div className='bg-white w-full flex flex-col items-start justify-center px-4 py-4 border-2 rounded-xl relative active:scale-[99%] transition-all ease-in-out'>
                            <div className='flex gap-3 items-center'><FaCircle className='text-xs text-[#F6339A]' />Human Values</div>
                            <div className='text-xs text-black/70 font-medium mt-2 w-full flex justify-between items-center'>
                                <div>This Month</div>
                                <div className='text-base text-black'>80%</div>
                            </div>
                            <CustomProgressBar value={80} color={"#F6339A"} />
                            <div className='text-xs text-black/60 font-medium w-full flex justify-between items-center mt-2'>35/42 classes</div>
                            <div></div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default CalenderAttendanceView;


const CustomProgressBar = ({ value, color, max = 100 }) => {
    return (
        <div style={{ width: '100%', maxWidth: '400px', margin: '0px 0' }}>
            <div
                style={{
                    height: '8px',
                    width: '100%',
                    backgroundColor: '#d6d6d6', // Background trail color
                    borderRadius: '5px',
                    overflow: 'hidden',
                }}
            >
                <div
                    style={{
                        height: '100%',
                        borderRadius: '5px',
                        width: `${(value / max) * 100}%`, // Calculate progress width
                        backgroundColor: `${color}`, // Progress bar color
                        transition: 'width 0.3s ease', // Smooth transition
                    }}
                ></div>
            </div>
        </div>
    );
};