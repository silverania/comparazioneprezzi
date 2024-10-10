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
 
  var imgprodotto = [];
  var colImage = [];
  var spanProdotto = [];
  
  var colProductName = [];
  var pPrezzo = [];
  var spanPrezzo = [];
  
  
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
    var e = document.getElementById('colprodotti'); // cancello ricerca precedente 
    var child = e.lastElementChild;
    var buttons = document.getElementsByClassName("searched");
    var buttons = Array.from(buttons);
    while ((buttons.length - 1) >= 0) {
      buttons.pop();
    }
    while (child) {
      e.removeChild(child);
      child = e.lastElementChild;
    }
    var rowCarrello = [];
    var pProdotto = [];
    var colprodotto = [];
    var divprodotto = [];
    var elProdotto = document.createElement('DIV');
    for (i = 0; i <= el.length-1; i++) {
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
      elProdotto.setAttribute("id", "elprodotto");
      rowCarrello[i].classList.add("row");
      //rowCarrello[i].classList.add("button_aggiungi");
      rowCarrello[i].classList.add("justify-content-center");
      colprodotto[i].id = "col_" + el[i].name + "_" + el[i].activity.name;
      colprodotto[i].classList.add("col-3");
      colprodotto[i].classList.add("datacol");
      colprodotto[i].classList.add("button_aggiungi");
      pProdotto[i].id = "p_" + el[i].name + "_" + el[i].activity.name;
      //divprodotto[i].classList.add("row");
      //divprodotto[i].width = "auto";
      //divprodotto[i].id = "div_" + el[i].name + "_" + el[i].activity.name;
      pPrezzo[i].id = "p_prezzo_" + el[i].prezzo + "_" + el[i].activity.name;
      spanPrezzo[i].id = "s_prezzo_" + el[i].prezzo;
      colImage[i].id = "col_Image_" + el[i].name + "_" + el[i].activity.name;
      colProductName[i].id = "colProductName_" + el[i].name + "_" + el[i].activity.name;

      imgprodotto[i].setAttribute("alt", "Nessuna immagine !");
      imgprodotto[i].classList.add("img-fluid");
      imgprodotto[i].setAttribute("width", "24px");
      imgprodotto[i].setAttribute("align", "right");
      imgprodotto[i].id = "img_product_" + el[i].name + "_" + el[i].activity.name;
      imgprodotto[i].src = MEDIAFOLDER + (el[i].image).toString();
      pProdotto[i].appendChild(spanProdotto[i]);
      pPrezzo[i].appendChild(spanPrezzo[i]);
      spanProdotto[i].innerText = el[i].name;
      spanProdotto[i].style.marginTop = "0";
      spanPrezzo[i].innerText = el[i].prezzo + "euro";
      colProductName[i].appendChild(pProdotto[i]);
      colProductName[i].appendChild(pPrezzo[i]);
      $(colProductName[i]).append('<button class="btn btn-xs btn-warning searched" onClick="inCarrello(event)"id="button_aggiungi' + el[i].activity.name + '" data-name="' + el[i].name + '" ><span id="button_font">nel carrello</span></button>');

      divprodotto[i].appendChild(colImage[i]);
      divprodotto[i].appendChild(colProductName[i]);
      divprodotto[i].appendChild(imgprodotto[i]);
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
  elClicked.setAttribute("id","elcloned_"+ev.target.id)
  root2.appendChild(elClicked);
  var changedSpanText = document.getElementById('root2');
  var parentChangedSpanText = elClicked.getElementsByTagName("BUTTON")[0];
  parentChangedSpanText.setAttribute("id","elcloned_for_element_"+ev.target.id)
  parentChangedSpanText.innerText = "Togli dal carrello";
  parentChangedSpanText.removeAttribute("onClick");
  parentChangedSpanText.classList.add("animateme");
  $(parentChangedSpanText).click(function (e) {
    document.getElementById(e.target.id).parentNode.parentElement.remove();
  });
}