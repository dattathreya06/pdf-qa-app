# PDF Question & Answer Application

A full-stack application that allows users to upload PDF documents and ask questions about their content. The application processes documents using natural language processing to provide accurate answers.

## Features

- Upload PDF documents
- Ask questions about the content of uploaded documents
- Get AI-powered answers based on document content
- View history of questions and answers for each document

## Technologies Used

### Backend

- FastAPI (Python web framework)
- SQLite (Database)
- LangChain (NLP processing)
- PyMuPDF (PDF processing)

### Frontend

- React.js
- Tailwind CSS
- Axios (API requests)
- React Router (Navigation)

## Setup Instructions

### Prerequisites

- Python 3.8 or higher
- Node.js 14 or higher
- npm or yarn

### Backend Setup

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd pdf-qa-app
   ```

2. Set up a Python virtual environment:

   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

4. Set up OpenAI API key:

   ```bash
   # Create a .env file in the backend directory
   echo "OPENAI_API_KEY=your_openai_api_key" > .env
   ```

5. Start the backend server:
   ```bash
   uvicorn main:app --reload
   ```
   The API will be available at http://localhost:8000

### Frontend Setup

1. Install dependencies:

   ```bash
   cd ../frontend
   npm install
   ```

2. Start the frontend development server:
   ```bash
   npm start
   ```
   The application will be available at http://localhost:3000

## API Documentation

The API documentation is available at http://localhost:8000/docs after starting the backend server.

### Main Endpoints

- `POST /api/documents/` - Upload a PDF document
- `GET /api/documents/` - Get a list of all uploaded documents
- `POST /api/questions/` - Ask a question about a document
- `GET /api/documents/{document_id}/questions/` - Get all questions for a specific document

## Application Structure

### Backend Structure

```
backend/
├── app/
│   ├── api/          # API endpoints
│   ├── db/           # Database models and connections
│   ├── services/     # Business logic
│   └── utils/        # Utility functions
├── pdf_storage/      # Local PDF storage
├── main.py           # Application entry point
└── requirements.txt  # Python dependencies
```

### Frontend Structure

```
frontend/
├── public/
├── src/
│   ├── components/   # React components
│   ├── pages/        # Application pages
│   ├── services/     # API service calls
│   └── utils/        # Utility functions
├── package.json
└── README.md
```

## License

[MIT License](LICENSE)
