from rest_framework.response import Response
from .models import *
from .serializers import *
from rest_framework.permissions import AllowAny
from rest_framework import generics
from django.contrib.auth import authenticate
from django.views.decorators.csrf import csrf_exempt
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.status import (
    HTTP_404_NOT_FOUND,
    HTTP_400_BAD_REQUEST,
    HTTP_200_OK
)
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.views import APIView
# from django.contrib.auth.models import User
# from rest_framework.authentication import TokenAuthentication

@csrf_exempt
@api_view(["POST"])
@permission_classes((AllowAny,))
def login(request):
    username = request.data.get("username")
    password = request.data.get("password")
    if username is None or password is None:
        return Response({'error': 'Please provide both username and password'},
                        status=HTTP_400_BAD_REQUEST)
    user = authenticate(username=username, password=password)
    if not user:
        return Response({'error': 'Invalid Credentials'},
                        status=HTTP_404_NOT_FOUND)
    token, _ = Token.objects.get_or_create(user=user)
    return Response({'token': token.key},
                    status=HTTP_200_OK)

@csrf_exempt
@api_view(["GET"])
def user_detail_api(request):
  serializer = UserSerializer(request.user)
  return Response(serializer.data , status=HTTP_200_OK)

class RegisterUserAPIView(generics.CreateAPIView):
  permission_classes = (AllowAny,)
  serializer_class = RegisterSerializer