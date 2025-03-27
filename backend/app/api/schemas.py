from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List

class DocumentBase(BaseModel):
    filename: str

class DocumentCreate(DocumentBase):
    pass

class Document(DocumentBase):
    id: int
    filepath: str
    upload_date: datetime
    
    class Config:
        orm_mode = True

class QuestionBase(BaseModel):
    question_text: str
    document_id: int

class QuestionCreate(QuestionBase):
    pass

class QuestionResponse(BaseModel):
    question_text: str
    answer_text: str
    
class Question(QuestionBase):
    id: int
    answer_text: Optional[str] = None
    asked_at: datetime
    
    class Config:
        orm_mode = True