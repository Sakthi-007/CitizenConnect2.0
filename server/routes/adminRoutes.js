import express from "express";
import { isAdminRoute,protectRoute } from "../middlewares/authMiddleWare.js";
import { eleComplaints, resolvedComplaints, updateComplaint } from "../controllers/retrieveComplaints.js";

const router=express.Router();

router.get("/complaints",eleComplaints);
router.post('/update',updateComplaint);
router.get("/solved",resolvedComplaints);
export default router;