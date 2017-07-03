// var x = new XMLHttpRequest();
// x.open("GET", "http://bulbapedia.bulbagarden.net/wiki/List_of_Pok%C3%A9mon_by_Kanto_Pok%C3%A9dex_number", true);
// //var x = createCORSRequest('GET', "http://bulbapedia.bulbagarden.net/wiki/List_of_Pok%C3%A9mon_by_Kanto_Pok%C3%A9dex_number");
// x.onreadystatechange = function () {
//   if (x.readyState == 4 && x.status == 200)
//   {
//   	console.log(x.responseXML);
//     var doc = x.responseXML;
    
//     var xpathtxt = doc.evaluate( "//tr/td[position() mod 4 = 3]/a", doc, null,XPathResult.ANY_TYPE , null );
//     var txt = xpathtxt.iterateNext();
//     while(txt){
// 		console.log(txt.href + "\n");
// 		//var split = txt.innerHTML.indexOf("(");
// 		//names[j] = txt.innerHTML.substring(0,split);
// 		//dates[j] = txt.innerHTML.substring(split+1,txt.innerHTML.length-1);
// 		//links[j] = path+attr.textContent;
// 		//j++;
// 		//attr = xpathattr.snapshotItem(i++);
// 		txt = xpathtxt.iterateNext();
// 	}

//   }
// };
// x.send(null);
// $.ajax({
//       url: 'http://bulbapedia.bulbagarden.net/wiki/List_of_Pok%C3%A9mon_by_Kanto_Pok%C3%A9dex_number',
//       dataType: 'text/html',
//       crossDomain: true,
//       // headers: {
//       //               'Access-Control-Allow-Origin': '*'
//       //           }, //allows to change domain
//       type: 'GET',
//       //context: document.body,
//       //data: {access_token: token, count: num_photos},
//       success: function(data){
//         console.log(data);
//         alert($('//tr/td[position()mod 4 = 3]/a', data).html());

//       },
//     error: function(data){
//     //console.log(data);
//     }
//   });
var pokemonPictureUrl = "";
var pokeUrl = "http://bulbapedia.bulbagarden.net";
var url='http://query.yahooapis.com/v1/public/yql?q=select * from html where url=\'http://bulbapedia.bulbagarden.net/wiki/List_of_Pok%C3%A9mon_by_National_Pok%C3%A9dex_number\' and xpath=\'//tr/td[position()mod 4 = 3]/a\'&format=json&callback=?';
var pokemonLinks = [];
var i = 0;
//short hand ajax call
$.getJSON( url, function(data){
    $.each(data.query.results.a, function(){   
    	//console.log(this.img.src);    
        $('body').append('<div><img src="'+this.img.src+'"div>');
        //this.href = link and this.title = pokemon name
        console.log(this);
        pokemonLinks[i++] = this.href;          
     })
    	//SECOND PATH $x("(//tr/td/a/img)[3]")
		//link to individual pokemon page
		var kantoLink = pokeUrl + pokemonLinks[0];
		//second query to get individual pokemon picture
		//pokemonPictureUrl='http://query.yahooapis.com/v1/public/yql?q=select * from html where url=\''+kantoLink+'\' and xpath=\'(//tr/td/a/img)[3]\'&format=json&callback=?';
		//console.log(pokemonPictureUrl);

		// $.getJSON( pokemonPictureUrl, function(data){
		// 	$.each(data.query.results.a, function(){ 
		// 		console.log(this);
		// 	})
		// })
		
		//getPicture(pokemonPictureUrl);
		
    // console.log(pokemonLinks.toString());
})




	//http://bulbapedia.bulbagarden.net/wiki/Charmander_(Pok%C3%A9mon)
// var link='http://query.yahooapis.com/v1/public/yql?q=select * from html where url=\'http://bulbapedia.bulbagarden.net/wiki/Charmander_(Pok%C3%A9mon)\' and xpath=\'(//tr/td/a/img)[3]\'&format=json&callback=?';
// 	$.getJSON(link, function(data){
//     		$.each(data.query.results.a, function(){
//     			console.log(this);
//     		})
//     	})



