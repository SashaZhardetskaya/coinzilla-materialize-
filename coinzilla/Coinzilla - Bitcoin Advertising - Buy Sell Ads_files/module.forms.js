$(document).on("submit", "form[name*='form']", function(e)
{
	var selector = $(this);
	var formURL = "assets/ajax/call-"+selector.attr("action")+".php";
	if(window.FormData !== undefined)  // for HTML5 browsers
	{
	
		var formData = new FormData(this);
		$.ajax({
        	url: formURL,
			type: "POST",
			data:  formData,
			mimeType:"multipart/form-data",
			contentType: false,
    	    cache: false,
			processData:false,
			success: function(data, textStatus, $XHR)
		    {
				selector.find(".response").html(data);
		    }	        
	   });
        e.preventDefault();
   }
   else  //for olden browsers
	{
		//generate a random id
		var  iframeId = "unique" + (new Date().getTime());

		//create an empty iframe
		var iframe = $('<iframe src="javascript:false;" name="'+iframeId+'" />');

		//hide it
		iframe.hide();

		//set form target to iframe
		selector.attr("target",iframeId);

		//Add iframe to body
		iframe.appendTo("body");
		iframe.load(function(e)
		{
			var doc = getDoc(iframe[0]);
			var docRoot = doc.body ? doc.body : doc.documentElement;
			var data = docRoot.innerHTML;
			//data return from server.
			
		});
	
	}

});

$(document).on("submit", ".validate", function(e)
{
	var selector = $(this);
	var formURL = "assets/ajax/validate-"+selector.attr("action")+".php";
	if(window.FormData !== undefined)  // for HTML5 browsers
	{

		var formData = new FormData(this);
		$.ajax({
			url: formURL,
			type: "POST",
			data:  formData,
			mimeType:"multipart/form-data",
			contentType: false,
			cache: false,
			processData:false,
			success: function(data, textStatus, $XHR)
			{
				$("body").append(data);
			}
		});
		e.preventDefault();
	}
	else  //for olden browsers
	{
		//generate a random id
		var  iframeId = "unique" + (new Date().getTime());

		//create an empty iframe
		var iframe = $('<iframe src="javascript:false;" name="'+iframeId+'" />');

		//hide it
		iframe.hide();

		//set form target to iframe
		selector.attr("target",iframeId);

		//Add iframe to body
		iframe.appendTo("body");
		iframe.load(function(e)
		{
			var doc = getDoc(iframe[0]);
			var docRoot = doc.body ? doc.body : doc.documentElement;
			var data = docRoot.innerHTML;
			//data return from server.

		});

	}

});