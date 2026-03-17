from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from .models import UserSubscription
from .serializers import SubscriptionSerializer

@api_view(['GET'])
@permission_classes([IsAdminUser]) # Strictly for Admins
def getSubscriptions(request):
    subscriptions = UserSubscription.objects.all().order_by('-created_at')
    serializer = SubscriptionSerializer(subscriptions, many=True)
    return Response(serializer.data)