//get all pokemon sprites, pick 24 randomly, add 2 each to array of strings, go to each td id and randomly pick img from string and set as name property
var url='https://query.yahooapis.com/v1/public/yql?q=select * from htmlstring where url=\'http://bulbapedia.bulbagarden.net/wiki/List_of_Pok%C3%A9mon_by_National_Pok%C3%A9dex_number\' and xpath=\'//tr/td[position()mod 4 = 3]/a\'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=?';
var pokemonLinks = [];
var currGameLinks = [];
var firstClicked = null;
var secondClicked = null;
var turn;
var player1 = null;
var player2 = null;
var pokeball = "PokeMemory/p01.jpg";
var matched = [];
var vm;

function setTiles(){
    //short hand ajax call
    $.getJSON( url, function(data){
        //console.log(data.query.results.result);
        var str = data.query.results.result.split('</a>');
        //console.log(str[847]);
        //str[846] = null;
        //str[845] = null;
        str.splice(846, 1);
        var i;
        $.each(str, function(){ 
        //console.log(this.toString());
        var index = this.toString().indexOf('src=');
        var pic = this.toString().substring(index+5, index+48);
        if(pic.charAt(pic.length - 1) != 'g'){
            pic = pic + 'g';
            //console.log("good save");
        }
        console.log(pic);  
                //onsole.log(this.img.src);
                pokemonLinks.push("https:" + pic);
                    // if(i<50){
                    //     //OK this sets id to the img source
                        
                    //         $('#'+i).attr('name', this.img.src);
                    //         //$('#'+i).css('background-image', 'url('+this.img.src+')');
                    // //var pokemon = this.title;
                    // //var link = "http://bulbapedia.bulbagarden.net" + this.href;
                    //     i++;
                    // }

            })
        //pick random pokemon from list and remove from master list.
        for(i = 0; i < 24; i++){
            var item = pokemonLinks[Math.floor(Math.random()*pokemonLinks.length)];
            var index = pokemonLinks.indexOf(item);
            if (index > -1) {
                pokemonLinks.splice(index, 1);
            }
            currGameLinks.push(item);
            currGameLinks.push(item);
        }
        //set the board
        console.log(currGameLinks.length);
        for(i=1;i<49;i++){
            var item = currGameLinks[Math.floor(Math.random()*currGameLinks.length)];
            var index = currGameLinks.indexOf(item);
            if (index > -1) {
                currGameLinks.splice(index, 1);
            }
            $('#'+i).attr('name', item);
        }
    })
    
}


