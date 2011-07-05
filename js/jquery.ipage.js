// jQuery iPage Plugin
//
// Version 1.0
//
// Code by Lufutu
// http://lufutu.com
//
// More info: #
//
// Terms of Use
//
// This plugin is dual-licensed under the GNU General Public License
//   and the MIT License and is copyright Lufutu .
//

(function($){  
    jQuery.fn.ipage = function(options) {
		var currentPage = 1;
		var	pagecount;
		var	root;
        var  
          defaults = {  
			pagenumber: 1,
			children: 'li',
			numPerPage : 5,
			numButton : 9,
          },  
        settings = $.extend({}, defaults, options);		  
        this.each(function() {
			root = ($(this))
			pagecount = Math.ceil($(this).find(options.children).length/options.numPerPage);
			//Build iPage navigation
			$(this).parent().append('<div id="iPage-navigation" class="pager"></div>')
			$("#iPage-navigation").empty().append(buildNavigation(root,options.pagenumber));
			return this;
        });	
	   function buildNavigation(root,pagenumber) {
			var numPerPage = options.numPerPage;
			var buttonClickCallback = options.buttonClickCallback;
			var children = options.children;
			var pagecount = pagecount;
			var numButton = options.numButton
			var pageCounter = 1;
			var count = 0;
			root.find(children).each(function(i){
				/**** Reset Class ***/
				if($(this).hasClass("hide")){
					$(this).removeClass("hide");
				}		

				var classes = $(this).attr('class').split(/\s+/);
				var pattern = /^page/;
				for(var i = 0; i < classes.length; i++){
				  var className = classes[i];
				  if(className.match(pattern)){
					$(this).removeClass(className);
				  }
				}		
				/**** Start Rendering ****/			
				if(count > numPerPage-1){		
					$(this).addClass("hide");
				}					
				if(count < pageCounter*numPerPage && count >= (pageCounter-1)*numPerPage) {
				$(this).addClass("page"+pageCounter);
				}
				else {
					$(this).addClass("page"+(pageCounter+1));
					pageCounter ++;
				}	
				count ++;
			});
			var $pager = $('<ul class="pages"></ul>');
			
			$pager.append(createButton('<<',root, pagenumber, pagecount, buttonClickCallback)).append(createButton('<',root, pagenumber, pagecount));

			var startPoint = 1;
			var endPoint = numButton;

			if (pagenumber > 4) {
				startPoint = pagenumber - 4;
				endPoint = pagenumber + 4;
			}

			if (endPoint > pagecount) {
				startPoint = pagecount - 8;
				endPoint = pagecount;
			}

			if (startPoint < 1) {
				startPoint = 1;
			}


			for (var page = startPoint; page <= endPoint; page++) {

				var currentButton = $('<li class="button page-number">' + (page) + '</li>');				
				if(page == pagenumber){
					currentButton.addClass('pgCurrent');
				}
				currentButton.appendTo($pager);
			}


			$pager.append(createButton('>',root, pagenumber, pagecount)).append(createButton('>>',root, pagenumber, pagecount));

			return $pager;
		}


		function createButton(buttonLabel,root, pagenumber, pagecount) {

			var $Button = $('<li class="button">' + buttonLabel + '</li>');
			
			var clickedPage = 1;
			
			switch (buttonLabel) {
				case "<<":
					clickedPage = 1;
					$Button.addClass("first");
					break;
				case "<":
					clickedPage = pagenumber - 1;
					$Button.addClass("prev");
					break;
				case ">":
					clickedPage = pagenumber + 1;
					$Button.addClass("next");
					break;
				case ">>":
					clickedPage = pagecount;
					$Button.addClass("last");
					break;
			}
			if (buttonLabel == "<<" || buttonLabel == "<") {
				if(pagenumber <=1){
					$Button.addClass('zero');
				}				
			}
			else {
				if(pagenumber >= pagecount){
					$Button.addClass('zero');
				}			
			}
			return $Button;
		}
		// Handler event when click
		$("#iPage-navigation ul li.button").click(function(e){
			if(!$(this).hasClass("zero")){
				var label = $(this).text();
				var clickedPage = 0;
				switch (label) {
					case "<<":
						clickedPage = 1;
						break;
					case "<":
						clickedPage = currentPage - 1;
						break;
					case ">":
						clickedPage = currentPage + 1;
						break;
					case ">>":
						clickedPage = pagecount;
						break;
					default:
						clickedPage = parseInt(label);
				}
				rebuildNavigation(clickedPage);
				root.find(options.children+".page"+currentPage).addClass("hide");
				root.find(options.children+".page"+clickedPage).removeClass("hide");				
				currentPage = clickedPage;			
			}
		});
		function rebuildNavigation(clickedPage){	
			var startPoint = 1;
			var endPoint = options.numButton;
			var middlePoint = Math.floor(endPoint/2);
			if (clickedPage > middlePoint) {
				startPoint = clickedPage - middlePoint;
				endPoint = clickedPage + middlePoint;
			}

			if (endPoint > pagecount) {
				startPoint = pagecount - (options.numButton-1);
				endPoint = pagecount;
			}

			if (startPoint < 1) {
				startPoint = 1;
			}
			$("#iPage-navigation ul li.page-number").each(function(e){
				if(startPoint <= endPoint){
					$(this).text(startPoint);
					if(startPoint == clickedPage){
						$(this).addClass('pgCurrent');
					}
					else{
						$(this).removeClass('pgCurrent');
					}
					startPoint++;						
				}
			});	
			if(clickedPage == 1){
				if(!$("#iPage-navigation ul li.first").hasClass("zero")){
					$("#iPage-navigation ul li.first").addClass("zero");
				}
				if(!$("#iPage-navigation ul li.prev").hasClass("zero")){
					$("#iPage-navigation ul li.prev").addClass("zero");
				}	
				if($("#iPage-navigation ul li.next").hasClass("zero")){
					$("#iPage-navigation ul li.next").removeClass("zero");
				}
				if($("#iPage-navigation ul li.last").hasClass("zero")){
					$("#iPage-navigation ul li.last").removeClass("zero");
				}				
			}
			else if(clickedPage == pagecount){
				if(!$("#iPage-navigation ul li.next").hasClass("zero")){
					$("#iPage-navigation ul li.next").addClass("zero");
				}
				if(!$("#iPage-navigation ul li.last").hasClass("zero")){
					$("#iPage-navigation ul li.last").addClass("zero");
				}	
				if($("#iPage-navigation ul li.first").hasClass("zero")){
					$("#iPage-navigation ul li.first").removeClass("zero");
				}
				if($("#iPage-navigation ul li.prev").hasClass("zero")){
					$("#iPage-navigation ul li.prev").removeClass("zero");
				}					
			}
			else{
				if($("#iPage-navigation ul li.first").hasClass("zero")){
					$("#iPage-navigation ul li.first").removeClass("zero");
				}
				if($("#iPage-navigation ul li.prev").hasClass("zero")){
					$("#iPage-navigation ul li.prev").removeClass("zero");
				}	
				if($("#iPage-navigation ul li.next").hasClass("zero")){
					$("#iPage-navigation ul li.next").removeClass("zero");
				}
				if($("#iPage-navigation ul li.last").hasClass("zero")){
					$("#iPage-navigation ul li.last").removeClass("zero");
				}					
			}
		}
    }
})(jQuery);  

