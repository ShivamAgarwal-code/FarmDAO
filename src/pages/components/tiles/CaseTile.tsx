import Image from "next/image";

interface TileProps {
  description: string;
  title: string;
  icon: string;
}

const CaseTile: React.FC<TileProps> = ({ icon, title, description }) => {
  return (
    <div className="flex w-52 flex-col items-center space-y-4 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-green-500 to-green-700">
        <img src={icon} alt="Icon Img" width="40px" />
      </div>
      <div className="border-green-500 bg-gradient-to-r from-green-500 to-green-700 bg-clip-text p-2 font-raj text-2xl font-bold text-transparent">
        {title}
      </div>
      <p className="mb-5 font-raj text-xl text-gray-700">{description}</p>
    </div>
  );
};

export default CaseTile;