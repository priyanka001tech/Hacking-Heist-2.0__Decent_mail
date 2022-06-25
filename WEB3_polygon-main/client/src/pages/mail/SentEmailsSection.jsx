import React from 'react'
import { useContext } from 'react'
import { Web3ApiContext } from '../../context/Web3ApiContext'
const SentEmailsSection = () => {
    const { SentEmails}=useContext(Web3ApiContext);
    console.log(SentEmails);
  return (
    <div>
   
    </div>
  )
}

export default SentEmailsSection