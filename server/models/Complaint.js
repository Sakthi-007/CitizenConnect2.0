// models/Complaint.js

import mongoose from 'mongoose';

const { Schema } = mongoose;

const complaintSchema = new Schema({
  problem: {
    type: String,
    required: true
  },
  email:{
    type:String,
    required:true
  },
  department: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  image: {
   type: String,
   required:false
  },
  date: {
    type: Date,
    default: () => new Date().toISOString()
  },
  resolved:{
    type:Boolean
  }  ,
posted:{
type:Boolean
}
 
});

const Complaint = mongoose.model('Complaints', complaintSchema);

export default Complaint;
