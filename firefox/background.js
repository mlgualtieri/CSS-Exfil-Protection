// CSS rules that will block the loading of risky CSS until it can be sanitized
var css_load_blocker_code = "input,input ~ * { background-image:none !important; list-style: inherit !important; cursor: auto !important; content:normal !important; } input::before,input::after,input ~ *::before, input ~ *::after { content:normal !important; }";



// Set badge with number of blocked resources
browser.runtime.onMessage.addListener(function(message, sender) {

    if(message == 'setBlockingCSS')
    {
        //console.log("Inserted blocking CSS in tab: "+ sender.tab.id);
        browser.tabs.insertCSS(sender.tab.id, {
                code: css_load_blocker_code,
                allFrames: true
            }, function () {
                if (browser.runtime.lastError) {
                    console.error(browser.runtime.lastError.message);
                }
        		//browser.tabs.getCurrent().then(function(){ 
                //	//console.log("Inserted blocking CSS in tab: "+ sender.tab.id);
        		//});
        });
    }
    else if(message == 'removeBlockingCSS')
    {
        //console.log("Removing blocking CSS in tab: "+ sender.tab.id);
        browser.tabs.removeCSS(sender.tab.id, {
            code: css_load_blocker_code,
            allFrames: true
            },
        function () {
            //console.log("Removing blocking CSS in tab: "+ sender.tab.id);
        });
    }
    else if(message == 'disabled')
    {
        browser.browserAction.setIcon({path:"icons/icon-disabled-48.png"});
        //browser.browserAction.setBadgeText({text: "-"});
        browser.browserAction.setBadgeBackgroundColor({ color: [55, 55, 55, 255] });
    }
    else if(message == 'enabled')
    {
        browser.browserAction.setIcon({path:"icons/icon-48.png"});
        browser.browserAction.setBadgeText({text: ""});
    }
    else if(message == 'reenabled')
    {
        browser.browserAction.setIcon({path:"icons/icon-reenabled-48.png"});
        browser.browserAction.setBadgeText({text: ""});
        browser.browserAction.setBadgeBackgroundColor({ color: [255, 65, 54, 255] });
    }
    else
    {
        if(message != "0")
        {
            browser.browserAction.setBadgeText({text: message, tabId: sender.tab.id});
            browser.browserAction.setBadgeBackgroundColor({ color: [255, 65, 54, 255] });
            browser.browserAction.setBadgeTextColor({color: [255,255,255,255]});
        }
        else
        {
            //browser.browserAction.setBadgeText({text: "", tabId: sender.tab.id});
        }

    }
});

