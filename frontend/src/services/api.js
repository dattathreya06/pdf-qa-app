import axios from "axios";

const API_URL = "http://localhost:8000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const uploadDocument = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post(`${API_URL}/documents/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getDocuments = async () => {
  try {
    const response = await api.get("/documents/");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const askQuestion = async (documentId, questionText) => {
  try {
    const response = await api.post("/questions/", {
      document_id: documentId,
      question_text: questionText,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getDocumentQuestions = async (documentId) => {
  try {
    const response = await api.get(`/documents/${documentId}/questions/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default {
  uploadDocument,
  getDocuments,
  askQuestion,
  getDocumentQuestions,
};
