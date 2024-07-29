# Generated by Django 5.0.1 on 2024-07-15 10:13

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("main", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="zona",
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
                    "zona",
                    models.CharField(
                        choices=[
                            ("Nord", "Nord"),
                            ("Est", "Est"),
                            ("Ovest", "Ovest"),
                            ("Sud", "Sud"),
                        ],
                        default=None,
                        max_length=10,
                    ),
                ),
            ],
        ),
    ]
