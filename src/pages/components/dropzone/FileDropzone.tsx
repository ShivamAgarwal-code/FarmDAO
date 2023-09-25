import { useDropzone } from "react-dropzone";
import { useEffect } from "react";
import { BiError } from "react-icons/bi";
import Image from "next/image";
interface DropzoneProps {
  lightGradient?: boolean;
  fullWidth?: boolean;
  imgUrl?: string | null;
  onSuccess: (file: File) => void;
  resetFile: () => void;
}

const FileDropzone: React.FC<DropzoneProps> = ({
  lightGradient,
  fullWidth,
  imgUrl,
  onSuccess,
  resetFile,
}) => {
  const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
    useDropzone({
      accept: {
        "image/jpeg": [],
        "image/png": [],
      },
      maxFiles: 1,
      multiple: false,
      maxSize: 20000000,
    });

  useEffect(() => {
    if (acceptedFiles?.length > 0) {
      onSuccess(acceptedFiles[0]);
    } else {
      resetFile();
    }
  }, [acceptedFiles, fileRejections]);

  const imgStyle = fullWidth
    ? "flex w-full h-[250px]"
    : "flex h-[250px] w-[250px]";

  const determineStyle = () => {
    if (lightGradient && fullWidth) {
      return "flex w-full h-[250px] flex-col items-center justify-center rounded-lg bg-gradient-to-b from-green-200/50 to-purple-100/50 hover:cursor-pointer border-solid	border-2	border-green-700";
    }
    if (fullWidth) {
      return "flex w-full flex-col items-center justify-center rounded-lg bg-gradient-radial from-green-600 to-green-700 hover:cursor-pointer";
    }

    if (lightGradient) {
      return "flex h-[250px] w-[250px] flex-col items-center justify-center rounded-lg bg-gradient-to-b	from-green-200/50 to-purple-100/50 hover:cursor-pointer border-solid	border-2	border-green-700 ";
    }
    return "flex h-[250px] w-[250px] flex-col items-center justify-center rounded-lg bg-gradient-radial from-green-600 to-green-700 hover:cursor-pointer ";
  };

  const determineErrorStyle = () => {
    if (fullWidth) {
      return "flex h-[250px] w-full flex-col items-center justify-center gap-4 rounded-lg bg-red-600 bg-gradient-radial";
    }
    return "flex h-[250px] w-[250px] flex-col items-center justify-center gap-4 rounded-lg bg-red-600 bg-gradient-radial";
  };

  const renderError = () => {
    return (
      <div className={determineErrorStyle()}>
        <BiError fill="#fff" />
        <div className="px-4 font-raj text-xl text-white">
          Invalid File: {fileRejections[0].errors[0].message}
        </div>
      </div>
    );
  };

  const renderFile = () => {
    return (
      <div className={imgStyle}>
        <img
          alt=""
          className="h-full w-full"
          src={URL.createObjectURL(acceptedFiles[0])}
        />
      </div>
    );
  };

  const renderUpload = () => {
    return (
      <div className={determineStyle()}>
        <div
          className={
            lightGradient
              ? "mb-2 flex h-[20px] w-[20px] items-center justify-center rounded-full border-2 border-green-500 pt-[2px] font-raj text-xl text-green-500"
              : "mb-2 flex h-[20px] w-[20px] items-center justify-center rounded-full border-2 border-white pt-[2px] font-raj text-xl text-white"
          }
        >
          +
        </div>
        <div
          className={
            lightGradient
              ? "text-l font-raj text-green-500"
              : "text-l font-raj text-white"
          }
        >
          Upload
        </div>
        <div
          className={
            lightGradient
              ? "text-l font-raj text-green-500"
              : "text-l font-raj text-white"
          }
        >
          Image
        </div>
      </div>
    );
  };

  const currentImage = () => {
    return (
      <div className={imgStyle}>
        <img
          src={imgUrl ?? ""}
          alt=""
          className="rounded-md hover:cursor-pointer"
        />
      </div>
    );
  };

  const renderDropzoneState = () => {
    if (fileRejections?.length > 0 && fileRejections[0]?.errors.length > 0) {
      return renderError();
    }

    if (acceptedFiles?.length === 1) {
      return renderFile();
    }

    if (imgUrl) {
      return currentImage();
    }

    return renderUpload();
  };

  return (
    <div className="">
      <div className="" {...getRootProps()}>
        <input {...getInputProps()} />
        {renderDropzoneState()}
      </div>
    </div>
  );
};


export default FileDropzone;