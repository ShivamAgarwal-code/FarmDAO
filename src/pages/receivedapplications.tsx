import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { GETLOAN } from './BlockchainServices';
import { useAccount } from 'wagmi';
import { format } from 'date-fns';
import { PieChart,Tooltip, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const Header = dynamic(() => import('./components/Header'), {
  ssr: false,
});

function getdateformat(number: any) {
  const millisec = number * 1000;
  const date = new Date(millisec);
  return date;
}

const Receivedapplications = () => {
  const [field, setField] = useState([]);
  const { address, isConnected } = useAccount();

  useEffect(() => {
    async function fetchData() {
      if (isConnected && address === '0x3907bAdE047531158c97c8C51b95c72a51E5e37e') {
        const res = await GETLOAN();
        console.log('rest', res);
        setField(res);
      }
    }
    fetchData();
  }, [address, isConnected]);
  console.log(field);

  function getdate(datas: any) {
    const test = getdateformat(datas);
    const year = test?.getFullYear();
    return year;
  }
  const [screenWidth, setScreenWidth] = useState(0);

  // Function to handle window resize
  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    // Set initial screen width
    setScreenWidth(window.innerWidth);

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const outerRadius = screenWidth >= 768 ? 180 : 120;

 // Calculate the counts for approved and unapproved applications
const approvedCount = field.filter((data) => data[4] === true).length;
const unapprovedCount = field.filter((data) => data[4] === false).length;

// Calculate the total loan amount and average loan amount
const totalLoanAmount = field.reduce((total, data) => total + parseInt(data[2]), 0);
const averageLoanAmount = totalLoanAmount / field.length;

// Calculate the number of applications that were paid and not paid
const paidCount = field.filter((data) => data[8] === true).length;
const notPaidCount = field.filter((data) => data[8] === false).length;
  // Pie chart data


  // Calculate the number of sanctioned and not sanctioned loans
  const sanctionedCount = field.filter((data) => data[6] === true).length;
  const notSanctionedCount = field.filter((data) => data[6] === false).length;

  // Pie chart data
  const pieChartData = [
    { name: 'Approved', value: approvedCount, label: 'Approved' },
    { name: 'Unapproved', value: unapprovedCount, label: 'Unapproved' },
    { name: 'Paid', value: paidCount, label: 'Paid' },
    { name: 'Not Paid', value: notPaidCount, label: 'Not Paid' },
    { name: 'Sanctioned', value: sanctionedCount, label: 'Sanctioned' },
    { name: 'Not Sanctioned', value: notSanctionedCount, label: 'Not Sanctioned' },
  ];
 
  // Custom colors for the pie chart
  const colors = ['#00C853', '#F44336', '#2196F3', '#FF9800', '#FFEB3B', '#9E9E9E'];
 
// Calculate the total loan amount for approved and unapproved applications
const totalApprovedLoanAmount = field
  .filter((data) => data[4] === true)
  .reduce((total, data) => total + parseInt(data[2]), 0);

const totalUnapprovedLoanAmount = field
  .filter((data) => data[4] === false)
  .reduce((total, data) => total + parseInt(data[2]), 0);

// Calculate the total loan amount for paid and not paid applications
const totalPaidLoanAmount = field
  .filter((data) => data[8] === true)
  .reduce((total, data) => total + parseInt(data[2]), 0);

const totalNotPaidLoanAmount = field
  .filter((data) => data[8] === false)
  .reduce((total, data) => total + parseInt(data[2]), 0);

// Calculate the total loan amount for sanctioned and not sanctioned loans
const totalSanctionedLoanAmount = field
  .filter((data) => data[6] === true)
  .reduce((total, data) => total + parseInt(data[2]), 0);

const totalNotSanctionedLoanAmount = field
  .filter((data) => data[6] === false)
  .reduce((total, data) => total + parseInt(data[2]), 0);

  return (
    <div className='text-center bg-[#140506]'>
      <Header />
      <h1 className='text-center text-3xl mt-20 font-bold py-10 bg-[#140506] text-green-700'>
        Received Application
      </h1>
      <div className=''>
        {/* Render the pie chart */}
        <ResponsiveContainer width='100%'  height={450}>
          <PieChart>
         
    <Pie
      data={pieChartData}
      dataKey='value'
      nameKey='label'
      cx='50%'
      cy='50%'
      outerRadius={outerRadius}
      fill='#8884d8'
      label={(entry) => {
        let totalAmount = 0;
        switch (entry.name) {
          case 'Approved':
            totalAmount = totalApprovedLoanAmount;
            break;
          case 'Unapproved':
            totalAmount = totalUnapprovedLoanAmount;
            break;
          case 'Paid':
            totalAmount = totalPaidLoanAmount;
            break;
          case 'Not Paid':
            totalAmount = totalNotPaidLoanAmount;
            break;
          case 'Sanctioned':
            totalAmount = totalSanctionedLoanAmount;
            break;
          case 'Not Sanctioned':
            totalAmount = totalNotSanctionedLoanAmount;
            break;
          default:
            break;
        }
        return `${entry.label} (${(entry.value * 100 / totalAmount).toFixed(2)}%)`;
      }}
    >

              {pieChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend align='center' verticalAlign='bottom' />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className='px-5 md:mx-20'>
        <div className='text-white pb-5 text-xl'>
        <p>Total Loan Amount: {totalLoanAmount}</p>
          <p>Average Loan Amount: {averageLoanAmount}</p>
          <p>Sanctioned Applications: {sanctionedCount}</p>
          <p>Not Sanctioned Applications: {notSanctionedCount}</p>
        </div>
      </div>
      <div className='px-5 md:mx-20 pb-5 overflow-x-scroll md:overflow-hidden'>
        <table className='md:ml-20 '>
          <tr className='space-x-5 border-white border-2 text-2xl text-green-300'>
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
          {field?.map((data: any, index) => (
            <tr className='border-white text-lg border-2  text-white text-center' key={index}>
              <td>{data[0]}</td>
              <td>{parseInt(data[1])}</td>
              <td>{parseInt(data[2])}</td>
              <td>{data[3]}</td>
              <td>{data[4] === true ? 'approved' : 'unapproved'}</td>
              <td>2023</td>
              <td>{data[6] === true ? 'Sanctioned' : 'Not Sanctioned'}</td>
              <td>30</td>
              <td>{data[8] === true ? 'Paid' : 'Not Paid'}</td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};

export default Receivedapplications;
