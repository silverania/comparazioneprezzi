
const HOST = "https://127.0.0.1:8000";
const MEDIAFOLDER = "media/";
var elInCarrello = Array();
var el = "";
var elements;
var prices = [];
var el2;
var buttonScontrino,divScontrino,spanscontrino;
$(document).ready(function () {
  var posizione = '<ul id="posizione">' +
    '<li>Longitudine: <span id="lon">-</span></li>' +
    '<li>Latitudine: <span id="lat">-</span></li>' +
    '<li>Coordinate identificate in (data . ora): <span id="when">-</span></li>' +
    '</ul>';
  var mymodal = '<h2>Modal Example</h2>' +

    '<button id="myBtn">Open Modal</button>' +
    '<div id="myModal" class="modal">' +
    '<div class="modal-content">' +
    '<span class="close">&times;</span>' +
    '<p>Some text in the Modal..</p>' +
    '</div></div>';

  buttonScontrino = document.createElement("button");
  divScontrino = document.createElement("div");
  spanscontrino = document.createElement("SPAN"); 
  spanscontrino.id = "sscontrino";
  spanscontrino.classList.add("badge",  "text-bg-light");
  divScontrino.id = "dscontrino";
  buttonScontrino.classList.add("btn", "btn-success");
  buttonScontrino.classList.add("me-auto");
  buttonScontrino.id = "bscontrino";
  buttonScontrino.appendChild(spanscontrino);
  divScontrino.appendChild(buttonScontrino);
  var thisnode = document.getElementById('root2');
  thisnode.appendChild(divScontrino);
  divScontrino.style.visibility="hidden";

  $(buttonScontrino).click(function (e) {
    modal = document.getElementById("myModal");
    modal.style.display = "block";
    var pModal = document.getElementById("pModal");
    var modalBody = document.getElementById("modalBody");
    var span = document.getElementsByClassName("close")[0];
    //pModal.innerText = "cazzo";
    tableCreate(elements);
  });

  function tableCreate(elements) {
    const flaotPrices = [];
    tbl = document.createElement('table');
    const header = tbl.createTHead();
    tbl.append(header);
    tbl.classList.add("table", "table-info", "table-striped");
    tbl.setAttribute("id", "tScontrino");
    tbl.style.width = '200px';
    tbl.style.border = '1px solid black';

    for (let i = 0; i <= (elements.length - 1); i++) {
      var objData = elements[i].getElementsByTagName("button");
      
      
      
      flaotPrices.push(parseFloat(objData[0].dataset.price));
      if (i == elements.length - 1) {
        
        var headerRow = document.createElement("tr");
        var headerCell = document.createElement("th");
        var headerCellPrezzo = document.createElement("th");


        headerRow.append(headerCell);
        headerRow.append(headerCellPrezzo);
        header.append(headerRow);

        headerCell.textContent = objData[0].dataset.name;
        headerCellPrezzo.textContent = objData[0].dataset.price;

        headerCell.style.border = '1px solid black';

        

      
        
        var headerRow2 = document.createElement("tr");
        var headerCell2 = document.createElement("th");
        var headerCellPrezzo2 = document.createElement("th");
       
        header.append(headerRow2);

        headerRow2.append(headerCell2);
        headerRow2.append(headerCellPrezzo2);

        var sum = flaotPrices.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        headerCellPrezzo2.textContent = sum;
        headerCell2.textContent = "totale :";
        headerRow2.append(headerCell2);
        headerRow2.append(headerCellPrezzo2);
       
      }
      else {
        var headerRow = document.createElement("tr");
        var headerCell = document.createElement("th");
        var headerCellPrezzo = document.createElement("th");


        headerRow.append(headerCell);
        headerRow.append(headerCellPrezzo);
        header.append(headerRow);
        headerCellPrezzo.textContent = parseFloat(objData[0].dataset.price);

        headerCell.textContent = objData[0].dataset.name;
        headerCellPrezzo.textContent = objData[0].dataset.price;

        headerCell.style.border = '1px solid black';
      }
    }
    
  modalBody.appendChild(tbl);
  }
  

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
  var imgBestPrice=[];
  var imagefolder='static/images/bestprice.gif';
  
  
  
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
              for (var s = elInCarrello.length -1 ; s >= 0; s--) {
                
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
  var i = 0;
  function checkLowestPrice(el) {
    var i = 0;
    var lowactivity;
    while (i <= el.prezzo.length - 1) {
      let temp = el.prezzo[i].prezzo.toString();
      if (temp != "0.00") {
        prices.push(parseFloat(temp));
        var lowestPrice = Math.min(...prices);
        lowactivity = el.prezzo[i];
        lowactivity[0] = el;
        return lowactivity;
      }
      i++;
    }
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
    var dataProdotto, dataActivity, dataPrice, dataStrada;
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
      var sup = 0;
      //rowCarrello.push(document.createElement("DIV"));
      colprodotto.push(document.createElement("DIV"));
      
      divprodotto.push(document.createElement("DIV"));
      imgprodotto.push(document.createElement("IMG"));
      imgBestPrice[i]=document.createElement("IMG");
      spanProdotto.push(document.createElement("SPAN"));
     
      pProdotto.push(document.createElement("span"));
      pPrezzo.push(document.createElement("span"));
      colImage.push(document.createElement("DIV"));
      colProductName.push(document.createElement("DIV"));
      
      elProdotto.setAttribute("class", "row");
      elProdotto.setAttribute("id", "elprodotto");
      elProdotto.classList.add("justify-content-center");
      //rowCarrello[i].classList.add("button_aggiungi");
      //rowCarrello[i].classList.add("justify-content-center");
      colprodotto[i].id = "col_" + el[i].name + "_" + el[i].supermercati.name;
      colprodotto[i].classList.add("col-6");
      colprodotto[i].classList.add("datacol", "col-auto","my-2","align-self-end");
      colprodotto[i].classList.add("button_aggiungi");
      colprodotto[i].setAttribute("data-name", el[i].pk);
      
      
      
      pProdotto[i].id =  el[i].name + "_" + el[i].supermercati.name;
      //divprodotto[i].classList.add("row");
      //divprodotto[i].width = "auto";
      //divprodotto[i].id = "div_" + el[i].name + "_" + el[i].supermercati.name;
     
      colImage[i].id = "col_Image_" + el[i].name + "_" + el[i].supermercati.name;
      colProductName[i].id = "colProductName_" + el[i].name + "_" + el[i].supermercati.name;
      pLoTroviQui[i] = document.createElement("P");
      pLoTroviQui[i].id = "p_lotrovida";
      pLoTroviQui[i].classList.add("badge", "text-bg-light");
      //pLoTroviQui[sup] = document.createElement("p");
      

      colProductName[i].appendChild(pLoTroviQui[i]);
      imgprodotto[i].setAttribute("alt", "Nessuna immagine !");
      imgprodotto[i].classList.add("img-fluid");
      imgprodotto[i].setAttribute("width", "24px");
      imgprodotto[i].setAttribute("align", "right");
      imgprodotto[i].id = "img_product_" + el[i].name + "_" + el[i].supermercati.name;
      imgprodotto[i].src = MEDIAFOLDER + (el[i].image).toString();
      imgBestPrice[i].setAttribute("alt", "Nessuna immagine !");
      imgBestPrice[i].classList.add("img-fluid");
      imgBestPrice[i].setAttribute("align", "left");
      imgBestPrice[i].id = "img_bestprice_" + el[i].name;
      imgBestPrice[i].src = imagefolder;
      var lowest = checkLowestPrice(el[i]); // alimento con prezzo piu basso
      colprodotto[i].setAttribute("data-price", lowest.prezzo);
      activityOptions ='<table id="table_'+ el[i].name +'_'+lowest.activity.name+"\"" + 'class="table-light-sm">'+
        '<tbody><tr><th scope="row"><span class="badge text-bg-secondary">' + lowest.activity.name + '</span>'+
        '</th ><td>$'+lowest.prezzo+'</td></tr > ' +
        '</tbody>' +
        '</table>';
        
       

      for (sup; sup < el[i].supermercati.length; sup++) {
        var thisPk = el[i].pk.toString();
        pSupermarketName[sup] = document.createElement('span');
        pSupermarketName[sup].classList.add("badge","bg-info");
        pSupermarketName[sup].id = "pproduct_"+el[i].name + "_" + el[i].supermercati[sup].name;
        pSupermarketName[sup].innerHTML = el[i].supermercati[sup].name;
        imgLogo[sup] = document.createElement("IMG");
       
        imgLogo[sup].setAttribute("alt", "Nessuna immagine !");
        imgLogo[sup].classList.add("img-fluid");
        imgLogo[sup].setAttribute("width", "24px");
        imgLogo[sup].setAttribute("align", "left");
        imgLogo[sup].id = "img_logo_" + el[i].name;
        imgLogo[sup].src = MEDIAFOLDER + (el[i].supermercati[sup].imageLogo).toString();
        imgLogo[sup].setAttribute("data-logo", el[i].pk);

       
        
        for (var pindex = 0; (el[i].prezzo.length - 1) >= pindex; pindex++) {
          if (el[i].prezzo[pindex].activity === null) continue;
          if (el[i].prezzo[pindex].prodotto.toString() === thisPk) {
            spanPrezzo[pindex] = document.createElement("SPAN");
            var dataProdotto = lowest[0].name;
            var dataActivity= lowest.activity.name;
            var dataPrice = lowest.prezzo;
            var dataStrada = lowest.activity.strada
            spanPrezzo[pindex].innerText = el[i].prezzo[pindex].prezzo + " euro";
            pPrezzo[i].id = "pproduct" + el[i].prezzo[pindex].prezzo + "_" + el[i].prezzo[pindex].activity.name;
          }
        }
        pSupermarketName[sup].appendChild(spanPrezzo[pindex-1]);
        pLoTroviQui[i].appendChild(imgLogo[sup]); 
        pLoTroviQui[i].innerText = lowest.activity.strada;
        //colProductName[i].appendChild(pSupermarketName[sup]);
        colProductName[i].appendChild(imgBestPrice[i]);
        $(colImage[i]).append(activityOptions);
        
        break;
      }
      colprodotto[i].appendChild(spanProdotto[i]);
      
      spanProdotto[i].innerText = el[i].name;
      spanProdotto[i].id = "mainTitle_" + el[i].name;
      spanProdotto[i].classList.add("badge", "text-bg-light");
      spanProdotto[i].style.marginTop = "0";
      colProductName[i].appendChild(pProdotto[i]);
      

      colprodotto[i].appendChild(colImage[i]);
      el2 = el[i];
      colImage[i].appendChild(imgprodotto[i]);
      colImage[i].appendChild(colProductName[i]);
      $(colprodotto[i]).append('<button class="btn btn-xs btn-success searched ani" onClick="elements=inCarrello(event,el2);' +
        '"id="button_aggiungi' + lowest.activity.name +
        '" data-name="' + el[i].name + '" data-prodotto="' + dataProdotto + '" data-price="' + dataPrice +'" data-activity="'+dataActivity + '" data-strada="' +dataStrada + '"" ><span id="button_font">nel carrello</span></button>');
     

      elProdotto.appendChild(colprodotto[i]);
      colProdotti.appendChild(elProdotto);
    }
   
  }


}
function inCarrello(ev) {
  buttonScontrino.style.visibility = "visible";
  var id = null;
  document.getElementById(ev.target.id).style.transform = "rotate(-2deg)";
  var elClicked = document.getElementById(ev.target.id).closest(".datacol").cloneNode(true);
  var butClicked = document.getElementById(ev.target.id).closest(".searched").disabled = true;
  elClicked.setAttribute("id", "elcloned_" + ev.target.id);
  elInCarrello.push(elClicked);
  spanscontrino.innerText = "fai lo scontrino per "+elInCarrello.length+ " prodotto";
  root2.appendChild(elClicked);
  
  var changedSpanText = document.getElementById('root2');
  var parentChangedSpanText = elClicked.getElementsByTagName("BUTTON")[0];
  parentChangedSpanText.setAttribute("id","elcloned_for_element_"+ev.target.id)
  parentChangedSpanText.innerText = "togli";
  parentChangedSpanText.removeAttribute("onClick");
  parentChangedSpanText.classList.add("animateme");
  parentChangedSpanText.classList.remove("searched");
  $(parentChangedSpanText).click(function (e) {
    var pos = 0;
    clearInterval(id);
    id = setInterval(frame, 1);
    function frame() {
      if (pos == -350) {
        clearInterval(id);
        elInCarrello.pop(elClicked);
        document.getElementById(e.target.id).parentNode.remove();
      } else {
        pos--;
        parentChangedSpanText.style.position = "relative"; 
        parentChangedSpanText.style.bottom = pos + 'px';
        parentChangedSpanText.style.left = pos + 'px';
      }
    }
    
    document.getElementById(ev.target.id).closest(".searched").disabled = false;
    
  })
  return elInCarrello;
  
}


