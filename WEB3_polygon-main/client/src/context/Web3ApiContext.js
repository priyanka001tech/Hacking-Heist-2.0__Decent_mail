import { createContext, useEffect, useState } from "react";
import {deployedAddress} from "../Utils/keys";
import { ethers } from "ethers";
import WebEmailService from "../Utils/WebEmailService.json";
const { ethereum } = window;

export const Web3ApiContext = createContext();

let contractAddress = deployedAddress;

const getContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(
    contractAddress,
    WebEmailService.abi,
    signer
  )

  return contract;
}

const Web3ApiProvider = ({ children }) => {
  const [connectedAccount, setConnectedAccount] = useState(null);


  const [AllMails, setAllMails] = useState([]);
  const[SentEmails,setSentEmails]=useState([]);
  const[SpamEmailAdress,setSpamEmailAdress]=useState([]);

  const ComposeMailMain = async (receiverAddress, subject, body, ipfsHash,Filename) => {
    try{
      await ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: connectedAccount,
            to: receiverAddress,
          },
        ],
      });
  
      const TransactionHash = await getContract().sendEmail(
        receiverAddress,
        subject,
        body,
        Date.now().valueOf(),
        ipfsHash,
        Filename
      );
      await TransactionHash.wait();
      await console.log("DONE")

    } catch(e) {
      console.log(e);
    }
  };
  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install Metamask");
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setConnectedAccount(accounts[0]);
 
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object found!");
    }
  };

  const getInboxdata = async () => {
    try {
      if (!ethereum) return alert("Please install Metamask");

      const inboxMails = await getContract().getInboxEmails();

      const data = inboxMails.map((e) => ({
        sender:e.sender,
        receiver: connectedAccount,
        subject: e.subject,
        body: e.body,
        timestamp: e.timestamp,
        ipfsHash: e.ipfsHash,
        Filename:e.Filename
      }));

      setAllMails(data);
     
    } catch (err) {
      console.log(err)
    }
  };



  const getSpamList=async()=>{
    try {
      if (!ethereum) return alert("Please install Metamask");
      const spam_List= await getContract().get_Spam_list();
      setSpamEmailAdress(spam_List);  
    } catch (err) {
      console.log(err)
    } 
  }

  const GetSentItems=async ()=>{
    try {
      if (!ethereum) return alert("Please install Metamask");
      const sentEmails = await getContract().getSentEmails();

      const data = sentEmails.map((e) => ({
        receiver: e.receiver,
        subject: e.subject,
        body: e.body,
        timestamp: e.timestamp,
        ipfsHash: e.ipfsHash,
        Filename:e.Filename
      }));
   
      
    setSentEmails(data);
    } catch (err) {
      console.log(err)
    }
  
  }


  const report_Spam=async (_spamAddress)=>{
    try{
    if (!ethereum) return alert("Please install Metamask");
    await getContract().reportSpam(_spamAddress);
    await console.log("success");

    }catch(err){
       throw new Error(err);
    }
  }

 

  const RemoveFromSpam=async(_spamAddress)=>{
    try{
      if (!ethereum) return alert("Please install Metamask");
      const spamMail= await getContract().removeFromSpam(_spamAddress);
    }catch(err)
    {
      throw new Error(err); 
    }
  }


  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) return alert("Please install Metamask");

      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length) {
        setConnectedAccount(accounts[0]);

        getSpamList();
        getInboxdata();
        GetSentItems();
      }
    } catch (e) {
      console.log(e);
    }
  };


  const Disconnect=()=>{
    setConnectedAccount("0x0");
  }



  useEffect(() => {
    try {
      checkIfWalletIsConnected();
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <Web3ApiContext.Provider
      value={{
        getInboxdata,
        connectWallet,
        connectedAccount,
        checkIfWalletIsConnected,
        ComposeMailMain,
        AllMails,
        SentEmails,
        report_Spam,
        RemoveFromSpam,
        SpamEmailAdress,
        setSpamEmailAdress,
        GetSentItems,
        Disconnect
      }}
    >
      {children}
    </Web3ApiContext.Provider>
  );
};
export default Web3ApiProvider;
