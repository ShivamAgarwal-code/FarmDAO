import React,{useState} from 'react'
import  FileDropzone   from './components/dropzone/FileDropzone'
import { useForm } from 'react-hook-form'
import {
  useAccount
} from "wagmi";
import {MINTNFT} from "./BlockchainServices"
import {AiFillDelete} from "react-icons/ai"
import dynamic from 'next/dynamic'

const Header = dynamic(() => import('./components/Header'), {
  ssr: false,
})

type FileType = File | null | undefined

interface MetadataDict {
  value: string
  key: string
}

function Editor() {
  const [file, setFile] = useState<FileType>()
  const { address, isConnected } = useAccount();
  const [metadata, setMetadata] = useState<MetadataDict[]>([
    { key: 'Key', value: 'Value' }
  ])
  const {
    handleSubmit,
    unregister,
    getValues,
    register,
    formState: { errors }
  } = useForm({ criteriaMode: 'all' })

  const mintcerti= async() =>{
    const name=getValues('badgeName')
    const receiver=getValues('walletAddr')
    const product=getValues('product')
    const quantity=getValues('quantity')
    const sender =address
    const res = await MINTNFT({name,receiver,product,quantity,sender})
    console.log(res)
  }

  const renderMetadataList = () => {
    return metadata.map((value, i) => {
      return (
        <div className="flex md:flex-col" key={i}>
          <div className="flex  items-center gap-2">
            <div className=" flex md:flex-row flex-col  items-center gap-4">
              <input
                className="h-[44px] w-full border-2 text-gray-800 p-2 sm:w-[400px]"
                {...register(String(i), {
                  required: 'This field is required.'
                })}
                placeholder="Lat, Long"
              />
              <input
                className="h-[44px] w-full border-2 p-2 text-gray-800 sm:w-[400px]"
                {...register(String(i + '_val'), {
                  required: 'This field is required.'
                })}
                placeholder="Value"
              />
              <div
                className="hover:cursor-pointer"
                onClick={() => removeMetadataField(i)}
              >
                <AiFillDelete />
              </div>
            </div>
          </div>
        </div>
      )
    })
  }
  const addMetadataField = () => {
    setMetadata([...metadata, { key: '', value: '' }])
  }
 
  const renderMetadataSection = () => {
    return (
      <div>
        <p className="font-raj text-lg font-semibold">Certificate Metadata:</p>
        <div className="flex flex-col  md:gap-2">
          {renderMetadataList()}
          {metadata?.length >= 15 ? null : (
            <div
              className="mt-4 w-fit font-raj font-semibold text-green-700  hover:cursor-pointer"
              onClick={addMetadataField}
            >
              + Add More
            </div>
          )}
        </div>
      </div>
    )
  }
  const removeMetadataField = (i: number) => {
    const tempList = structuredClone(metadata)
    tempList.splice(i, 1)
    unregister(String(i), { keepDirtyValues: false })
    unregister(String(i + '_val'), { keepDirtyValues: false })
    setMetadata(tempList)
  }

  const renderNameWallet = () => {
    return (
      <div className=" ">
        <div className="flex md:flex-row flex-col gap-4">
        <div>
          <p className="font-raj text-lg  font-semibold">Farmer Name: </p>
          <input
            className="h-[44px] border-2 text-gray-800 p-2 w-full sm:w-[400px]"
            {...register('badgeName', {
              required: 'This field is required.'
            })}
          />
        </div>
        <div>
          <p className="font-raj text-lg font-semibold">
            Farmer Wallet Address:{' '}
          </p>
          <input
            className="h-[44px] w-full border-2 text-gray-800 p-2 sm:w-[400px]"
            {...register('walletAddr', {
              required: 'This field is required.'
            })}
          />
        </div>
        </div>
        <div className='flex md:flex-row flex-col gap-4'>
        <div>
          <p className="font-raj text-lg font-semibold">Land Location: </p>
          <input
            className="h-[44px] w-full border-2 text-gray-800 p-2 sm:w-[400px]"
            {...register('product', {
              required: 'This field is required.'
            })}
          />
        </div>
        <div>
          <p className="font-raj text-lg font-semibold">
            Area (in Acres):{' '}
          </p>
          <input
            className="h-[44px] w-full border-2 text-gray-800 p-2 sm:w-[400px]"
            {...register('quantity', {
              required: 'This field is required.'
            })}
          />
          {/* <ErrorMessage
            errors={errors}
            name="quantity"
            render={({ message }) => {
              return <ErrorLabel message={message} />
            }}
          /> */}
        </div>
        </div>
        
      </div>
    )
  }

  return (
    <div>
      <Header />
      <div className="md:min-w-[770px] px-5 mt-24 bg-[#140506]">
        
        <div className="flex  flex-col gap-4 py-12 px-2 sm:px-20">
          <div className="font-raj text-2xl text-white font-semibold">
            Proof of File/Image
          </div>
          <div className="flex md:flex-row flex-col gap-6">
            <FileDropzone
              onSuccess={(File) => {
                setFile(File)
              }}
              resetFile={() => {
                setFile(null)
              }}
              fullWidth={false}
            />
            <div className="flex flex-col text-white gap-2">
              {renderNameWallet()}
              {renderMetadataSection()}
            </div>
          </div>
          <div className="mt-8 ml-10  sm:ml-64 sm:w-96">
          
            <button className="flex h-[50px] pl-[42px] pr-[42px] items-center justify-center rounded-md bg-gradient-to-r from-green-500 to-green-700 text-center font-raj text-white hover:cursor-pointer hover:brightness-75" 
               onClick={handleSubmit(mintcerti)}
            >Mint</button>
          </div>
        </div>
      
    </div>
</div>
  )
}

export default Editor