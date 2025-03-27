import React from "react";
import { Link } from "react-router-dom";
import DocumentList from "../components/DocumentList";

const Home = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          PDF Question & Answer
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Upload your PDF documents and ask questions to get intelligent answers
          based on the content.
        </p>
        <div className="mt-6">
          <Link to="/upload" className="btn-primary">
            Upload New Document
          </Link>
        </div>
      </div>

      <DocumentList />
    </div>
  );
};

export default Home;
