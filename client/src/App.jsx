import { useState } from 'react'
// import catGIF from './assets/cat.gif';
import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import ProfileTeacher from './teacher/ProfileTeacher.jsx';

const Login_Student = lazy(() => import('./LoginStudent.jsx'));
const Register_Student = lazy(() => import('./RegisterStudent.jsx'));
const Profile_Student = lazy(() => import('./ProfileStudent.jsx'))
const Student_class = lazy(() => import('./Student_class.jsx')) //RegisterTeacher
const RegisterTeacher = lazy(() => import('./teacher/RegisterTeacher.jsx'))
const Loginteacher = lazy(() => import('./teacher/Loginteacher.jsx'))
const ProfileTeacher = lazy(() => import('./teacher/ProfileTeacher.jsx'))
const ShowClasses = lazy(() => import('./teacher/ShowClasses.jsx'))
const EachClass = lazy(() => import('./teacher/EachClass.jsx'))
const SubjectStudent = lazy(() => import('./teacher/SubjectStudent.jsx'))


function App() {
    // /student/:id
    return (
        <Suspense>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login_Student />} />
                    <Route path="/register" element={<Register_Student />} />
                    <Route path="/student/:id" element={<Profile_Student />} />
                    <Route path="/student/class/:id" element={<Student_class />} />


                    <Route path="/teacher/register" element={<RegisterTeacher />} />
                    <Route path="/teacher/login" element={<Loginteacher />} />
                    <Route path="/teacher/:id" element={<ProfileTeacher />} />
                    <Route path="/teacher/:id/classes" element={<ShowClasses />} />
                    <Route path="/teacher/:id/classes/:classnum" element={<EachClass />} />
                    <Route path="/teacher/:id/classes/:classnum/:teacherid" element={<SubjectStudent />} />
                </Routes>
            </Router>
        </Suspense>
    )
}

export default App






