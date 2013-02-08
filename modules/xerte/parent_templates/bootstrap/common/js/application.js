
$(document).ready(init);

function init()
{	
	loadContent(0);
};

function initMedia()
{
	$('audio,video').mediaelementplayer();
}

function initSidebar(){
	var $window = $(window)
	
	//TOC
	$('.bs-docs-sidenav').affix
	(
		{
			offset: 
			{
				top: function () { return $window.width() <= 980 ? 290 : 210 },
				bottom: 270
			}
		}
	)
}

function loadContent(index){

	$.ajax({
	
		type: "GET",
		url: projectXML,
		dataType: "xml", 
		success: function(data) {
		
		if (typeof data == 'string'){
			//have to mangel the data for IE, not sure if this works??
			data = $.parseXML(data);
		}

		//var FileLocation = '';
		
			//clear out existing content
			$('#mainContent').empty();
			$('#toc').empty();
			$('#nav').empty();
			
			//add all the pages to the pages menu: this links bak to the same page
			$(data).find('page').each( function(index, value){
				$('#nav').append('<li class=""><a href="javascript:loadContent(' + index + ')">' + $(this).attr('name') + '</a></li>');
			});
		
			//which page is this from the document?
			var page = $(data).find('page').eq(index);
			
			//set the main page title and subtitle			
			$('#pageTitle').text( page.attr('name') );
			$('#pageSubTitle').text( page.attr('subtitle') );
			
			//create the sections
			
			//page.find('section').each( function(index, value){
			page.find("section").each( function(index, value){
			
						
				//add a TOC entry
				$('#toc').append('<li><a href="#section' + index + '">' + $(this).attr('name') + '</a></li>');
				
				//add the section header
				var section = $('<section id="section' + index + '"><div class="page-header"><h1>' + $(this).attr('name') + '</h1></div></section>');

				//add the section contents
				$(this).children().each( function(index, value){
					
					//for all nodes append the text
					section.append( '<p>' + $(this).text() + '</p>');
					
					//handle media
					if ( $(this).attr('url') != undefined){
					
						var mediaStr;
						var file = eval( $(this).attr('url') );
						
						if (this.nodeName == 'image'){
						
							//alert(file);
							mediaStr = '<p><img class="img-polaroid" src="' + file + '" title="Alt Text" alt="Alt Text"/></p>';
							
						}
						
						if (this.nodeName == 'audio'){
						
							mediaStr = '<p><b>' + $(this).attr('name') + '</b></p><p><audio src="' + file + '" type="video/mp4" id="player1" controls="controls" preload="none" width="100%"></audio></p>';
						
						}
						
						if (this.nodeName == 'video'){
						
							mediaStr = '<p><b>' + $(this).attr('name') + '</b></p><p><video style="max-width: 100%" class="fullPageVideo" src="' + file + '" type="video/mp4" id="player1" controls="controls" preload="none"></video></p>';
						
						}
						
						//now append it to the section
						section.append(mediaStr);
					}
				});
				
				//a return to top button
				section.append( $('<p><br><a class="btn btn-mini pull-right" href="#">Top</a></p>'));

				//add the section to the document
				$('#mainContent').append(section);
							
			});
			
			//finish initialising the piece now we have the content loaded
			initMedia();
			initSidebar();
			
			window.scroll(0,0);
			
			$('body').scrollspy('refresh');

			//force facebook / twitter objects to initialise
			twttr.widgets.load();
			FB.XFBML.parse(); 
	
		}
	})
}