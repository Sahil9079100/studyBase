import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../../axios.config'
import { useDispatch } from "react-redux";
import { setTeacherData } from "../redux/teacherSlice";


const ProfileTeacher = () => {
    const [profile, setprofile] = useState()
    // const { id } = useParams()
    const navi = useNavigate()
    const dispatch = useDispatch();

    const fetch_profile = async () => {
        try {
            const responce = await API.get('/api/teacher/get_teacher_profile')
            //            const responce = await API.post('/api/student/login_student', formData)
            setprofile(responce.data.data)
            console.log(responce.data.data)
        } catch (er) {
            console.log("erroris: ", er)
        }
    }

    const go_class = () => {
        const data = profile
        dispatch(setTeacherData(data));
        navi(`/teacher/${data._id}/classes`);
        return 0
    }

    useEffect(() => {
        fetch_profile()
    }, [navi])


    return (<>
        {profile ? <>
            <div className='flex flex-col justify-center items-center'>
                Hello {profile.name}
                <div onClick={go_class} className='w-28 h-28 bg-red-400 flex flex-col justify-center items-center'>
                    Class
                    <p>{profile.classid}</p>
                </div>

            </div>
        </> : <>
            <div>Loading</div>

        </>}

    </>)
}

export default ProfileTeacher