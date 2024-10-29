
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
  var pLoTroviQui = [];
  var pSupermarketName = [];
  var imgLogo = [];
  
  
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
    constructor(nome, image,imageLogo, descrizione, prezzo, disponibile, creato, aggiornato, inOfferta) {
      this.nome = nome;
      this.slug = slug;
      this.image = image;
      this.imageLogo = imageLogo;
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
              for (var s = elInCarrello.length; s > 0; s--) {
                if (s == elInCarrello.length) {
                  s = s - 1;
                  if (productsParse[c].pk != elInCarrello[s].dataset.name) {
                    if (s == 0) {
                      extract.push(productsParse[c]);
                    }
                    else {
                      continue;
                    }
                  }
                
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
  
  
  function ani() {
    document.getElementById('img').className = 'classname';
  }
  function ani() {
    document.getElementById('button').className = 'ani';
  }
  
  function addElementToScreeen(el) {
    var e = document.getElementById('colprodotti'); // cancello ricerca precedente 
    e.innerHTML = "";
    var buttons = document.getElementsByClassName("searched");
    var buttons = Array.from(buttons);
    while ((buttons.length - 1) >= 0) {
      buttons.pop();
    }
    while ((colProductName.length -1 )>= 0) {
      colProductName.pop();
    }
    var rowCarrello = [];
    var pProdotto = [];
    var colprodotto = [];
    colImage = [];
    var imgLogo = [];
    var divprodotto = [];
    var elProdotto = document.createElement('DIV');
    var i = 0;
    

    for (i ; i < el.length; i++) {
      jsonEl = el[i].pk;
      var sup = 0;
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
      elProdotto.classList.add("justify-content-center");
      //rowCarrello[i].classList.add("button_aggiungi");
      //rowCarrello[i].classList.add("justify-content-center");
      colprodotto[i].id = "col_" + el[i].name + "_" + el[i].supermercati.name;
      colprodotto[i].classList.add("col-5");
      colprodotto[i].classList.add("datacol");
      colprodotto[i].classList.add("button_aggiungi");
      colprodotto[i].setAttribute("data-price", el[i].prezzo);
      colprodotto[i].setAttribute("data-name", el[i].pk);
      
      
      
      pProdotto[i].id = "p_" + el[i].name + "_" + el[i].supermercati.name;
      //divprodotto[i].classList.add("row");
      //divprodotto[i].width = "auto";
      //divprodotto[i].id = "div_" + el[i].name + "_" + el[i].supermercati.name;
      pPrezzo[i].id = "p_prezzo_" + el[i].prezzo + "_" + el[i].supermercati.name + "_" + el[i].inOfferta;
      spanPrezzo[i].id = "s_prezzo_" + el[i].prezzo+  "_" + el[i].genere.inOfferta;
      colImage[i].id = "col_Image_" + el[i].name + "_" + el[i].supermercati.name;
      colProductName[i].id = "colProductName_" + el[i].name + "_" + el[i].supermercati.name;
      pLoTroviQui[i] = document.createElement("P");
      //pLoTroviQui[sup] = document.createElement("p");
      pLoTroviQui[i].innerText = "Lo trovi da ";

      colProductName[i].appendChild(pLoTroviQui[i]);
      imgprodotto[i].setAttribute("alt", "Nessuna immagine !");
      imgprodotto[i].classList.add("img-fluid");
      imgprodotto[i].setAttribute("width", "24px");
      imgprodotto[i].setAttribute("align", "right");
      imgprodotto[i].id = "img_product_" + el[i].name + "_" + el[i].supermercati.name;
      imgprodotto[i].src = MEDIAFOLDER + (el[i].image).toString();

      
      for (sup; sup < el[i].supermercati.length; sup++) {
        pSupermarketName[sup] = document.createElement('P');
        pSupermarketName[sup].id = el[i].name + "_" + el[i].supermercati[sup].name;
        pSupermarketName[sup].innerHTML = el[i].supermercati[sup].name;
        imgLogo[sup] = document.createElement("IMG");
        imgLogo[sup].setAttribute("alt", "Nessuna immagine !");
        imgLogo[sup].classList.add("img-fluid");
        imgLogo[sup].setAttribute("width", "24px");
        imgLogo[sup].setAttribute("align", "right");
        imgLogo[sup].id = "img_logo_" + el[i].name;
        imgLogo[sup].src = MEDIAFOLDER + (el[i].supermercati[sup].imageLogo).toString();
        imgLogo[sup].setAttribute("data-logo", el[i].pk);
        colProductName[i].appendChild(imgLogo[sup]); 
        pLoTroviQui[i].appendChild(pSupermarketName[sup]);
      }
      pProdotto[i].appendChild(spanProdotto[i]);
      pPrezzo[i].appendChild(spanPrezzo[i]);
      spanProdotto[i].innerText = el[i].name;
      spanProdotto[i].style.marginTop = "0";
      spanPrezzo[i].innerText = el[i].prezzo + "euro";
      colProductName[i].appendChild(pProdotto[i]);
      colProductName[i].appendChild(pPrezzo[i]);

      colprodotto[i].appendChild(colImage[i]);
      
      colImage[i].appendChild(imgprodotto[i]);
      colImage[i].appendChild(colProductName[i]);
      $(colprodotto[i]).append('<button class="btn btn-xs btn-primary searched ani" onClick="inCarrello(event,jsonEl);"id="button_aggiungi' + el[i].supermercati.name + '" data-name="' + el[i].name + '" ><span id="button_font">nel carrello</span></button>');
     

      elProdotto.appendChild(colprodotto[i]);
      colProdotti.appendChild(elProdotto);
    }
    var lowest = checkLowestPrice(el); // alimento con prezzo piu basso
  }


}
function inCarrello(ev, el) {
  document.getElementById(ev.target.id).style.transform = "rotate(-2deg)";
  var elClicked = document.getElementById(ev.target.id).closest(".datacol").cloneNode(true);
  var butClicked = document.getElementById(ev.target.id).closest(".searched").disabled = true;
  elClicked.setAttribute("id", "elcloned_" + ev.target.id)
  elInCarrello.push(elClicked);
  root2.appendChild(elClicked);
  var changedSpanText = document.getElementById('root2');
  var parentChangedSpanText = elClicked.getElementsByTagName("BUTTON")[0];
  parentChangedSpanText.setAttribute("id","elcloned_for_element_"+ev.target.id)
  parentChangedSpanText.innerText = "togli";
  parentChangedSpanText.removeAttribute("onClick");
  parentChangedSpanText.classList.add("animateme");
  parentChangedSpanText.classList.remove("searched");
  $(parentChangedSpanText).click(function (e) {
    elInCarrello.pop(elClicked)
    
     document.getElementById(e.target.id).parentNode.remove();
  });
}


