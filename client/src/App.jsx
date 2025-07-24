import { useState } from 'react'
// import catGIF from './assets/cat.gif';
import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import AttendancePanel from './student/AttendancePanel.jsx';
// import ProfileTeacher from './teacher/ProfileTeacher.jsx';

const Login_Student = lazy(() => import('./student/LoginStudent.jsx'));
const Register_Student = lazy(() => import('./student/RegisterStudent.jsx'));
const Profile_Student = lazy(() => import('./student/ProfileStudent.jsx'))
const Student_class = lazy(() => import('./student/Student_class.jsx'))
const AttendancePanel = lazy(() => import('./student/AttendancePanel.jsx'))
const CalenderAttendanceView = lazy(() => import('./student/CalenderAttendanceView.jsx'))
const DetailAnalysis = lazy(() => import('./student/DetailAnalysis.jsx'))


//Teacher
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
                    <Route path="/student/:id/class" element={<Student_class />} />
                    <Route path="/student/:id/attendance" element={<AttendancePanel />} />
                    <Route path="/student/:id/attendance/calendar" element={<CalenderAttendanceView />} />
                    <Route path="/student/:id/attendance/analysis" element={<DetailAnalysis />} />


                    <Route path="/teacher/register" element={<RegisterTeacher />} />
                    <Route path="/teacher/login" element={<Loginteacher />} />
                    <Route path="/teacher/:id" element={<ProfileTeacher />} />
                    <Route path="/teacher/:id/classes" element={<ShowClasses />} />
                    <Route path="/teacher/:id/classes/:classnum" element={<EachClass />} />
                    <Route path="/teacher/:id/classes/:classnum/:type/:teacherid" element={<SubjectStudent />} />
                    <Route path="/teacher/:id/classes/:classnum/:type/:teacherid" element={<SubjectStudent />} />
                </Routes>
            </Router>
        </Suspense>
    )
}

export default App






