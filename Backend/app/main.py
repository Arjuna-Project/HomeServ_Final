from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.database import Base, engine
from app.routers import professional_auth
from app.routers import professional_dashboard
from app.routers import professional_jobs

from app.routers import (
    auth,
    user,
    area,
    service,
    professionals,
    packages,
    bookings,
    contact
)

Base.metadata.create_all(bind=engine)

app = FastAPI(title="HomeServ API", version="1.0.0")

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(user.router)
app.include_router(area.router)
app.include_router(service.router)
app.include_router(professionals.router)
app.include_router(packages.router)
app.include_router(bookings.router)
app.include_router(contact.router)
app.include_router(professional_auth.router)
app.include_router(professional_dashboard.router)
app.include_router(professional_jobs.router)



@app.get("/")
def root():
    return {"message": "HomeServ Backend Running 🚀"}