$(document).ready(function(){
    var turnCount=0;
    //on load check if player one has logged in
    if(player1 != null && player1.name != null){
        //$(player1.name).insertAfter( $('.player1Img') );
        $('#player1Info').append(player1.name);
        if(player1.wins < 5){
            $('#player1Info').append("<img class=\"wins\" src=\"PokeMemory/pokeballSprite.png\">");
        }
        else if(player1.wins < 10){
            $('#player1Info').append("<img class=\"wins\" src=\"PokeMemory/greatballSprite.png\">");
        }
        else if(player1.wins < 15){
            $('#player1Info').append("<img class=\"wins\" src=\"PokeMemory/ultraballSprite.png\">");
        }
        else if(player1.wins < 20){
            $('#player1Info').append("<img class=\"wins\" src=\"PokeMemory/masterballSprite.png\">");
        }
        else {
            $('#player1Info').append("<img class=\"wins\" src=\"PokeMemory/beastballSprite.png\">");
        }
        $('.player1').css('display', 'inline-block');
        }
    // console.log($(this).css('background-image'));
        //game logic
    $('#board').find('td').on('click', function(){

           //  if (turnCount % 2 === 0){
           //    $(this).text('X'); 
           //    checkVictory('X');
           //  } else {
           // //player 2's turn (O)
           //    $(this).text('O');
           //    checkVictory('O');
           //  }
        //check if waiting to reset
        if (firstClicked != null && secondClicked != null) {
            return;
        }
        //check if already matcheed
        if (matched.includes($(this).attr('id'))){
            return;
        }
        // if($(this).css('background-image') != pokeball){
        //     console.log("clicked tile already won");
        //     return;
        // }
        //set background image to pokemon

        $(this).css('background-image', 'url('+$(this).attr('name')+')');
           //console.log($(this).attr('name'));
        turnCount++;
        //setting firstClicked equal to tile
        if(firstClicked == null){
            firstClicked = this;
            console.log($(firstClicked).attr('id'));
        }
        //checking if clicked same tile twice
        else if ($(firstClicked).attr('id') == $(this).attr('id')){
            return;
        }
        else  
        {
            secondClicked = this;
            //checking if match
            if($(secondClicked).attr('name') == $(firstClicked).attr('name')){
                console.log("match");
                $(".pokedex_body").append("<img src=\""+$(secondClicked).attr('name')+"\"/>");
                //checking if player one match
                if(player1.turn){
                    console.log("player 1 match");
                    $(".player1Catches").append("<img src=\""+$(secondClicked).attr('name')+"\"/>");
                    player1.score++;
                    //check if game over
                    checkVictory();

                }
                else{
                    console.log("player 2 match");
                    $(".player2Catches").append("<img src=\""+$(secondClicked).attr('name')+"\"/>");
                    player2.score++;
                    //check if game over
                    checkVictory();
                }
                matched.push($(secondClicked).attr('id'));
                matched.push($(firstClicked).attr('id'));
                firstClicked = null;
                secondClicked = null;

            }
            else{

                setTimeout(function () {
                    $(secondClicked).css('background-image', 'url('+pokeball+')');
                    $(firstClicked).css('background-image', 'url('+pokeball+')');
                    firstClicked = null;
                    secondClicked = null;
                    if(player2 != null){
                        if(player1.turn){
                            player1.turn = false;
                            player2.turn = true;
                            $(".player1Img").attr("src","PokeMemory/trainer1.png");
                            $(".player2Img").attr("src","PokeMemory/player2Turn.png");
                        }
                        else{
                            player1.turn = true;
                            player2.turn = false;
                            $(".player1Img").attr("src","PokeMemory/player1Turn.png");
                            $(".player2Img").attr("src","PokeMemory/trainer2.png");
                        }
                    }
                }, 1500);
            }  
        }
    })
    $('#newGame1').on('click',function(){
        //console.log(this.innerHTML);
        //attempt at animation
        //myMove();
        // if(player1 == null){
        //    $("#login").modal(); 
        // }
        
        pokemonLinks = [];
        currGameLinks = [];
        setTiles();
        gameStartAnimation();
        $('.square').css('background-image', 'url('+pokeball+')');
        if(player1 == null){
            player1 = new Player(true,0);
        }
        else{
            player1.turn = true;
            player1.score = 0;
        }
        
        player2 = null;
        $(".player1Img").attr("src","PokeMemory/trainer.png");
        $('.player1').css('display', 'inline-block');
        $('.player2').css('display', 'none');
        matched = [];
        $(".player1Catches").html("");
        $(".player2Catches").html("");
        //document.getElementById("row1").rows[0].innerHTML='<img src="PokeMemory/Pokeball.PNG>"';
    })
    $('#newGame2').on('click',function(){
        //console.log(this.innerHTML);
        // if(player1 == null){
        //    $("#login").modal(); 
        // }
        pokemonLinks = [];
        currGameLinks = [];
        setTiles();
        gameStartAnimation();
        $('.square').css('background-image', 'url('+pokeball+')');
        
        if(player1 == null){
            player1 = new Player(true,0);
        }
        else{
            player1.turn = true;
            player1.score = 0;
        }
        if(player2 == null){
            player2 = new Player(false,0);
        }
        else {
            player2.turn = false;
            player2.score = 0;
        }
        
        $(".player1Img").attr("src","PokeMemory/player1Turn.png");
        $(".player2Img").attr("src","PokeMemory/trainer2.png");
        $('.player1').css('display', 'inline-block');
        $('.player2').css('display', 'inline-block');
        matched = [];
        $(".player1Catches").html("");
        $(".player2Catches").html("");
        //document.getElementById("row1").rows[0].innerHTML='<img src="PokeMemory/Pokeball.PNG>"';
    })
    $('.pokeball_select').on('click',function(){
        //console.log(this.innerHTML);
        pokeball = this.src;
        if(player1 != null){
            setTiles();
            $('.square').css('background-image', 'url('+pokeball+')');
        }
        
        $("#pokeball_select").modal("toggle");
        //document.getElementById("row1").rows[0].innerHTML='<img src="PokeMemory/Pokeball.PNG>"';
    })

    function loginPlayer(username,wins){
    //player1 = new Player(true, 0);
    console.log(username+ " =>" + wins);
    player1 = new Player(true,0);
    player1.setName(username);
    player1.setWins(wins);
    //$('.player1').append("<b>"+player1.name+"</b>");
    $( '<p>'+player1.name+'</p>' ).insertAfter( $('.player1Img') );
    $('.player1').css('display', 'inline-block');
    console.log("player1 logged in");
    }

    vm = new Vue({
    el: '#player2Info',
    data: {
        message: 'Hello Vue.js!',
        pokeball: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA'
    },
    methods: {
        setName2: function () {
          this.message = player2.name
        },
        setPokeball: function () {
            if(player2.wins < 5){
                //$("<img class=\"wins\" src=\"PokeMemory/pokeballSprite.png\">").insertBefore('.player2Img');
                this.pokeball = "PokeMemory/pokeballSprite.png"
            }
            else if(player2.wins < 10){
                //$("<img class=\"wins\" src=\"PokeMemory/greatballSprite.png\">").insertBefore('.player2Img');
                this.pokeball = "PokeMemory/greatballSprite.png"
            }
            else if(player2.wins < 15){
                //$("<img class=\"wins\" src=\"PokeMemory/ultraballSprite.png\">").insertBefore('.player2Img');
                this.pokeball = "PokeMemory/ultraballSprite.png"
            }
            else if(player2.wins < 20){
                //$("<img class=\"wins\" src=\"PokeMemory/masterballSprite.png\">").insertBefore('.player2Img');
                this.pokeball = "PokeMemory/masterballSprite.png"
            }
            else {
                //$("<img class=\"wins\" src=\"PokeMemory/beastballSprite.png\">").insertBefore('.player2Img');
                this.pokeball = "PokeMemory/beastballSprite.png"
            }
        }
      }
    })

})
     
    
    function checkVictory(){
        //TODO on win update pokedex and win to database display modal to restart match
        if(player2 == null){
            if(player1.score < 24){
                return;
            }
            else{
                //player1wins
                if(player1.name != null){
                    //update database
                    //player1.wins++;
                    console.log(player1.wins);
                    //player1.wins += 1;
                    UpdateRecord(player1);
                    player1.score = 0;

                }
                alert("player 1 wins");
            }
        }
        else{
            if((player1.score + player2.score) == 24){
                if(player2.score > player1.score){
                    //player2.wins += 1;
                    UpdateRecord(player2);
                    alert("player 2 wins");
                }
                else if(player2.score < player1.score){
                    //player1.wins += 1;
                    UpdateRecord(player1);
                    alert("player 1 wins");

                }
                else{
                    alert("Draw!");
                }
                player1.score = 0;
                player2.score = 0;
            }
        }
    }
