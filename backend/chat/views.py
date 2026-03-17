from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from subscriptions.models import UserSubscription

class AIChatbotView(APIView):
    def post(self, request):
        user = request.user
        try:
            sub = UserSubscription.objects.get(user=user, is_active=True)
            if sub.usage_left > 0:
                # Logic for AI response goes here
                sub.usage_left -= 1
                sub.save()
                return Response({"reply": "This is your AI response."}, status=status.HTTP_200_OK)
            return Response({"error": "No usage left."}, status=status.HTTP_403_FORBIDDEN)
        except UserSubscription.DoesNotExist:
            return Response({"error": "Subscription required."}, status=status.HTTP_402_PAYMENT_REQUIRED)