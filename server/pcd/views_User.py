import os
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from pcd.models import Admin,User,Publication,Favorite,Song,Notes,PlayList,Report,Meditate,Plan,Activity,Message,Statistics,Notification
from bson import ObjectId
from django.http import HttpResponse
from pcd.serializers import UserSerializer,PublicationSerializer,NoteSerializer,SongSerializer,PlayListSerializer,NotificationSerializer,FavoriteSerializer,MessageSerializer,ActivitySerializer
from django.core.files.storage import default_storage


@csrf_exempt
def NotesApi(request,id=0):
    if request.method=='GET':
        note = Notes.objects.filter(user=id)
        note_serializer=NoteSerializer(note,many=True)
        return JsonResponse(note_serializer.data,safe=False)
    elif request.method=='POST':
        note_data=JSONParser().parse(request)
        note_serializer=NoteSerializer(data=note_data)
        if note_serializer.is_valid():
            note_serializer.save()
            return JsonResponse("added succefully",safe=False)
        print(note_serializer.errors)
        return JsonResponse("Failed to add",safe=False)
    elif request.method=='PUT':
        note_data=JSONParser().parse(request)
        note=Notes.objects.get(note_id = note_data['note_id'] )
        note_serializer=NoteSerializer(note,data=note_data)
        if note_serializer.is_valid():
            note_serializer.save()
            return JsonResponse("Update Successfully",safe=False)
        return JsonResponse("Failed to update")
    elif request.method=='DELETE':
        note=Notes.objects.get(note_id = id)
        note.delete()
        return JsonResponse("Deleted Successfully",safe=False)

@csrf_exempt
def FavoriteApi(request,id=0):
    if request.method=='GET': 
        fav = Publication.objects.filter(favorite__author=id)
        fav_serializer=PublicationSerializer(fav,many=True)
        return JsonResponse(fav_serializer.data,safe=False)
    elif request.method=='POST':
        try:
            f_data=JSONParser().parse(request)
            fav=Favorite.objects.get(pub=f_data['pub'] ,author=f_data['author'] )
            return JsonResponse("exist!",safe=False)
        except Favorite.DoesNotExist:
            fav_serializer=FavoriteSerializer(data=f_data)
            if fav_serializer.is_valid():
               fav_serializer.save()
               return JsonResponse("added succefully",safe=False)
            print(fav_serializer.errors)
            return JsonResponse("Failed to add",safe=False)
    elif request.method=='DELETE':
        f_data=JSONParser().parse(request)
        fav=Favorite.objects.get(pub=f_data['pub'] ,author=f_data['author'] )
        fav.delete()
        return JsonResponse("Deleted Successfully",safe=False)

@csrf_exempt
def Publication_ReactionApi(request,id=0):
    if request.method=='GET':
        pub=Publication.objects.get(pub_id = id)
        pub_serializer=PublicationSerializer(pub)
        nombre=len(pub_serializer.data.get('pub_reactions'))
        return JsonResponse({'reaction':nombre},safe=False)
    elif request.method=='POST':
        pub_data=JSONParser().parse(request)
        pub=Publication.objects.get(pub_id=pub_data['pub_id'])
        pub_serializer=PublicationSerializer(pub,partial=True)
        reaction=pub_serializer.data.get('pub_reactions')
        reaction.append(id)
        pub_serializer.data.update({'pub_reactions':reaction})
        p=PublicationSerializer(pub,data=pub_serializer.data)
        if p.is_valid():
            p.save()
            return JsonResponse(p.data)
        return JsonResponse(p.errors)
    elif request.method=='DELETE':
        pub_data=JSONParser().parse(request)
        pub=Publication.objects.get(pub_id=pub_data['pub_id'])
        pub_serializer=PublicationSerializer(pub,partial=True)
        reaction=pub_serializer.data.get('pub_reactions')
        reaction.remove(int(id))
        pub_serializer.data.update({'pub_reactions':reaction})
        p=PublicationSerializer(pub,data=pub_serializer.data)
        if p.is_valid():
            p.save()
            return JsonResponse(p.data)
        return JsonResponse(p.errors)
