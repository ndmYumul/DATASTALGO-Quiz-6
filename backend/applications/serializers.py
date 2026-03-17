from rest_framework import serializers
from .models import SellerApplication

class SellerApplicationSerializer(serializers.ModelSerializer):
    user_email = serializers.ReadOnlyField(source='user.email')

    class Meta:
        model = SellerApplication
        fields = ['id', 'user', 'user_email', 'status', 'decline_reason', 'created_at']