// Example: https://developer.chrome.com/extensions/options


// Saves options to chrome.storage
function save_options() 
{
	var enable_plugin = 1;

  	if(!document.getElementById('enable_plugin').checked)
	{
		enable_plugin = 0;
        chrome.runtime.sendMessage('disabled');
	}
    else
    {
        // display icon as reenabled (plugin is active but no resources have been scanned)
        chrome.runtime.sendMessage('reenabled');
    }

  	chrome.storage.local.set({
  	    enable_plugin: enable_plugin
  	}, function() {});
}


// Restores select box and checkbox state using the preferences stored in chrome.storage.
function restore_options() 
{
  chrome.storage.local.get({
    enable_plugin: 1
  }, function(items) {

	if(items.enable_plugin)
	{
		document.getElementById('enable_plugin').checked = true;
	}
	else
	{
		document.getElementById('enable_plugin').checked = false;
	}
  });
}


function update_domainsettings()
{
	chrome.tabs.query({currentWindow: true, active: true}, function(tabs) {
        let tab    = tabs[0];
        let url    = new URL(tab.url);
        let domain = url.hostname;
 
        // Load stored domain settings data
        chrome.storage.local.get({
            domainsettingsdb: {}
        }, function(items) {

            //let items.domainsettingsdb = items.domainsettingsdb;
            let domainsetting = document.getElementById('domainsetting').value;

            if(domainsetting == 0)
            {
                // Remove key if set to default
                delete items.domainsettingsdb[domain];
            }
            else
            {
                items.domainsettingsdb[domain] = document.getElementById('domainsetting').value;
            }
        
            // Write domain settings data to disk
            chrome.storage.local.set({
                domainsettingsdb: items.domainsettingsdb
            }, function() {});
        });
    });
}


document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('enable_plugin').addEventListener('click', save_options);
document.getElementById('domainsetting').addEventListener('change', update_domainsettings);


// Update domain span with active tab domain name
// Requires "tabs" permission
// Also update any previously written settings
chrome.tabs.query({currentWindow: true, active: true}, function(tabs) {
    let tab    = tabs[0];
    let url    = new URL(tab.url);
    let domain = url.hostname;
    document.getElementById('thedomain').innerText = domain;

    // update domain setting

    // Load stored domain settings data
    chrome.storage.local.get({
        domainsettingsdb: {}
    }, function(items) {

        if(domain in items.domainsettingsdb)
        {
            document.getElementById('domainsetting').value = items.domainsettingsdb[domain];
            //console.log(items.domainsettingsdb);
        }
    });

});

