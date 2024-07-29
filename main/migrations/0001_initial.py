# Generated by Django 5.0.1 on 2024-03-16 16:44

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="activityType",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "activityType",
                    models.CharField(
                        choices=[
                            ("Supermarket", "Supermarket"),
                            ("Abbigliamento", "Abbigliamento"),
                            ("Elettronica", "Elettronica"),
                        ],
                        default="Supermarket",
                        max_length=30,
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Genere",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(db_index=True, max_length=200)),
                ("slug", models.SlugField(max_length=200, unique=True)),
            ],
            options={
                "ordering": ("name", "slug"),
            },
        ),
        migrations.CreateModel(
            name="Activity",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("citta", models.CharField(max_length=100)),
                ("name", models.CharField(default="indefinita", max_length=100)),
                ("strada", models.CharField(default="indefinita", max_length=100)),
                (
                    "telefono",
                    models.CharField(
                        blank=True, default="non disponibile", max_length=30, null=True
                    ),
                ),
                ("logo", models.ImageField(upload_to="loghi")),
                (
                    "activity",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="main.activitytype",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Prodotto",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(db_index=True, max_length=200)),
                ("slug", models.SlugField(max_length=200)),
                (
                    "image",
                    models.ImageField(blank=True, upload_to="media/prodotti/%Y/%m/%d"),
                ),
                ("descrizione", models.TextField(blank=True)),
                ("prezzo", models.DecimalField(decimal_places=2, max_digits=10)),
                ("disponibile", models.BooleanField(default=True)),
                ("creato", models.DateTimeField(auto_now_add=True)),
                ("aggiornato", models.DateTimeField(auto_now=True)),
                ("inOfferta", models.DateTimeField(blank=True, null=True)),
                (
                    "genere",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="prodotti",
                        to="main.genere",
                    ),
                ),
            ],
            options={
                "ordering": ("name", "genere", "descrizione"),
                "index_together": {("id", "slug")},
            },
        ),
    ]
