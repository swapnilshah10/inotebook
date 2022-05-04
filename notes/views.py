from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import *
from .serializers import *
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from rest_framework.status import (
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
    HTTP_200_OK
)
from rest_framework import status

@csrf_exempt
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_notess(request):
     if request.method == 'GET':
        try:
            notes = Notes.get_all_objects(owner=request.user.id)
            serializer = NotesSerializer(notes, many=True)
            return Response(serializer.data)   
        except Notes.DoesNotExist : return Response(status = status.HTTP_400_BAD_REQUEST) 
    
@csrf_exempt
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def post_notes(request):
        if request.method == 'POST':
            user = request.user
            data = request.data 
            data['owner'] = user.id
            serializer = NotesSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_notes(request,id):
      if request.method == 'PUT':
            data = request.data 
            data['id'] = int(id)
            data['owner'] = request.user.id
            notes = Notes.objects.get(pk=data['id'])
            serializer = NotesSerializer(instance=notes,data=data)
            if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data, status=status.HTTP_201_CREATED)
      return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def delete_notes(request,id):
      if request.method == 'POST':
            try:
                Notes.objects.get(id=id).delete()
                return Response(status=status.HTTP_200_OK)
            except Notes.DoesNotExist:
              return Response(status=status.HTTP_400_BAD_REQUEST)
