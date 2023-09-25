import Web3 from "web3";
import Soulbound from "./abi/Soulbound.json";
import loanabi from "./abi/Loans.json";
import { ethers } from "ethers";

const isBrowser = () => typeof window !== "undefined"; //The approach recommended by Next.js
const { ethereum } = isBrowser();
if (ethereum) {
  isBrowser().web3 = new Web3(ethereum);
  isBrowser().web3 = new Web3(isBrowser().web3.currentProvider);
}

const AGRI_FUND = "0xABd42e1345C028D4A770B0f2C531DfAaEAB81688";

const LOAN = "0x7ec35d4a44aDE03c99206de9aC20AdB68D55db3D";

export const ADDLOAN = async ({
  farmername,
  farmeraadhaar,
  loanamount,
  reasonforloan,
}) => {
  const provider =
    window.ethereum != null
      ? new ethers.providers.Web3Provider(window.ethereum)
      : ethers.providers.getDefaultProvider();
  const signer = provider.getSigner();
  const Role = new ethers.Contract(LOAN, loanabi, signer);
  const tokenId = await Role.applyLoan(
    farmername,
    farmeraadhaar,
    loanamount,
    reasonforloan
  );
  // localStorage.setItem("mintdata", name, receiver, product, quantity, sender);
  console.log(tokenId);
  return tokenId;
};

export const GETLOAN = async () => {
  const provider =
    window.ethereum != null
      ? new ethers.providers.Web3Provider(window.ethereum)
      : ethers.providers.getDefaultProvider();
  const signer = provider.getSigner();
  const Role = new ethers.Contract(LOAN, loanabi, signer);
  const tokenId = await Role.getAllLoanDetails();
  return tokenId;
};

export const approvelo = async ({ aadhaarnumber }) => {
  const provider =
    window.ethereum != null
      ? new ethers.providers.Web3Provider(window.ethereum)
      : ethers.providers.getDefaultProvider();
  const signer = provider.getSigner();
  const Role = new ethers.Contract(LOAN, loanabi, signer);
  const tokenId = await Role.approveLoan(aadhaarnumber);
  return tokenId;
};

export const verifylo = async ({ aadhaarnumber }) => {
  const provider =
    window.ethereum != null
      ? new ethers.providers.Web3Provider(window.ethereum)
      : ethers.providers.getDefaultProvider();
  const signer = provider.getSigner();
  const Role = new ethers.Contract(LOAN, loanabi, signer);
  const tokenId = await Role.verifyLoan(aadhaarnumber);
  return tokenId;
};

export const provideloans = async ({ aadhaarnumber, loanamount }) => {
  const provider =
    window.ethereum != null
      ? new ethers.providers.Web3Provider(window.ethereum)
      : ethers.providers.getDefaultProvider();
  const signer = provider.getSigner();
  const Role = new ethers.Contract(LOAN, loanabi, signer);
  const tokenId = await Role.sendLoanAmount(aadhaarnumber, loanamount);
  return tokenId;
};
export const payloans = async ({ aadhaarnumber, loanamount }) => {
  const provider =
    window.ethereum != null
      ? new ethers.providers.Web3Provider(window.ethereum)
      : ethers.providers.getDefaultProvider();
  const signer = provider.getSigner();
  const Role = new ethers.Contract(LOAN, loanabi, signer);
  const current = localStorage.getItem("walletaddress");
  const tokenId = await Role.repayLoan(aadhaarnumber, loanamount, {
    value: loanamount,
  });
  return tokenId;
};

export const MINTNFT = async ({
  name,
  receiver,
  product,
  quantity,
  sender,
}) => {
  const provider =
    window.ethereum != null
      ? new ethers.providers.Web3Provider(window.ethereum)
      : ethers.providers.getDefaultProvider();
  const signer = provider.getSigner();
  const Role = new ethers.Contract(AGRI_FUND, Soulbound, signer);
  const tokenId = await Role.mintNFT(name, receiver, product, quantity, sender);
  // localStorage.setItem("mintdata", name, receiver, product, quantity, sender);
  console.log(tokenId);
  return tokenId;
};

export const GETNFT = async ({ receiver }) => {
  const provider =
    window.ethereum != null
      ? new ethers.providers.Web3Provider(window.ethereum)
      : ethers.providers.getDefaultProvider();
  const signer = provider.getSigner();
  const Role = new ethers.Contract(AGRI_FUND, Soulbound, signer);
  const tokenId = await Role.getNFTsByReceiver(receiver);
  return tokenId;
};
