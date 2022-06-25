import React from 'react'
import './header/ComposeButton.css';
import { useNavigate } from 'react-router-dom';
export const LogoutButton = () => {
 
  const navigate=useNavigate();
    return (
      <div>
      <button
      className="setBtn mt-4 floating-right"
 
      >
      <div className="svg-wrapper-1">
      <div className="svg-wrapper">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="white"/><polyline fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeidth="24" points="174.011 86 216 128 174.011 170"/><line x1="104" x2="215.971" y1="128" y2="128" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/><path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24" d="M104,216H48a8,8,0,0,1-8-8V48a8,8,0,0,1,8-8h56"/></svg>
      </div>
      </div>
      <span onClick={()=>{
        (async()=> await window.eth.currentProvider.disconnect())();
             navigate('/');
      }}>Logout</span>
      </button>
      
      
      </div>
      )
}
