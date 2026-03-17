from rest_framework import generics
from .models import Order
from .serializers import OrderSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from services.models import Service
from rest_framework.response import Response
from datetime import datetime

class CreateOrderView(generics.CreateAPIView):
    serializer_class = OrderSerializer

class UserOrderHistoryView(generics.ListAPIView):
    serializer_class = OrderSerializer
    def get_queryset(self):
        return Order.objects.filter(buyer=self.request.user)
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrderItems(request):
    user = request.user
    data = request.data

    if not data.get('service'):
        return Response({'detail': 'No service selected'}, status=400)

    service = Service.objects.get(id=data['service'])

    # Create order in database
    order = Order.objects.create(
        user=user,
        service=service,
        total_price=data['total_price'],
        is_paid=False
    )

    serializer = OrderSerializer(order, many=False)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyOrders(request):
    user = request.user
    orders = user.order_set.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateOrderToPaid(request, pk):
    order = Order.objects.get(id=pk)

    order.isPaid = True
    order.paidAt = datetime.now()
    order.save()

    return Response('Order was paid')

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateOrderToPaid(request, pk):
    try:
        order = Order.objects.get(id=pk)
        
        # In a real app, you'd verify request.data['id'] with PayPal's API here
        order.is_paid = True
        order.paid_at = datetime.now()
        
        # We store the PayPal transaction ID for record-keeping
        order.payment_method = 'PayPal'
        if 'id' in request.data:
            order.paypal_transaction_id = request.data['id']
            
        order.save()
        
        return Response('Order was paid')
    except Order.DoesNotExist:
        return Response({'detail': 'Order does not exist'}, status=404)
    except Exception as e:
        return Response({'detail': str(e)}, status=500)

