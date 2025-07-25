import { useState } from 'react';
import { IoIosArrowBack, IoIosArrowDown } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import ring_ringICON from '../assets/icons_assets/Group 16.svg'
import { FaRegClock } from "react-icons/fa";
import { FaCircle } from 'react-icons/fa6';
import { LuBrain } from "react-icons/lu";





const DetailAnalysis = () => {
    const navi = useNavigate()
    const [overviewpage, setOverviewPage] = useState(true)
    const [predictionpage, setPredictionPage] = useState(false)
    const [insightspage, setInsightsPage] = useState(false)
    return (
        <div className='w-full h-[100vh] flex flex-col items-center justify-start bg-white'>

            <div className='w-full bg-rd-200 flex items-center justify-start py-2 gap-2 border-b-2 border-gray-300'>
                <IoIosArrowBack className='text-4xl bg-rd-200 m-2 p-2' onClick={() => { navi(-1) }} />
                <div className='text-black font-bold text-xl my-2'>
                    <div>Analytics Dashboard</div>
                    <div className='font-light text-sm'>Detailed insights & predictions</div>
                </div>
            </div>


            <div className='w-full flex items-center justify-between px-3 bg-white z-50 sticky top-0'>
                <div className={`${overviewpage ? "border-b-[1px] border-blue-500 bg-blue-400/10 text-blue-500" : "border-b-[1px] border-white"} w-full text-center py-2 transition-all duration-500`} onClick={() => { setOverviewPage(true); setPredictionPage(false); setInsightsPage(false) }}>Overview</div>
                <div className={`${predictionpage ? "border-b-[1px] border-blue-500 bg-blue-400/10 text-blue-500" : "border-b-[1px] border-white"}  w-full text-center py-2 transition-all duration-500`} onClick={() => { setOverviewPage(false); setPredictionPage(true); setInsightsPage(false) }}>Predictions</div>
                <div className={`${insightspage ? "border-b-[1px] border-blue-500 bg-blue-400/10 text-blue-500" : "border-b-[1px] border-white"}  w-full text-center py-2 transition-all duration-500`} onClick={() => { setOverviewPage(false); setPredictionPage(false); setInsightsPage(true) }}>Insights</div>
            </div>


            <div className='overview_page w-full h-fit flex flex-col items-center justify-start p-5 gap-4 bg-[#F9FAFB] border-2 border-b-black/10'>
                {overviewpage ?
                    <>
                        <div className='flex items-center justify-between w-full gap-3'>
                            <div className='bg-white w-[50%] flex flex-col items-start justify-center p-5 border-2 rounded-xl relative active:scale-[99%] transition-all ease-in-out '
                                style={{ boxShadow: "2px 3px 2px rgba(0, 0, 0, 0.1)" }}>
                                <h6 className='text-xs text-black/70 font-medium'>Overall</h6>
                                <h1 className='text-2xl font-bold'>82%</h1>
                                <div className='bg-[#dbfee5] px-2 py-1 rounded-full text-xs font-normal text-green-600 mt-2'>Target Met</div>

                                <div className='absolute top-4 right-3 bg-[#DBFCE7 p-2 rounded-[10px]'><img src={ring_ringICON} width={27} alt="" /></div>
                            </div>

                            <div className='bg-white w-[50%] flex flex-col items-start justify-center p-5 border-2 rounded-xl relative active:scale-[99%] transition-all ease-in-out '
                                style={{ boxShadow: "2px 3px 2px rgba(0, 0, 0, 0.1)" }}>
                                <h6 className='text-xs text-black/70 font-medium'>Classes<br />Needed</h6>
                                <h1 className='text-2xl font-bold'>0</h1>
                                <h6 className='text-xs text-black/70 font-medium'>To reach 75%</h6>
                                <div className='absolute top-4 right-3 bg-[#fce8db p-2 rounded-[10px]'><FaRegClock className='text-[26px] text-[#F54900]' /></div>
                            </div>
                        </div>

                        <div className='bg-white w-full flex flex-col items-start justify-center p-5 border-2 rounded-xl relative mt-3'
                            style={{ boxShadow: "2px 3px 2px rgba(0, 0, 0, 0.1)" }}>
                            <h1 className='text-1xl font-semibold items-center'>Subject Performance</h1>
                            <hr className='border-b-[1px] w-full absolute left-0 top-[60px]' />
                            <h6 className='text-xs text-black/70 font-medium mt-6'></h6>
                            <div className='w-full flex flex-col gap-3 mt-4'>

                                <div className='bg-white w-full flex flex-col items-start justify-center px-4 py-4 border-2 rounded-xl relative active:scale-[99%] transition-all ease-in-out'>
                                    <div className='flex gap-3 items-center justify-between w-full mb-2'>
                                        <div className='flex gap-3 items-center'>
                                            <FaCircle className='text-xs text-[#F6339A]' />
                                            Mathematics
                                        </div>
                                        <div className='flex flex-col items-end'>
                                            <h1 className='text-base text-black font-bold'>84%</h1>
                                            <h1 className='text-xs'>38/45</h1>
                                        </div>
                                    </div>
                                    {/* <div className='text-xs text-black/70 font-medium mt-2 w-full flex justify-between items-center'>
                                        <div>This Month</div>
                                        <div className='text-base text-black'>80%</div>
                                    </div> */}
                                    <CustomProgressBar value={80} color={"#F6339A"} />
                                    <div className='bg-[#DBEAFE] px-2 py-1 rounded-full text-xs font-normal text-blue-600 mt-2'>Good</div>
                                    <div></div>
                                </div>

                                <div className='bg-white w-full flex flex-col items-start justify-center px-4 py-4 border-2 rounded-xl relative active:scale-[99%] transition-all ease-in-out'>
                                    <div className='flex gap-3 items-center justify-between w-full mb-2'>
                                        <div className='flex gap-3 items-center'>
                                            <FaCircle className='text-xs text-[#33f63d]' />
                                            Mathematics
                                        </div>
                                        <div className='flex flex-col items-end'>
                                            <h1 className='text-base text-black font-bold'>84%</h1>
                                            <h1 className='text-xs'>38/45</h1>
                                        </div>
                                    </div>
                                    {/* <div className='text-xs text-black/70 font-medium mt-2 w-full flex justify-between items-center'>
                                        <div>This Month</div>
                                        <div className='text-base text-black'>80%</div>
                                    </div> */}
                                    <CustomProgressBar value={80} color={"#00C950"} />
                                    <div className='bg-[#DBEAFE] px-2 py-1 rounded-full text-xs font-normal text-blue-600 mt-2'>Good</div>
                                    <div></div>
                                </div>

                            </div>
                        </div>

                    </> : null}




                {predictionpage ?
                    <div className='bg-white w-full flex flex-col items-start justify-center p-5 border-2 rounded-xl relative'
                        style={{ boxShadow: "2px 3px 2px rgba(0, 0, 0, 0.1)" }}>
                        <h1 className='text-1xl font-semibold items-center flex gap-3'><LuBrain className='text-purple-500 text-xl' />Attendance Predictions</h1>
                        <hr className='border-b-[1px] w-full absolute left-0 top-[60px]' />
                        <h6 className='text-xs text-black/70 font-medium mt-6'></h6>
                        <div className='w-full flex flex-col gap-3 mt-4'>

                            <div className='bg-white w-full flex flex-col items-start justify-center px-4 py-4 border-2 rounded-xl relative active:scale-[99%] transition-all ease-in-out'>
                                <div className='flex gap-3 items-center justify-between w-full mb-2'>
                                    <div className='flex gap-3 items-center'>
                                        <FaCircle className='text-xs text-[#F6339A]' />
                                        Mathematics
                                    </div>
                                    <div className='flex flex-col items-end'>
                                        <h1 className='text-base text-black font-bold'>84%</h1>
                                        <h1 className='text-xs'>38/45</h1>
                                    </div>
                                </div>
                                {/* <div className='text-xs text-black/70 font-medium mt-2 w-full flex justify-between items-center'>
                                        <div>This Month</div>
                                        <div className='text-base text-black'>80%</div>
                                    </div> */}
                                <CustomProgressBar value={80} color={"#F6339A"} />
                                <div className='bg-[#DBEAFE] px-2 py-1 rounded-full text-xs font-normal text-blue-600 mt-2'>Good</div>
                                <div></div>
                            </div>

                            <div className='bg-white w-full flex flex-col items-start justify-center px-4 py-4 border-2 rounded-xl relative active:scale-[99%] transition-all ease-in-out'>
                                <div className='flex gap-3 items-center justify-between w-full mb-2'>
                                    <div className='flex gap-3 items-center'>
                                        <FaCircle className='text-xs text-[#33f63d]' />
                                        Mathematics
                                    </div>
                                    <div className='flex flex-col items-end'>
                                        <h1 className='text-base text-black font-bold'>84%</h1>
                                        <h1 className='text-xs'>38/45</h1>
                                    </div>
                                </div>
                                {/* <div className='text-xs text-black/70 font-medium mt-2 w-full flex justify-between items-center'>
                                        <div>This Month</div>
                                        <div className='text-base text-black'>80%</div>
                                    </div> */}
                                <CustomProgressBar value={80} color={"#00C950"} />
                                <div className='bg-[#DBEAFE] px-2 py-1 rounded-full text-xs font-normal text-blue-600 mt-2'>Good</div>
                                <div></div>
                            </div>

                        </div>
                    </div> : null}
            </div>
        </div>
    )
}

export default DetailAnalysis


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