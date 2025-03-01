from django.db import models

class Transcript(models.Model):
    original_text = models.TextField()
    translated_text = models.TextField()
    original_language = models.CharField(max_length=10)
    target_language = models.CharField(max_length=10)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.original_language} to {self.target_language} - {self.created_at}"