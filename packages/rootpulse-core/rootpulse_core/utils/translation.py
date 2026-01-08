from django.utils.translation import get_language
from django.db import models

class MultiLanguageMixin:
    """
    Mixin to help models handle multi-language fields dynamically.
    Assumes fields are named as {field_name}_{lang_code} (e.g. name_en, name_bn).
    """
    
    def get_localized_field(self, field_name):
        lang = get_language() or 'en'
        # Try current language
        attr = f"{field_name}_{lang}"
        if hasattr(self, attr) and getattr(self, attr):
            return getattr(self, attr)
        
        # Fallback to English
        attr_en = f"{field_name}_en"
        return getattr(self, attr_en, getattr(self, field_name, ""))

def get_translatable_fields(field_name):
    """
    Helper to generate fields for standard languages.
    """
    return {
        f"{field_name}_en": models.CharField(max_length=255, null=True, blank=True),
        f"{field_name}_bn": models.CharField(max_length=255, null=True, blank=True),
        f"{field_name}_ar": models.CharField(max_length=255, null=True, blank=True), # RTL
    }
