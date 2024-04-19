"use client";
import { uploadtoS3 } from "@/lib/s3";
import { log } from "console";
import { Inbox } from "lucide-react";
import React from "react";
import { useDropzone } from "react-dropzone";

const FileUpload = () => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      console.log(acceptedFiles);
      const file = acceptedFiles[0];
      if (file.size > 10 * 1024 * 1024) {
        alert("file size exceeds limit");
        return;
      }

      try {
        const data = await uploadtoS3(file);
        console.log("data", data);
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div className="p-2 bg-white rounded-xl">
      <div
        {...getRootProps({
          className:
            "border-dashed border-2 rounded-xl cursor-pointer bg-gray-50 py-8 flex justify-center items-center flex-col",
        })}
      >
        <input {...getInputProps()} />
        <>
          <Inbox className="w-10 h-10 text-slate-400"></Inbox>
          <p className="text-slate-400">Upload or Drop File</p>
          <p className="text-xs text-slate-400">*Must be PDF and up to 10MB</p>
        </>
      </div>
    </div>
  );
};

export default FileUpload;