//TODO add wins and name
class Player {
  constructor(turn, score) {
    this.turn = turn;
    this.score = score;
    this.name = null;
    this.wins = 0;
  }

    setName(name){
    this.name = name;
    console.log("name = " + name);
  }
    setWins(wins){
    this.wins = wins;
    console.log("wins = " + wins);
  }
}

function gameStartAnimation(){
    // var i = 1;
    // while(i < 9){
    //     setTimeout(function () {
    //         $('#'+i).css('background-color', 'black');
    //         i++;
    //         }, 500);
    // }
    //console.log("testingtesting");
}

function myMove() {
  var elem = document.getElementById("myAnimation");   
  var pos = 0;
  var id = setInterval(frame, 0.1);
  function frame() {
    if (pos == 350) {
      clearInterval(id);
    } else {
      pos++; 
      elem.style.top = pos + 'px'; 
      elem.style.left = pos + 'px'; 
    }
  }
}

function loginPlayer(username,wins){
    //player1 = new Player(true, 0);
    console.log(username+ " =>" + wins);
    player1 = new Player(true,0);
    player1.setName(username);
    player1.setWins(wins);
    // player1.wins += 1;
    // UpdateRecord(player1);
    //$('.player1').append("<b>"+player1.name+"</b>");
    
    console.log("player1 logged in");
}

