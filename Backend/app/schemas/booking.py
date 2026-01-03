from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class BookingBase(BaseModel):
    user_id: int
    area_id: int
    service_id: Optional[int] = None
    professional_id: Optional[int] = None
    scheduled_at: datetime
    status: str
    total_price: float
    details: str

class BookingCreate(BaseModel):
    user_id: int
    area_id: int
    package_id: int | None = None
    service_id: int | None = None
    professional_id: int | None = None
    scheduled_at: datetime
    total_price: float
    details: str


class BookingUpdate(BaseModel):
    scheduled_at: Optional[datetime] = None
    status: Optional[str] = None
    total_price: Optional[float] = None
    details: Optional[str] = None


class BookingOut(BookingBase):
    booking_id: int
    created_at: datetime

    class Config:
        from_attributes = True

class BookingOut(BaseModel):
    booking_id: int
    status: str
    scheduled_at: datetime
    total_price: float
    details: str

    class Config:
        from_attributes = True

class ProfessionalJobOut(BaseModel):
    booking_id: int
    status: str
    total_price: float | None
    scheduled_at: datetime
    service_name: str
    customer_name: str | int   # username OR user_id

    class Config:
        from_attributes = True