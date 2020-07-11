// CSS rules that will block the loading of risky CSS until it can be sanitized
var css_load_blocker_code = "input,input ~ * { background-image:none !important; list-style: inherit !important; cursor: auto !important; content:normal !important; } input::before,input::after,input ~ *::before, input ~ *::after { content:normal !important; }";


// Set badge with number of blocked resources
chrome.runtime.onMessage.addListener(function(message, sender) {

    if(message == 'disabled')
    {
        chrome.browserAction.setIcon({path:"icons/icon-disabled-48.png"});
        //chrome.browserAction.setBadgeText({text: "-"});
        chrome.browserAction.setBadgeBackgroundColor({ color: [55, 55, 55, 255] });
    }
    else if(message == 'enabled')
    {
        chrome.browserAction.setIcon({path:"icons/icon-48.png"});
        chrome.browserAction.setBadgeText({text: ""});
    }
    else if(message == 'reenabled')
    {
        chrome.browserAction.setIcon({path:"icons/icon-reenabled-48.png"});
        chrome.browserAction.setBadgeText({text: ""});
        chrome.browserAction.setBadgeBackgroundColor({ color: [255, 65, 54, 255] });
    }
    else
    {
        if(message != "0")
        {
            chrome.browserAction.setBadgeText({text: message, tabId: sender.tab.id});
            chrome.browserAction.setBadgeBackgroundColor({ color: [255, 65, 54, 255] });
            // Not a Chrome function and default is already white text
            //chrome.browserAction.setBadgeTextColor({color: [255,255,255,255]});
        }
        else
        {
            //chrome.browserAction.setBadgeText({text: "", tabId: sender.tab.id});
        }

    }
});

