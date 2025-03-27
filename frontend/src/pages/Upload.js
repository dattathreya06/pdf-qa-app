import React from "react";
import DocumentUpload from "../components/DocumentUpload";

const Upload = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Upload Document</h1>
        <p className="text-gray-600 mt-2">
          Upload a PDF document to ask questions about its content
        </p>
      </div>
      <DocumentUpload />
    </div>
  );
};

export default Upload;
