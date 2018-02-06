
function scan_css() 
{
	var sheets = document.styleSheets;

    for (var i=0; i < sheets.length; i++) 
	{
	    var selectors   = [];
	    var selectorcss = [];
	    var rules       = getCSSRules(sheets[i]);

        if(rules == null)
        {
            // Retrieve and parse cross domain stylesheet
            //console.log("Cross domain stylesheet: "+ sheets[i].href);
            getCrossDomainCSS(sheets[i]);
        }
        else
        {
            handleImportedCSS(rules);

            // Parse origin stylesheet
            //console.log("DOM stylesheet...");
            var _selectors = parseCSSRules(rules);
            filter_css(_selectors[0], _selectors[1]);
            enableCSS(sheets[i]);
        }
	}
}



function handleImportedCSS(rules)
{
    // Scan for imported stylesheets
    for(var r=0; r < rules.length; r++)
    {
        if( Object.prototype.toString.call(rules[r]) == "[object CSSImportRule]")
        {
            // Found an imported CSS Stylesheet
            //console.log("Imported CSS...");

            var _rules = getCSSRules(rules[r].styleSheet);
            if(_rules == null)
            {
                // Parse imported cross domain sheet
                //console.log("Imported Cross Domain CSS...");
                disableCSS(rules[r].styleSheet);
                getCrossDomainCSS(rules[r].styleSheet);
            }
            else
            {
                // Parse imported DOM sheet
                //console.log("Imported DOM CSS...");
                var _selectors = parseCSSRules(_rules);
                filter_css(_selectors[0], _selectors[1]);
            }
        }
    }
}



function getCSSRules(_sheet)
{
    var rules = null;

	try 
	{
        //Loading CSS
	    //console.log("Loading CSS...");
	    rules = _sheet.rules || _sheet.cssRules;
	} 
	catch(e) 
	{
	    if(e.name !== "SecurityError") 
	    {
            //console.log("Error loading rules:");
            //console.log(e);
	        //throw e;
	    }
	}

    return rules;
}



function parseCSSRules(rules)
{
	var selectors   = [];
	var selectorcss = [];

    if(rules != null)
    {
        // Loop through all selectors and determine if any are looking for the value attribute and calling a remote URL
        for (r=0; r < rules.length; r++) 
        {
            var selectorText = null;
            if(rules[r].selectorText != null)
            {
                selectorText = rules[r].selectorText.toLowerCase();
            }

            var cssText = null;
            if(rules[r].cssText != null)
            {
                cssText = rules[r].cssText.toLowerCase();
            }

            // If CSS selector is parsing text and is loading a remote resource add to our blocking queue
            if( 
                ( (selectorText != null) && (cssText != null) && 
                  (selectorText.indexOf('value') !== -1) && (selectorText.indexOf('=') !== -1) ) &&
                ( (cssText.indexOf('url') !== -1) && ( (cssText.indexOf('https://') !== -1) || (cssText.indexOf('http://') !== -1) ) )
              )
            {
                console.log("CSS Exfil Protection blocked: "+ rules[r].selectorText);
                selectors.push(rules[r].selectorText);
                selectorcss.push(cssText);
            }
        }
    }

    return [selectors,selectorcss];
}


function filter_css(selectors, selectorcss)
{
    // Loop through found selectors and override CSS
    for(s in selectors)
    {
        if( selectorcss[s].indexOf('background') )
        {
            filter_sheet.sheet.insertRule( selectors[s] +" { background:none !important; }", filter_sheet.sheet.cssRules.length);
        }
        else if( selectorcss[s].indexOf('list-style') )
        {
            filter_sheet.sheet.insertRule( selectors[s] +" { list-style: inherit !important; }", filter_sheet.sheet.cssRules.length);
        }
        else if( selectorcss[s].indexOf('cursor') )
        {
            filter_sheet.sheet.insertRule( selectors[s] +" { cursor: auto !important; }", filter_sheet.sheet.cssRules.length);
        }
    }
}




function getCrossDomainCSS(orig_sheet)
{
	var rules;
    var url = orig_sheet.href;

    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function() 
    {
        if (xhr.readyState == 4) 
        {
            // Create stylesheet from remote CSS
            var sheet = document.createElement('style');
            sheet.innerText = xhr.responseText;
            document.head.appendChild(sheet);

	        var sheets = document.styleSheets;
            rules = getCSSRules(sheets[ sheets.length - 1]);

            // if rules is null is likely means we triggered a firefox 
            // timing error where the new CSS sheet isn't ready yet
            if(rules == null)
            {
                // Keep checking every 10ms until rules have become available
                setTimeout(function checkRulesInit() { 
                    rules = getCSSRules(sheets[ sheets.length - 1]);
                        
                    if(rules == null)
                    {
                        setTimeout(checkRulesInit, 10);
                    }
                    else
                    {
                        handleImportedCSS(rules);
    
                        var _selectors = parseCSSRules(rules);
                        filter_css(_selectors[0], _selectors[1]);
    
                        // Remove tmp stylesheet
                        sheet.disabled = true;
                        sheet.parentNode.removeChild(sheet);
    
                        enableCSS(orig_sheet);
                        return rules;
                    }

                }, 10);
            }
            else
            {
                handleImportedCSS(rules);

                var _selectors = parseCSSRules(rules);
                filter_css(_selectors[0], _selectors[1]);

                // Remove tmp stylesheet
                sheet.disabled = true;
                sheet.parentNode.removeChild(sheet);

                enableCSS(orig_sheet);
                return rules;
            }
        }
    }
    xhr.send();
}



function disableCSS(_sheet)
{
    //console.log("Disabled CSS: "+ _sheet.href);
    _sheet.disabled = true;
}
function enableCSS(_sheet)
{
    //console.log("Enabled CSS: "+ _sheet.href);
    _sheet.disabled = false;
    
    // Some sites like news.google.com require a resize event to properly render all elements after re-enabling CSS
    window.dispatchEvent(new Event('resize'));
}




/*
 *  Initialize
 */

// Create stylesheet which will contain our override styles
var filter_sheet = null;

// Create temporary stylesheet that will block speculative prefetch of CSS backgrounds
var css_load_blocker  = document.createElement('style');
css_load_blocker.innerText = "html { display:none !important; }";
document.head.appendChild(css_load_blocker);



// Run as soon as the DOM has been loaded
window.addEventListener("DOMContentLoaded", function() {


    browser.storage.local.get({
        enable_plugin: 1
    }, function(items) {

        if(items.enable_plugin)
        {
            // Plugin is enabled

            // Diable all stylesheets to prevent prefetch of CSS backgrounds and remove blocker sheet
	        var sheets = document.styleSheets;
            for (var i=0; i < sheets.length; i++) 
	        {
                //console.log("Disable CSS index["+ i + "] href:" + sheets[i].href);
                disableCSS(sheets[i]);
            }
            css_load_blocker.disabled = true;
            css_load_blocker.parentNode.removeChild(css_load_blocker);

            // Create stylesheet that will contain our filtering CSS (if any is necessary)
            filter_sheet = document.createElement('style');
            document.head.appendChild(filter_sheet);
            scan_css();
        }
        else
        {
            // Plugin is disabled... enable page without sanitizing
            css_load_blocker.disabled = true;
            css_load_blocker.parentNode.removeChild(css_load_blocker);
        }
    });

}, false);


