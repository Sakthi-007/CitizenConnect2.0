import User from "../models/user.js";
import Complaint from "../models/Complaint.js";
import { createJWT } from "../utils/dbconnect.js";

export const registerUser = async (req, res) => {
    try {
        const { name, email, password, isAdmin } = req.body;
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({
                status: false,
                message: "User Already Exists"
            });
        }
        const user = await User.create({
            name,
            email,
            password,
                isAdmin:false,
          
        })

        if(user){
           res.status(201).json({user});
        } else {
            return res
                .status(400)
                .json({ status: false, message: "Invalid user data" })
        }

    } catch (error) {
        return res.status(400).json({ status: false, message: error.message });

    }
}
export const loginUser = async (req,res)=>{
    try {
        const {email,password} = req.body

        const user = await User.findOne({email})
        if(!user){
            return res
                .status(401)
                .json({status: false ,message: "Invalid email or password."});
        }
    
        const isMatch = await user.matchPassword(password);


     if(user && isMatch ){
           const token =  createJWT(res,user._id);

            user.password =password;
            console.log(user);
            const isAdmin=user.isAdmin;
            if(isAdmin==true){
                const dept=user.department;
                res.status(200).json({message:"Login successful",isAdmin,token,dept})
            }
            else{
                res.status(200).json({message:"Login successful",isAdmin,token})
            }
            
        }
        else{
            return res.status(401).json({status:false , message:"Invalid email or password"});
        }

    } catch (error) {
        return res.status(400).json({status:false,message:error.message});

    }
}

export const logoutUser = async (req,res)=>{
    try {
        res.cookie("token","",{
            httpOnly : true,
            expires:new Date(0)
        })

        res.status(200).json({message:"logout successfull"})
    } catch (error) {
        return res.status(400).json({status:false,message:error.message});

    }
}

export const complain_register = async (req, res) => {
    try {
        const {email, problem, department, description, location,image } = req.body;
        const complaintExist = await Complaint.findOne({ problem });
        if (complaintExist) {
            return res.status(400).json({
                status: false,
                message: "Complaint Already Registered"
            });
        }

        // Create a new complaint document
        const newComplaint = new Complaint({
            email,
            problem,
            department,
            description,
            location,
            image,
            resolved:false,
            posted:false

        });

        // Save the new complaint to MongoDB
        await newComplaint.save();

        res.status(200).json({ message: "Problem raised to db" });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(400).json({ error: "Failed to register complaint" });
    }
};
export const showComplaints = async (req, res) => { 
    try {
        const { email } = req.query;
        const Complaints = await Complaint.find({ email: email });
        res.status(200).json(Complaints);
    } catch (error) {
        return res.status(400).json(error);
    }
}
