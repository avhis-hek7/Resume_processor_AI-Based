const pdfParse = require('pdf-parse');
const generateInterviewReport =  require('../services/ai.service');
const candidateInterviewModel = require('../models/interviewReport.model')

async function generateInterViewReportController(req,res){
   

     const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText()
    const {selfDescription, jobDescription} = req.body;

    const interviewReportByAi = await generateInterviewReport({
        resume:resumeContent.text,
        selfDescription,
        jobDescription
    })

    const interviewReport = await candidateInterviewModel.create({
        user: req.user.userId,
        resume:resumeContent.text,
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