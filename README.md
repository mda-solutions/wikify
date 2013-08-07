Wikify
======

Wikipedia Jquery Plugin 

Wikify obtiene definiciones de wikipedia para tus textos y los muestra en una etiqueta. Necesitas instalar qtip2 desde http://qtip2.com/

Usos
======

<p class= "wiki">
	Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vitae rhoncus ligula, dictum vulputate urna. Donec pretium faucibus erat quis tempus. Vivamus cursus diam quis sagittis viverra. Donec lobortis elit vel quam pretium placerat. Suspendisse nec urna nunc. Fusce diam lacus, lobortis eget rhoncus ut, mattis eget dolor. Nullam a nisl eu nisl lacinia elementum eget ut nisi. Quisque elementum, ante pretium lobortis fermentum, ante ante laoreet metus, non tincidunt felis leo ac justo. Integer pellentesque volutpat malesuada.	
</p>

<pre> 
	<p class= "wikify" params="lorem|dolor">
		Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vitae rhoncus ligula, dictum vulputate urna. Donec pretium faucibus erat quis tempus. Vivamus cursus diam quis sagittis viverra. Donec lobortis elit vel quam pretium placerat. Suspendisse nec urna nunc. Fusce diam lacus, lobortis eget rhoncus ut, mattis eget dolor. Nullam a nisl eu nisl lacinia elementum eget ut nisi. Quisque elementum, ante pretium lobortis fermentum, ante ante laoreet metus, non tincidunt felis leo ac justo. Integer pellentesque volutpat malesuada.	
	</p>
	<script type="text/javascript">
		$(document).ready(function()
	 	{
	 		//Busca dentro de los elementos con clase "wiki" las palabras "lorem" y "dolor"
	 		//en la Wikipedia y muestra la definición
			$('.wiki').wikify
			({
				definitions: ['Lorem', 'dolor']
			}); 		

			//Autocarga: Busca dentro de los elementos con clase "wikify" las palabras 
			//especificadas en el atributo "params" separadas por "pipes(|)"
			$('.wikify').each(function(key, value)
			{
				var self   = $(this);
				var params = self.attr('params');
				self.wikify(
				{
					definitions: params.split('|')
				});			
			});

	 	});
	</script>

</pre>

