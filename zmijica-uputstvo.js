$(document).ready(function(){

    $("#igraj-dugme").click(function(){
        if ($("#btnradio1").is(":checked")){
            tezina = 0;
        } 
        if ($("#btnradio2").is(":checked")) {
            tezina = 1;
        }
        if ($("#btnradio3").is(":checked")) {
            tezina = 2;
        }
        if ($("#btnradio4").is(":checked")) teren = 0;
        if ($("#btnradio5").is(":checked")) teren = 1;
        if ($("#btnradio6").is(":checked")) teren = 2;
        if (tezina == -1 || teren == -1){
            alert("ERROR");
            return;
        }
        let postavka = JSON.parse(localStorage.getItem("postavka"));
        postavka[0] = tezina;
        postavka[1] = teren;
        localStorage.setItem("postavka", JSON.stringify(postavka));
        window.location.href = "zmijica-igra.html";
    })

    $("#rez-dugme").click(function(){
        window.location.href = "zmijica-rezultati.html";
    });

    // $(document).keydown(function(event){
    //     alert(event.keyCode)
    // })


})

function init(){
    if (localStorage.getItem("postavka")==null){
        let p = [-1, -1]
        localStorage.setItem("postavka", JSON.stringify(p));
    }
    if (localStorage.getItem("rezultati")==null){
        let rezultati = [null, null, null, null, null]
        localStorage.setItem("rezultati", JSON.stringify(rezultati));
    }
    if (localStorage.getItem("vas-rez")==null){
        let vas = null;
        localStorage.setItem("vas-rez", JSON.stringify(vas));
    }
}