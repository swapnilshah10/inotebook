from rest_framework import serializers
from .models import *

class NotesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notes
        fields = '__all__'
    def create(self,validated_data):
            validated_data['is_active'] = True
            return Notes.create_note(**validated_data)
