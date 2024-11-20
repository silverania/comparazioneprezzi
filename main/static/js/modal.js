$(document).ready(function () {
   
    // Get the button that opens the modal
    //var btn = document.getElementById("myBtn");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];


    // When the user clicks on the button, open the modal
    /*btn.onclick = function () {
        modal.style.display = "block";
    }*/

    // When the user clicon <span> (x), close the modal
    document.getElementsByClassName('close')[0].onclick = function () {
        //let e =document.getElementsByTagName('table');$(e).remove()
        
        var tables = modal.getElementsByTagName("table");
        var i = 0;
        while (i <= tables.length-1 ) {
            tables[i].remove();
            i++;
        }
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
   
});