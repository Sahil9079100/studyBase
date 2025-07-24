import express from "express";
import cors from "cors";
import dbconnect from "./db/databaseConnect.js";
import cookieParser from "cookie-parser";
import { Server } from 'socket.io';
import { createServer } from 'http';
// import router from "./route.js";
import adminRoute from "./routes/admin.route.js";
import studentRoute from "./routes/student.route.js"
import teacherRoute from "./routes/teacher.route.js"
import { startAttendanceScheduler } from "./utilits/cron_jobs/attendanceScheduler.cron.js";
// import socket from "./socket.js";

import path from "path";
import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const app = express();

const server = createServer(app)

const io = new Server(server, {
    cors: {
        origin: ["//frontend url"],
        methods: ["GET", "POST"],
        credentials: true,
    },
})
io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);
});



app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}))



app.use("/api/student", studentRoute)
app.use("/api/admin", adminRoute)
app.use("/api/teacher", teacherRoute)


dbconnect()
    .then(() => {
        app.on("error", (error) => {
            console.log(`Server is not talking: ${error}`);
            throw error;
        });
        server.listen(process.env.PORT || 4000, () => {
            console.log(`⚙️ Server running on port ${process.env.PORT || 4000}`);
        });
    })
    .catch((error) => {
        console.error(`Error from app.js:::-> ${error}`);
    });

startAttendanceScheduler()

app.get("/", (req, res) => {
    res.send("hello study base :)");
});