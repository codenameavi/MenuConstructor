$(function ($) {
	'use strict';
	$.fn.constructMenu = function(options){
		
		var menuUlElement = this;
		
		var settings = $.extend({	menu:'Horizontal', 
									accordion:true, 
									childPopUp:true,
									menuDefaultColors:['#e0eaf1','#000'],
									menuHoverColors:['#ff0000','#00ff00'],
									
									exapandImage: 'images/minus.png',
									collapseImage: 'images/plus.png'}, options);
		
		if(settings.childPopUp)
		{
			settings.accordion = true;
		}
		
		if(settings.menu == "Horizontal")
		{
			settings.accordion = true;
		}
		
		if(settings.childPopUp)
		{
			menuUlElement.children('ul').addClass("menuChildPopUp");
		}
		
		var processMenu = function(){
			
			// adding a class to the parent, to restrict CSS styles
			menuUlElement.children('ul').addClass("menuConstructor");
			
			var imageHtmlPlus 	= '<img src="'+settings.collapseImage+'" class="menuConstructorIcon" alt="">';
			var imageHtmlMinus 	= '<img src="'+settings.exapandImage+'" class="menuConstructorIcon" alt="">';
			
			if(settings.menu == "Horizontal")
			{
				menuUlElement.children('ul').css('width', '100%');
				menuUlElement.children('ul').children('li').addClass("horizontalMenu");
			}
			
			// set default colors & Background-colors
			menuUlElement.find("ul.menuConstructor li").css("background-color", settings.menuDefaultColors[0]);
			menuUlElement.find("ul.menuConstructor li a").css('color', settings.menuDefaultColors[1]);
			
			// if any children has sub-UL
			menuUlElement.find('li').each(function(){
				
				if($(this).children('ul').length)
				{
					if(settings.childPopUp) {
						// show child UL in seperate 
						$(this).children('ul').addClass("childPopUp");
					}
					
					//if(settings.accordion) {
					
						$(this).find('a:first').prepend(imageHtmlPlus);
						$(this).children('ul').hide();
					/* } else {
					
						$(this).find('a:first').prepend(imageHtmlMinus);
						$(this).find('img.menuConstructorIcon').addClass('activeImage');
					} */
				}
				
				// if specified, open list- until top node
				if($(this).hasClass("activeMenu")){
					
					$(this).children('ul').show();
					$(this).find('img.menuConstructorIcon').attr('src', settings.exapandImage).addClass('activeImage');
					
					$(this).parentsUntil('ul.menuConstructor').each( function() {
					
						$(this).find('ul').show();
						$(this).find('img.menuConstructorIcon').attr('src', settings.exapandImage).addClass('activeImage');
					});
					
				}
				

			});
			
			// if activemenu, set hover colors & Background-colors of activeMenu
			menuUlElement.find("ul.menuConstructor li.activeMenu a").css('color', settings.menuHoverColors[1]);
			menuUlElement.find("ul.menuConstructor li.activeMenu a").css("background-color", settings.menuHoverColors[0]);
			
			
			// set default & hover colors & Background-colors
			menuUlElement.find("ul.menuConstructor li a").mouseenter(function() {
				
				$(this).css("background-color", settings.menuHoverColors[0]);
				$(this).css("color", settings.menuHoverColors[1]);
			}).mouseleave(function() {
			
				$(this).css("background-color", settings.menuDefaultColors[0]);
				$(this).css("color", settings.menuDefaultColors[1]);
			}); 
			
		};
		
		processMenu();
		
		var closeListItem = function(item) {
			
			item.find('img.menuConstructorIcon').attr('src', settings.collapseImage).removeClass('activeImage');
			
			item.children('ul').slideUp("fast");
			item.children('ul').children('li').each(function() {
				closeListItem($(this));
			});
		}
		
		// click on image
		menuUlElement.find('img.menuConstructorIcon').on('click', function(e) {
			
			
			if($(this).hasClass('activeImage')) {
				
				// close the next ul- if present
				$(this).attr('src', settings.collapseImage);
				$(this).parent('a').siblings('ul').slideUp("fast");
				
				if(settings.accordion) {
					$(this).parent('a').siblings('ul').children('li').each(function() {
					
						closeListItem($(this));
					});
				}
				$(this).removeClass('activeImage');

			} else {
				
				// open the next ul- if present
				$(this).attr('src', settings.exapandImage);
				$(this).parent('a').siblings('ul').slideDown("fast");
				$(this).addClass('activeImage');
			}
			
			// if accordion, then select & close other list items, of SAME LEVEL
			if(settings.accordion) {
				$(this).parents('li').siblings('li').each(function() {
					closeListItem($(this));
				});
			}
			
			e.preventDefault();
		});
		
		return menuUlElement;
	}

}(jQuery))