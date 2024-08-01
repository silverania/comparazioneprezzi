const HOST = "https://127.0.0.1:8000";
const MEDIAFOLDER = "media/";

$(document).ready(function () {
  

  
});
function insertProduct() {
  var searchValue;
  var buttonSearch;
  var generiJson;
  var productsParse;
  var products;

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
    searchValue = document.getElementById('inputSearch').value;
    extract = [];
    var carrello = document.getElementsByClassName("button_aggiungi");
    while (carrello.length > 0) {
      carrello[0].parentNode.removeChild(carrello[0]);
    }
    //e.firstElementChild can be used.
    var e = document.getElementById('colprodotti');
    var child = e.lastElementChild;
    while (child) {
      e.removeChild(child);
      child = e.lastElementChild;
    }
    for (var c = 0; c < productsParse.length; c++) {
      if (searchValue !== "")
        if (productsParse[c].name.toUpperCase().includes(searchValue.toUpperCase())) {
          extract.push(productsParse[c]);
        }
        else { continue; }
    }
    addElementToScreeen(extract);
  }
  );


  function addElementToScreeen(el) {
    var elProdotto = document.createElement('DIV');
    for (i = 0; i < el.length; i++) {
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
      elProdotto.setAttribute("class", "row");
      rowCarrello[i].classList.add("row");
      rowCarrello[i].classList.add("justify-content-center");
      $(rowCarrello[i]).append('<button class="btn-xs btn-warning" onClick="inCarrello(event)"id="button_aggiungi" data-name="'+el[i].name+'" class="btn btn-sm btn-primary"><span id="span_aggiungi_' + el[i].name + "_" + el[i].pk + '">Nel Carrello</span></button>');
      colprodotto[i].id = "col_" + el[i].name + "_" + el[i].category;
      colprodotto[i].classList.add("col-xs-6");
      colprodotto[i].classList.add("datacol");
      pProdotto[i].id = "p_" + el[i].name + "_" + el[i].category;
      divprodotto[i].classList.add("row");
      divprodotto[i].classList.add("mt-5");
      divprodotto[i].width = "auto";
      divprodotto[i].id = "div_" + el[i].name + "_" + el[i].category;
      pPrezzo[i].id = "p_prezzo_" + el[i].prezzo + "_" + el[i].genere;
      spanPrezzo[i].id = "s_prezzo_" + el[i].prezzo;
      colImage[i].id = "col_Image_" + el[i].name + "_" + el[i].genere;
      colImage[i].classList.add("col-4");
      colProductName[i].id = "colProductName_" + el[i].name + "_" + el[i].category;
      //colImage[i].classList.add("col-12");
      //colImage[i].classList.add("col-md-3");
      
      imgprodotto[i].setAttribute("alt", "Nessuna immagine !");
      imgprodotto[i].classList.add("img-fluid");
      imgprodotto[i].setAttribute("width", "24px");
      imgprodotto[i].setAttribute("align", "right");
      imgprodotto[i].id = "img_product_" + el[i].name + "_" + el[i].genere;
      imgprodotto[i].src = MEDIAFOLDER + (el[i].fileds.image).toString();
      pProdotto[i].appendChild(spanProdotto[i]);
      pPrezzo[i].appendChild(spanPrezzo[i]);
      spanProdotto[i].innerText = el[i].name;
      spanProdotto[i].style.marginTop = "0";
      spanPrezzo[i].innerText = el[i].prezzo + "euro";
      colProductName[i].appendChild(pProdotto[i]);
      colProductName[i].appendChild(pPrezzo[i]);
      colProductName[i].classList.add("col-8");
      divprodotto[i].appendChild(colImage[i]);
      divprodotto[i].appendChild(colProductName[i]);
      colImage[i].appendChild(imgprodotto[i]);
      colprodotto[i].appendChild(divprodotto[i]);
      colprodotto[i].appendChild(rowCarrello[i]);
      elProdotto.appendChild(colprodotto[i]);
      colProdotti.appendChild(elProdotto);
    }
    return elProdotto;
  }


}
function inCarrello(ev) {
  var elClicked = document.getElementById(ev.target.id).closest(".datacol").cloneNode(true);
  
  root2.appendChild(elClicked);
  var changedSpanText = document.getElementById('root2');
  var parentChangedSpanText = root2.getElementsByTagName("span")[2];
  parentChangedSpanText.innerText = "Togli dal carrello";
  parentChangedSpanText.classList.add("animateme");
  var el = root2.childNodes[0].childNodes[1].childNodes;
  el.setAttribute("onclick",'document.getElementById("root2").replaceChildren()');
}