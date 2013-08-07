/*
 * jquery.wikify
 *
 * Copyright (c) 2013 moises.rangel@gmail.com
 * http://mda-solutions.aws.af.cm
 *
 * Licensed under MIT
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Launch      : July 2013
 * Version     : .01-beta1
 * Dependencies: qtip (http://qtip2.com/)
 */

	(function($) {

    $.fn.wikify = function(options) 
    {
		var text        = $(this).text();
		var definitions = options.definitions
		var words       = text.split(' ');   
		var self		= $(this);

		//tmp container
		$('body').append('<div id="wikify_tmp_container"></div>');

		var wikipediaHTMLResult = function(data, definition) 
		{		   
		    var datatext = data.parse.text['*'];		 
		    var readData = $('<div style="display:none;">' + datatext	 + '</div>');

		    // handle redirects
		    var redirect = readData.find('li:contains("REDIRECT") a').text();
		    if(redirect != '') 
		    {
		    	callWikipediaAPI(redirect);
		        return;
		    }

		    $('#wikify_tmp_container').html(readData);		   

		    var definition_value = null
		    var imageURL        = null;

		    // Check if page has images
		    if(data.parse.images.length >= 1) 
		    {
		        image        = data.parse.images[0];
		        var images   = $('#wikify_tmp_container IMG');
		        imageURL     = $(images[0]).attr('src');
		    }

		    //get definition
		    var paras           = $('#wikify_tmp_container P');
		    var pattern         = "_";
    		var re              = new RegExp(pattern, "g");
		    var definition_text = definition.replace(re, ' ');

		    $.each(paras, function(index, value)
	    	{
	    		var p    = $(value);
	    		var find = p.text().search(definition_text);
	    		if(find > -1 && p.text().length > 100)
	    		{ 
	    			definition_value = p.text(); 
	    			return false;
	    		}

	    	});

		    var htmlimage       = (imageURL != null) ? '<div><img src="http:'+ imageURL + '"/>' : '';
		    var htmldefinition  = (definition_value != null) ? '<div>'+ definition_value +'</div>' : '';

		    $('#wikify_tmp_container').html('');

		    return  htmldefinition;

		};

		function callWikipediaAPI(wikipediaPage, qtip_api) 
		{
			// http://www.mediawiki.org/wiki/API:Parsing_wikitext#parse		
			function gateway(data)
			{
				var v = wikipediaHTMLResult(data, wikipediaPage);
				qtip_api.set('content.title', wikipediaPage);
				qtip_api.set('content.text', v);
			}

		    $.getJSON(
		    			'http://es.wikipedia.org/w/api.php?action=parse&format=json&callback=?', 
		    			{ 
		    				page:wikipediaPage, 
		    				prop:'text|images', 
		    				uselang:'es'
		    			}, 
		    			gateway);
		}

		$.each(words, function(index, value)
		{
			if(definitions.indexOf(value) != -1)
			{  	
				oldhtml     = self.html();
				var newhtml = oldhtml.replace(value, '<a style="cursor:pointer" class="wikify_link" href="javascript:void(0)">'+ value +'</a>');
				self.html(newhtml);
			}			
		});

		$('a.wikify_link').qtip(
			{
				content: 
				{
					text : function(event, api)
					{
						var definition = $(this).text();
						callWikipediaAPI(definition, api)						
						return 'Loading...';	
					}
				}
			});									
    }

}(jQuery));