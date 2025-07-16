import React from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import API from '../axios.config'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { setStudentData } from "./redux/studentSlice.js";

const ProfileStudent = () => {
    const [profile, setprofile] = useState()
    // const { id } = useParams()
    const navi = useNavigate()
    const dispatch = useDispatch();

    const fetch_profile = async () => {
        try {
            const responce = await API.get('/api/student/get_student_profile')
            //            const responce = await API.post('/api/student/login_student', formData)
            setprofile(responce.data.data)
            console.log(responce.data.data)
        } catch (er) {
            console.log("erroris: ", er)
        }
    }

    const go_class = () => {
        const data = profile

        // console.log("hehe",data)
        dispatch(setStudentData(data));
        navi(`/student/class/${data._id}`);
    }

    console.log()

    useEffect(() => {
        fetch_profile()
    }, [navi])


    return (<>
        {profile ? <>
            <div className='flex flex-col justify-center items-center'>
                {profile.name}
                <div onClick={go_class} className='w-28 h-28 bg-red-400 flex flex-col justify-center items-center'>
                    Class
                    <p>{profile.classid.branch}</p>
                </div>

            </div>
        </> : <>
            <div>Loading</div>

        </>}

    </>)
}

export default ProfileStudent