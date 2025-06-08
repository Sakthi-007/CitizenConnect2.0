import Complaint from "../models/Complaint.js";


export const eleComplaints = async (req, res) => { 

    try {
        const {dept}= req.query;
        const Complaints = await Complaint.find({ department:dept });
        res.status(200).json(Complaints);
    } catch (error) {
        return res.status(400).json(error);
    }
}

export const resolvedComplaints = async (req,res)=>{
try {
    const {dept}= req.query;
    const Complaints = await Complaint.find({ department:dept,resolved:true});
    res.status(200).json(Complaints);
    
} catch (error) {
    return res.status(400).json(error);
}
}

export const updateComplaint = async (req, res) => {
    try {
        const { id, description, image } = req.body; 
        const complaint = await Complaint.findById(id);
        if (!complaint) {
            return res.status(404).json({
                status: false,
                message: "Complaint not found"
            });
        }
        complaint.description = description;
        complaint.image = image;
        complaint.resolved=true;
        await complaint.save();
        res.status(200).json({ message: "Complaint updated successfully" });
    } catch (error) {
        console.error(error); 
        res.status(400).json({ error: "Failed to update complaint" });
    }
};

