""" vai a cagare
"""
import json
from django.core.serializers.json import DjangoJSONEncoder
from django.core import serializers
from django.views.generic import View
from .models import Genere, Prodotto,Activity
from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, JsonResponse
from rest_framework import serializers
from rest_framework.renderers import JSONRenderer
from django.core.serializers.json import DjangoJSONEncoder


class LazyEncoder(DjangoJSONEncoder):
    def default(self, obj):
        if isinstance(obj, Prodotto.__class__) or isinstance(obj, Genere.__class__):
            return str(obj)
        return super().default(obj)


class ActivitySerializer(serializers.ModelSerializer):
    #citta=serializers.CharField(read_only=True)
    class Meta:
        model = Activity
        fields = ('__all__')  # put your fields instead of "..."


class ProdottoSerializer(serializers.ModelSerializer):
    activity=ActivitySerializer(read_only=True)
    name = serializers.CharField(max_length=200,read_only=True)
    class Meta:
        model = Prodotto
        fields = ('name','activity')

class homePage(View):
    def get(self, request):
        template = "index.html"
        genereAlJson = []
        prodottoAlJson = []
        newList = []
        temp1 = []
        temp2 = []
        rtemplist = []
        GENERIALIMENTARI = list(Genere.objects.all())
        # genereAlJson = serializer(GENERIALIMENTARI)
        if GENERIALIMENTARI:
            objs=[]
            for categoria in Genere.objects.all():
                temp1=Prodotto.objects.filter(name__icontains="latte")
                objs =ProdottoSerializer(temp1,many=True)
                objs=json.dumps(objs.data,cls=DjangoJSONEncoder)
            breakpoint()
        else:
            return HttpResponse("Non ho trovato prodotti !!")
        return render(request, template, {'data': objs})
