from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth import get_user_model
from .serializers import UserSerializer, RegisterSerializer, MyTokenObtainPairSerializer
from rest_framework.decorators import api_view, permission_classes

User = get_user_model()

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer

class UserProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

class AdminUserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser]

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def approveSeller(request, pk):
    try:
        user = User.objects.get(id=pk)
        data = request.data

        user.role = 'Seller'
        user.merchant_id = data.get('merchant_id')
        user.is_applying = False # Close the application
        user.save()

        return Response({'detail': 'User approved as Seller'})
    except User.DoesNotExist:
        return Response({'detail': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def applyAsSeller(request):
    user = request.user
    # You can also save the business name/desc to a separate 'Application' model
    user.is_applying = True 
    user.save()
    return Response({'detail': 'Application submitted successfully'})