$(document).ready(function(){

    let rez = JSON.parse(localStorage.getItem("rezultati"));
    for (let i = 0; i < rez.length; i++){
        if(rez[i] == null) break;
        // alert(i)
        $("#rez-" + (i + 1) + "-rb").text((i + 1) + ".");
        $("#rez-" + (i + 1) + "-ime").text(rez[i].ime);
        $("#rez-" + (i + 1) + "-poeni").text(rez[i].rez);
    }

    let vasrez = JSON.parse(localStorage.getItem("vas-rez"));
    if (vasrez != null){
        $("#rez-0-ime").text(vasrez.ime);
        $("#rez-0-poeni").text(vasrez.rez);
        localStorage.setItem("vas-rez", JSON.stringify(null))
    }
    else{
        $("#rez-0-ime").text("-");
        $("#rez-0-poeni").text("-");
    }

    // $(window).on("load", function(){

    // })

    $("#rez-nazad").click(function(){
        window.location.href = "zmijica-uputstvo.html"
    })

});