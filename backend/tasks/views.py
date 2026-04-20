from django.shortcuts import render

# Create your views here.
# Backend/tasks/views.py
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.utils import timezone
from .models import Task
from .serializers import TaskSerializer
from rest_framework.pagination import PageNumberPagination


class TaskPagination(PageNumberPagination):
    page_size = 5 # Default number of tasks per page
    page_size_query_param = 'page_size' # Allows frontend to request ?page_size=10
    max_page_size = 100


class TaskViewSet(viewsets.ModelViewSet):
    """
    Automatically handles:
    - GET /api/tasks/ (List)
    - POST /api/tasks/ (Create)
    - GET /api/tasks/{id}/ (Retrieve)
    - PUT/PATCH /api/tasks/{id}/ (Update)
    - DELETE /api/tasks/{id}/ (Destroy)
    """
    serializer_class = TaskSerializer
    pagination_class = TaskPagination

    def get_queryset(self):
        """
        Handles the required API query parameters: status filter, priority filter, 
        and sorting by due_date or priority.
        """
        queryset = Task.objects.all()
        
        # 1. Filtering
        status_param = self.request.query_params.get('status', None)
        priority_param = self.request.query_params.get('priority', None)
        
        if status_param:
            queryset = queryset.filter(status=status_param)
        if priority_param:
            queryset = queryset.filter(priority=priority_param)
            
        # 2. Sorting
        sort_by = self.request.query_params.get('sort_by', None)
        valid_sort_fields = ['due_date', '-due_date', 'priority', '-priority', 'created_at', '-created_at']
        
        if sort_by in valid_sort_fields:
            queryset = queryset.order_by(sort_by)
        else:
            # Default sort: newest tasks first
            queryset = queryset.order_by('-created_at') 
            
        return queryset


@api_view(['GET'])
def dashboard_stats(request):
    """
    GET /api/dashboard-stats/
    Returns total, completed, pending, and overdue counts.
    """
    total_tasks = Task.objects.count()
    completed_tasks = Task.objects.filter(status='completed').count()
    pending_tasks = Task.objects.filter(status='pending').count()
    
    # Overdue logic: status is pending AND due_date is earlier than right now
    now = timezone.now()
    overdue_tasks = Task.objects.filter(status='pending', due_date__lt=now).count()
    
    return Response({
        'total': total_tasks,
        'completed': completed_tasks,
        'pending': pending_tasks,
        'overdue': overdue_tasks
    })