"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GenereAlimentare = function GenereAlimentare(nome, slug) {
  _classCallCheck(this, GenereAlimentare);

  this.nome = nome;
  this.slug = slug;
};

var Prodotto = function Prodotto(nome, image, descrizione, prezzo, disponibile, creato, aggiornato, inOfferta) {
  _classCallCheck(this, Prodotto);

  this.nome = nome;
  this.slug = slug;
  this.image = image;
  this.descrizione = descrizione;
  this.prezzo = prezzo;
  this.disponibile = disponibile;
  this.creato = creato;
  this.aggiornato = aggiornato;
  this.inOfferta = inOfferta;
};

$(document).ready(function () {
  generi = JSON.stringify(generi);
  var generiJson = JSON.parse(generi);
  var productsParse = JSON.parse(generiJson);
  var products = JSON.parse(productsParse);
  var searchInput = document.getElementById("search");
  searchInput.addEventListener("click", function () {
    var searchValue = searchInput.value;

    for (c = 0; c <= productsParse.length; c++) {
      if (productsParse[c].fields.name === searchValue) {
        console.log("valore in input search presente nel database");
      }
    }
  });
});