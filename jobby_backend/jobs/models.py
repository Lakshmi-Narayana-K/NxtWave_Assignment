from django.db import models

class Skill(models.Model):
    name = models.CharField(max_length=255)
    image_url = models.URLField()

    def __str__(self):
        return self.name

class LifeAtCompany(models.Model):
    description = models.TextField()
    image_url = models.URLField()

    def __str__(self):
        return f"Life at Company for {self.job.title}"

class Job(models.Model):
    id = models.CharField(max_length=255, primary_key=True)
    title = models.CharField(max_length=255)
    job_description = models.TextField()
    company_logo_url = models.URLField()
    employment_type = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    package_per_annum = models.IntegerField()
    rating = models.IntegerField()
    company_website_url = models.URLField(blank=True, null=True)

    life_at_company = models.ForeignKey(
        LifeAtCompany, 
        on_delete=models.CASCADE, 
        blank=True, 
        null=True
    )
    skills = models.ManyToManyField(Skill)

    similar_jobs = models.ManyToManyField(
        'self', 
        blank=True 
    )

    def __str__(self):
        return self.title
