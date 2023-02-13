""" vai a cagare
"""
import json
from django.core.serializers.json import DjangoJSONEncoder
from django.core import serializers
from django.views.generic import View
from .models import GenereAlimentare, Prodotto
from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse,JsonResponse


class LazyEncoder(DjangoJSONEncoder):
    def default(self, obj):
        if isinstance(obj, Prodotto.__class__) or isinstance(obj, GenereAlimentare.__class__):
            return str(obj)
        return super().default(obj)


def serializer(data):
    datas = serializers.serialize(
        "json",
        data,
        cls=LazyEncoder,
        use_natural_primary_keys=True,
        use_natural_foreign_keys=True,
    )
    return datas


class homePage(View):
    def get(self, request):
        template ="index.html"
        genereAlJson=[]
        prodottoAlJson=[]
        newList=[]
        temp1=[]
        temp2=[]
        rtemplist=[]
        GENERIALIMENTARI = list(GenereAlimentare.objects.all())
        # genereAlJson = serializer(GENERIALIMENTARI)  
        if GENERIALIMENTARI:
            for categoria in GenereAlimentare.objects.all():
                temp1.append(serializer(list(GenereAlimentare.objects.filter(name=categoria.name))))
                temp1.append(serializer(list(Prodotto.objects.filter(category=categoria))))
            data=json.dumps({"product" : temp1})
        return render(request, template, {'data':data})