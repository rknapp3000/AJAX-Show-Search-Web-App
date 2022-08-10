//ajax calls and client side javascript
( ($) => {
	
	//Ajax request for list of shows 
	let req = { method: 'GET', url: 'http://api.tvmaze.com/shows' };

	$.ajax(req).then( (res) => {
		// $('#error').hide(); 
		$('#showList').empty();
		$('#homeLink').hide(); 
		$('#showList').hide(); 
		$('#show').hide(); 
		//Each item in the list is a link clickable to bring you to a new page with it's information.
		$.each(res, function () {
			$('#showList').append(`<li><a class="linkClicked" href='${this._links.self.href}'>${this.name}</a></li>`);
		});
		$('#showList').show();
		$('a.linkClicked').on('click', (event) => {
		event.preventDefault();
		$('#show').empty(); 
		$('#showList').hide();
		// $('#error').hide(); 

		clickedOn(event.target.href);
		$('#homeLink').show();
		$('#show').show();
		});
	});


	//The search functionality 
	$('#searchForm').submit( (event) => {
		event.preventDefault();
	
		if ($('#search_term').val().trim() == ""){ alert("Error: The search you have made is invalid you must enter a search term");}
		if (!$('#search_term').val()) { alert("Error: The search you have made is invalid");}

		//if there are no errors with the search term, continue with the get request
		else {
			let req = { method: 'GET', url: 'http://api.tvmaze.com/search/shows?q=' + $('#search_term').val() };

			$.ajax(req).then( (res) => {
				// $('#error').hide(); 
				$('#showList').empty();
				$('#homeLink').hide();
				$('#showList').hide();
				$('#show').hide();
				$.each(res, function () { $('#showList').append(`<li><a class="linkClicked" href='${this.show._links.self.href}'>${this.show.name}</a></li>`); });
				$('#showList').show();
				$('#homeLink').show();

				$('a.linkClicked').on('click', (event) => {
					event.preventDefault();
					// $('#error').hide();
					$('#showList').hide();
					$('#show').empty();
					clickedOn(event.target.href);
					$('#homeLink').show();
					$('#show').show();
					
				});
			});
		}
	});


	//When a title in the show list is clicked it will take us to another page showing information about the clicked upon show.
	let clickedOn = (showTitle) => {

		let req = { method: 'GET', url: showTitle };

		$.ajax(req).then( (res) => {
		
			// $('#error').hide();

			//------------ ERROR CHECKING -----------
			if (!res.name) { res.name = "N/A"; }
			if (res.name.trim() == "") { res.name = "N/A"; }
			if (res.image) { if (!res.image.medium) { res.image.medium = "/public/image/no_image.jpeg"; }}
			if (!res.language) { res.language = "N/A";}
			if (res.language.trim() == "") { res.language = "N/A"; }
			if (res.genres.length == 0) { res.genres = ["N/A"]; }
			if (res.rating) { if (!res.rating.average) { res.rating.average = "N/A"; }}
			if (res.network) {
				if (!res.network.name) { res.network.name = "N/A"; }
				if (res.network.name.trim() == "") { res.network.name = "N/A"; }
			}
			if (!res.summary) { res.summary = "N/A"; }
			if (res.summary.trim() == "") { res.summary = "N/A"; }
			
			//displaying the show details adding each piece of data to the page rendered
			$('#show').append(`<h1>${res.name}<h1>

				<img src="${res.image && res.image.medium ? res.image.medium : "/public/image/no_image.jpeg"}"/>

				<dl>
					<dt>Language</dt>
					<dd>${res.language}</dd>
					<dt>Genres</dt>
					<ul>${res.genres.map((genre) => `<li>${genre}</li>`)}</ul>
					<dt>Average Rating</dt>
					<dd>${res.rating.average}</dd>
					<dt>Network</dt>
					<dd>${res.network && res.network.name ? res.network.name : "N/A"}</dd>
					<dt>Summary</dt>
					<dd>${res.summary}</dd>
				</dl>`
					);
					
		});

	}

})(window.jQuery);
