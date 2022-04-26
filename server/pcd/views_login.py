from django.shortcuts import render
from email import message
from django.views.decorators.csrf import csrf_exempt
from django.utils.crypto import get_random_string
from django.core.mail import send_mail 
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from pcd.models import Admin,User,ResetPassword
from bson import ObjectId
from django.http import HttpResponse
from pcd.serializers import AdminSerializer,UserSerializer,ResetPasswordSerializer,NoteSerializer,SongSerializer,PlayListSerializer,FavoriteSerializer


@csrf_exempt 
def login(request,id):
    try: 
       user_data=JSONParser().parse(request)
       user=User.objects.get(user_mail= user_data['user_mail'],user_password=user_data['user_password'])
       user_serializer=UserSerializer(user)
       return JsonResponse(user_serializer.data,safe=False)
    except User.DoesNotExist:
         return JsonResponse({'user_id':0})

@csrf_exempt
def SendMailApi(request,id=0):
    try:
      data=JSONParser().parse(request)
      user=User.objects.get(user_mail =data['email'] )
      user_serializer=UserSerializer(user) 
      token= get_random_string(length=32) 
      res=ResetPassword.objects.get(user =user_serializer.data['user_id'] )
      res.delete()
      resetData=ResetPasswordSerializer(data={"user":user_serializer.data['user_id'],"token":token})
      resetData.is_valid()
      resetData.save()
      send_mail('Chillin : Reset Password',
      'Reset your Chillin password \n you can change your password from this link :  http://localhost:3000/newpassword/' +token,'chillin.pcd@gmail',
      [data['email']],fail_silently=False)
      return JsonResponse('Email was sended with success, check your email to reset your password',safe=False)
    except ResetPassword.DoesNotExist:
        user=User.objects.get(user_mail =data['email'] )
        user_serializer=UserSerializer(user) 
        token= get_random_string(length=32) 
        resetData=ResetPasswordSerializer(data={"user":user_serializer.data['user_id'],"token":token})
        resetData.is_valid()
        resetData.save()
        send_mail('Chillin : Reset Password',
        'Reset your Chillin password \n you can change your password from this link :  http://localhost:3000/newpassword/' +token,'chillin.pcd@gmail',
        [data['email']],fail_silently=False)
        return JsonResponse('Email was sended with success, check your email to reset your password',safe=False)
    except User.DoesNotExist:
        return JsonResponse('Your search returned no results. Please try again with other information',safe=False)

@csrf_exempt
def ResetApi(request,id=0):
    try:
      data=JSONParser().parse(request)
      token=ResetPassword.objects.get(token = data['token'] )
      token_serializer=ResetPasswordSerializer(token) 
      user=User.objects.get(user_id = token_serializer.data['user'])
      user_serializer=UserSerializer(user)
      token.delete()
      return JsonResponse(user_serializer.data,safe=False)
    except ResetPassword.DoesNotExist:
        return JsonResponse('error',safe=False)