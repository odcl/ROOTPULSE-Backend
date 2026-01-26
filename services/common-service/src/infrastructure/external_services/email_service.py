from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.category import Category
from app.schemas.category import CategoryCreate, CategoryUpdate

async def get_all_categories(db: AsyncSession):
    result = await db.execute(select(Category))
    return result.scalars().all()

async def get_category(db: AsyncSession, category_id: int):
    result = await db.get(Category, category_id)
    return result

async def create_category(db: AsyncSession, category: CategoryCreate):
    db_category = Category(**category.model_dump())
    db.add(db_category)
    await db.commit()
    await db.refresh(db_category)
    return db_category

async def update_category(db: AsyncSession, category_id: int, category: CategoryUpdate):
    db_category = await db.get(Category, category_id)
    if db_category:
        for key, value in category.model_dump().items():
            setattr(db_category, key, value)
        await db.commit()
        await db.refresh(db_category)
    return db_category

async def delete_category(db: AsyncSession, category_id: int):
    db_category = await db.get(Category, category_id)
    if db_category:
        await db.delete(db_category)
        await db.commit()
    return db_category
