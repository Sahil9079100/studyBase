import jwt from 'jsonwebtoken'

const SECRET_KEY = process.env.SECRET_KEY

export const generateStudentToken = (studentId) => {
    return jwt.sign({ id: studentId }, SECRET_KEY, { expiresIn: '7d' })
}