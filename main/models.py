from django.db import models
from django.utils import timezone



class SuperMarket(models.Model):
    citta=models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    strada = models.CharField(max_length=100, default="indefinita")
    telefono = models.CharField(
        max_length=30, default="non disponibile", null=True, blank=True)
    logo = models.ImageField(upload_to='loghi')

    def __str__(self):
        return self.name


class GenereAlimentare(models.Model):
    name = models.CharField(max_length=200, db_index=True)
    slug = models.SlugField(max_length=200, unique=True)

    class Meta:
        ordering = ('name',)
        verbose_name = 'category'
        verbose_name_plural = 'categories'

    def __str__(self):
        return self.name


class Prodotto(models.Model):
    category = models.ForeignKey(GenereAlimentare,
                                 related_name='prodotto',
                                 on_delete=models.CASCADE)
    name = models.CharField(max_length=200, db_index=True)
    slug = models.SlugField(max_length=200, db_index=True)
    image = models.ImageField(upload_to='media/prodotti/%Y/%m/%d',
                              blank=True)
    descrizione = models.TextField(blank=True)
    prezzo = models.DecimalField(max_digits=10, decimal_places=2)
    disponibile = models.BooleanField(default=True)
    creato = models.DateTimeField(auto_now_add=True)
    aggiornato = models.DateTimeField(auto_now=True)
    inOfferta = models.DateTimeField(null=True ,blank=True)
    class Meta:
        ordering = ('name',)
        index_together = (('id', 'slug'),)
    def __str__(self):
        return self.name
