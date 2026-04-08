from django.db import models

class Student(models.Model):
    name = models.CharField(max_length=100)
    roll_number = models.CharField(max_length=50, unique=True)
    department = models.CharField(max_length=100)
    semester = models.IntegerField()
    gmail = models.EmailField(unique=True)

    def __str__(self):
        return f"{self.name} - {self.roll_number}"
