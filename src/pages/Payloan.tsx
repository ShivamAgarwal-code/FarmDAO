import React, {useState} from 'react'
import dynamic from 'next/dynamic'
import { payloans } from './BlockchainServices';

const Header = dynamic(() => import('./components/Header'), {
  ssr: false,
})
interface User {
    aadhaarnumber: string;
    loanamount: string;
}

function Payloan() {
    const [user, setUser] = useState<User>({
        aadhaarnumber: "",
        loanamount:"",
      });

      const sumbitform = async() =>{
        
        const aadhaarnumber = user.aadhaarnumber;
        const loanamount = user.loanamount;
        const res = payloans({aadhaarnumber,loanamount})
        console.log(res)
      }    
      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser({
          ...user, //spread operator
          [name]: value,
        });
      };
  return (
    <div>
        <Header />
        
        <div className=" max-h-max mt-20 py-20 bg-[#140506] ">
        <div className="flex-1 flex flex-col justify-center px-4 pt-10 sm:px-4   lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full  bg-white px-10 py-5 rounded-xl max-w-sm lg:w-96">
            <div>
              <h2 className="mt-5 text-3xl font-extrabol text-green-700">Pay Loan</h2>
              
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
                    <label htmlFor="loanamount" className="block text-sm font-medium text-gray-700">
                      Enter the Amount
                    </label>
                    <div className="mt-1">
                      <input
                       id="loanamount"
                       name="loanamount"
                       type="text"
                       value={user.loanamount} onChange={handleChange} 
                       autoComplete=""
                       required
                       className="bg-gray-100 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div> 
                  <div>
                    <button type="button" onClick={sumbitform} className ="w-full flex justify-center text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-purple-800 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-200 text-lg rounded-lg px-5 py-2.5 text-center mr-2 mb-2 border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-60 focus:outline focus:ring-offset-2" > Submit </button>
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

export default Payloan