require('dotenv').config();
const app = require('./src/app');
const connectDb = require('./src/config/db');
// const invokeGeminiAi = require('./src/services/ai.service');
// const {resume, selfDescription, jobDescription} = require('./src/services/temp');
// const generateInterviewReport = require('./src/services/ai.service')




connectDb();
// invokeGeminiAi();
// generateInterviewReport({resume,selfDescription,jobDescription})




app.listen(3000, ()=>{
    console.log("Server is running on port 3000");
})