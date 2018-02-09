
// Set badge with number of blocked resources
browser.runtime.onMessage.addListener(function(message, sender) {

    if(message != "0")
    {
        browser.browserAction.setBadgeText({text: message, tabId: sender.tab.id});
    }
    else
    {
        browser.browserAction.setBadgeText({text: "", tabId: sender.tab.id});
    }

});

