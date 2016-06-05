
var baseUrl = 'https://rest.ehrscape.com/rest/v1';
var queryUrl = baseUrl + '/query';

var username = "ois.seminar";
var password = "ois4fri";


/**
 * Prijava v sistem z privzetim uporabnikom za predmet OIS in pridobitev
 * enolične ID številke za dostop do funkcionalnosti
 * @return enolični identifikator seje za dostop do funkcionalnosti
 */
function getSessionId() {
    var response = $.ajax({
        type: "POST",
        url: baseUrl + "/session?username=" + encodeURIComponent(username) +
                "&password=" + encodeURIComponent(password),
        async: false
    });
    return response.responseJSON.sessionId;
}


/**
 * Generator podatkov za novega pacienta, ki bo uporabljal aplikacijo. Pri
 * generiranju podatkov je potrebno najprej kreirati novega pacienta z
 * določenimi osebnimi podatki (ime, priimek in datum rojstva) ter za njega
 * shraniti nekaj podatkov o vitalnih znakih.
 * @param stPacienta zaporedna številka pacienta (1, 2 ali 3)
 * @return ehrId generiranega pacienta
 */
var people = [];

function generirajPodatke(ehrId) {
    var person;
    if(ehrId == 1){
        person = {ehrId:0, ime:"Peter", priimek:"Griffin", starost:33, teze:[110, 100, 90, 85]}; //vredu pacient
    }else if(ehrId == 2){
        person = {ehrId:1, ime:"Lucky", priimek:"Luke", starost:50, teze:[80, 75, 70, 90]}; //slab pacient
    }else{
        person = {ehrId:2, ime:"Iron", priimek:"Man", starost:70, teze:[90, 50, 60, 110]};  //zelo slab pacient
    }
    
  people.push(person);
  ehrId = people.length -1;
  var row = document.getElementById("people").insertRow(1);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);
  cell1.innerHTML = person.ehrId;
  cell2.innerHTML = person.ime;
  cell3.innerHTML = person.priimek;
  cell4.innerHTML = person.starost;
  
  
  $('#people tr').each(function() {
        $(this).click(function() {
            //console.log($(this).children($('td'))[0].innerHTML);
            //console.log(people[$(this).children($('td'))[0].innerHTML]);
            graphFunction(people[$(this).children($('td'))[0].innerHTML]);
            
        });
    }); 
  
  return ehrId;
}

var generacija = false;

function generiraj(){
    $("#people>tr").remove();
    generirajPodatke(3);
    generirajPodatke(2);
    generirajPodatke(1);
    generacija = true;
    
}

function vpis(){
    if( $("input#name").valueOf()=='' || $("input#surname").valueOf()=='' || $("input#age").valueOf()=='' ){
        console.log("Prazen vnos!!")
    }else{
        var name = $("input#name").val();
        var surname = $("input#surname").val();
        var age = $("input#age").val();
        console.log(name+" "+surname+" "+age)
        $("#people > tr").remove();
        var row = document.getElementById("people").insertRow(1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        cell1.innerHTML = 0;
        cell2.innerHTML = name;
        cell3.innerHTML = surname;
        cell4.innerHTML = age;
    }
    
    
}
//tudi posodobi teze

var graphFunction = function(oseba){
    //console.log(oseba);
    var stevec = [];
     $("#teze > tr").remove();
    for(var i= oseba.teze.length; i>0; i--){
      stevec.push(i); 
      var row = document.getElementById("teze").insertRow(0);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      cell1.innerHTML = i;
      cell2.innerHTML = oseba.teze[i-1];
    }    
    
    var pa = document.getElementById('graf');
    Plotly.newPlot( pa, [{
    	x: stevec,
    	y: oseba.teze }], 
    	{ margin: { t: 0 } } );
};


// TODO: Tukaj implementirate funkcionalnost, ki jo podpira vaša aplikacija
$('document').ready(function(){
     $('#people > tbody > tr').each(function() {
        $(this).click( function() {
            if(generacija){
                graphFunction($(this).td.innerHTML.parseInt)
            }else console.log("You clicked!!!");
        });
     }); 
     
     //load the graph
    var pa = document.getElementById('graf');
    Plotly.plot( pa, [{
    	x: [1, 2, 3, 4, 5],
    	y: [45, 50, 60, 55, 50] }], 
    	{ margin: { t: 0 } } );

    //add the generate thingy
    
});

