from fastapi import FastAPI
from pydantic import BaseModel
from pypdf import PdfReader
import requests

app = FastAPI()

OLLAMA_URL = "http://localhost:11434/api/generate"

class ChatRequest(BaseModel):
    message: str
    subject: str

class FileRequest(BaseModel):
    file_path: str

def ask_llm(prompt):

    response = requests.post(
        OLLAMA_URL,
        json={
            "model": "mistral",
            "prompt": prompt,
            "stream": False
        }
    )

    return response.json()["response"]

def extract_text(pdf):

    reader = PdfReader(pdf)
    text = ""

    for page in reader.pages:
        text += page.extract_text()

    return text


@app.post("/chat")
def chat(req: ChatRequest):

    prompt = f"""
You are an engineering tutor helping a student study {req.subject}.

Question:
{req.message}
"""

    answer = ask_llm(prompt)

    return {"reply": answer}


@app.post("/summarize")
def summarize(req: FileRequest):

    text = extract_text(req.file_path)

    prompt = f"""
Summarize these engineering notes into bullet points:

{text[:5000]}
"""

    summary = ask_llm(prompt)

    return {"summary": summary}


@app.post("/flashcards")
def flashcards(req: FileRequest):

    text = extract_text(req.file_path)

    prompt = f"""
Create exam flashcards.

Format:
Q: question
A: answer

{text[:5000]}
"""

    cards = ask_llm(prompt)

    return {"flashcards": cards}