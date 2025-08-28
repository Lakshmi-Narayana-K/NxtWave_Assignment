import os
import django
import uuid
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'jobby_backend.settings') 
django.setup()

import random
from faker import Faker
from django.db import IntegrityError
from jobs.models import Skill, LifeAtCompany, Job

fake = Faker()

def generate_sample_data(num_records=50):
    try:
        Job.objects.all().delete()
        Skill.objects.all().delete()
        LifeAtCompany.objects.all().delete()
        
        skill_names = [
            'Python', 'JavaScript', 'React', 'Django', 'Flask', 'SQL', 
            'PostgreSQL', 'AWS', 'Docker', 'Kubernetes', 'REST API', 
            'HTML', 'CSS', 'Node.js', 'MongoDB', 'C++', 'Java'
        ]
        skills = []
        for name in skill_names:
            skill = Skill.objects.create(
                name=name,
                image_url=fake.image_url()
            )
            skills.append(skill)
        
        life_at_companies = []
        for _ in range(num_records):
            life_at_company = LifeAtCompany.objects.create(
                description=fake.paragraph(nb_sentences=5),
                image_url=fake.image_url()
            )
            life_at_companies.append(life_at_company)

        jobs = []
        employment_types = ['FullTime', 'PartTime', 'Contract', 'Freelance']
        job_titles = [
            'Software Engineer', 'Data Scientist', 'DevOps Engineer', 
            'Product Manager', 'UX Designer', 'Frontend Developer', 
            'Backend Developer', 'Full Stack Developer'
        ]

        for i in range(num_records):
            job_id = str(uuid.uuid4())
            
            job = Job.objects.create(
                id=job_id,
                title=random.choice(job_titles),
                job_description=fake.text(max_nb_chars=500),
                company_logo_url=fake.image_url(),
                employment_type=random.choice(employment_types),
                location=fake.city(),
                package_per_annum=random.randint(500000, 2500000),
                rating=random.randint(1, 5),
                company_website_url=fake.url(),
                life_at_company=random.choice(life_at_companies)
            )
            jobs.append(job)

            random_skills = random.sample(skills, k=random.randint(1, 5))
            job.skills.set(random_skills)
  
        for job in jobs:
            other_jobs = [j for j in jobs if j.id != job.id]
            if len(other_jobs) > 0:
                similar_jobs_to_add = random.sample(other_jobs, k=min(3, len(other_jobs)))
                job.similar_jobs.set(similar_jobs_to_add)

        print(f"Successfully generated {num_records} sample job records.")
        print(f"Generated {len(skills)} skills.")
        print(f"Generated {len(life_at_companies)} 'life at company' records.")

    except IntegrityError as e:
        print(f"Error generating data due to integrity constraint: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")

if __name__ == '__main__':
    generate_sample_data(50)