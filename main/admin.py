from django.contrib import admin
from .models import Genere, Prodotto
from user.models import Profile


@admin.register(Genere)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug', ]
    prepopulated_fields = {'slug': ('name',)}


@admin.register(Prodotto)
class ProductAdmin(admin.ModelAdmin):
    def get_queryset(self, request):
        query = super(ProductAdmin, self).get_queryset(request)
        #filtered_query = ProductAdmin.objects.none()
        #profile = Profile.objects.get(user=request.user)
        #site = Site.objects.filter(user=profile)
        # for s in site:
        #   filtered_query |= query.filter(site=s)
        #  print(s.title)
        return query
    list_display = ['name', 'prezzo',
                    'slug', 'disponibile', 'creato', 'aggiornato']
    list_filter = ['disponibile', 'creato', 'aggiornato']
    list_editable = ['prezzo', 'disponibile']
    prepopulated_fields = {'slug': ('name',)}
