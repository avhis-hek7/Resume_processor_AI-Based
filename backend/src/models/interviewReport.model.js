// const mongoose = require('mongoose');
 
// const technicalQuestionSchema = new mongoose.Schema({
//     question:{
//         type:String,
//         required:[true, "Technical question is required"]

//     },
//     intention:{
//         type:String,
//         required:[true, "Intention is required"]
//     },
//     answer:{
//         type:String,
//         required:[true, "Answer is required"]
//     }
// },{_id:false})  // we dosen't required the -Id so,


// const behavioralQuestionSchema = new mongoose.Schema({
//      question:{
//         type:String,
//         required:[true, "Technical question is required"]

//     },
//     intention:{
//         type:String,
//         required:[true, "Intention is required"]
//     },
//     answer:{
//         type:String,
//         required:[true, "Answer is required"]
//     }
// },{_id:false})


// const skillGapSchema = new mongoose.Schema({
//     skill:{
//         type:String,
//         required:[true, "Skill is required"]
//     },
//     severity:{
//         type:String,
//         enum:['low','medium', 'high'],
//         required:[true, "Severity is required"]
//     }
// },{_id:false})

// const preparationPlanSchema = new mongoose.Schema({
//     day:{
//         type:Number,
//         required:[true, "Day is required"]
//     },
//     focus:{
//         type:String,
//         required:[true, 'Focus is required']
//     },
//     tasks:[{
//         type:String,
//         required:[true, "Tasks is required"]
//     }]
// },{_id:false})

// const interviewReportSchema = new mongoose.Schema({
//     jobDescription: {
//         type:String,
//         required: [true, "Job description in required"]
//     },
//     resume:{
//         type:String,

//     },
//     selfDescription:{
//         type:String
        
//     },
//     matchScore:{
//         type:Number,
//         min:0,
//         max:100
//     },
//     technicalQuestion :[technicalQuestionSchema],
//     behavioralQuestion : [behavioralQuestionSchema],
//     skillGaps : [skillGapSchema],
//     preparationPlan: [preparationPlanSchema],
//     user:{
//         type:mongoose.Schema.Types.ObjectId,
//         ref:"users"
//     }
// },{timestamps:true})


// const interviewReportModel = mongoose.model('InterviewReport', interviewReportSchema)
// module.exports = interviewReportModel;


const mongoose = require("mongoose");

const candidateInterviewSchema = new mongoose.Schema({
  candidateName: { type: String, required: true },
  positionAppliedFor: { type: String, required: true },
  interviewerName: { type: String, required: true },
  dateOfInterview: { type: Date, required: true },

  overallRecommendation: { 
    type: String, 
    enum: ["Strongly Recommended", "Recommended", "Hold", "Not Recommended"], 
    required: true 
  },

  strengths: [{ type: String }],
  areasForImprovement: [{ type: String }],

  technicalSkillsAssessment: [
    {
      skill: { type: String },
      rating: { type: String } 
    }
  ],

  behavioralAssessment: [
    {
      behavior: { type: String },
      rating: { type: String } 
    }
  ],

  comments: { type: String },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});


candidateInterviewSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const candidateInterviewModel = mongoose.model("CandidateInterviewReport", candidateInterviewSchema);
module.exports = candidateInterviewModel;