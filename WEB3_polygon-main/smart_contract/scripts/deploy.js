const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {

  const EmailService = await hre.ethers.getContractFactory("EmailService");
  const emailService = await EmailService.deploy();

  await emailService.deployed();

  console.log("EmailService is deployed to:", emailService.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });