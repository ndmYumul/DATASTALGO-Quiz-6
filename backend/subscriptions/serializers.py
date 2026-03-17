from rest_framework import serializers
from .models import UserSubscription

class SubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserSubscription
        fields = '__all__'