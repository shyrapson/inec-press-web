"use client";

import type React from "react";

import { useState } from "react";
import { CloudUpload } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { uploadMediaFile } from "@/api/user";
import { cn } from "@/lib/utils";

export default function FileUploadPage({
  file,
  setFile,
  type = ".pdf",
}: {
  file: string | null;
  setFile: (file: string | null) => void;
  type?: string;
}) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tempFile, setTempFile] = useState<string | null>(null);
  const { mutateAsync: handleUploadFile, isPending } = useMutation({
    mutationFn: (file: File) => uploadMediaFile({ file: file }),
  });
  const fileType = type === ".pdf" ? ".PDF" : ".Image";

  const validateFile = (file: File): boolean => {
    const maxSize = 5 * 1024 * 1024; // 1MB in bytes

    if (file.size > maxSize) {
      setError("File size must not exceed 5MB");
      return false;
    }

    //   if (file.type !== "application/pdf") {
    //     const errMsg = `Only ${fileType} files are allowed`;
    //   setError(errMsg);
    //   return false;
    // }

    setError(null);
    return true;
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (validateFile(file)) {
        setTempFile(file?.name);
        const res: any = await handleUploadFile(file);
        setFile(res?.[0]?.path?.preview);
      }
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (validateFile(file)) {
        setTempFile(file?.name);
        const res: any = await handleUploadFile(file);
        setFile(res?.[0]?.path?.preview);
      }
    }
  };

  return (
    <div className="w-full max-w-2xl">
      <div
        className={cn(
          `relative border-2 border-dashed border-gray-300 rounded-lg p-4 text-center transition-colors ${
            isDragOver ? "border-green-400 bg-green-50" : "bg-gray-3"
          }`,
          isPending ? "cursor-not-allowed opacity-50" : ""
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept={type}
          onChange={handleFileSelect}
          max="1000"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />

        {file !== null ? (
          <div className="flex flex-col items-center space-y-1">
            <h3 className="text-sm font-medium text-green-600 mb-1">File Uploaded</h3>
            <p className="text-gray-500 text-xs">Tap to change the uploaded file</p>
            <p className="text-sm text-center font-light italic text-green-600 mb-t truncate w-10/12">
              <span className="text-xs font-medium text-green-600">File Name</span>
              {" : "}
              {tempFile}
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-1">
            <CloudUpload className="size-4 text-green-600" />
            <div>
              <h3 className="text-sm font-medium text-green-600 mb-1">Choose a file</h3>
              <p className="text-gray-500 text-xs">Tap to choose a file for upload</p>
            </div>
          </div>
        )}
      </div>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      <p className="text-gray-400 text-[9px] italic mt-1">
        Upload highest qualification not larger than 5MB ({fileType})*
      </p>
    </div>
  );
}
