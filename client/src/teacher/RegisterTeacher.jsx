import React from 'react'
import { useState } from 'react';
import catGIF from '../assets/cat.gif';
import API from '../../axios.config';


const RegisterTeacher = () => {

    const [formData, setFormData] = useState({
        name: "rashmi",
        email: "rashmi123@gmail.com",
        password: "1234",
        phoneno: 1234,
        teacherid: "rashmi",
        subject: "math",
        mentor: true
    });
    /*
    name,
            phoneno,
            password,
            email,
            fatherno,
            motherno,
            rollno,
            ishosteller,
            hostel_number,
            room_number,
            branchname,
            section,
            sem
             */

    const handleRegister = async (e) => {
        e.preventDefault()
        console.log(formData)
        // try {
        //     const responce = await API.post('/api/teacher/register_teacher', formData)
        //     console.log("responce is: ", responce)
        // } catch (error) {
        //     console.log(error)
        // }

    }
    return (
        <>
            <div className="w-full h-[100vh] flex items-start justify-center bg-yellow-400/20 px-4">
                <form
                    onSubmit={handleRegister}
                    className="flex flex-col justify-between h-fit mt-20 gap-6"
                >
                    <div className="grid grid-cols-2 gap-4">
                        <input type="text" placeholder="Name" value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                            required className="border border-black/50 px-2 py-2 rounded"
                        />
                        <input type="email" placeholder="Email" value={formData.email}
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                            required className="border border-black/50 px-2 py-2 rounded"
                        />
                        <input type="password" placeholder="Password" value={formData.password}
                            onChange={e => setFormData({ ...formData, password: e.target.value })}
                            required className="border border-black/50 px-2 py-2 rounded"
                        />
                        <input type="number" placeholder="Phone Number" value={formData.phoneno}
                            onChange={e => setFormData({ ...formData, phoneno: e.target.value })}
                            required className="border border-black/50 px-2 py-2 rounded"
                        />
                        <input type="text" placeholder="Teacher ID" value={formData.teacherid}
                            onChange={e => setFormData({ ...formData, teacherid: e.target.value })}
                            required className="border border-black/50 px-2 py-2 rounded"
                        />
                        <input type="text" placeholder="Subject" value={formData.subject}
                            onChange={e => setFormData({ ...formData, subject: e.target.value })}
                            required className="border border-black/50 px-2 py-2 rounded"
                        />
                        <input type="text" placeholder="Mentor" value={formData.mentor}
                            onChange={e => setFormData({ ...formData, mentor: e.target.value })}
                            required className="border border-black/50 px-2 py-2 rounded"
                        />
                        {/* <input type="text" placeholder="Hostel Info" value={formData.hostelInfo}
                            onChange={e => setFormData({ ...formData, hostelInfo: e.target.value })}
                            required className="border border-black/50 px-2 py-2 rounded"
                        /> */}
                        {/* <input type="text" placeholder="Branch Name" value={formData.branchname}
                            onChange={e => setFormData({ ...formData, branchname: e.target.value })}
                            required className="border border-black/50 px-2 py-2 rounded"
                        />
                        <input type="text" placeholder="Section" value={formData.section}
                            onChange={e => setFormData({ ...formData, section: e.target.value })}
                            required className="border border-black/50 px-2 py-2 rounded"
                        />
                        <input type="text" placeholder="Semester" value={formData.sem}
                            onChange={e => setFormData({ ...formData, sem: e.target.value })}
                            required className="border border-black/50 px-2 py-2 rounded"
                        /> */}
                    </div>

                    <div className="flex flex-col relative">
                        <div className="absolute top-[-54px] right-4">
                            <img src={catGIF} className="w-20" alt="Cat" />
                        </div>
                        <button
                            type="submit"
                            className="border-2 font-mono border-black rounded text-xl py-2 active:scale-[99%] transition-all ease-in-out"
                        >
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default RegisterTeacher