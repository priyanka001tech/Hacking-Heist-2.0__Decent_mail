import React from 'react'
import "./Mail.css";
import ncodeRFC5987ValueChars from "./Utils/URLencoding/Encoder"
import { Web3ApiContext } from '../../context/Web3ApiContext';
import { SpinnerDiamond } from 'spinners-react';
import {useLocation }from "react-router-dom";
import { RiSpamFill } from "react-icons/ri";
import { useContext } from 'react';
import {FaDownload} from "react-icons/fa"
import { convertTodate,convertTotime } from './Utils/URLencoding/Timestamp_convert';
import { download } from './Utils/URLencoding/download';
import {AiOutlineRollback} from "react-icons/ai"

const Modalex = ({receiver,subject, body, timestamp, ipfsHash,Filename,sender,i}) => {
    const location=useLocation();
    console.log(location);
  const { connectedAccount,  report_Spam, RemoveFromSpam,GetSentItems} = useContext(Web3ApiContext);
    if (!connectedAccount) {
      return <div className="loading">
      <SpinnerDiamond size={73} thickness={143} speed={80} color="rgba(113, 57, 172, 1)" secondaryColor="rgba(57, 128, 172, 0.92)" />
      </div>
    }


    const encodedString=ncodeRFC5987ValueChars(Filename);
  return (
    <div><button type="button" className="btn exmodal" data-bs-toggle="modal" data-bs-target={"#exampleModal"+i}>
    Open Message
  </button>
  
  <div className="modal fade" id={"exampleModal"+i} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog modal-xl" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title card-text" id="exampleModalLabel"><strong>Subject :</strong>{subject} </h5>
          <span className=" text_right "> -- {convertTodate (timestamp)} ,   {convertTotime (timestamp)}</span>
   
         
        </div>
        <div className="modal-body ex-body">
       { location.pathname==="/mail/SpamSection" ? <><h2 className='text_right' style={{Text}} data-bs-toggle="tooltip" data-bs-placement="top" title="remove from spam" onClick={()=>  RemoveFromSpam(sender)

       }><AiOutlineRollback /></h2></>  : <></>}
        {   (location.pathname!=='/mail/sentEmails' &&   location.pathname!=='mail/SpamSection' &&  location.pathname==='/mail/') ? <></>:<h3 className='text_right'><RiSpamFill className="spambtn" size={25} color="red" data-bs-toggle="tooltip" data-bs-placement="top" title="report as a spam" onClick={()=>{
        report_Spam(sender)
        }} /></h3>}
        {location.pathname!=='/mail/sentEmails' ?<h6 className="card-text"><strong>From :</strong> {sender}</h6>:<></>}
        {   location.pathname==='/mail/sentEmails' ?  <h6 className="card-text"><strong>To </strong>: {receiver}</h6>:<></>}
    
        <p className="card-text">{body}</p>
        
        
        <h5>Attached File link : <a  href={`https://${ipfsHash}.ipfs.dweb.link/${encodedString}`} download> {Filename}</a><span className='download_btn ' onClick={() => {download(`https://${ipfsHash}.ipfs.dweb.link/${encodedString}`)}}
      style={{cursor:"pointer"}} ><FaDownload size={20} /></span>  </h5>
         
        </div>
       
      

        <div className="modal-footer">
          <button type="button" className="btn btn-secondary  sentbtn-close " data-bs-dismiss="modal">Close</button>

        </div>
      </div>
    </div>
  </div>
  </div>
  )
}

export default Modalex