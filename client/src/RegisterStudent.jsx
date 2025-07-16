import React from 'react'
import { useState } from 'react';
import catGIF from './assets/cat.gif';
import API from '../axios.config';


const RegisterStudent = () => {

    const [formData, setFormData] = useState({
        name: "Aradhya",
        phoneno: "1212",
        password: "1212",
        email: "aradhya@gmail.com",
        fatherno: "2121",
        motherno: "2121",
        rollno: "1212git",
        ishosteller: false, //--
        hostel_number: 0, //--
        room_number: 0, //--
        branchname: "IT",
        section: "a2",
        sem: "2"
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
        //     const responce = await API.post('/api/student/register_student', formData)
        //     console.log("responce is: ", responce)
        // } catch (error) {
        //     console.log(error)
        // }

    }
    return (
        <>
            <div className="w-full h-[100vh] flex items-start justify-center bg-sky-400/20 px-4">
                <form
                    onSubmit={handleRegister}
                    className="flex flex-col justify-between h-fit mt-20 gap-6"
                >
                    <div className="grid grid-cols-2 gap-4">
                        <input type="text" placeholder="Name" value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                            required className="border border-black/50 px-2 py-2 rounded"
                        />
                        <input type="number" placeholder="Phone Number" value={formData.phoneno}
                            onChange={e => setFormData({ ...formData, phoneno: e.target.value })}
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
                        <input type="number" placeholder="Father's Phone No" value={formData.fatherno}
                            onChange={e => setFormData({ ...formData, fatherno: e.target.value })}
                            required className="border border-black/50 px-2 py-2 rounded"
                        />
                        <input type="number" placeholder="Mother's Phone No" value={formData.motherno}
                            onChange={e => setFormData({ ...formData, motherno: e.target.value })}
                            required className="border border-black/50 px-2 py-2 rounded"
                        />
                        <input type="text" placeholder="Roll No" value={formData.rollno}
                            onChange={e => setFormData({ ...formData, rollno: e.target.value })}
                            required className="border border-black/50 px-2 py-2 rounded"
                        />
                        {/* <input type="text" placeholder="Hostel Info" value={formData.hostelInfo}
                            onChange={e => setFormData({ ...formData, hostelInfo: e.target.value })}
                            required className="border border-black/50 px-2 py-2 rounded"
                        /> */}
                        <input type="text" placeholder="Branch Name" value={formData.branchname}
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
                        />
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

export default RegisterStudent