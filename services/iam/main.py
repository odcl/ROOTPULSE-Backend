from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
import os
from dotenv import load_dotenv

from .api.v1.api import api_router

load_dotenv()

app = FastAPI(
    title="RootPulse IAM Service",
    description="""
    ## Identity and Access Management (IAM)
    World-class security and identity service for the RootPulse ecosystem.
    
    * **Auth**: Registration & Verification
    * **RBAC**: Multi-role permission system
    """,
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    root_path=os.getenv("ROOT_PATH", "")
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Lifecycle Events ---
@app.on_event("startup")
async def on_startup():
    from .database import init_db
    print("Initializing database tables...")
    await init_db()
    print("Database tables initialized.")

# --- Exception Handlers ---
@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "status": "error",
            "message": exc.detail,
            "code": "HTTP_ERROR"
        },
    )

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request, exc):
    error_details = []
    for error in exc.errors():
        safe_error = {k: v for k, v in error.items() if k not in ['ctx']}
        if 'ctx' in error:
             safe_error['ctx'] = {k: str(v) for k, v in error['ctx'].items()}
        error_details.append(safe_error)
        
    return JSONResponse(
        status_code=422,
        content={
            "status": "error",
            "message": "Validation Error",
            "code": "VALIDATION_ERROR",
            "errors": error_details
        },
    )

@app.exception_handler(Exception)
async def global_exception_handler(request, exc):
    print(f"CRITICAL ERROR: {str(exc)}")
    return JSONResponse(
        status_code=500,
        content={
            "status": "error",
            "message": "Internal Server Error",
            "code": "INTERNAL_SERVER_ERROR"
        },
    )

# --- Include Modular Router ---
app.include_router(api_router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
