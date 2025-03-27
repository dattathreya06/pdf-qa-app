import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getDocuments } from "../services/api";

const DocumentList = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const data = await getDocuments();
      setDocuments(data);
      setLoading(false);
    } catch (err) {
      setError("Failed to load documents. Please try again later.");
      setLoading(false);
      console.error("Error fetching documents:", err);
    }
  };

  if (loading) {
    return <div className="text-center py-4">Loading documents...</div>;
  }

  if (error) {
    return <div className="text-red-600 text-center py-4">{error}</div>;
  }

  if (documents.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600 mb-4">
          No documents have been uploaded yet.
        </p>
        <Link to="/upload" className="btn-primary">
          Upload Your First Document
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Your Documents</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {documents.map((doc) => (
          <div key={doc.id} className="card">
            <div className="flex items-center mb-2">
              <svg
                className="h-8 w-8 text-primary mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <h3
                className="font-semibold text-lg truncate"
                title={doc.filename}
              >
                {doc.filename}
              </h3>
            </div>
            <p className="text-gray-500 text-sm mb-3">
              Uploaded on {new Date(doc.upload_date).toLocaleDateString()}
            </p>
            <Link
              to={`/documents/${doc.id}`}
              className="text-primary hover:text-primary-dark font-medium"
            >
              Ask Questions
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentList;
