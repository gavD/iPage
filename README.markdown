# Disclaimer

I did not write this plugin, but I have made some enhancements to it and am hosting it here. I have submitted patches back to the original plugin author.

I'm working on the assumption that iPage is under the jQuery (MIT) license. If there's any problem at all with me hosting this, let me know and I'll pull it down.

Note that I've only modified the jQuery version

# Usage

I've added a few options. All are optional:

nextButtonText : string. the text on the "next" button. Defaults to ">"
prevButtonText : string. the text on the "prev" button. Defaults to "<"
lastButtonText : string. the text on the "last" button. Defaults to ">>"
firstButtonText : string. the text on the "first" button. Defaults to "<<"
insertPage : function. Provided to allow you to insert the pager in places other than the default.

Example usage:

```javascript
           $(document).ready(function() {
                $("form.conForm").ipage({
                    pagenumber: 1,
                    //buttonClickCallback: PageGiftClick,
                    root : 'form.conForm',
                    numPerPage : 1 ,
                    children: 'fieldset.fieldGroup',
                    numButton: 1,
                    nextButtonText: "Next page",
                    prevButtonText: "Previous page",
                    insertPager: function(ipage) {
                        $(ipage).find('div.submitRow').before('<div id="iPage-navigation" class="pager"></div>');
                    }
                });
            });
```

# Other changes

Various code tidying and implementing some of the less strict JSLint recommendations so it minifies more cleanly.
