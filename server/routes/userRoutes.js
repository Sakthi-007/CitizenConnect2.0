import express from "express";
import { isAdminRoute,protectRoute } from "../middlewares/authMiddleWare.js";
import {  loginUser, registerUser,logoutUser, complain_register, showComplaints} from "../controllers/userController.js";
const router=express.Router();                  

router.post("/register", registerUser)
router.post("/login", loginUser)
router.post("/logout", logoutUser)
router.post("/complain",complain_register);
router.get("/show",showComplaints);



export default router;