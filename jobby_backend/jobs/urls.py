from django.urls import path
from . import views

urlpatterns = [
  path('jobs/', views.get_all_jobs, name='get_all_jobs'),
  path('jobs/<str:job_id>/', views.get_job_details, name='get_job_details'),
]
