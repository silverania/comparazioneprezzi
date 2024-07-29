const HOST = "https://127.0.0.1:8000";
const MEDIAFOLDER = "media/";

const reactElement = React.createElement(
  'h1',
null,
'Hello world!!!'
);
const domNode = document.getElementById('rootreact');
const root = ReactDOM.createRoot(domNode);
root.render(reactElement);
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
    var elProdotto = document.createElement('DIV');
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
      elProdotto.setAttribute("class", "row");
      rowCarrello[i].classList.add("row");
      rowCarrello[i].classList.add("justify-content-center");
      $(rowCarrello[i]).append('<button class="btn btn-warning" id="button_aggiungi" onclick="inCarrello()" class="btn btn-sm btn-primary"><span id="span_aggiungi_' + el[0][i].fields.name + "_" + el[0][i].pk + '">Nel Carrello</span></button>');
      colprodotto[i].classList.add("col-3");
      colprodotto[i].id = "col_" + el[0][i].fields.name + "_" + el[0][i].fields.category;
      pProdotto[i].id = "p_" + el[0][i].fields.name + "_" + el[0][i].fields.category;
      divprodotto[i].classList.add("row");
      divprodotto[i].width = "auto";
      divprodotto[i].id = "div_" + el[0][i].fields.name + "_" + el[0][i].fields.category;
      pPrezzo[i].id = "p_prezzo_" + el[0][i].fields.prezzo + "_" + el[0][i].fields.category;
      spanPrezzo[i].id = "s_prezzo_" + el[0][i].fields.prezzo;
      colImage[i].id = "col_Image_" + el[0][i].fields.name + "_" + el[0][i].fields.category;
      colProductName[i].id = "colProductName_" + el[0][i].fields.name + "_" + el[0][i].fields.category;
      colImage[i].classList.add("col-7");
      colImage[i].classList.add("col-md-7");
      colProductName[i].classList.add("col-5");
      colProductName[i].classList.add("col-md-5");
      imgprodotto[i].setAttribute("alt", "Nessuna immagine !");
      imgprodotto[i].id = "img_product_" + el[0][i].fields.name + "_" + el[0][i].fields.category;
      imgprodotto[i].src = MEDIAFOLDER + (el[0][i].fields.image).toString();
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
      elProdotto.appendChild(colprodotto[i]);
      colProdotti.appendChild(elProdotto);
    }
    return elProdotto;
  }


}
function inCarrello() {
  alert("aggiunto carrello!");
}