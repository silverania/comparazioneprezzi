
const HOST = "https://127.0.0.1:8000";
const MEDIAFOLDER = "media/";
var elInCarrello = Array();
var el = "";
var jsonEl;
var prices=[];
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
        try{
          if (productsParse[c].name.toUpperCase().includes(searchValue.toUpperCase())) {
            if (elInCarrello.length != 0) {
              for (var s = 0; s < elInCarrello.length; s++) {
                if (productsParse[c].activity.id != elInCarrello[s]) {
                  extract.push(productsParse[c]);
                  console.log("c'è cacat UCAZZZ");
                }
              }
            }
            else {
              extract.push(productsParse[c]);
            }


            
           
          }
          else { continue; }
        }
        catch (e) {
          console.log("no il tipo che mi aspetto!");
        }
        
    }
    addElementToScreeen(extract);
  }
  );

  // cerca alimenti comunui in array
  function intersect_arrays(a, b) {
    var sorted_a = a.concat().sort();
    var sorted_b = b.concat().sort();
    var common = [];
    var a_i = 0;
    var b_i = 0;

    while (a_i < a.length
      && b_i < b.length) {
      if (sorted_a[a_i] === sorted_b[b_i]) {
        common.push(sorted_a[a_i]);
        a_i++;
        b_i++;
      }
      else if (sorted_a[a_i] < sorted_b[b_i]) {
        a_i++;
      }
      else {
        b_i++;
      }
    }
    return common;
  }
  function checkLowestPrice(el) {
    var i = 0;
    var prices=[];
    while (i < el.length) {
      prices.push(parseFloat(el[i].prezzo)); 
      i++;
      }
    var lowestPrice = Math.min(...prices);
    return el[i];
  }

  function addElementToScreeen(el) {
    var e = document.getElementById('colprodotti'); // cancello ricerca precedente 
    e.innerHTML = "";
    var buttons = document.getElementsByClassName("searched");
    var buttons = Array.from(buttons);
    while ((buttons.length - 1) >= 0) {
      buttons.pop();
    }
    while (colProductName.length > 0) {
      colProductName.pop();
    }
    var rowCarrello = [];
    var pProdotto = [];
    var colprodotto = [];
    var divprodotto = [];
    var elProdotto = document.createElement('DIV');
    


    for (i = 0; i < el.length; i++) {
      jsonEl = el[i].activity.id;
      //rowCarrello.push(document.createElement("DIV"));
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
      //rowCarrello[i].classList.add("row");
      //rowCarrello[i].classList.add("button_aggiungi");
      //rowCarrello[i].classList.add("justify-content-center");
      colprodotto[i].id = "col_" + el[i].name + "_" + el[i].activity.name;
      colprodotto[i].classList.add("col-5");
      colprodotto[i].classList.add("datacol");
      colprodotto[i].classList.add("button_aggiungi");
      colprodotto[i].setAttribute("data-price", el[i].prezzo);
      pProdotto[i].id = "p_" + el[i].name + "_" + el[i].activity.name;
      //divprodotto[i].classList.add("row");
      //divprodotto[i].width = "auto";
      //divprodotto[i].id = "div_" + el[i].name + "_" + el[i].activity.name;
      pPrezzo[i].id = "p_prezzo_" + el[i].prezzo + "_" + el[i].activity.name + "_" + el[i].inOfferta;
      spanPrezzo[i].id = "s_prezzo_" + el[i].prezzo+  "_" + el[i].genere.inOfferta;
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
      $(colProductName[i]).append('<button class="btn btn-xs btn-warning searched" onClick="inCarrello(event,jsonEl)"id="button_aggiungi' + el[i].activity.name + '" data-name="' + el[i].name + '" ><span id="button_font">nel carrello</span></button>');

      colprodotto[i].appendChild(colImage[i]);
      colprodotto[i].appendChild(colProductName[i]);
      colprodotto[i].appendChild(imgprodotto[i]);

      elProdotto.appendChild(colprodotto[i]);
      colProdotti.appendChild(elProdotto);
    }
    var lowest = checkLowestPrice(el); // alimento con prezzo piu basso
  }


}
function inCarrello(ev,el) {
  var elClicked = document.getElementById(ev.target.id).closest(".datacol").cloneNode(true);
  var butClicked = document.getElementById(ev.target.id).closest(".searched").disabled = true;
  elClicked.setAttribute("id", "elcloned_" + ev.target.id)
  elInCarrello.push(elClicked);
  root2.appendChild(elClicked);
  var changedSpanText = document.getElementById('root2');
  var parentChangedSpanText = elClicked.getElementsByTagName("BUTTON")[0];
  parentChangedSpanText.setAttribute("id","elcloned_for_element_"+ev.target.id)
  parentChangedSpanText.innerText = "Togli dal carrello";
  parentChangedSpanText.removeAttribute("onClick");
  parentChangedSpanText.classList.add("animateme");
  parentChangedSpanText.classList.remove("searched");
  $(parentChangedSpanText).click(function (e) {
    elInCarrello.pop(elClicked)
    document.getElementById(e.target.id).parentNode.parentElement.remove();
  });
}


