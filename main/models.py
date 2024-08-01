from django.db import models
from django.utils import timezone


class activityType(models.Model):
    SUPERMARKET = "Supermarket"
    ABBIGLIAMENTO = "Abbigliamento"
    ELETTRONICA = "Elettronica"
    ACTIVITY_CHOICES = [
        (SUPERMARKET, "Supermarket"),
        (ABBIGLIAMENTO, "Abbigliamento"),
        (ELETTRONICA, "Elettronica"),
    ]
    activityType = models.CharField(
        choices=ACTIVITY_CHOICES, default=SUPERMARKET, max_length=30
    )


class zona(models.Model):
    NORD = "Nord"
    EST = "Est"
    OVEST = "Ovest"
    SUD = "Sud"
    ZONA_CHOICES = [
        (NORD, "Nord"),
        (EST, "Est"),
        (OVEST, "Ovest"),
        (SUD, "Sud")
    ]
    zona = models.CharField(
        choices=ZONA_CHOICES, default=None, max_length=10
    )


class Activity(models.Model):
    citta = models.CharField(max_length=100, null=True, blank=True)
    name = models.CharField(max_length=100, default="indefinita")
    strada = models.CharField(max_length=100, default="indefinita")
    telefono = models.CharField(
        max_length=30, default="non disponibile", null=True, blank=True
    )
    logo = models.ImageField(upload_to="loghi",null=True,blank=True)

    def __obj__(self):
        return self.name

    def __unicode__(self):
        return self.name

    def __str__(self):
        return f'{self.name}'


class Genere(models.Model):
    name = models.CharField(max_length=200, db_index=True)
    slug = models.SlugField(max_length=200, unique=True)

    class Meta:
        ordering = ("name", "slug")

    def __str__(self):
        return self.name


class Prodotto(models.Model):
    genere = models.ForeignKey(
        Genere, related_name="prodotti", on_delete=models.CASCADE
    )
    name = models.CharField(max_length=200, db_index=True)
    slug = models.SlugField(max_length=200, db_index=True)
    image = models.ImageField(upload_to="media/prodotti/%Y/%m/%d", blank=True)
    descrizione = models.TextField(blank=True)
    prezzo = models.DecimalField(max_digits=10, decimal_places=2)
    disponibile = models.BooleanField(default=True)
    creato = models.DateTimeField(auto_now_add=True)
    aggiornato = models.DateTimeField(auto_now=True)
    inOfferta = models.DateTimeField(null=True, blank=True)
    activity = models.ForeignKey("Activity", on_delete=models.CASCADE,blank=True,null=True)
    class Meta:
        ordering = ("prezzo", "genere", "descrizione")
        index_together = (("id", "slug"),)

    def __str__(self):
        return self.name
