from django.urls import re_path,path 
from django.conf.urls import include
from pcd import views_login,views_Admin,views_User
from rest_framework.routers import DefaultRouter
from django.conf.urls.static import static
from django.conf import settings


router=  DefaultRouter()
router.register("messageadmin",views_Admin.MessageAPI,basename="message")
router.register("useradmin",views_Admin.UserAPI,basename="user")
urlpatterns = [

    path('login/<str:id>', views_login.login),

    path("",include(router.urls)),
    re_path(r'^getuser/([0-9]+)$',views_Admin.GetUser),
    re_path(r'^reaction$',views_User.Publication_ReactionApi),
    re_path(r'^reaction/([0-9]+)$',views_User.Publication_ReactionApi),
    re_path(r'^favorite$',views_User.FavoriteApi),
    re_path(r'^favorite/([0-9]+)$',views_User.FavoriteApi),
    re_path(r'^notes$',views_User.NotesApi),
    re_path(r'^notes/([0-9]+)$',views_User.NotesApi),
    re_path(r'^notification$',views_User.NotificationApi),
    re_path(r'^notification/([0-9]+)$',views_User.NotificationApi),
    re_path(r'^useractivity$',views_User.UserActivityApi),
    re_path(r'^savefile/([0-9]+)$',views_User.SaveFileApi),
    re_path(r'^mypub/([0-9]+)$',views_User.UserPubApi),
    re_path(r'^reactions$',views_User.ReactionApi),


    re_path(r'^publication$',views_Admin.PublicationApi),
    re_path(r'^publication/([0-9]+)$',views_Admin.PublicationApi),
    re_path(r'^user$',views_Admin.UserApi),
    re_path(r'^user/([0-9]+)$',views_Admin.UserApi),
    re_path(r'^playlist$',views_Admin.PlaylistApi),
    re_path(r'^playlist/([0-9]+)$',views_Admin.PlaylistApi), 
    re_path(r'^song$',views_Admin.SongApi),
    re_path(r'^song/([0-9]+)$',views_Admin.SongApi),
    re_path(r'^plan$',views_Admin.PlanApi),
    re_path(r'^plan/([0-9]+)$',views_Admin.PlanApi),
    re_path(r'^activity$',views_Admin.ActivityApi),
    re_path(r'^activity/([0-9]+)$',views_Admin.ActivityApi),
    re_path(r'^planactivity$',views_Admin.Plan_ActivityApi),
    re_path(r'^planactivity/([0-9]+)$',views_Admin.Plan_ActivityApi),
    re_path(r'^statistics$',views_Admin.StatisticsApi),
    re_path(r'^statistics/([0-9]+)$',views_Admin.StatisticsApi),
    re_path(r'^messages$',views_Admin.MessageApi),
    re_path(r'^messages/([0-9]+)$',views_Admin.MessageApi),
    re_path(r'^reports$',views_Admin.ReportApi),
    re_path(r'^reports/([0-9]+)$',views_Admin.ReportApi),
    re_path(r'^meditate$',views_Admin.MeditateApi),
    re_path(r'^meditate/([0-9]+)$',views_Admin.MeditateApi),
    re_path(r'^playlistsong$',views_Admin.Playlist_SongApi),
    re_path(r'^playlistsong/([0-9]+)$',views_Admin.Playlist_SongApi),


    re_path(r'^mail$',views_login.SendMailApi),
    re_path(r'^reset$',views_login.ResetApi),


    
    
]+static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT) 
