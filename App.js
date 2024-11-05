
import React from 'react';
import Login from './Login/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home/Home'; // Ensure the path is correct
import Signup from './Signup/Signup';
import Adminsignup from './Adminsignup/Adminsignup';
import Wardensignup from './Wardensignup/Wardensignup';
import Logout from './Logout/Logout';
import Studentsignup from './Studentsignup/Studentsignup';
import Admindashboard from './Admin/Admindashboard/Admindashboard';
import Admindata from './Admin/Admindashboard/Admindata';
import Studentdata from './Student/Studentdata';
import Wardendata from './Warden/Wardendata';
import Studentcount from './Student/Studentcount';
import Category from './Complaint/Category';
import Complaint from './Complaint/Complaint';
// import Complaintdata from './Complaint/Complaintdata';
import AccountSettings from './Admin/Admindashboard/Accountsettings';
import Example from './Admin/Admindashboard/Example';
import Studentdashboard from './Student/Studentdashboard';
import Wardendashboard from './Warden/Wardendashboard';
// import Regsuccess from './Regsuccess/Regsuccess'
import Profile from './Warden/Profile';
import ComplaintHistory from './Complaint/ComplaintHistory';
export default function App() {
  const user = localStorage.getItem("token")

  return (
    <Router>
      <Routes>
      {user && <Route path="/logout" exact element={<Logout />} />}

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/adminsignup" element={<Adminsignup />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/wardensignup" element={<Wardensignup />} />
        {/* <Route path="/regsuccess" element={<Regsuccess />} /> */}
        <Route path="/studentsignup" element={<Studentsignup />} />
        <Route path="/admindashboard" element={<Admindashboard />} />

        <Route path="/admindata" element={<Admindata />} />
        <Route path="/studentdata" element={<Studentdata />} />
        <Route path="/wardendata" element={<Wardendata />} />
        <Route path="/studentcount" element={<Studentcount />} />
        <Route path="/category" element={<Category />} />
        <Route path="/complaint/:type" element={<Complaint />} />
        
        <Route path="/accountsettings" element={<AccountSettings/>} />
        <Route path="/example" element={<Example/>} />

        <Route path="/profile" element={<Profile/>} />
        <Route path="/studentdashboard" element={<Studentdashboard/>} />
        <Route path="/wardendashboard" element={<Wardendashboard/>} />
        <Route path="/complainthistory" element={<ComplaintHistory/>} />


      </Routes>
    </Router>
    
   
  );
}

