from rest_framework import generics, status
from rest_framework.response import Response
from .models import SellerApplication
from .serializers import SellerApplicationSerializer

class SubmitApplicationView(generics.CreateAPIView):
    serializer_class = SellerApplicationSerializer

class ListApplicationView(generics.ListAPIView):
    queryset = SellerApplication.objects.all()
    serializer_class = SellerApplicationSerializer

class ApproveApplicationView(generics.UpdateAPIView):
    queryset = SellerApplication.objects.all()
    serializer_class = SellerApplicationSerializer

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.status = 'Approved'
        user = instance.user
        user.role = 'Seller'
        user.merchant_id = request.data.get('merchant_id')
        user.save()
        instance.save()
        return Response({'message': 'User approved as Seller'})

class DeclineApplicationView(generics.UpdateAPIView):
    queryset = SellerApplication.objects.all()
    serializer_class = SellerApplicationSerializer

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.status = 'Declined'
        instance.decline_reason = request.data.get('decline_reason')
        instance.save()
        return Response({'message': 'Application declined'})