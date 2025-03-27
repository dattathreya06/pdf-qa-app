import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadDocument } from "../services/api";

const DocumentUpload = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setError("");
    } else {
      setFile(null);
      setError("Please select a valid PDF file");
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === "application/pdf") {
      setFile(droppedFile);
      setError("");
    } else {
      setError("Please drop a valid PDF file");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please select a PDF file");
      return;
    }

    setLoading(true);
    try {
      const response = await uploadDocument(file);
      setLoading(false);

      // Navigate to the document view page
      navigate(`/documents/${response.id}`);
    } catch (err) {
      setLoading(false);
      setError("Failed to upload document. Please try again.");
      console.error("Upload error:", err);
    }
  };

  return (
    <div className="card max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Upload Document</h2>
      <form onSubmit={handleSubmit}>
        <div
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-4 text-center"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {file ? (
            <div className="text-center">
              <p className="text-green-600 font-medium">File selected:</p>
              <p className="font-medium">{file.name}</p>
              <button
                type="button"
                className="mt-2 text-red-600 hover:text-red-800"
                onClick={() => setFile(null)}
              >
                Remove
              </button>
            </div>
          ) : (
            <div>
              <p className="text-gray-500 mb-2">
                Drag and drop your PDF here, or click to browse
              </p>
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="btn-primary cursor-pointer inline-block"
              >
                Browse Files
              </label>
            </div>
          )}
        </div>

        {error && <p className="text-red-600 mb-4">{error}</p>}

        <div className="flex justify-end">
          <button
            type="submit"
            className="btn-primary"
            disabled={!file || loading}
          >
            {loading ? "Uploading..." : "Upload PDF"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DocumentUpload;
