from django.urls import path
from .views import *

urlpatterns = [
    path('create/', CreateOrderView.as_view()),
    path('history/', UserOrderHistoryView.as_view()),

    path('orders/add/', addOrderItems, name='orders-add'),
    path('orders/myorders/', getMyOrders, name='myorders'),
    path('orders/<str:pk>/pay/', updateOrderToPaid, name='pay'),
]