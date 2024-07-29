from django.test import TestCase
from .models import Prodotto
from .models import Genere


class MyModelTestCase(TestCase):
    def setUp(self):
        self.model = Prodotto.objects.create(
            name="Test",prezzo=0, genere=Genere.objects.create(name="latticini")
        )

    def test_model_name(self):
        self.assertEqual(self.model.name, "Test")