function loginPlayer2(login){
    var username = $('#username2').val();
    var login = login;
    var password = $('#password2').val();
    player2 = new Player(false,0);
    player2.setName(username);
    //player 2 login
    if(login == "Login"){
        jQuery.ajax({
           type: "POST",
           url: "login.php",
           data: {username: username, password: password},
           cache: false,
           success: function(response)
           {
             //check if you need to update pokeball
             //alert(response);
             if(response == "failure"){
                alert("Failed to log in username "+username);
                return;
             }

            
            
            player2.setWins(response);
            //UpdateRecord(player2);
            //using Vue to set name of player 2!!!!
            vm.setName2();
            vm.setPokeball();
            // if(player2.wins < 5){
            //     $("<img class=\"wins\" src=\"PokeMemory/pokeballSprite.png\">").insertBefore('.player2Img');
            // }
            // else if(player2.wins < 10){
            //     $("<img class=\"wins\" src=\"PokeMemory/greatballSprite.png\">").insertBefore('.player2Img');
            // }
            // else if(player2.wins < 15){
            //     $("<img class=\"wins\" src=\"PokeMemory/ultraballSprite.png\">").insertBefore('.player2Img');
            // }
            // else if(player2.wins < 20){
            //     $("<img class=\"wins\" src=\"PokeMemory/masterballSprite.png\">").insertBefore('.player2Img');
            // }
            // else {
            //     $("<img class=\"wins\" src=\"PokeMemory/beastballSprite.png\">").insertBefore('.player2Img');
            // }
            //$(player2.name).insertBefore('.player2Img');
            
             //console.log("player 2 logged in");
           }
         });
        //player2.wins = 0;
        //console.log("player "+ player2.name +" wins = " + player2.wins);
        //UpdateRecord(player2);
    }
    //player 2 register
    else {

        jQuery.ajax({
           type: "POST",
           url: "register.php",
           data: {username: username, password: password},
           cache: false,
           success: function(response)
           {
            if(response == "failure"){
                alert("Failed to register username "+username);
                return;
            }
            player2 = new Player(false,0);
            player2.setName(username);
            $("<img class=\"wins\" src=\"PokeMemory/pokeballSprite.png\">").insertBefore('.player2Img');

            //$(player2.name).insertBefore('.player2Img');
            vm.setName2();
            
             //console.log("player 2 logged in");
           }
         });
    }    
    //hide login and modal
    $('.login2-trigger').css('display', 'none');
    //console.log(username + " " + login);
    $("#login2").modal("toggle");
    return false;
}
function UpdateRecord(player)
  {
    player.wins++;
    jQuery.ajax({
       type: "POST",
       url: "update.php",
       data: {username: player.name, wins: player.wins},
       cache: false,
       success: function(response)
       {
        console.log(response);
         //check if you need to update pokeball
         console.log("wins updated to "+player.wins);
       }
     });
 }



