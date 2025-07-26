import mongoose from "mongoose"
import dotenv, { config } from "dotenv"
dotenv.config({
    path: './.env'
})
const dbname = "attend"
const dbconnect = async () => {
    try {
        // console.log(`${process.env.MONGO_DB_URI}/${dbname}`)
        const connectdb = await mongoose.connect(`${process.env.MONGO_DB_URI}/${dbname}`)
        console.log(`MongoDB connected succesfully:-  ${connectdb.connection.host}`);
    } catch (error) {
        console.log(`Error is:::-> `, error);
        process.exit(1)
    }
}

export default dbconnect