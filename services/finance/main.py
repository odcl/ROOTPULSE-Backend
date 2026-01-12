from fastapi import FastAPI
app = FastAPI(title="RootPulse Finance Service")

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "finance-service"}

@app.get("/")
async def root():
    return {"message": "Welcome to Finance Service"}
