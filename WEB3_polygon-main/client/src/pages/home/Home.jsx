import "./Home.css";
import { useContext } from "react";
import { Link } from "react-router-dom"
import {Web3ApiContext} from "../../context/Web3ApiContext";


export default function Login() {
    const {connectWallet}=useContext(Web3ApiContext);
   
    return (
        <>

      <div className="home-img">

            </div>
            <div className="home">

                <div className="navbar all">
                    <nav className="navbar navbar-expand-lg">
                        <div className="container-fluid">
                            <a className="navbar-brand nav-title" href="#">Decent_Mail</a>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                                <ul className="navbar-nav nav-right">
                                    <li className="nav-item">
                                        <a className="nav-link active nav-subtitle" aria-current="page" href="#">Home</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link nav-subtitle" href="#about">About</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link nav-subtitle" href="#services">Services</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>


                <div className="grid_d">
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <h1 className="heading">
                                    Decentralized Mailing Facility
                                </h1>
                                <p className="sub-text">
                                    Decentralized E-Mail is a blockchain-based email service. Allows users to e-mail a smart contract that will be generated and accepted peer to peer via e-mail. Users can control & manage their data and information.
                                </p>
                                <br />
                                <Link to="/mail" className="home-mail">
                                <div className="cen-btn">
                                    <button type="button" onClick={connectWallet} className="btn btn-primary grid-btn"> Get Started
                                <i className="fas fa-arrow-right"></i>
                                </button></div></Link>
                            </div>
                            <div className="col">
                                <img className="img-grid" src="https://i.pinimg.com/originals/bb/04/84/bb0484a6ed87f1dcb25115b859d1be07.png" alt="img" />
                            </div>
                        </div>
                    </div>
                </div>


                <div className="about" id="about">
                        <h1 className="about-text">About</h1>
                        <p className="about-subtext">This is our decentralized email website where we use web3.0 and new blockchain technologies to send emails and receive emails. It encrypts all message content and attachments, which means only the sender and recipient can possibly gain access to the material. It operates on fully decentralized network where nodes are distributed across the network to form immutable network which makes it impossible to be controlled and hacked by external parties.</p>
                </div>

                <div className="services" id="services">
                        <h1 className="services-text">Services</h1>
                        <div className="services-subtext left box-left" > Web3.0 and blockchain based decentralized email website where you can send mails using tokens.</div>
                        <div className="services-subtext right box-right"> Click on the "Get started" button to go to the main mail page where first you need to connect your wallet.</div>
                        <div className="services-subtext left box-left" > After that you need to write the receiver's address and your message or mail and send it by clicking the "send" button. You can attach the files as well if you want. </div>
                </div>

            </div>
     

        </>
    );
}