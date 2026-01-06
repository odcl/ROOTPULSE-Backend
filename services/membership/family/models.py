from django.db import models
from rootpulse_core.models.base import BaseRootPulseModel
from members.models import Member

class FamilyMember(BaseRootPulseModel):
    """
    Links secondary users/profiles to a primary member.
    """
    primary_member = models.ForeignKey(Member, on_delete=models.CASCADE, related_name='family_members')
    user_uuid = models.UUIDField(help_text="Global User UUID of the family member")
    relationship = models.CharField(max_length=50, choices=[
        ('spouse', 'Spouse'),
        ('child', 'Child'),
        ('parent', 'Parent'),
        ('sibling', 'Sibling'),
        ('other', 'Other'),
    ])
    is_active = models.BooleanField(default=True)
    
    class Meta:
        db_table = 'family_members'
        unique_together = ('primary_member', 'user_uuid')

    def __str__(self):
        return f"{self.primary_member.membership_id} - {self.relationship}"
