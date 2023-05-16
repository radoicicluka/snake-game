$(document).ready(function(){
    let postavka = JSON.parse(localStorage.getItem("postavka"));
    tezina = parseInt(postavka[0]);
    teren = parseInt(postavka[1]);
    let limit = -1;
    let start = -1;
    let hrana = -1;
    let superhrana = -1;
    let rezultat = 0;
    let interval = 1000;
    let smer = 3; // gore = 0, levo = 1, dole = 2, desno = 3, na pocetku, zmija uvek ide na desno
    let id;
    let superId;
    switch(teren){
        case 0:
            limit = 5;
            start = 12;
            break;
        case 1:
            limit = 8;
            start = 35;
            break;
        case 2:
            limit = 10;
            start = 54;
            break;
    }
    switch(tezina){
        case 0:
            interval = 1000;
            break;
        case 1:
            interval = 750;
            break;
        case 2:
            interval = 500;
            break;
    }

    let zmija = [start];

    $("#gore").click(function(){ 
        // Zmija ne može da se kreće unazad, zbog toga klik na dugme smera suprotnog od trenutnog smera kretanja, nema efekta
        if(smer == 2) return;
        smer = 0;
        // alert("gore")
    })
    $("#levo").click(function(){ 
        if (smer == 3) return;
        smer = 1;
        // alert("levo")
    })
    $("#dole").click(function(){ 
        if (smer == 0) return;
        smer = 2;
        // alert("dole")
    })
    $("#desno").click(function(){ 
        if (smer == 1) return;
        smer = 3; 
        // alert("desno")
    })

    $(document).keydown(function(event){
        // alert()
        switch(event.keyCode){
            case 37:
                if (smer == 3) return;
                smer = 1;
                // alert("levo")
                break;
            case 38:
                if(smer == 2) return;
                smer = 0;
                // alert("gore")
                break;
            case 39:
                if (smer == 1) return;
                smer = 3; 
                // alert("desno")
                break;
            case 40:
                if (smer == 0) return;
                smer = 2;
                // alert("dole")
                break;
        }
    });

    function kretanje(){
        id = setInterval(pomeraj, interval);
        superId = setInterval(novaSuperHrana, 10000);
    }

    function pomeraj(){
        // PROVERA DA LI JE ZMIJA UDARILA U ZID
        let sledeci = -1;
        if (smer == 0){
            sledeci = zmija[zmija.length - 1] - limit;
            if (sledeci < 0) {
                kraj();
                return;
            }
        }
        if (smer == 1){
            sledeci = zmija[zmija.length - 1] - 1;
            if (sledeci % limit == limit - 1 || sledeci < 0) {
                kraj();
                return;
            }
        }
        if (smer == 2){
            sledeci = zmija[zmija.length - 1] + limit;
            if (sledeci >= limit * limit) {
                kraj();
                return;
            }
        }
        if(smer == 3){
            sledeci = zmija[zmija.length - 1] + 1;
            if (sledeci % limit == 0) {
                kraj();
                return;
            }
        }

        // PROVERA DA LI JE ZMIJA UDARILA U SEBE
        for (let i = 0; i < zmija.length; i++){
            if (sledeci == zmija[i]){
                kraj();
                return;
            }
        }

        // PROVERA DA LI JE ZMIJA POJELA HRANU
        if (sledeci == hrana){
            zmija.push(sledeci);
            if(teren == 0){
                $("#" + sledeci + "p").css("background-color", "yellow");
                $("#" + sledeci + "p").text("");
            }
            else if( teren == 1){
                $("#" + sledeci + "o").css("background-color", "yellow");
                $("#" + sledeci + "o").text("");
            }
            else{
                $("#" + sledeci).css("background-color", "yellow");
                $("#" + sledeci).text("");
            }
            rezultat++;
            let r = JSON.parse(localStorage.getItem("rezultati"))
            let rekord = 0;
            if (r[0] != null){
                if (r[0].rez > 0) rekord = r[0].rez;
            }
            if (rezultat > rekord) rekord = rezultat;
            $("#trenutni-poeni").text("Trenutno:\xa0\xa0 " + rezultat + " \xa0\xa0\xa0\xa0\xa0\xa0 Rekord: \xa0\xa0" + rekord);
            novaHrana();
            return;
        }
        if (sledeci == superhrana){
            zmija.push(sledeci);
            if(teren == 0){
                $("#" + sledeci + "p").css("background-color", "yellow");
                $("#" + sledeci + "p").text("");
            }
            else if( teren == 1){
                $("#" + sledeci + "o").css("background-color", "yellow");
                $("#" + sledeci + "o").text("");
            }
            else{
                $("#" + sledeci).css("background-color", "yellow");
                $("#" + sledeci).text("");
            }
            rezultat += 10;
            let r = JSON.parse(localStorage.getItem("rezultati"))
            let rekord = 0;
            if (r[0] != null){
                if (r[0].rez > 0) rekord = r[0].rez;
            }
            if (rezultat > rekord) rekord = rezultat;
            $("#trenutni-poeni").text("Trenutno:\xa0\xa0 " + rezultat + " \xa0\xa0\xa0\xa0\xa0\xa0 Rekord: \xa0\xa0" + rekord);
            return;
        }

        // RESETOVANJE BOJE POLJA NA KOM JE BIO REP ZMIJE
        let rep = zmija[0];
        if(teren == 0) { 
            if (rep % 2 == 0) $("#" + rep + "p").css("background-color", "rgb(30, 30, 30)");
            else $("#" + rep + "p").css("background-color", "rgb(40, 40, 40)");
        }
        else if (teren == 1){
            let pom = 0;
            if (rep % 16 < 8) pom = 0;
            else pom = 1;
            if ((rep + pom) % 2 == 0) $("#" + rep + "o").css("background-color", "rgb(30, 30, 30");
            else $("#" + rep + "o").css("background-color", "rgb(40, 40, 40");
        }
        else{
            let pom = 0;
            if (rep % 20 < 10) pom = 0;
            else pom = 1;
            if ((rep + pom) % 2 == 0) $("#" + rep).css("background-color", "rgb(30, 30, 30");
            else $("#" + rep).css("background-color", "rgb(40, 40, 40");
        }
        
        // POMERANJE ZMIJE
        for (let i = 0; i < zmija.length - 1; i++){
            zmija[i] = zmija[i + 1];
            if (teren == 0) $("#" + zmija[i] + "p").css("background-color", "yellow");
            else if ( teren == 1) $("#" + zmija[i] + "o").css("background-color", "yellow");
            else $("#" + zmija[i]).css("background-color", "yellow");
        }
        zmija[zmija.length - 1] = sledeci;
        if (teren == 0) $("#" + sledeci + "p").css("background-color", "yellow");
        else if ( teren == 1) $("#" + sledeci + "o").css("background-color", "yellow");
        else $("#" + sledeci).css("background-color", "yellow");
    }

    function novaHrana(){
        let polje = -1;
        while(true){ // PETLJA PROVERAVA DA LI SE NOVOIZABRANO POLJE ZA HRANU POKLAPA SA ZMIJOM
            polje = Math.floor(Math.random() * limit * limit);
            if (!zmija.includes(polje) && polje != hrana) break;
        }
        if (teren == 0) $("#" + polje + "p").text("🍎");
        else if (teren == 1) $("#" + polje + "o").text("🍎");
        else $("#" + polje).text("🍎");
        hrana = polje;
    }

    function novaSuperHrana(){
        let polje = -1;
        while(true){ // PETLJA PROVERAVA DA LI SE NOVOIZABRANO POLJE ZA HRANU POKLAPA SA ZMIJOM
            polje = Math.floor(Math.random() * limit * limit);
            if (!zmija.includes(polje)) break;
        }
        if (teren == 0) $("#" + polje + "p").text("🍊");
        else if (teren == 1) $("#" + polje + "o").text("🍊");
        else $("#" + polje).text("🍊");
        superhrana = polje;
        setTimeout(izbrisiSuperHranu, 3000)
    }

    function izbrisiSuperHranu(){
        if(teren == 0) $("#"+superhrana+"p").text("");
        else if(teren == 1) $("#"+superhrana+"o").text("");
        else $("#"+superhrana).text("");
        superhrana = -1;
    }
    

    function kraj(){
        clearInterval(id);
        clearInterval(superId);
        let ime = prompt("Unesite svoje ime: ");
        // Unesi u localStorage rezultat kao klasu koja sadrzi ime i rezultat tako da moze da se sortira
        if (!ime || ime == ""){
            ime = "Nepoznati igrač";
        }
        // alert(ime + " " + rezultat);
        let igra = {
            ime: ime,
            rez: rezultat
        }
        let rezultati = JSON.parse(localStorage.getItem("rezultati"));

        // ubacivanje u opadajuce sortirani niz
        let poz = -1;
        for (let i = 0; i < rezultati.length; i++){
            if (rezultati[i] == null){
                poz = i;
                break;
            }
            if (rezultati[i].rez < rezultat){
                poz = i;
                break;
            }
        }
        if (poz > -1){ // ako je nadjeno mesto na koje treba da se ubaci, izvrsava se ubacivanje
            for (let i = rezultati.length - 1; i > poz;i--){
                rezultati[i] = rezultati[i - 1];
            }
            rezultati[poz] = igra;
        }
        localStorage.setItem("vas-rez", JSON.stringify(igra));
        localStorage.setItem("rezultati", JSON.stringify(rezultati));
        window.location.href = "zmijica-rezultati.html" // temp dok ne napravim stranicu za rezultate
    }

    // PO UČITAVANJU PROZORA, RADI SE INICIJALIZACIJA TERENA I POKRETANJE IGRE
    $(window).on("load", startovanje());

    function startovanje(){
        init2();
        kretanje();
    }

    $("#nazad").click(function(){
        clearInterval(id);
        clearInterval(superId);
        window.location.href = "zmijica-uputstvo.html";
    })

    function init2(){
        // INICIJALIZACIJA REZULTATA
        let r = JSON.parse(localStorage.getItem("rezultati"))
        let rekord = 0;
        if (r[0] != null){
            if (r[0].rez > 0) rekord = r[0].rez;
        }
        $("#trenutni-poeni").text("Trenutno:\xa0\xa0 0 \xa0\xa0\xa0\xa0\xa0\xa0 Rekord: \xa0\xa0" + rekord);

        // POSTAVLJANJE TERENA
        let postavka = JSON.parse(localStorage.getItem("postavka"));
        tezina = parseInt(postavka[0]);
        teren = parseInt(postavka[1]);
        postavka[0] = -1;
        postavka[1] = -1;
        localStorage.setItem("postavka", JSON.stringify(postavka));
        if (teren == 0) {
            limit = 5;
            $("#petpet").show();
        }
        if (teren == 1) {
            limit = 8;
            $("#osamosam").show();
        }
        if (teren == 2) {
            limit = 10;
            $("#desetdeset").show();
        }
        if (limit == -1){
            alert("ERROR");
            window.location.href = "zmijica-uputstvo.html";
        }

        // POSTAVLJANJE HRANE
        let polje = Math.floor(Math.random() * limit * limit);
        if (teren == 0) $("#" + polje + "p").text("🍎");
        if (teren == 1) $("#" + polje + "o").text("🍎");
        if (teren == 2) $("#" + polje).text("🍎");
        hrana = polje;

        // "ŠRAFIRANJE" TERENA
        if (teren == 0){
            for (let i = 0; i < limit * limit; i++){
                if (i % 2 == 0) {
                    $("#" + i + "p").css("background-color", "rgb(30, 30, 30)");
                }
                else {
                    $("#" + i + "p").css("background-color", "rgb(40, 40, 40)");
                }
            }
        }
        else {
            let n = 0;
            for (let i = 0; i < limit; i++){
                for (let j = 0; j < limit; j++){
                    if((i * limit + j + n) % 2 == 0){
                        if (teren == 1) $("#" + (i * limit + j) + "o").css("background-color", "rgb(30, 30, 30)");
                        else $("#" + (i * limit + j)).css("background-color", "rgb(30, 30, 30)");
                    }
                    else{
                        if(teren == 1) $("#" + (i * limit + j) + "o").css("background-color", "rgb(40, 40, 40)");
                        else $("#" + (i * limit + j)).css("background-color", "rgb(40, 40, 40)");
                    }
                }
                n++;
            }
        }

        // INICIJALIZACIJA ZMIJE
        if(teren == 0){
            $("#" + start + "p").css("background-color", "yellow");
            // alert(start)
        }
        if( teren == 1){
            $("#" + start + "o").css("background-color", "yellow");
        }
        else{
            $("#" + start).css("background-color", "yellow");
        }
    }


})

    
