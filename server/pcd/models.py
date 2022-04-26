from asyncio.windows_events import NULL
from email.policy import default
from pickle import TRUE
from pyexpat import model
from statistics import mode
from django.db import models
from datetime import date

# Create your models here.

class Admin(models.Model):
    admin_mail = models.CharField(max_length=500,unique=True)
    admin_password = models.CharField(max_length=500)
    
class User(models.Model):
    user_id=models.BigAutoField(primary_key=True)
    user_mail = models.EmailField(max_length=254,unique=True)
    user_password = models.CharField(max_length=500)
    user_name = models.CharField(max_length=50)
    user_Lastname=models.CharField(max_length=50)
    user_date_birth=models.DateField()
    user_dateOfJoin=models.DateField()
    user_avatar=models.TextField(max_length=10000,default='')
    user_type=models.CharField(max_length=40,blank=True)
    user_objectifs=models.CharField(max_length=500,blank=True)
    admin=models.BooleanField(default=False) 

class Notes (models.Model):
    note_id=models.BigAutoField(primary_key=True)
    note_content=models.TextField(max_length=500)
    note_date=models.DateField(auto_now=True)
    user=models.ForeignKey(User,on_delete=models.CASCADE)

class Publication(models.Model):
    MEDIA_CHOICES = ["vedio", "image","text"]
    pub_id=models.BigAutoField(primary_key=True)
    pub_type=models.CharField(max_length=6,default="text")
    pub_date=models.DateField(auto_now=True)
    pub_title=models.CharField(max_length=100,blank=True)
    pub_description=models.TextField(max_length=500,blank=True)
    pub_url=models.URLField(max_length=500,blank=True)
    pub_author=models.ForeignKey(User,on_delete=models.CASCADE,related_name='pub_author')
    pub_reactions=models.ManyToManyField(User,related_name='pub_reactions',default=[],blank=True)
    published=models.BooleanField(default=False)
    private=models.BooleanField(default=False)

class Meditate(models.Model):
    med_id=models.BigAutoField(primary_key=True)
    med_name=models.CharField(max_length=50,unique=True)
    med_description=models.CharField(max_length=100)
    med_imgurl=models.URLField()
    med_songurl=models.URLField()

class Song(models.Model):
    id=models.BigAutoField(primary_key=True)
    name=models.CharField(max_length=100,default="unknown")
    url=models.URLField()
    singer=models.CharField(max_length=50,default="unknown")
    sleep=models.BooleanField(default=True)

class PlayList(models.Model):
    pl_id=models.AutoField(primary_key=True)
    pl_name=models.CharField(max_length=50,unique=True)
    pl_imgurl=models.URLField(max_length=10000)
    songs=models.ManyToManyField(Song,related_name='playliste_song',default=[],blank=True)

class Favorite(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    pub = models.ForeignKey(Publication, on_delete=models.CASCADE)
    date = models.DateField(auto_now=True)

class Activity(models.Model):
    activity_id  = models.BigAutoField(primary_key=True)
    activity_name = models.CharField(max_length=100,unique=True)
    activity_type = models.CharField(max_length=100)
    activity_date = models.DateField()
    activity_time = models.CharField(max_length=100)
    activity_duration = models.CharField(max_length=100)
    label= models.CharField(max_length=100,blank=True)

class Plan(models.Model):
    plan_id=models.BigAutoField(primary_key=True)
    plan_name =models.CharField(max_length=100,unique=True)
    plan_type =models.CharField(max_length=500)
    plan_activity=models.ManyToManyField(Activity,related_name='plan_activity')

class Message(models.Model):
    message_id = models.BigAutoField(primary_key=True)
    message_user = models.ForeignKey(User,on_delete=models.CASCADE)
    message_content = models.TextField(max_length=500,unique=True)
    message_date=models.DateField(auto_now=True)

class Report(models.Model):
    report_id = models.BigAutoField(primary_key=True)
    report_pub = models.ForeignKey(Publication,on_delete=models.CASCADE)
    report_author = models.ForeignKey(User,on_delete=models.CASCADE)
    report_message = models.TextField(max_length=500,unique=True)

class Statistics(models.Model):
    st_id = models.BigAutoField(primary_key=True)
    st_date = models.DateField()
    st_nb_user= models.IntegerField()
    st_nb_pub= models.IntegerField()
    st_nb_sugg= models.IntegerField()


class Notification(models.Model):
    id=models.BigAutoField(primary_key=True)
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    date=models.DateField(auto_now=True)
    notification=models.TextField(max_length=500)
    is_seen=models.BooleanField(default=False)

class ResetPassword(models.Model):
    id=models.BigAutoField(primary_key=True)
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    token=models.TextField(max_length=500)