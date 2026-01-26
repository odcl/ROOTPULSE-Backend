from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.schemas.category import CategoryCreate, CategoryUpdate, CategoryOut
from app.crud.category import get_all_categories, get_category, create_category, update_category, delete_category
from app.database import get_db

router = APIRouter(prefix="/category", tags=["Category"])

@router.get("/", response_model=list[CategoryOut])
async def read_categories(db: AsyncSession = Depends(get_db)):
    return await get_all_categories(db)

@router.get("/{category_id}", response_model=CategoryOut)
async def read_category(category_id: int, db: AsyncSession = Depends(get_db)):
    category = await get_category(db, category_id)
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    return category

@router.post("/", response_model=CategoryOut)
async def create_new_category(category: CategoryCreate, db: AsyncSession = Depends(get_db)):
    return await create_category(db, category)

@router.put("/{category_id}", response_model=CategoryOut)
async def update_existing_category(category_id: int, category: CategoryUpdate, db: AsyncSession = Depends(get_db)):
    return await update_category(db, category_id, category)

@router.delete("/{category_id}", response_model=CategoryOut)
async def delete_existing_category(category_id: int, db: AsyncSession = Depends(get_db)):
    return await delete_category(db, category_id)
