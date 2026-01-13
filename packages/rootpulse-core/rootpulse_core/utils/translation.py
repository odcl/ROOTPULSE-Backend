import os
from sqlalchemy import Column, String

class MultiLanguageMixin:
    """
    Mixin to help models handle multi-language fields dynamically.
    Assumes fields are named as {field_name}_{lang_code} (e.g. name_en, name_bn).
    """
    
    def get_localized_field(self, field_name):
        # In FastAPI/Microservices, preferred language usually comes from 
        # a header or user preference in the JWT.
        lang = os.getenv('DEFAULT_LANGUAGE', 'en')
        
        # Try current language
        attr = f"{field_name}_{lang}"
        if hasattr(self, attr) and getattr(self, attr):
            return getattr(self, attr)
        
        # Fallback to English
        attr_en = f"{field_name}_en"
        return getattr(self, attr_en, getattr(self, field_name, ""))

def get_translatable_columns(field_name):
    """
    Helper to generate SQLAlchemy columns for standard languages.
    """
    return {
        f"{field_name}_en": Column(String(255), nullable=True),
        f"{field_name}_bn": Column(String(255), nullable=True),
        f"{field_name}_ar": Column(String(255), nullable=True), # RTL
    }
