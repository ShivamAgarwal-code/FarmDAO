import Link from "next/link";
import React, { Provider, useContext, useEffect } from "react";
import useDarkMode from "use-dark-mode";
import { useAccount } from "wagmi";
import Image from "next/image";
import { Dialog } from "@headlessui/react";
import { AiOutlineBars } from "react-icons/ai";
import { HiXMark } from "react-icons/hi2";
import detectProvider from "@metamask/detect-provider";
import Web3 from "web3";
import truncateEthAddress from "truncate-eth-address";
import { useState } from "react";
import { Web3Context } from "../../config/Web3Context";
// Now you can use 'localStorage' with the 'any' type.
import { ethers } from "ethers";
import { Web3Provider } from "@ethersproject/providers";
// import { localStorage } from "localStorage";
const Header = () => {
  const { address, isConnected } = useAccount();
  const [accounts, setAccounts] = useState<string[]>([]); // Initialize accounts state with an empty array
  const [connected, setConnected] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    connectToWeb3();
  }, []);

  const getWeb3 = async (): Promise<Web3Provider | null> => {
    if (typeof window.ethereum !== "undefined") {
      try {
        await (window.ethereum as any).request({
          method: "eth_requestAccounts",
        });
        const provider = new ethers.providers.Web3Provider(
          window.ethereum as ethers.providers.ExternalProvider
        );
        return provider;
      } catch (error) {
        // Handle error connecting to the Ethereum provider
        console.error("Error connecting:", error);
        return null;
      }
    } else {
      return null;
    }
  };

  const connectToWeb3 = async (): Promise<void> => {
    try {
      const web3 = await getWeb3();
      if (web3) {
        const accounts = await web3.listAccounts();
        setAccounts(accounts);
        setConnected(true);
      } else {
        // Handle case where web3 is not available
      }
    } catch (error) {
      // Handle error connecting to web3
      console.error("Error connecting:", error);
    }
  };
  // const isBrowser = () => typeof window !== "undefined"; //The approach recommended by Next.js
  // const { ethereum } = isBrowser();
  // if (ethereum) {
  //   isBrowser().web3 = new Web3(ethereum);
  //   isBrowser().web3 = new Web3(isBrowser().web3.currentProvider);
  // }
  const handleConnect = async () => {
    try {
      const web3 = await getWeb3();
      if (web3 && typeof window.ethereum !== "undefined") {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await web3.listAccounts();
        setAccounts(accounts);
        setConnected(true);
      }
    } catch (error) {
      console.error("Error connecting:", error);
    }
  };

  // const handleConnect = async () => {
  //   try {
  //     const web3 = await getWeb3();
  //     if (web3) {
  //       await window.ethereum.request({ method: "eth_requestAccounts" });
  //       const accounts = await web3.listAccounts();
  //       setAccounts(accounts);
  //       setConnected(true);
  //     }
  //   } catch (error) {
  //     console.error("Error connecting:", error);
  //   }
  // };

  const handleDisconnect = () => {
    setAccounts([]);
    setConnected(false);
  };

  const navigation = [
    { name: "Create", subname: "an badge", href: "/Editor" },
    { name: "Approve", subname: "Loans", href: "/ApproveLoan" },
    { name: "Received", subname: "Loans", href: "/receivedapplications" },
    { name: "Provide", subname: "Loan", href: "/ProvideLoan" },
  ];

  const navigation2 = [
    { name: "My Badges", subname: "", href: "/Badges" },
    { name: "Apply", subname: "Loan", href: "/ApplyLoan" },
    { name: "Verify", subname: "Loan", href: "/VerifyLoan" },
    { name: "Pay", subname: "Loan", href: "/Payloan" },
    { name: "Learn", subname: "", href: "/Learn" },
  ];
  if (typeof window !== "undefined") {
    localStorage.setItem("walletaddress", address || "");
  }
  return (
    <Web3Context.Provider value={Web3}>
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          className="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className="h-16 w-auto"
                src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhENUilxHHUTQharTQgs7IPU6cFMSv_h6KHSD82Wk6NjuzvW8Id97Z0TkZcgghsncWqSADiECjYlOJLpVOhVuDi0DWnrVLpqZOGHKlpS8c_or-RuHJ6fFot0yW8t4-EKvCIX10U7rCF9tvmltMCkayNSnxFrJbP-6lHMtJFIkAN9286YfBCi1nPU2DD/s320/Doc1%20(2).png"
                alt=""
              />
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <AiOutlineBars className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <div className="hidden lg:flex lg:gap-x-12 ">
            {address == "0x3907bAdE047531158c97c8C51b95c72a51E5e37e" ? (
              <>
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="mt-2 pt-5 text-center text-lg font-semibold leading-6 text-white"
                  >
                    {item.name} &nbsp;
                    {item.subname}
                  </Link>
                ))}
              </>
            ) : (
              <>
                {navigation2.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="mt-2 pt-5 text-lg font-semibold leading-6 text-white"
                  >
                    {item.name} &nbsp;
                    {item.subname}
                  </Link>
                ))}
              </>
            )}
            {connected ? (
              <>
                {/* <div className="text-blue-300 font-bold text-md pt-7">My Account:{truncateEthAddress(address)}</div> */}
                <button
                  className="text-md btn-grad1 pt-2 font-bold text-white"
                  onClick={handleDisconnect}
                >
                  Disconnect
                </button>
              </>
            ) : (
              <button
                className="text-md btn-grad pt-2 font-bold text-white"
                onClick={handleConnect}
              >
                Connect
              </button>
            )}
          </div>
        </nav>
        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-800 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                  className="h-8 w-auto"
                  src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhENUilxHHUTQharTQgs7IPU6cFMSv_h6KHSD82Wk6NjuzvW8Id97Z0TkZcgghsncWqSADiECjYlOJLpVOhVuDi0DWnrVLpqZOGHKlpS8c_or-RuHJ6fFot0yW8t4-EKvCIX10U7rCF9tvmltMCkayNSnxFrJbP-6lHMtJFIkAN9286YfBCi1nPU2DD/s320/Doc1%20(2).png"
                  alt=""
                />
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <HiXMark
                  className="h-8 w-8 rounded-lg border border-white text-gray-200"
                  aria-hidden="true"
                />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="mt-5 space-y-6 py-6">
                  {address == "0x3907bAdE047531158c97c8C51b95c72a51E5e37e" ? (
                    <>
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="mt-2 flex text-lg font-semibold leading-6 text-white hover:bg-gray-700"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </>
                  ) : (
                    <>
                      {navigation2.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="mt-2 flex text-lg font-semibold leading-6 text-gray-200  hover:bg-gray-700"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </>
                  )}
                </div>
                <div className="py-6">
                  <p className=" block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-200 hover:bg-gray-700">
                    {connected ? (
                      <>
                        {/* <div>My Accounts: {truncateEthAddress(address)}</div> */}
                        <button
                          className="btn-grad1"
                          onClick={handleDisconnect}
                        >
                          Disconnect
                        </button>
                      </>
                    ) : (
                      <button className="btn-grad" onClick={handleConnect}>
                        Connect
                      </button>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
    </Web3Context.Provider>
  );
};

export default Header;
