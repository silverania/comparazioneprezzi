from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render
from django.template import RequestContext
from .forms import UserEditForm, ProfileEditForm
from .models import Profile
from django.contrib.auth.decorators import login_required
from django.shortcuts import redirect
from django.contrib.auth import login, logout, authenticate
from .forms import SignUpForm, LoginForm
from django.template.context_processors import csrf
from django.http import HttpResponse, JsonResponse
from django.views import View
import json
from django.core import serializers
from django.contrib.auth.models import User
from django.contrib.auth.models import Group
from django.contrib.auth import update_session_auth_hash
from django.contrib.auth.forms import PasswordChangeForm
from django.contrib import messages
from django.contrib.sessions.models import Session
from django.utils import timezone
from django.utils.decorators import method_decorator
scrollTo = ''
Group = Group.objects.all()


def getUser(user):
    list_current_user = []
    firstName = str(user)
    current_user = Profile.objects.filter(first_name=firstName)
    list_current_user = list(current_user)
    list_current_user = serializers.serialize(
        "json", list_current_user)
    return list_current_user


@csrf_exempt
def checkUser(request):
    if request.method == 'POST':
        print("user is auth ?"+str(request.user.is_authenticated)+str(request.user))
        login = getUser(
            request.user) if request.user.is_authenticated else "false"
        myuser = object()
        authorized = False
        list_json_user_data = json.loads(request.body)
        for key, value in list_json_user_data.items():
            print(key)
            if 'user' in key:
                myuser = value
            if 'password' in key:
                password = value
            if 'currentUrl' in key:
                currentUrl = value
        if not isinstance(myuser, User):
            try:
                myuser = authenticate(username=myuser, password=password)
                if myuser is not None:
                    list_current_user = getUser(myuser)
                    firstName = str(myuser)
                    currentUser = Profile.objects.get(first_name=firstName)
                    if 'blog' in request.get_full_path():
                        if not str(currentUser.website) in currentUrl:
                            print("nessun autorizzazione concessa !" +
                                  str(currentUrl)+"__"+str(currentUser.website))
                            raise Exception(
                                "sito Web non autoriazzato o assente in fase di registrazione")
                        else:
                            authorized = True
                else:
                    myuser = "None"
                    list_current_user = myuser
                if not myuser.groups.filter(name__in=['BlogAdmin']).exists():
                    group = Group.get(name='BlogAdmin')
                    myuser.groups.add(group)
            except Exception:
                print("Errore nel autenticazione dell user , e/o nella sua assegnazione"
                      + "al gruppo BlogAdmin")
                myuser = "None"
                list_current_user = myuser
                print("77 "+str(list_current_user))
        else:
            list_current_user = getUser(myuser)
            print("86 "+str(list_current_user))
        data = json.dumps(
            {
                "authorized": authorized,
                # "userLoggedIN": list_current_user,
                "authenticated": login,
            })
        print(str(JsonResponse(data, safe=False)))
        response = JsonResponse(
            data, safe=False
        )
        return response
    """
    def get(self, request):
        print("view checuser GET request.user & session is =" +
              str(request.user.is_authenticated)+"____"+str(request.session))
        print("is AUT IN GET ? "+str(self.request.user.is_authenticated))
        sessions = Session.objects.filter(expire_date__gte=timezone.now())
        user_id_list = []
        # build list of user ids from query
        return HttpResponse("ok get for none ! ")

        def getLoggedUsers():
            print("in dispatch getLoggedUSer request.user is ="+str(request.user))
            for session in sessions:
                data = session.get_decoded()
                # if the user is authenticated
                if data.get('_auth_user_id'):
                    user_id_list.append(data.get('_auth_user_id'))
                logged_in_users = Profile.objects.filter(id__in=user_id_list)
            list_of_logged_in_users = [
                {profile.id: profile.first_name} for profile in logged_in_users]
            return list_of_logged_in_users
        print(str(key)+str(value)+str(getLoggedUsers()))
        return JsonResponse({key: value, 'loggedUsers': getLoggedUsers()})

    def dispatch(self, request, *args, **kwargs):
        if request.method == 'GET':
            print("in dispatch GET request.user is ="+str(request.user))
            return self.get(request)
        elif request.method == 'POST':
            #cv = request.body
            #print("from dispatch method :"+str(cv))
            print("in dispatch POST request.user is ="+str(request.user))
            return self.post(self.request)
    """


