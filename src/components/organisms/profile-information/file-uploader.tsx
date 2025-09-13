"use client";

import type React from "react";

import { useState } from "react";
import { CloudUpload } from "lucide-react";

export default function FileUploadPage({ showBottomLabel = true }: { showBottomLabel?: boolean }) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateFile = (file: File): boolean => {
    const maxSize = 1 * 1024 * 1024; // 1MB in bytes

    if (file.size > maxSize) {
      setError("File size must not exceed 1MB");
      return false;
    }

    if (file.type !== "application/pdf") {
      setError("Only PDF files are allowed");
      return false;
    }

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

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (validateFile(file)) {
        console.log("File accepted:", file.name);
        // Handle successful file upload here
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (validateFile(file)) {
        console.log("File accepted:", file.name);
        // Handle successful file upload here
      }
    }
  };

  return (
    // <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
    <div className="w-full max-w-2xl">
      <div
        className={`relative border-2 border-dashed border-gray-300 rounded-lg p-4 text-center transition-colors ${
          isDragOver ? "border-green-400 bg-green-50" : "bg-gray-3"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileSelect}
          max="1000"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />

        <div className="flex flex-col items-center space-y-1">
          <CloudUpload className="size-4 text-green-600" />
          <div>
            <h3 className="text-sm font-medium text-green-600 mb-1">Choose a file</h3>
            <p className="text-gray-500 text-xs">Tap to choose a file for upload</p>
          </div>
        </div>
      </div>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      <p className="text-gray-400 text-[9px] italic mt-1">
        Upload highest qualification not larger than 1MB (.PDF)*
      </p>
    </div>
    // </div>
  );
}
