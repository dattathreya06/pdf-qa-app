from sqlalchemy import Column, Integer, String, DateTime, Text, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.sql import func
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
import os
from datetime import datetime

# Create base class for SQLAlchemy models
Base = declarative_base()

class Document(Base):
    __tablename__ = "documents"
    
    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String, index=True)
    filepath = Column(String)
    upload_date = Column(DateTime, default=datetime.utcnow)
    
class Question(Base):
    __tablename__ = "questions"
    
    id = Column(Integer, primary_key=True, index=True)
    document_id = Column(Integer, index=True)
    question_text = Column(Text)
    answer_text = Column(Text)
    asked_at = Column(DateTime, default=datetime.utcnow)

# Create the database
engine = create_engine("sqlite:///./pdf_qa.db")
Base.metadata.create_all(bind=engine)