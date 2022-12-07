import uvicorn
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from starlette.exceptions import HTTPException as StarletteHTTPException

from routers import pastes


app = FastAPI()
app.include_router(pastes.router)


@app.exception_handler(StarletteHTTPException)
def http_exception_handler(request, exc):
    return JSONResponse(
        exc.detail,
        status_code=exc.status_code
    )


if __name__ == '__main__':
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000
    )
