from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from typing import List
import os

from ..db.database import get_db
from ..db.models import Document, Question
from ..services.pdf_service import PDFProcessor
from .schemas import DocumentCreate, Document as DocumentSchema, QuestionCreate, Question as QuestionSchema, QuestionResponse

router = APIRouter()
pdf_processor = PDFProcessor()

# Dictionary to store vector stores for each document
document_vector_stores = {}

@router.post("/documents/", response_model=DocumentSchema)
async def upload_document(file: UploadFile = File(...), db: Session = Depends(get_db)):
    """Upload a PDF document"""
    if not file.filename.lower().endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Only PDF files are allowed")
    
    file_content = await file.read()
    
    # Save file to disk
    filepath = pdf_processor.save_pdf(file_content, file.filename)
    
    db_document = Document(
        filename=file.filename,
        filepath=filepath
    )
    db.add(db_document)
    db.commit()
    db.refresh(db_document)

    try:
        # Process PDF and create vector store
        vector_store = pdf_processor.process_pdf(filepath)
        document_vector_stores[db_document.id] = vector_store
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to process PDF: {str(e)}")
    
    return db_document

@router.get("/documents/", response_model=List[DocumentSchema])
def get_documents(db: Session = Depends(get_db)):
    """Get all uploaded documents"""
    documents = db.query(Document).all()
    return documents

@router.post("/questions/", response_model=QuestionResponse)
def ask_question(question: QuestionCreate, db: Session = Depends(get_db)):
    """Ask a question about a document"""
    document = db.query(Document).filter(Document.id == question.document_id).first()
    if not document:
        raise HTTPException(status_code=404, detail="Document not found")
    
    if question.document_id not in document_vector_stores:
        # If not, recreate it
        vector_store = pdf_processor.process_pdf(document.filepath)
        document_vector_stores[question.document_id] = vector_store
    else:
        vector_store = document_vector_stores[question.document_id]

    answer = pdf_processor.answer_question(vector_store, question.question_text)

    db_question = Question(
        document_id=question.document_id,
        question_text=question.question_text,
        answer_text=answer
    )
    db.add(db_question)
    db.commit()
    db.refresh(db_question)
    
    return QuestionResponse(question_text=question.question_text, answer_text=answer)

@router.get("/documents/{document_id}/questions/", response_model=List[QuestionSchema])
def get_document_questions(document_id: int, db: Session = Depends(get_db)):
    """Get all questions for a specific document"""
    document = db.query(Document).filter(Document.id == document_id).first()
    if not document:
        raise HTTPException(status_code=404, detail="Document not found")
    
    questions = db.query(Question).filter(Question.document_id == document_id).all()
    return questions
