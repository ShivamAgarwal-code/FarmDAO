import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import BadgeTile from "./components/tiles/BadgeTile";
import { GETNFT } from "./BlockchainServices";
import { useAccount } from "wagmi";
import Link from "next/link";

function Badges() {
  const { address, isConnected } = useAccount();
  const [field, setField] = useState([]);
  function truncateHash(hash: any) {
    return hash.substring(0, 6) + "..." + hash.substring(hash.length - 4);
  }

  useEffect(() => {
    async function fetchData() {
      if (
        isConnected &&
        address !== "0x3907bAdE047531158c97c8C51b95c72a51E5e37e"
      ) {
        const receiver = address;
        const res = await GETNFT({ receiver });
        console.log("rest", res);
        setField(res);
      }
    }
    fetchData();
  }, [address, isConnected]);

  function downloadBadgeData(badgeData: any) {
    const data = JSON.stringify(badgeData);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "badge-data.json";
    link.href = url;
    link.click();
  }

  return (
    <div className="text-center">
      <Header />
      <h1 className="mt-32 bg-[#140506] pb-5 text-center text-3xl font-bold text-green-700">
        My badges
      </h1>
      {field.length === 0 ? (
        <>
          <div className="bg-[#140506] py-5  font-raj text-2xl text-green-700">
            You currently dont have any badges to claim
          </div>
        </>
      ) : (
        <>
          <div className="flex gap-8 bg-[#140506] px-20 py-5 font-raj text-2xl text-green-700">
            {field?.map((data, index) => (
              <div key="1">
                <BadgeTile
                  title={data[0]}
                  imgURL=""
                  key="1"
                  hash={truncateHash(data[4])}
                  product={data[2]}
                  quantity={data[3]}
                />
                <Link href="/ApplyLoan">
                  <button className="text-md ml-3 mt-2 flex h-[40px] items-center justify-center rounded-md bg-gradient-to-r from-green-500 to-green-700 px-10 py-4 pl-[10px] pr-[10px] text-center text-white  hover:cursor-pointer hover:brightness-75 md:ml-20">
                    Apply for Loan
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Badges;
