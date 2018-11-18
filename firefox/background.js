
// Set badge with number of blocked resources
browser.runtime.onMessage.addListener(function(message, sender) {
    console.log(message);

    if(message == 'disabled')
    {
        browser.browserAction.setIcon({path:"icons/icon-disabled-48.png"});
        browser.browserAction.setBadgeText({text: "X"});
        browser.browserAction.setBadgeBackgroundColor({ color: [55, 55, 55, 255] });
    }
    else if(message == 'enabled')
    {
        browser.browserAction.setIcon({path:"icons/icon-48.png"});
        browser.browserAction.setBadgeText({text: ""});
    }
    else
    {
        if(message != "0")
        {
            browser.browserAction.setBadgeText({text: message, tabId: sender.tab.id});
            browser.browserAction.setBadgeBackgroundColor({ color: [255, 65, 54, 255] });
        }
        else
        {
            //browser.browserAction.setBadgeText({text: "", tabId: sender.tab.id});
        }

    }
});


