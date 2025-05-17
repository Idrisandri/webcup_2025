from django.urls import path
from .views import SignupStep1View, SignupStep2View, LoginView
from .views import logout_view

urlpatterns = [
    path('signup-step1/', SignupStep1View.as_view(), name='signup-step1'),
    path('signup-step2/', SignupStep2View.as_view(), name='signup-step2'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', logout_view, name='logout'),
]