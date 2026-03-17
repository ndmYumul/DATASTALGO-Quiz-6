from django.urls import path
from .views import *

urlpatterns = [
    path('apply/', SubmitApplicationView.as_view()),
    path('list/', ListApplicationView.as_view()),
    path('<int:pk>/approve/', ApproveApplicationView.as_view()),
    path('<int:pk>/decline/', DeclineApplicationView.as_view()),
]