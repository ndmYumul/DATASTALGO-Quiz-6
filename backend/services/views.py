from rest_framework import generics
from .models import Service
from .serializers import ServiceSerializer

class ServiceListView(generics.ListAPIView):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer

class ServiceDetailView(generics.RetrieveAPIView):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer

class SellerServiceManageView(generics.ListCreateAPIView):
    serializer_class = ServiceSerializer
    def get_queryset(self):
        return Service.objects.filter(seller=self.request.user)

class SellerServiceDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ServiceSerializer
    def get_queryset(self):
        return Service.objects.filter(seller=self.request.user)