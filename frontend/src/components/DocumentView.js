import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  askQuestion,
  getDocumentQuestions,
  getDocuments,
} from "../services/api";

const DocumentView = () => {
  const { id } = useParams();
  const [document, setDocument] = useState(null);
  const [question, setQuestion] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDocument();
    fetchQuestions();
  }, [id]);

  const fetchDocument = async () => {
    try {
      const documents = await getDocuments();
      const doc = documents.find((d) => d.id === parseInt(id));
      if (doc) {
        setDocument(doc);
      } else {
        setError("Document not found");
      }
    } catch (err) {
      setError("Failed to load document information");
      console.error("Error fetching document:", err);
    }
  };

  const fetchQuestions = async () => {
    try {
      const data = await getDocumentQuestions(id);
      setQuestions(data);
    } catch (err) {
      console.error("Error fetching questions:", err);
    }
  };

  const handleQuestionSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    setLoading(true);
    setCurrentAnswer("");
    setError("");

    try {
      const response = await askQuestion(parseInt(id), question);
      setCurrentAnswer(response.answer_text);
      setLoading(false);

      // Refresh questions list
      fetchQuestions();
    } catch (err) {
      setError("Failed to process your question. Please try again.");
      setLoading(false);
      console.error("Error asking question:", err);
    }
  };

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600 mb-4">{error}</p>
        <Link to="/" className="btn-primary">
          Back to Home
        </Link>
      </div>
    );
  }

  if (!document) {
    return <div className="text-center py-4">Loading document...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center mb-6">
        <svg
          className="h-10 w-10 text-primary mr-3"
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
        <div>
          <h1 className="text-2xl font-bold">{document.filename}</h1>
          <p className="text-gray-500">
            Uploaded on {new Date(document.upload_date).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="card mb-6">
        <h2 className="text-xl font-semibold mb-4">Ask a Question</h2>
        <form onSubmit={handleQuestionSubmit}>
          <div className="mb-4">
            <textarea
              className="input-field min-h-[100px]"
              placeholder="Type your question about this document..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="btn-primary"
              disabled={loading || !question.trim()}
            >
              {loading ? "Processing..." : "Submit Question"}
            </button>
          </div>
        </form>
      </div>

      {currentAnswer && (
        <div className="card mb-6 bg-blue-50">
          <h3 className="text-lg font-semibold mb-2">Answer</h3>
          <div className="bg-white p-4 rounded-md border border-blue-200">
            <p className="whitespace-pre-line">{currentAnswer}</p>
          </div>
        </div>
      )}

      {questions.length > 0 && (
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Previous Questions</h2>
          <div className="space-y-4">
            {questions.map((q) => (
              <div key={q.id} className="border-b pb-4 last:border-0">
                <h3 className="font-medium text-primary">
                  Q: {q.question_text}
                </h3>
                <p className="mt-2 text-gray-700">A: {q.answer_text}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Asked on {new Date(q.asked_at).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentView;
