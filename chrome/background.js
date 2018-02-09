
// Set badge with number of blocked resources
chrome.extension.onMessage.addListener(function(message, sender) {

    if(message != "0")
    {
        chrome.browserAction.setBadgeText({text: message, tabId: sender.tab.id});
    }
    else
    {
        chrome.browserAction.setBadgeText({text: "", tabId: sender.tab.id});
    }

    chrome.browserAction.setBadgeBackgroundColor({ color: [255, 65, 54, 255] });

});

