var searchInput;
var searchValue;
var generiJson;
var productsParse;
var products;
var extract=[]

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

  $(document).ready(function() {
    searchInput = document.getElementById("submitSearch");
    generi =JSON.stringify(generi);
    generiJson = JSON.parse(generi);
    productsParse = JSON.parse(generiJson);
    //products = JSON.parse(productsParse);

    searchInput.addEventListener("click", function(){
      searchValue=document.getElementById('search').value;
      for (var c = 0; c <= productsParse.product.length; c++) {
        let temp=JSON.parse(productsParse.product[c]);
        if (temp[0].model==="main.prodotto") {
          extract.push(JSON.parse(productsParse.product[c]));
          console.log(extract.entries);
          }
        else{
          continue;
        }
      }
  });
});