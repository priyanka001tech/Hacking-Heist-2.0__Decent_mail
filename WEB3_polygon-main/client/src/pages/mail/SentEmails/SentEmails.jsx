import { useContext } from "react";
import { Web3ApiContext } from "../../../context/Web3ApiContext";
import { SpinnerDiamond } from "spinners-react";
import Message from "../Message";
const SentEmails = () => {

  const { connectedAccount, SentEmails } = useContext(Web3ApiContext);
  if (!connectedAccount) {
    return (
      <div className="loading">
        <SpinnerDiamond
          size={73}
          thickness={143}
          speed={80}
          color="rgba(113, 57, 172, 1)"
          secondaryColor="rgba(57, 128, 172, 0.92)"
        />
      </div>
    );
  }

  return (
    <>
      <div className="inbox">
        <h4 className="mt-3 text-inbox">
          <strong>Sent Emails </strong>
        </h4>
        <div className="msg mt-4">
          {[...SentEmails].reverse().map((data, i) => {
            
            return (
              <Message
                key={i}
                receiver={data.receiver}
                sender={data.sender}
                subject={data.subject}
                body={data.body}
                timestamp={data.timestamp._hex}
                ipfsHash={data.ipfsHash}
                Filename={data.Filename}
                i={i}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default SentEmails;
