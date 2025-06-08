import { useEffect, useState } from 'react';
import axios from 'axios';
import "../pages/CSS/Complaints.css"
const ComplaintList = () => {
    const [complaints, setComplaints] = useState([]);
    useEffect(() => {
      async function fetchComplaints() {
          try {
            const email=localStorage.getItem('email');
              const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/user/show?email=${email}`);
              const dataWithImages = await Promise.all(
                  response.data.map(async (complaint) => {
                      const imageUrl = await convertToImage(complaint.image);
                      return { ...complaint, imageUrl };
                  })
              );
              setComplaints(dataWithImages);
          } catch (error) {
              console.error('Error fetching complaints:', error);
          }
      }
      fetchComplaints();
  }, []);

  async function convertToImage(base64String) {
      try {
          const response = await fetch(`data:image/jpeg;base64,${base64String}`);
          const blob = await response.blob();
          return URL.createObjectURL(blob);
      } catch (error) {
          console.error('Error converting to image:', error);
          return null;
      }
  }

  return (
    <>
    <h2 id='h2t'>Complaints</h2>
    <div className="complaints-container">
        {complaints.map((complaint) => (
            <div key={complaint._id} className={complaint.resolved ? "resolved complaint": "complaint"}>
                <h3>{complaint.problem}</h3>
                <p><span>Department:</span> {complaint.department}</p>  
                <p><span>Description:</span> {complaint.description}</p>
                <p><span>Location:</span> {complaint.location}</p>
                <p><span>Date:</span> {new Date(complaint.date).toLocaleDateString()}</p>
                {complaint.imageUrl && <img src={complaint.imageUrl} alt="Complaint" />}
            </div>
        ))}
    </div>
</>
  )
}

export default ComplaintList