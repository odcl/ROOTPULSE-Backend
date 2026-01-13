import os
from fastapi import FastAPI
app = FastAPI(
    title="RootPulse Chat Service",
    root_path=os.getenv("ROOT_PATH", "")
)

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "chat-service"}

@app.get("/")
async def root():
    return {"message": "Welcome to Chat Service"}
