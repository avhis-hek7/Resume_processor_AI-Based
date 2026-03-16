const pdfParse = require('pdf-parse');
const generateInterviewReport =  require('../services/ai.service');
const candidateInterviewModel = require('../models/interviewReport.model')

async function generateInterViewReportController(req,res){
   

    const resumeContent = pdfParse(req.file.buffer);
    const {selfDescription, jobDescription} = req.body;

    const interviewReportByAi = await generateInterviewReport({
        resume:resumeContent,
        selfDescription,
        jobDescription
    })

    const interviewReport = await candidateInterviewModel.create({
        user: req.user.userId,
        resume:resumeContent,
        selfDescription,
        jobDescription,
        ...interviewReportByAi
    })

    res.status(201).json({
        message:"Interview report generated sucessfully",
        interviewReport
    })


}

module.exports = {generateInterViewReportController}