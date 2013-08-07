Wikify
======

Wikipedia Jquery Plugin 

Wikify obtiene definiciones de wikipedia para tus textos y los muestra en una etiqueta. Necesitas instalar qtip2 desde http://qtip2.com/

Usos
======
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



