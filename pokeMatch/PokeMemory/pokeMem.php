<?php
 $con = mysqli_connect("localhost", "root", "root") or die("Oops some thing went wrong");
  mysqli_select_db($con, "pokemon") or die("Oops some thing went wrong");

 //mysqli_close($con);
?>
<!DOCTYPE html>
	<html>
		<head>
			<title>Pokemon Memory</title>
<!-- <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.0/jquery.min.js"></script> -->
		    <script src='https://code.jquery.com/jquery-2.2.4.min.js'></script>
		    <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.3.5/angular.min.js"></script>
		    <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>

			<!-- <script type="text/javascript" src="pokeMemory.js"></script> -->
			<script type="text/javascript">
				var pokemonPictureUrl = "";
				var pokeUrl = "http://bulbapedia.bulbagarden.net";
				var url='http://query.yahooapis.com/v1/public/yql?q=select * from html where url=\'http://bulbapedia.bulbagarden.net/wiki/List_of_Pok%C3%A9mon_by_National_Pok%C3%A9dex_number\' and xpath=\'//tr/td[position()mod 4 = 3]/a\'&format=json&callback=?';
				var pokemonLinks = [];
				var i = 0;
				//short hand ajax call
				$.getJSON( url, function(data){
				    $.each(data.query.results.a, function(){   
				    	console.log(this.img.src);    
				        $('body').append('<div><img src="'+this.img.src+'"div>');
				        var pokemon = this.title;
				        var link = "http://bulbapedia.bulbagarden.net" + this.href;
				        //this.href = link and this.title = pokemon name
				        <?php
				        	$pokemon = "<script>document.write(pokemon)</script>";
				        	$link = "<script>document.write(link)</script>";
						    $sql = "INSERT INTO 'pokedex' (pokemon, url) VALUES ('".$pokemon."', '".addslashes($link)."')";
						    if (mysqli_query($con, $sql)) {
						      echo "New record created successfully $pokemon<br>";
						    } else {
						      echo "Error: " . $sql . "<br>" . mysqli_error($con);
						    }

				        ?>
				        //console.log(this);
				        //pokemonLinks[i++] = this.href;          
				     })
				    	//SECOND PATH $x("(//tr/td/a/img)[3]")
						//link to individual pokemon page
						//var kantoLink = pokeUrl + pokemonLinks[0];
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
			</script>
		</head>
		<body>
			<p class = "main"></p>
			
		</body>
	</html>
