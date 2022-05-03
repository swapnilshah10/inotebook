from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import *
from .serializers import *

from django.views.decorators.csrf import csrf_exempt
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.status import (
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
    HTTP_200_OK
)
from rest_framework import status

@csrf_exempt
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def get_notess(request):
     if request.method == 'GET':
        notes = Notes.get_all_objects(owner=request.user.id)
        serializer = NotesSerializer(notes, many=True)
        # print(notes)
        return Response(serializer.data)    
    
def post_notes(request):
        if request.method == 'POST':
            user = request.user
            data = request.data 
            data['owner'] = user.id
                # print(data)
            serializer = NotesSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)