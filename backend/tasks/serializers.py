from rest_framework import serializers
from .models import Task

class TaskSerializer(serializers.ModelSerializer):
   
    is_overdue = serializers.ReadOnlyField()

    class Meta:
        model = Task
        fields = [
            'id', 
            'title', 
            'description', 
            'priority', 
            'status', 
            'due_date', 
            'created_at', 
            'is_overdue'
        ]