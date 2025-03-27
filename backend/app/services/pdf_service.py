import os
import fitz  # PyMuPDF
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import FAISS
from langchain.chains.question_answering import load_qa_chain
from langchain.llms import OpenAI
import os

# Set a default OpenAI API key for development - replace in production!
os.environ["OPENAI_API_KEY"] = "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" 

class PDFProcessor:
    def __init__(self, upload_dir="pdf_storage"):
        self.upload_dir = upload_dir
        self.ensure_upload_dir()
        self.text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=1000,
            chunk_overlap=200
        )
        
    def ensure_upload_dir(self):
        """Ensure the upload directory exists"""
        if not os.path.exists(self.upload_dir):
            os.makedirs(self.upload_dir)
            
    def save_pdf(self, file, filename):
        """Save an uploaded PDF file to the storage directory"""
        filepath = os.path.join(self.upload_dir, filename)
        
        # Write the file
        with open(filepath, "wb") as f:
            f.write(file)
            
        return filepath
    
    def extract_text(self, filepath):
        """Extract text content from a PDF file"""
        text = ""
        
        # Open the PDF file
        pdf_document = fitz.open(filepath)
        
        # Extract text from each page
        for page_num in range(len(pdf_document)):
            page = pdf_document.load_page(page_num)
            text += page.get_text()
            
        return text
    
    def process_pdf(self, filepath):
        """Process a PDF file and create a vector store for QA"""
        # Extract text from PDF
        text = self.extract_text(filepath)
        
        # Split text into chunks
        texts = self.text_splitter.split_text(text)
        
        # Create embeddings and vector store
        embeddings = OpenAIEmbeddings()
        vector_store = FAISS.from_texts(texts, embeddings)
        
        return vector_store
    
    def answer_question(self, vector_store, question):
        """Generate an answer to a question based on the PDF content"""
        # Create a QA chain
        llm = OpenAI()
        qa_chain = load_qa_chain(llm, chain_type="stuff")
        
        # Get relevant documents
        docs = vector_store.similarity_search(question, k=4)
        
        # Generate answer
        answer = qa_chain.run(input_documents=docs, question=question)
        
        return answer