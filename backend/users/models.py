from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    # Roles
    ADMIN = 'Admin'
    SELLER = 'Seller'
    CUSTOMER = 'User'
    
    ROLE_CHOICES = [
        (ADMIN, 'Admin'),
        (SELLER, 'Seller'),
        (CUSTOMER, 'User'),
    ]

    GENDER_CHOICES = [
        ('Male', 'Male'),
        ('Female', 'Female'),
        ('Other', 'Other'),
    ]

    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=15, null=True, blank=True)
    location = models.CharField(max_length=255, null=True, blank=True)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES, null=True, blank=True)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default=CUSTOMER)
    merchant_id = models.CharField(max_length=100, null=True, blank=True, unique=True)

    # Use email for authentication instead of username
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'first_name', 'last_name']

    def __str__(self):
        return self.email