@csrf_exempt
def UserActivityApi(request,id=0):
    if request.method=='GET':
        A_data=JSONParser().parse(request)
        activity=Activity.objects.get(plan_name = A_data['user_type'] )
        A_serializer=ActivitySerializer(activity,many=True)
        return JsonResponse(A_serializer.data,safe=False)

@csrf_exempt
def SaveFileApi(request,id=0): 
    file = request.FILES['image'] 
    file_name=default_storage.save(file.name,file) 
    return JsonResponse(file_name,safe=False)


@csrf_exempt
def UserPubApi(request,id=0): 
        fav = Publication.objects.filter(pub_author=id).all().order_by("pub_id").reverse()
        fav_serializer=PublicationSerializer(fav,many=True)
        return JsonResponse(fav_serializer.data,safe=False)

@csrf_exempt
def NotificationApi(request,id=0):
    if request.method=='GET':
        notification = Notification.objects.filter(user= id)
        notification_serializer=NotificationSerializer(notification,many=True)
        return JsonResponse(notification_serializer.data,safe=False)
    elif request.method=='POST':
        notification_data=JSONParser().parse(request)
        notification_serializer=NotificationSerializer(data=notification_data)
        if notification_serializer.is_valid():
            notification_serializer.save()
            return JsonResponse("added succefully",safe=False)
        print(notification_serializer.errors)
        return JsonResponse(notification_serializer.errors,safe=False)
    elif request.method=='PUT':
        notification_data=JSONParser().parse(request)
        notification=Notification.objects.get(id = notification_data['id'],user=id )
        notification_serializer=NotificationSerializer(notification,data=notification_data,partial=True)
        if notification_serializer.is_valid():
            notification_serializer.save()
            return JsonResponse("Update Successfully",safe=False,status=201)
        print(notification_serializer.errors)
        return JsonResponse("Failed to update",status=400)
    elif request.method=='DELETE':
        notification=Notification.objects.get(id = id)
        notification.delete()
        return JsonResponse("Deleted Successfully",safe=False)

@csrf_exempt
def ReactionApi(request,id=0):
        pl_data=JSONParser().parse(request)
        pl=Publication.objects.get(pub_id=pl_data['pub_id'])
        pl_serializer=PublicationSerializer(pl,partial=True)
        reactions=pl_serializer.data.get('pub_reactions')
        if (int(pl_data['user']) in reactions):
           reactions.remove(int(pl_data['user']))
        elif ( int(pl_data['user']) not in reactions):
            reactions.append(pl_data['user'])
        pl_serializer.data.update({'pl_reactions':reactions})
        p=PublicationSerializer(pl,data=pl_serializer.data)
        if p.is_valid():
            p.save()
            return JsonResponse(p.data)
        return JsonResponse(p.errors)





















""""
def ReactionApi(request,id=0):
    if request.method=='POST':
        pl_data=JSONParser().parse(request)
        pl=Publication.objects.get(pub_id=pl_data['pub_id'])
        pl_serializer=PublicationSerializer(pl,partial=True)
        reactions=pl_serializer.data.get('pub_reactions')
        reactions.append(pl_data['user'])
        print("added")
        pl_serializer.data.update({'pl_reactions':reactions})
        p=PublicationSerializer(pl,data=pl_serializer.data)
        if p.is_valid():
            p.save()
            return JsonResponse(p.data)
        return JsonResponse(p.errors)
    elif request.method=='DELETE':
        pl_data=JSONParser().parse(request)
        pl=Publication.objects.get(pub_id=pl_data['pub_id'])
        pl_serializer=PublicationSerializer(pl,partial=True)
        reactions=pl_serializer.data.get('pub_reactions')
        reactions.remove(pl_data['user'])
        print("remove")
        pl_serializer.data.update({'pl_reactions':reactions})
        p=PublicationSerializer(pl,data=pl_serializer.data)
        if p.is_valid():
            p.save()
            return JsonResponse(p.data)
        return JsonResponse(p.errors)
"""