def get_client_ip(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip


def getUrlRequest(request):
    urls = request.build_absolute_uri()
    return urls


def user_login(request):
    print("auth ="+str(request.user))
    print("token="+str(request.META.get('HTTP_AUTHORIZATION')))
    if request.method == 'POST':
        valuenext = request.POST.get('mainurl')
        form = LoginForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            user = authenticate(request, username=username, password=password)
            if user:
                login(request, user)
                # return redirect(valuenext)
                # form is not valid or user is not authenticated
                thissession = request.session.session_key
                response = render(request, "booldog.html")
                response.set_cookie('thissess', thissession)
                return response
            else:
                return render(request, 'wrongdati.html', {'valuenext': valuenext})

    elif request.method == 'GET':
        form = LoginForm()
        if 'mainurl' in request.GET:
            valuenext = request.GET.get('mainurl')
            return render(request, 'registration/login.html',
                          {'form': form, 'valuenext': valuenext})

    """ per cambiare password """
    """
    if 'blog' in request.get_full_path():
             scrollTo = "#footer"
            if 'next' in request.GET:
                valuenext = request.GET.get('next')+scrollTo
                subject = 'welcome to GFG world'
                message = 'Hi mario, thank you for registering in geeksforgeeks.'
                email_from = settings.EMAIL_HOST_USER
                recipient_list = ["info.strabbit@gmail.com", ]
                # send_mail(subject, message, email_from, recipient_list)
            myuser = None
            print("view: user_login , GET method......valuenext="+valuenext)
            """


@login_required
def home(request):
    return render(request, 'compilare_il_kernel.html')


@login_required
def dashboard(request):
    return render(request, ' user/dashboard.html', {'section': 'dashboard'})


class Logout(View):
    def get(self, request):
        global userLoggedIN
        logout(request)
        userLoggedIN = None
        if 'mainurl' in request.GET:
            mainurl = request.GET.get('mainurl')
            template = "registration/logged_out.html"
            return render(request, "booldog.html")
            # return render(request, "seiuscito.html", {'valuenext': next})
        return render(request, "seiuscito.html", {'valuenext': mainurl})


def user_register(request):
    valuenext = ""
    if request.method == 'POST':
        form = SignUpForm(request.POST, request.FILES)
        if form.is_valid():
            user = form.save()
            user.refresh_from_db()
            username = form.cleaned_data.get('username')
            raw_password = form.cleaned_data.get('password1')
            user.profile.photo = form.cleaned_data.get('photo')
            user.profile.first_name = username
            user.profile.email = form.cleaned_data.get('email')
            user.profile.website = form.cleaned_data.get('website')
            if 'blog' in request.path:
                valuenext = request.GET.get('mainurl')
                # agiungere i permessi per leggere i propri post dall adminpage
                user.save()
                return redirect('/user/login/blog?mainurl='+valuenext)
            elif 'blogadmin' in request.path:
                group = Group.get(name='BlogAdmin')
                user.groups.add(group)
                print('myuser'+str(user)
                      + "aggiunto al gruppo blogadmin ")
                user.is_staff = True
                user.save()
                # mostra messaggio e esci
                return HttpResponse("<h1>sei autorizzato ad usare webTalk ! </h1><h2>inserisci user e password nei tag Html del tuo sito . </h2>")
            else:
                if 'next' in request.GET:
                    valuenext = request.GET.get('mainurl')
                    user.save()
                    return redirect('/user/login?mainurl='+valuenext)
                else:
                    user.save()
                    return redirect('/user/login')

    else:
        # in base alla presenza della variabile next capisco
        # se la richiesta di registrazione è per installare il Blog
        # oppure per usarlo
        if 'mainurl' in request.GET:
            valuenext = request.GET.get('mainurl')
        form = SignUpForm()
    return render(request, 'user/register.html', {'form': form, 'mainurl': valuenext})


def change_password(request):
    if request.method == 'POST':
        valuenext = ""
        form = PasswordChangeForm(request.user, request.POST)
        if form.is_valid():
            user = form.save()
            update_session_auth_hash(request, user)  # Important!
            if 'mainurl' in request.GET:
                valuenext = request.GET.get('mainurl')
                return render(request, "registration/pass_changed_done.html", {'valuenext': valuenext})
        else:
            return render(request, "wrongdati.html", {'valuenext': valuenext})
    else:
        form = PasswordChangeForm(request.user)
    return render(request, 'change_password.html', {'form': form})


@ login_required
def edit(request):
    print("request="+str(request))
    if request.method == 'POST':
        user_form = UserEditForm(instance=request.user,
                                 data=request.POST)
        profile_form = ProfileEditForm(
            instance=request.user.profile, data=request.POST, files=request.FILES)
        if user_form.is_valid() and profile_form.is_valid():
            user_form.save()
            profile_form.save()
    else:
        user_form = UserEditForm(instance=request.user)
        profile_form = ProfileEditForm(
            instance=request.user.profile)
    return render(request, 'edit.html', {'user_form': user_form, 'profile_form': profile_form})
