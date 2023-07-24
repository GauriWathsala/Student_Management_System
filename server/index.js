const express = require ('express');
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const db = require ('./models');

//Routers
// const studentRouter = require('./routes/Student');
// app.use("/student",studentRouter);
// const paymentRouter = require('./routes/Payment');
// app.use("/payment",paymentRouter);   
const courseRouter = require('./routes/Course');
app.use("/course",courseRouter);
// const staffRouter = require('./routes/Staff');
// app.use("/staff",staffRouter);
const moduleRouter = require('./routes/Module');
app.use("/module",moduleRouter);
const staffRouter = require('./routes/Staff');
app.use("/staff",staffRouter);
// const discountRouter = require('./routes/Discount');
// app.use("/discount",discountRouter);
// const paneltyRouter = require('./routes/Panelty');
// app.use("/panelty",paneltyRouter);
const bookRouter = require('./routes/Book');
app.use("/book",bookRouter);
// const notificationRouter = require('./routes/Notification');
// app.use("/notification",notificationRouter);
const examRouter = require('./routes/Exam');
app.use("/exam",examRouter);
// const attendanceRouter = require('./routes/Attendance');
// app.use("/attendance",attendanceRouter);
const teacherRouter = require('./routes/Teacher');
app.use("/teacher",teacherRouter);
const receptionistRouter = require('./routes/Receptionist');
app.use("/receptionist",receptionistRouter);
// const issuedBooksRouter = require('./routes/IssuedBooks');
// app.use("/issuedBooks",issuedBooksRouter);
const userRouter = require('./routes/User');
app.use("/user",userRouter);
const adminRouter = require('./routes/Admin');
app.use("/admin",adminRouter);

// const studentNotificationRouter = require('./routes/StudentNotification');
// app.use("/studentNotification",studentNotificationRouter);







db.sequelize.sync({force:true}).then(()=> {
app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
});