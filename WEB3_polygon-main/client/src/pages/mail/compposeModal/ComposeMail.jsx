import { useContext } from 'react';
import {useState} from 'react'
import { Web3ApiContext } from '../../../context/Web3ApiContext'
import {main} from "./Web3storageAPi/storageapi"


const ComposeMail = () => {
   const {connectedAccount,ComposeMailMain,SentEmails}=useContext(Web3ApiContext);
   const [success,Setsuccess]=useState(false);
   
    const[formData,setFormData]=useState(
    {
    receiver:"",
    body:"",
    subject:"",
    }
  );


  const [file,setFile]=useState();

    
  const handleForms=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value});
  }

 const SendEmail= async (e)=>{
try{
  e.preventDefault();
  const ipfs=await main(file);
 await ComposeMailMain(formData.receiver,formData.subject,formData.body,ipfs,file[0].name);

 await setFormData({receiver:"",body:"",subject:""});
}catch(err)
{
  throw new Error(err);
}

 }

  return (

    <>
    <div className="modal fade modal-desi" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
              <div className="modal-dialog modal-lg ">
                <div className="modal-content modal-desi-main">
                  <div className="modal-header">
                    <h5 className="modal-title mail-title" id="staticBackdropLabel">Compose Mail</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <form onSubmit={SendEmail}>
                  <div className="modal-body">
                  <div className="mt-3 mb-3">
                    <input type="text" readOnly className="form-control-plaintext mail-topic " id="staticEmail" value={connectedAccount} />
                    </div>
                    <div className="mt-3 mb-3">
                      <input type="text" className="form-control mail-topic" id="mail" placeholder="To" name="receiver" value={formData.receiver} onChange={handleForms} />
                    </div>

                    <div className="mb-3">
                      <input type="text" className="form-control  mail-topic" id="subject" placeholder="Subject" name="subject" value={formData.subject} onChange={handleForms} />
                    </div>

                    <div className="mt-3 mb-3">
                      <textarea className="form-control mail-topic" id="exampleFormControlTextarea1" rows="10" placeholder="Write your mail" name="body" value={formData.body} onChange={handleForms}></textarea>
                    </div>
                    <div className="mb-2">
                     
                      <label htmlFor="formFileMultiple" className="form-label"></label>
                      <input className="form-control" type="file" id="formFileMultiple"  name="file"  onChange={e=>setFile(e.target.files)}/>
                    </div>
                  </div>

                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary modal-btn-left" data-bs-dismiss="modal">Discard</button>
                    <button type="submit" className="btn btn-primary modal-btn-right" data-bs-dismiss={success?"modal":""} >Send</button>
                  </div>
                  </form>
                </div>
              </div>
            </div>
    </>
  )
}

export default ComposeMail