from django.contrib import admin
from .models import Genere, Prodotto,Activity,Prezzo
from user.models import Profile


@admin.register(Genere)
class CategoryAdmin(admin.ModelAdmin):
    list_display = [
        "name",
        "slug",
    ]
    prepopulated_fields = {"slug": ("name",)}


class ProductInline(admin.TabularInline):
    model = Prezzo


@admin.register(Prodotto)
class ProductAdmin(admin.ModelAdmin):

    def get_queryset(self, request):
        query = super(ProductAdmin, self).get_queryset(request)
        # filtered_query = ProductAdmin.objects.none()
        # profile = Profile.objects.get(user=request.user)
        # site = Site.objects.filter(user=profile)
        # for s in site:
        #   filtered_query |= query.filter(site=s)
        #  print(s.title)
        return query
    inlines = [ProductInline,]
    fields=["name","supermercati","image","genere","slug"]
    filter_horizontal=['supermercati']
    list_display = [
        "name",
        "genere",
        "disponibile",
        "creato",
        "aggiornato",
        'get_names', 'name',
    ]
    list_filter = ["disponibile", "creato", "aggiornato","genere"]
    list_editable = [  "disponibile"]
    prepopulated_fields = {"slug": ("name",)}
    
    def get_names(self, obj):
        return "\n".join([p.name for p in obj.supermercati.all()])


@admin.register(Activity)
class activityAdmin(admin.ModelAdmin):
    def get_queryset(self, request):
        query = super(activityAdmin, self).get_queryset(request)
        # filtered_query = ProductAdmin.objects.none()
        # profile = Profile.objects.get(user=request.user)
        # site = Site.objects.filter(user=profile)
        # for s in site:
        #   filtered_query |= query.filter(site=s)
        #  print(s.title)
        return query

    list_display = [
        "name",
        "citta",
        "strada",
    ]
    list_filter = ["name", "citta"]
    list_editable = [ "strada","citta"]


@admin.register(Prezzo)
class prezziAdmin(admin.ModelAdmin):
    def get_queryset(self, request):
        query = super(prezziAdmin, self).get_queryset(request)
        # filtered_query = ProductAdmin.objects.none()
        # profile = Profile.objects.get(user=request.user)
        # site = Site.objects.filter(user=profile)
        # for s in site:
        #   filtered_query |= query.filter(site=s)
        #  print(s.title)
        return query

    ##list_display = [
     #   "prezzo",
    #]
    list_filter = ["prodotto","prezzo", "activity"]
    
    def activity_name(self, instance):
        return instance.activity_name
