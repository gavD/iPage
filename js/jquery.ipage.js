/**
 * Modified version of the jQuery iPage Plugin
 * 
 * We have submitted a patch back to the original project
 * 
 * @version 1.0.1 Modified by Gavin Davies
 *
 * Code by Lufutu
 * @link http://lufutu.com
 * @link http://plugins.jquery.com/project/iPage
 * More info: #
 * 
 * Terms of Use
 * This plugin is dual-licensed under the GNU General Public License
 * and the MIT License and is copyright Lufutu .
 * 
 * Any changes by Gavin Davies are provided as-is with no warranty and are supplied
 * in good faith to improve the plugin
 */
(function($){  
    jQuery.fn.ipage = function(options) {
        var currentPage = 1;
        var pagecount;
        var root;
        var defaults = {  
            pagenumber: 1,
            children: 'li',
            numPerPage: 5,
            numButton : 9,
            prevButtonText: "Previous page",
            nextButtonText: "Next page",
            firstButtonText: "First page",
            lastButtonText: "Last page",
            insertPager: function(ipage) {
                $(ipage).parent().append('<div id="iPage-navigation" class="pager"></div>');
            }
        };
        
        var settings = $.extend({}, defaults, options);
        
        this.each(function() {
            root = ($(this));
            pagecount = Math.ceil($(this).find(settings.children).length/settings.numPerPage);
            //Build iPage navigation
            settings.insertPager(this);
            $("#iPage-navigation").empty().append(buildNavigation(root,settings.pagenumber));
            return this;
        });
        
        function buildNavigation(root,pagenumber) {
            var numPerPage = settings.numPerPage;
            var buttonClickCallback = settings.buttonClickCallback;
            var children = settings.children;
            var numButton = settings.numButton;
            var pageCounter = 1;
            var count = 0;
            root.find(children).each(function(i){
                // *** Reset Class *** //
                if($(this).hasClass("hide")){
                    $(this).removeClass("hide");
                }        

                var classes = $(this).attr('class').split(/\s+/);
                var pattern = /^page/;
                var j;
                for(j = 0; j < classes.length; j++){
                  var className = classes[j];
                  if(className.match(pattern)){
                    $(this).removeClass(className);
                  }
                }        
                // **** Start Rendering **** //
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
            
            $pager.append(createButton(settings.firstButtonText ,root, pagenumber, pagecount, buttonClickCallback)).append(createButton(settings.prevButtonText,root, pagenumber, pagecount));

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

            var page;
            for (page = startPoint; page <= endPoint; page++) {

                var currentButton = $('<li class="button page-number">' + (page) + '</li>');                
                if(page == pagenumber){
                    currentButton.addClass('pgCurrent');
                }
                currentButton.appendTo($pager);
            }


            $pager.append(createButton(settings.nextButtonText,root, pagenumber, pagecount)).append(createButton(settings.lastButtonText,root, pagenumber, pagecount));

            return $pager;
        }
                
        function createButton(buttonLabel,root, pagenumber, pagecount) {

            var $Button = $('<li class="button">' + buttonLabel + '</li>');
            
            var clickedPage = 1;
            
            switch (buttonLabel) {
                case settings.firstButtonText:
                    clickedPage = 1;
                    $Button.addClass("first");
                    break;
                case settings.prevButtonText:
                    clickedPage = pagenumber - 1;
                    $Button.addClass("prev");
                    break;
                case settings.nextButtonText:
                    clickedPage = pagenumber + 1;
                    $Button.addClass("next");
                    break;
                case settings.lastButtonText:
                    clickedPage = pagecount;
                    $Button.addClass("last");
                    break;
            }
            if (buttonLabel == settings.firstButtonText || buttonLabel == settings.prevButtonText) {
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
                    case settings.firstButtonText:
                        clickedPage = 1;
                        break;
                    case settings.prevButtonText:
                        clickedPage = currentPage - 1;
                        break;
                    case settings.nextButtonText:
                        clickedPage = currentPage + 1;
                        break;
                    case settings.lastButtonText:
                        clickedPage = pagecount;
                        break;
                    default:
                        clickedPage = parseInt(label, 10);
                }
                rebuildNavigation(clickedPage);
                root.find(settings.children+".page"+currentPage).addClass("hide");
                root.find(settings.children+".page"+clickedPage).removeClass("hide");                
                currentPage = clickedPage;            
            }
        });
        function rebuildNavigation(clickedPage){    
            var startPoint = 1;
            var endPoint = settings.numButton;
            var middlePoint = Math.floor(endPoint/2);
            if (clickedPage > middlePoint) {
                startPoint = clickedPage - middlePoint;
                endPoint = clickedPage + middlePoint;
            }

            if (endPoint > pagecount) {
                startPoint = pagecount - (settings.numButton-1);
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
                $("#iPage-navigation ul li.first").addClass("zero");
                $("#iPage-navigation ul li.prev").addClass("zero");
                $("#iPage-navigation ul li.next").removeClass("zero");
                $("#iPage-navigation ul li.last").removeClass("zero");
            }
            else if(clickedPage == pagecount){
                $("#iPage-navigation ul li.next").addClass("zero");
                $("#iPage-navigation ul li.last").addClass("zero");
                $("#iPage-navigation ul li.first").removeClass("zero");
                $("#iPage-navigation ul li.prev").removeClass("zero");
            }
            else{
                $("#iPage-navigation ul li.first").removeClass("zero");
                $("#iPage-navigation ul li.prev").removeClass("zero");
                $("#iPage-navigation ul li.next").removeClass("zero");
                $("#iPage-navigation ul li.last").removeClass("zero");
            }
        }
    };
})(jQuery);
