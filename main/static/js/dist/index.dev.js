"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HOST = "https://127.0.0.1:8000";
var MEDIAFOLDER = "media/";

function insertProduct() {
  var searchValue;
  var buttonSearch;
  var generiJson;
  var productsParse;
  var containersearch;
  var colProdotti;
  var i;
  var extract = [];
  var colprodotto = [];
  var divprodotto = [];
  var imgprodotto = [];
  var colImage = [];
  var spanProdotto = [];
  var pProdotto = [];
  var colProductName = [];
  var pPrezzo = [];
  var spanPrezzo = [];
  var rowCarrello = [];
  var elementsInCarrello = [];
  buttonSearch = document.getElementById("buttonSearch");
  colProdotti = document.getElementById("colprodotti");
  generi = JSON.stringify(generi);
  generiJson = JSON.parse(generi);
  productsParse = JSON.parse(generiJson);

  var GenereAlimentare = function GenereAlimentare(nome, slug) {
    _classCallCheck(this, GenereAlimentare);

    this.nome = nome;
    this.slug = slug;
  };

  var Prodotto = function Prodotto(nome, quantity, html, image, descrizione, prezzo, disponibile, creato, aggiornato, inOfferta) {
    _classCallCheck(this, Prodotto);

    this.nome = nome;
    this.quantity = parseInt(quantity);
    this.image = image;
    this.descrizione = descrizione;
    this.prezzo = prezzo;
    this.disponibile = disponibile;
    this.creato = creato;
    this.aggiornato = aggiornato;
    this.inOfferta = inOfferta;
    this.html = html;
  };

  buttonSearch.addEventListener("click", function () {
    for (i = colprodotto.length - 1; i >= 0; i--) {
      colprodotto[i].remove();
      colprodotto.pop();
      rowCarrello.pop();
      divprodotto.pop();
    }

    searchValue = document.getElementById('inputSearch').value;
    extract = [];
    var carrello = document.getElementsByClassName("button_aggiungi");

    while (carrello.length > 0) {
      carrello[0].parentNode.removeChild(carrello[0]);
    } //e.firstElementChild can be used.


    for (var c = 0; c < productsParse.product.length; c++) {
      var temp = JSON.parse(productsParse.product[c]);
      if (searchValue !== "") if (temp[0].model === "main.prodotto" && temp[0].fields.name.toUpperCase().includes(searchValue.toUpperCase())) {
        extract.push(JSON.parse(productsParse.product[c]));
      } else {
        continue;
      }
    }

    addElementToScreeen(extract);
  });

  function addElementToScreeen(el) {
    var prodotti = [];
    var productClicked;
    var cloneProduct;

    for (i = 0; i < el[0].length; i++) {
      el[0][i].fields.quantity = 0;
      prodotti.push(new Prodotto(el[0][i].fields.name, el[0][i].fields.quantity));
      prodotti[i].html = el[0][i].fields.html = '<div class=\"row justify-content-center quantityrow\"><div class=\"col\"><span name=\"' + el[0][i].fields.name + '\" value=\"' + 0 + '\" id=\"' + el[0][i].fields.name + '\"class=\"badge bg-light\">' + 0 + ' nel Carrello</span></div></div>';
      rowCarrello.push(document.createElement("DIV"));
      colprodotto.push(document.createElement("DIV"));
      divprodotto.push(document.createElement("DIV"));
      imgprodotto.push(document.createElement("IMG"));
      spanProdotto.push(document.createElement("SPAN"));
      spanPrezzo.push(document.createElement("SPAN"));
      pProdotto.push(document.createElement("P"));
      pPrezzo.push(document.createElement("P"));
      colImage.push(document.createElement("DIV"));
      colProductName.push(document.createElement("DIV"));
      rowCarrello[i].classList.add("row");
      rowCarrello[i].classList.add("justify-content-center");
      $(rowCarrello[i]).append('<button class="btn btn-warning checkout"  class="btn btn-sm btn-primary"><span id="span_aggiungi_' + el[0][i].fields.name + "_" + el[0][i].pk + '">Nel Carrello</span></button>');
      rowCarrello[i].id = "but_" + el[0][i].fields.name;
      elementsSelected = document.getElementsByClassName('btn-warning');
      colprodotto[i].classList.add("col-2");
      colprodotto[i].id = "col_" + el[0][i].fields.name;
      pProdotto[i].id = "p_" + el[0][i].fields.name;
      divprodotto[i].classList.add("row");
      divprodotto[i].id = "div_" + el[0][i].fields.name;
      divprodotto[i].style.display = "inline-block";
      divprodotto[i].style.width = "100%";
      pPrezzo[i].id = "p_prezzo_" + el[0][i].fields.prezzo;
      spanPrezzo[i].id = "s_prezzo_" + el[0][i].fields.prezzo;
      colImage[i].id = "col_Image_" + el[0][i].fields.name;
      colProductName[i].id = "colProductName_" + el[0][i].fields.name;
      colImage[i].classList.add("col-12");
      colProductName[i].classList.add("col-5");
      colProductName[i].classList.add("col-md-5");
      imgprodotto[i].setAttribute("alt", "Nessuna immagine !");
      imgprodotto[i].id = "img_product_" + el[0][i].fields.name;
      imgprodotto[i].src = MEDIAFOLDER + el[0][i].fields.image.toString();
      imgprodotto[i].classList.add("img-thumbnails");
      pProdotto[i].appendChild(spanProdotto[i]);
      pPrezzo[i].appendChild(spanPrezzo[i]);
      spanProdotto[i].innerText = el[0][i].fields.name;
      spanProdotto[i].style.marginTop = "0";
      spanPrezzo[i].innerText = el[0][i].fields.prezzo + "euro";
      colProductName[i].appendChild(pProdotto[i]);
      colProductName[i].appendChild(pPrezzo[i]);
      $(colprodotto[i]).append(prodotti[i].html);
      divprodotto[i].appendChild(colImage[i]);
      divprodotto[i].appendChild(colProductName[i]);
      colImage[i].appendChild(imgprodotto[i]);
      colprodotto[i].appendChild(divprodotto[i]);
      colprodotto[i].appendChild(rowCarrello[i]);
      var rowprodotti = document.getElementById('rowprodotti');
      rowprodotti.appendChild(colprodotto[i]);
    }

    var elements = document.getElementsByClassName("checkout");

    for (var i = elements.length - 1; i >= 0; i--) {
      elements[i].addEventListener("click", function (e) {
        var a = e.target.closest('div');
        productClicked = a.offsetParent;
        var spanid = productClicked.id.slice(4);
        var spanelement = document.getElementById(spanid);
        spanelement.setAttribute("value", parseInt(spanelement.getAttribute("value")) + 1); //spanelement.setAttribute("value", prodotto.quantity);

        spanelement.innerText = spanelement.getAttribute("value") + " nel Carrello ";
        cloneProduct = productClicked.cloneNode(true);

        if (addElementTocheckout(cloneProduct) === 0) {
          spanelement.setAttribute("value", parseInt(spanelement.getAttribute("value")) + 1);
        }
      });
    }

    return 0;
  }

  function addElementTocheckout(el) {
    //const a = el.lastChild.remove('button');
    var eldiv = el.lastElementChild;
    var elbut = eldiv.lastElementChild;
    elbut.style.backgroundColor = "white";
    var elspan = elbut.lastElementChild;
    elspan.textContent = "Rimuovi"; //el.remove(a);

    var id, id2;
    i = elementsInCarrello.length;

    while (i >= 0) {
      try {
        id = elementsInCarrello[i - 1].getAttribute("id");
        id2 = el.getAttribute("id");
      } catch (TypeError) {
        add();
        break;
      }

      if (id2 === id) {
        break;
      } else {
        i--;
        continue;
      }
    }

    function add() {
      elementsInCarrello.push(el);
      var rowElements = document.querySelector("#rowElements");
      rowElements.append(el);
      return 0;
    }
  }
}