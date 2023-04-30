const HOST = "https://127.0.0.1:8000";
const MEDIAFOLDER = "media/";


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

  buttonSearch = document.getElementById("buttonSearch");
  colProdotti = document.getElementById("colprodotti");
  generi = JSON.stringify(generi);
  generiJson = JSON.parse(generi);
  productsParse = JSON.parse(generiJson);

  class GenereAlimentare {
    constructor(nome, slug) {
      this.nome = nome;
      this.slug = slug;
    }
  }

  class Prodotto {
    constructor(nome, image, descrizione, prezzo, disponibile, creato, aggiornato, inOfferta) {
      this.nome = nome;
      this.slug = slug;
      this.image = image
      this.descrizione = descrizione;
      this.prezzo = prezzo;
      this.disponibile = disponibile;
      this.creato = creato;
      this.aggiornato = aggiornato;
      this.inOfferta = inOfferta;
    }
  }


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
    }
    //e.firstElementChild can be used.

    for (var c = 0; c < productsParse.product.length; c++) {
      let temp = JSON.parse(productsParse.product[c]);
      if (searchValue !== "")
        if (temp[0].model === "main.prodotto" && temp[0].fields.name.toUpperCase().includes(searchValue.toUpperCase())) {
          extract.push(JSON.parse(productsParse.product[c]));
        }
        else { continue; }
    }
    addElementToScreeen(extract);
  }
  );


  function addElementToScreeen(el) {
    for (i = 0; i < el[0].length; i++) {
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
      colprodotto[i].id = "col_" + el[0][i].fields.name + "_" + el[0][i].fields.genere;
      pProdotto[i].id = "p_" + el[0][i].fields.name + "_" + el[0][i].fields.genere;
      divprodotto[i].classList.add("row");
      divprodotto[i].id = "div_" + el[0][i].fields.name + "_" + el[0][i].fields.genere;
      divprodotto[i].style.display = "inline-block";
      divprodotto[i].style.width = "100%";
      pPrezzo[i].id = "p_prezzo_" + el[0][i].fields.prezzo + "_" + el[0][i].fields.genere;
      spanPrezzo[i].id = "s_prezzo_" + el[0][i].fields.prezzo;
      colImage[i].id = "col_Image_" + el[0][i].fields.name + "_" + el[0][i].fields.genere;
      colProductName[i].id = "colProductName_" + el[0][i].fields.name + "_" + el[0][i].fields.genere;
      colImage[i].classList.add("col-7");
      colImage[i].classList.add("col-md-7");
      colProductName[i].classList.add("col-5");
      colProductName[i].classList.add("col-md-5");
      imgprodotto[i].setAttribute("alt", "Nessuna immagine !");
      imgprodotto[i].id = "img_product_" + el[0][i].fields.name + "_" + el[0][i].fields.genere;
      imgprodotto[i].src = MEDIAFOLDER + (el[0][i].fields.image).toString();
      imgprodotto[i].classList.add("img-fluid");
      pProdotto[i].appendChild(spanProdotto[i]);
      pPrezzo[i].appendChild(spanPrezzo[i]);
      spanProdotto[i].innerText = el[0][i].fields.name;
      spanProdotto[i].style.marginTop = "0";
      spanPrezzo[i].innerText = el[0][i].fields.prezzo + "euro";
      colProductName[i].appendChild(pProdotto[i]);
      colProductName[i].appendChild(pPrezzo[i]);
      divprodotto[i].appendChild(colImage[i]);
      divprodotto[i].appendChild(colProductName[i]);
      colImage[i].appendChild(imgprodotto[i]);
      colprodotto[i].appendChild(divprodotto[i]);
      colprodotto[i].appendChild(rowCarrello[i]);
      //colProdotti.appendChild(colprodotto[i]);
      var rowprodotti = document.getElementById('rowprodotti');
      rowprodotti.appendChild(colprodotto[i]);
    }
    var elements = document.getElementsByClassName("checkout");
    for (var i = 0, len = elements.length; i < len; i++) {
      elements[i].addEventListener("click", function (e) {
        const a = e.target.closest('div');
        var offsetParent = a.offsetParent;
        addElementTocheckout(offsetParent);
      });
    }
    return 0;
  }
  function addElementTocheckout(el) {
    var element = el;
    var rowElements = document.querySelector("#rowElements");
    element.classList.remove("col-2");
    element.classList.add("col-2");
    const a = element.lastChild.remove('button');
    element.remove(a);

    rowElements.append(element);
  }
}