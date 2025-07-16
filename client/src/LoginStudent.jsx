import React from 'react'
import { useState } from 'react'
import catGIF from './assets/cat.gif';
import API from '../axios.config';
import { useNavigate } from 'react-router-dom';


const LoginStudent = () => {
    const navi = useNavigate()
    const [phoneno, setphoneno] = useState('1234');
    const [password, setPassword] = useState('1234');

    const handleSubmit = async (e) => {
        e.preventDefault();
        let formData = { phoneno, password }
        try {
            // phoneno, password
            console.log(formData)
            const responce = await API.post('/api/student/login_student', formData)
            console.log(responce.data)
            if (responce.status === 200) {
                const studentUrl = responce.data.data.studentId
                // console.log(studentUrl)
                navi(`/student/${studentUrl}`)
            } else {
                console.log(responce.data.message)
            }
        } catch (error) {
            console.log(error)
        }
        // alert(`phoneno: ${phoneno}\nPassword: ${password}`);
    };
    return (
        <>
            <div className="w-full h-[100vh] flex items-start justify-center bg-sky-400/20">
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col  justify-between h-[30%] mt-28">

                    <div className='flex flex-col gap-3 '>
                        <input type="number" placeholder="phoneno" value={phoneno}
                            onChange={e => setphoneno(e.target.value)}
                            required
                            className="border border-black/50 px-2 py-2 rounded transition-all ease-in-out" />
                        <input type="password" placeholder="Password" value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                            className="border border-black/50 px-2 py-2 rounded" />
                    </div>

                    <div className='flex flex-col gap-0 relative '>
                        <div className='absolute boder border-black/50 flex justify-end top-[-53px] right-4'>
                            <img src={catGIF} className='w-20' alt="" />
                        </div>
                        <button type="submit"
                            className="border-2 font-mono border-black rounded text-xl py-2  active:scale-[99%] transition-all ease-in-out">
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default LoginStudent