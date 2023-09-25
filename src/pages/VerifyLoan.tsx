import React, { useState } from 'react'
import Header  from './components/Header'
import Link from 'next/link'
import { approvelo, verifylo } from './BlockchainServices';

interface User {
    aadhaarnumber: string;
}

function getdateformat(number:any){
  const millisec = number * 1000;
  const date = new Date(millisec)
  return date
}


const VerifyLoan= () => {
  const [field, setField] = useState([]);
  const [user, setUser] = useState<User>({
    aadhaarnumber: ""
  });
  function getdate(data:any){
    const test = getdateformat(data)
    const date = test?.getDate();
    const month = test?.getMonth() + 1;
    const year = test?.getFullYear();
    const format = `${date}${month}${year}`
    return year
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({
      ...user, //spread operator
      [name]: value,
    });
  };
  const submitform =async () => {
    const aadhaarnumber = user.aadhaarnumber
    const res = await verifylo({aadhaarnumber})
    setField(res)
    console.log(res)
  }

  return (
    <div className='bg-[#140506] '>
      <Header /> 

      <div className=" max-h-max mt-20 py-10 bg-[#140506] ">
        <div className="flex-1 flex flex-col justify-center px-4 pt-10 sm:px-4   lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full  bg-white px-10 py-5 rounded-xl max-w-sm lg:w-96">
            <div>
              <h2 className="mt-5 text-3xl font-extrabold  text-green-700">Verify with your loan</h2>
              
            </div>
            <div className="mt-8">
              <div className="mt-6">
                <form action="#" method="POST" className="space-y-6">
                  <div>
                    <label htmlFor="aadhaarnumber" className="block text-sm font-medium text-gray-700">
                      Enter the Aadhaar Number
                    </label>
                    <div className="mt-1">
                      <input
                       id="aadhaarnumber"
                       name="aadhaarnumber"
                       type="text"
                       value={user.aadhaarnumber} onChange={handleChange} 
                       autoComplete=""
                       required
                       className="bg-gray-100 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div> 
                  <div>
                    <button type="button" onClick={submitform} className ="w-full flex justify-center text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-purple-800 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-200 text-lg rounded-lg px-5 py-2.5 text-center mr-2 mb-2 border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-60 focus:outline focus:ring-offset-2" > Submit </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className=' md:overflow-hidden overflow-x-scroll'>
  <table className='mt-5 md:ml-32'>
    <tr className='space-x-3 border-white border-2 text-2xl text-green-300'>
      <th className='p-5'>Farmer Name</th>
      <th className='p-5'>Aadhaar Number</th>
      <th className='p-5'>Amount of loan</th>
      <th className='p-5'>Reason for Loan</th>
      <th className='p-5'>Status</th>
      <th className='p-5'>Applied At</th>
      <th className='p-5'>Loan Sanctioned</th>
      <th className='p-5'>Deadline</th>
      <th className='p-5'>IsPaid</th>
    </tr>

    <tr className='border-white text-lg border-2 text-white text-center' key="1">
      <td>{field[0]}</td>
      <td>{parseInt(field[1])}</td>
      <td>{parseInt(field[2])}</td>
      <td>{field[3]}</td>
      <td>{field[4] === true ? "approved" : "unapproved"}</td>
      <td>2023</td>
      <td>{field[6] === true ? "Sanctioned" : "Not Sanctioned"}</td>
      <td>30</td>
      <td>{field[8] === true ? "Paid" : "Not Paid"}</td>
    </tr>
  </table>
</div>

        </div>
      
      </div>
    </div>
  )
}

export default VerifyLoan