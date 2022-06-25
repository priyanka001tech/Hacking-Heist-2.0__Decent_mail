
import {Web3Storage} from "web3.storage"

export async function main (file) {
 
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEQxMWI5NWVhOWExZDYwMDIxMUExNEI5OTM5OThkODgzRDQ1Mjg4NjkiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NTQzMTMxNDE1NTAsIm5hbWUiOiJTYW1wbGUifQ.-bwmzWGdF8nBJicgBJearfXaKp9AT4s1bTJFU1G1Ej0";
  
    if (!token) {
      return console.error('A token is needed. You can create one on https://web3.storage')
    }
  
    if (!file) {
      return console.error('Please supply the path to a file or directory')
    }


  
    const storage = new Web3Storage({ token })
   
    

  
    console.log(`Uploading file of path :${file}`)
    const cid = await storage.put(file)
    console.log('Content added with CID:', cid)
    return cid;
  }
