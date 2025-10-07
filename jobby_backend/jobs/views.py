from django.shortcuts import render
from .models import Job
from django.core.paginator import Paginator
from django.http import JsonResponse
from django.db.models import Q
from rest_framework.decorators import api_view

@api_view(['GET'])
def get_all_jobs(request):
    
    request_method = request.method
    if request_method != 'GET':
        return JsonResponse({
            'error': 'Method not allowed'
        }, status=405)
    
    page_number = request.GET.get('page_number', 1)
    items_per_page = request.GET.get('items_per_page', 10)
    search_query = request.GET.get('search', '')
    minimum_package = request.GET.get('minimum_package', 0)
    
    employment_type_str = request.GET.get('employment_type', '')
    
    if employment_type_str:
        employment_type = [item.strip() for item in employment_type_str.split(',')]
    else:
        employment_type = []

    page_number = int(page_number)
    items_per_page = int(items_per_page)
    minimum_package = 0 if minimum_package == '' else int(minimum_package)

    all_jobs = Job.objects.all().distinct()

    if search_query:
        all_jobs = all_jobs.filter(Q(title__icontains=search_query) | Q(skills__name__icontains=search_query)).distinct()
    
    if minimum_package:
        all_jobs = all_jobs.filter(package_per_annum__gte=minimum_package)

    if employment_type:
        query = Q()
        for type in employment_type:
            query |= Q(employment_type__icontains=type)
        all_jobs = all_jobs.filter(query)

    all_jobs = all_jobs.order_by('-id').distinct()

    paginator = Paginator(all_jobs, items_per_page)
    
    try:
        paginated_jobs = paginator.page(page_number)
    except Exception:
        return JsonResponse({
            'jobs': [],
            'total': 0
        }, status=500)
    
    jobs_data = []
    for job in paginated_jobs:
        
        package_in_terms_of_lakhs = int(job.package_per_annum / 100000)
        package_in_terms_of_lakhs = str(package_in_terms_of_lakhs) + " LPA"

        jobs_data.append({
            'id': job.id,
            'title': job.title,
            'company_logo_url': job.company_logo_url,
            'location': job.location,
            'employment_type': job.employment_type,
            'package_per_annum': package_in_terms_of_lakhs,
            'rating': job.rating,
            'company_website_url': job.company_website_url,
            'job_description': job.job_description,
        })

    response_data = {
        'jobs': jobs_data,
        'total': paginator.count,
        'page_number': page_number,
        'items_per_page': items_per_page
    }

    return JsonResponse(response_data, status=200)


@api_view(['GET'])
def get_job_details(request, job_id):
    request_method = request.method
    if request_method != 'GET':
        return JsonResponse({
            'error': 'Method not allowed'
        }, status=405)
    
    try:
        job = Job.objects.get(id=job_id)
    except Job.DoesNotExist:
        return JsonResponse({
            'error': 'Job not found'
        }, status=404)
    
    skills = job.skills.all()
    skills_list = []
    for skill in skills:
        skills_list.append({
            'name': skill.name,
            'image_url': skill.image_url
        })

    similar_jobs = job.similar_jobs.all().values('id','job_description', 'company_logo_url', 'employment_type', 'location', 'rating', 'title')
    similar_jobs_data = list(similar_jobs)

    life_at_company = job.life_at_company
    life_at_company_data = {
        'description': life_at_company.description,
        'image_url': life_at_company.image_url
    }

    package_in_terms_of_lakhs = int(job.package_per_annum / 100000)
    package_in_terms_of_lakhs = str(package_in_terms_of_lakhs) + " LPA"

    response_data = {
        'job_details': {
            'id': job.id,
            'title': job.title,
            'company_logo_url': job.company_logo_url,
            'company_website_url': job.company_website_url,
            'location': job.location,
            'employment_type': job.employment_type,
            'package_per_annum': package_in_terms_of_lakhs,
            'rating': job.rating,
            'job_description': job.job_description,
            'skills': skills_list,
            'life_at_company': life_at_company_data
        },
        'similar_jobs': similar_jobs_data,
    }

    return JsonResponse(response_data, status=200)