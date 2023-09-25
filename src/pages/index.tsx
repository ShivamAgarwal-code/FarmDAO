import Image from "next/image";
import logo from "../Assets/logo.png"
import dynamic from 'next/dynamic'
import Link from 'next/link'
import Head from 'next/head';
import {BsWhatsapp} from "react-icons/bs"


const Header = dynamic(() => import('./components/Header'), {
  ssr: false,
})
interface TileProps {
  description: string;
  title: string;
  icon: string;
}

export default function Home() {
  return (
    <main className="bg-[url('https://uploads-ssl.webflow.com/63d3d2c7912bc75b5030c7ad/63d3d2c7912bc757f330c817_bg-home-repeat.jpg')]">
       <Head>
        <title>Farm-DAO</title>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="relative isolate px-8 pt-14 lg:px-8">
       
        <div className="mx-auto max-w-3xl pt-20 sm:py-48 lg:py-[80px]">
         
          <div className="text-center justify-center">
            <h1 className="text-4xl  md:pt-20 font-bold pb-10 tracking-tight text-green-700 sm:text-6xl">
            Green DAO
            </h1>
            <span className="text-2xl md:text-3xl pb-20 glow">Building the farmers for the next generation. Its an DAO to help the farmers with the supplychain management, getting identity and apply for the loans.</span> 
            <Link href="/ApplyLoan">
            <button className="btn-grad3 mt-15 md:mt-8 ">Get Started</button>
            </Link>
          </div>
        </div>
      </div>
      <div className="bg-[#140506] pt-8 md:pt-20 flex flex-col sm:flex-row justify-between px-4 sm:px-10">
        <h3 className="text-center md:text-lg text-green-300 mb-4 sm:mb-0">
          Follow us on Twitter, Insta
        </h3>
        <h3 className="text-center md:text-lg text-white mb-4 sm:mb-0">
          Made with 💚 by <span className="font-bold text-green-300">Farm-DAO</span>
        </h3>
        <h3 className="text-center md:text-lg text-green-300">Copyrights @ 2023</h3>
      </div>
      <a
        href="https://wa.me/918072105077"
        className="whatsapp_float"
        target="_blank"
        rel="noopener noreferrer"
      >
        <BsWhatsapp className="fa mt-2 fa-whatsapp" />
      </a>

    </main>
  );
}
