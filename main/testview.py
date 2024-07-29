from django.test import TestCase
from django.urls import reverse
from . import views


class MyViewTestCase(TestCase):
    def test_my_view(self):
        response = self.client.get(reverse("main"))
        message = "no vars"
        self.assertEqual(response.status_code, 200,message)
        self.assertEqual(response.content, b"Non ho troato prodotti !!", message)
