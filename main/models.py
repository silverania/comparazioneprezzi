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
    imageLogo = models.ImageField(upload_to="media/prodotti/%Y/%m/%d", blank=True)
    class Meta:
        ordering = ("name", "strada")

    def __str__(self):
        return self.name


class Genere(models.Model):
    name = models.CharField(max_length=200, db_index=True)
    slug = models.SlugField(max_length=200)

    class Meta:
        ordering = ("name",)

    def __str__(self):
        return self.name


class Prodotto(models.Model):
    genere = models.ManyToManyField(Genere
        , related_name="prodotti"
    )
    name = models.CharField(max_length=200, db_index=True)
    slug = models.SlugField(max_length=200, db_index=True)
    supermercati = models.ManyToManyField("Activity",related_name="activitys")
    image = models.ImageField(upload_to="media/prodotti/%Y/%m/%d", blank=True)
    descrizione = models.TextField(blank=True)
    disponibile = models.BooleanField(default=True)
    creato = models.DateTimeField(auto_now_add=True)
    aggiornato = models.DateTimeField(auto_now=True)
    inOfferta = models.DateField(null=True, blank=True)
    class Meta:
        ordering = ("creato",)
        #index_together = (("id", "slug"),)

    def __str__(self):
        return self.name


class Prezzo(models.Model):
    prodotto = models.ForeignKey(Prodotto, on_delete=models.CASCADE,related_name="prezzo")
    prezzo=models.DecimalField(max_digits=10, decimal_places=2,default="0.00",null=True, blank=True)
    activity = models.ForeignKey(
        Activity, related_name="supermarkets", on_delete=models.CASCADE,null=True,blank=True
    )
    class Meta:
        ordering = ("prodotto",)
        index_together = (("prodotto", "prezzo","activity"),)

    def __str__(self):
        return str(self.prezzo)
