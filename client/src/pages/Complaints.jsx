import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { RiHomeSmileFill } from "react-icons/ri";
import "./CSS/Complaints.css";
import ResolveForm from '../components/ResolveForm';

function Complaints() {

   const [resolve ,setResolve] = useState(null);

    const [complaints, setComplaints] = useState([]);
    const filtered_complaints = complaints.filter(complaints => !complaints.resolved)
    useEffect(() => {
      async function fetchComplaints() {
          try {
            const dept=localStorage.getItem('department');
              const response = await axios.get(`https://ccserver-2d2c.onrender.com/api/admin/complaints?dept=${dept}`);
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
  function onResolve(complaint_id){
        console.log(complaint_id);
        setResolve(complaint_id);
  }
  useEffect(()=>{
   
  },[resolve])

      return (
        <div className='container home-container'>
          <div className="head1">
             <h2 className='h2t'>Complaints</h2>
             <Link to="/home-Admin"><RiHomeSmileFill className='home-icon' /></Link>
          </div>
            <div className="complaints-container">
                { !resolve ?
                 filtered_complaints.map((complaint,index) => (
                    <div key={index} className="complaint" style={{"border":"none",boxShadow:"none"}}>
                        <h3>{complaint.problem}</h3>
                        <p><span>Department:</span> {complaint.department}</p>  
                        <p><span>Description:</span> {complaint.description}</p>
                        <p><span>Location:</span> {complaint.location}</p>
                        <p><span>Date:</span> {new Date(complaint.date).toLocaleDateString()}</p>
                        {complaint.imageUrl && <img src={complaint.imageUrl} alt="Complaint" />}
                        <button onClick={()=>onResolve(complaint._id)} >Resolve</button>
                    </div> 
                ))
                :
                <ResolveForm complaint_id={resolve}/>
                }
            </div>
        </div>
    );

    // async function convertToJpegImage(base64String) {
    //     try {
    //         const response = await fetch(base64String);
    //         const blob = await response.blob();
    //         return URL.createObjectURL(blob);
    //     } catch (error) {
    //         console.error('Error converting to JPEG image:', error);
    //         return null;
    //     }
    // }

    // async function convertToJpgImage(base64String) {
    //     try {
    //         const response = await fetch(base64String);
    //         const blob = await response.blob();
    //         return URL.createObjectURL(blob);
    //     } catch (error) {
    //         console.error('Error converting to JPG image:', error);
    //         return null;
    //     }
    // }

    // async function convertToPngImage(base64String) {
    //     try {
    //         const response = await fetch(base64String);
    //         const blob = await response.blob();
    //         return URL.createObjectURL(blob);
    //     } catch (error) {
    //         console.error('Error converting to PNG image:', error);
    //         return null;
    //     }
    // }
}

export default Complaints;