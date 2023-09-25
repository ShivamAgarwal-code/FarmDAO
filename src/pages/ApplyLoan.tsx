import React, { useState } from 'react'
import Header  from './components/Header'

import { ADDLOAN } from './BlockchainServices'

interface User {
  farmername: string;
  aadhaarno: string;
  loanamount: string;
  reasonforloan: string;
}
function ApplyLoan() {
  const [user, setUser] = useState<User>({
    farmername: "",
    aadhaarno: "",
    loanamount:"",
    reasonforloan:"",

  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({
      ...user, //spread operator
      [name]: value,
    });
  };
  
  const addloantrigger =async () => {
    const farmername = user.farmername
    const farmeraadhaar = user.aadhaarno
    const loanamount= user.loanamount
    const reasonforloan= user.reasonforloan
    const res = await ADDLOAN({farmername,farmeraadhaar,loanamount,reasonforloan})
    console.log(res)
  }

  return (
    <div className=''>
      <Header /> 

      <div className=" max-h-max mt-20 bg-[#140506] ">
        <div className="flex-1 flex flex-col justify-center px-4 pt-10 sm:px-4  lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full  bg-white px-10 py-5 rounded-xl max-w-sm lg:w-96">
            <div>
              <h2 className="mt-5 text-3xl font-extrabold text-gray-900 text-green-700">Apply Loan </h2>
              
            </div>
            <div className="mt-8">
              <div className="mt-6">
                <form action="#" method="POST" className="space-y-6">
                  <div>
                    <label htmlFor="farmername" className="block text-sm font-medium text-gray-700">
                      Farmer Name
                    </label>
                    <div className="mt-1">
                      <input
                       id="farmername"
                       name="farmername"
                       type="text"
                       value={user.farmername} onChange={handleChange} 
                       autoComplete=""
                       required
                       className="bg-gray-100 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="aadhaarno" className="block text-sm font-medium text-gray-700">
                      Aadhaar Number
                    </label>
                    <div className="mt-1">
                      <input
                        id="aadhaarno"
                        name="aadhaarno"
                        type="text"
                         value={user.aadhaarno}  onChange={handleChange} 
                        autoComplete="current-password"
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="loanamount" className="block text-sm font-medium text-gray-700">
                      Loan Amount
                    </label>
                    <div className="mt-1">
                      <input
                        id="loanamount"
                        name="loanamount"
                        type="text"
                         value={user.loanamount}  onChange={handleChange} 
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="reasonforloan" className="block text-sm font-medium text-gray-700">
                      Reason for Loan
                    </label>
                    <div className="mt-1">
                      <input
                        id="reasonforloan"
                        name="reasonforloan"
                        type="text"
                         value={user.reasonforloan}  onChange={handleChange} 
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>


                  <div>
                    <button type="button" className ="w-full flex justify-center text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-purple-800 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-200 text-lg rounded-lg px-5 py-2.5 text-center mr-2 mb-2 border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-60 focus:outline focus:ring-offset-2"  onClick={addloantrigger}> Submit </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      
      </div>
    </div>
  )
}

export default ApplyLoan