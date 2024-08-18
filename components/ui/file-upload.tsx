import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { IconUpload } from "@tabler/icons-react";
import { useDropzone } from "react-dropzone";

export const FileUpload = ({
  onChange,
}: {
  onChange?: (files: File[]) => void;
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (newFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    onChange && onChange(newFiles);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: false,
    noClick: true, // Prevents dropzone from opening file dialog on click
    onDrop: handleFileChange,
    onDropRejected: (error) => {
      console.log(error);
    },
  });

  return (
    <div className="w-full">
      {/* Drag-and-drop area */}
      {/* <div
        {...getRootProps()}
        className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center"
      >
        <input {...getInputProps()} className="hidden" />
        {isDragActive ? (
          <p className="text-neutral-600 flex flex-col items-center">
            Drop it here...
            <IconUpload className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
          </p>
        ) : (
          <p className="text-neutral-600 flex flex-col items-center">
            Drag 'n' drop a file here, or click the button below
          </p>
        )}
      </div> */}

      {/* Button for manual file selection */}
      <div className="flex items-center justify-center">
        <button
          className="flex items-center gap-2 px-8 py-1 bg-white text-blue-600 border border-blue-600 rounded-md font-light transition duration-200 ease-in-out hover:bg-blue-600 hover:text-white"
          onClick={handleClick}
        >
          <IconUpload className="h-5 w-5" />
          Upload
        </button>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        id="file-upload-handle"
        type="file"
        onChange={(e) => handleFileChange(Array.from(e.target.files || []))}
        className="hidden"
      />
    </div>
  );
};
